import './ui.css'

const $ = (id) => document.getElementById(id)

const videoEl = $('cam')
const faceCanvas = $('overlay')
const handCanvas = $('hands')
const statusEl = $('status')
const cartList = $('cartList')
const arBox = document.querySelector('.ar-box')

const faceCtx = faceCanvas.getContext('2d')
const handCtx = handCanvas.getContext('2d')

const btnCam = $('btnCam')
const btnFace = $('btnFace')
const btnHand = $('btnHand')

let faceLandmarker = null
let hands = null
let camReady = false
let streamRef = null
let faceLoading = false   // 放外面

// preloading
const defaultHeadImg = new Image()
defaultHeadImg.src = '/assets/tryon/headpiece.png'
const defaultHandImg = new Image()
defaultHandImg.src = '/assets/tryon/ring.png'

let currentHeadImg = defaultHeadImg
let currentHandImg = defaultHandImg

/* ---------- camera on/off ---------- */
async function toggleCam () {
  const isOn = btnCam.dataset.on === '1'
  if (!isOn) {
    const s = await navigator.mediaDevices.getUserMedia({
      video: { facingMode: 'user', width: { ideal: 1280 }, height: { ideal: 720 } },
      audio: false
    })
    videoEl.srcObject = s
    streamRef = s
    await videoEl.play()
    camReady = true
    resizeCanvas()
    btnCam.textContent = 'Disable Camera'
    btnCam.dataset.on = '1'
    statusEl.textContent = 'Camera enabled'
  } else {
    if (streamRef) streamRef.getTracks().forEach(t => t.stop())
    videoEl.srcObject = null
    camReady = false
    btnCam.textContent = 'Enable Camera'
    btnCam.dataset.on = '0'
    statusEl.textContent = 'Camera disabled'
    faceCtx.clearRect(0,0,faceCanvas.width,faceCanvas.height)
    handCtx.clearRect(0,0,handCanvas.width,handCanvas.height)
    if (arBox) arBox.classList.remove('zoomed')
  }
}

/* ---------- resize ---------- */
function resizeCanvas () {
  const rect = videoEl.getBoundingClientRect()
  faceCanvas.width = rect.width
  faceCanvas.height = rect.height
  handCanvas.width = rect.width
  handCanvas.height = rect.height
}

/* ---------- face ---------- */
async function loadFace () {
  if (!camReady) {
    statusEl.textContent = 'Enable camera first'
    return
  }
  if (faceLandmarker) {
    statusEl.textContent = 'Face tracker enabled'
    return
  }
  if (faceLoading) return
  faceLoading = true
  statusEl.textContent = 'Loading face model...'
  try {
    const vision = await window.FilesetResolver.forVisionTasks(
      'https://cdn.jsdelivr.net/npm/@mediapipe/tasks-vision@latest/wasm'
    )
    faceLandmarker = await window.FaceLandmarker.createFromOptions(vision, {
      baseOptions: {
        modelAssetPath:
          'https://cdn.jsdelivr.net/npm/@mediapipe/tasks-vision@latest/wasm/face_landmarker.task'
      },
      runningMode: 'VIDEO',
      numFaces: 1
    })
    statusEl.textContent = 'Face tracker enabled'
  } catch (err) {
    console.error(err)
    statusEl.textContent = 'Face model load failed'
  } finally {
    faceLoading = false
  }
}

/* ---------- hands ---------- */
async function loadHands () {
  if (!camReady) {
    statusEl.textContent = 'Enable camera first'
    return
  }
  hands = new window.Hands({
    locateFile: (file) =>
      `https://cdn.jsdelivr.net/npm/@mediapipe/hands/${file}`
  })
  hands.setOptions({
    maxNumHands: 2,
    modelComplexity: 1,
    minDetectionConfidence: 0.6,
    minTrackingConfidence: 0.6
  })
  hands.onResults(onHandsResults)

  const cam = new window.Camera(videoEl, {
    onFrame: async () => {
      if (!videoEl.videoWidth || !videoEl.videoHeight) return
      await hands.send({ image: videoEl })
    },
    width: 1280,
    height: 720
  })
  cam.start()

  statusEl.textContent = 'Hand tracker enabled'
}

/* ---------- main loop ---------- */
function loop () {
  if (camReady && faceLandmarker) {
    const now = performance.now()
    const res = faceLandmarker.detectForVideo(videoEl, now)

    faceCtx.clearRect(0,0,faceCanvas.width,faceCanvas.height)

    if (res.faceLandmarks && res.faceLandmarks[0]) {
      const lm = res.faceLandmarks[0]
      drawFacePoints(lm)
      drawHeadpiece(lm)
    }
  }
  requestAnimationFrame(loop)
}

/* ---------- draw face points ---------- */
function drawFacePoints (lm) {
  faceCtx.fillStyle = 'rgba(232,233,244,.4)'
  lm.forEach(pt => {
    const x = pt.x * faceCanvas.width
    const y = pt.y * faceCanvas.height
    faceCtx.beginPath()
    faceCtx.arc(x, y, 1.2, 0, Math.PI * 2)
    faceCtx.fill()
  })
}

/* ---------- draw headpiece ---------- */
function drawHeadpiece (lm) {
  const img = currentHeadImg
  if (!img || !img.complete) return

  const left = lm[234]
  const right = lm[454]
  const chin = lm[152]
  const fore = lm[10] || lm[9] || lm[1]
  if (!left || !right || !chin || !fore) return

  const W = faceCanvas.width
  const H = faceCanvas.height

  const xL = left.x * W
  const xR = right.x * W
  const yCh = chin.y * H
  const yF = fore.y * H

  const faceW = Math.hypot(xR - xL, (right.y - left.y) * H)
  const faceH = Math.abs(yCh - yF)

  const cx = (xL + xR) / 2
  const cy = (yCh + yF) / 2 - faceH * 0.05

  const maskW = faceW * 1.35
  const maskH = maskW * (img.height / img.width)

  faceCtx.save()
  faceCtx.drawImage(img, cx - maskW / 2, cy - maskH * 1.05, maskW, maskH)
  faceCtx.restore()
}

/* ---------- hand result ---------- */
function onHandsResults (results) {
  handCtx.clearRect(0,0,handCanvas.width,handCanvas.height)
  if (!results.multiHandLandmarks) return
  for (const lm of results.multiHandLandmarks) {
    drawHand(lm)
    drawRing(lm)
  }
  statusEl.textContent = `Hands: ${results.multiHandLandmarks.length}`
}

/* ---------- draw hand skeleton ---------- */
function drawHand (lm) {
  handCtx.strokeStyle = 'rgba(232, 181, 138, 1)'
  handCtx.lineWidth = 3
  handCtx.beginPath()
  lm.forEach((pt, i) => {
    const x = pt.x * handCanvas.width
    const y = pt.y * handCanvas.height
    if (i === 0) handCtx.moveTo(x, y)
    else handCtx.lineTo(x, y)
  })
  handCtx.stroke()

  handCtx.fillStyle = 'rgba(255,255,255,.6)'
  lm.forEach(pt => {
    const x = pt.x * handCanvas.width
    const y = pt.y * handCanvas.height
    handCtx.beginPath()
    handCtx.arc(x, y, 3, 0, Math.PI * 2)
    handCtx.fill()
  })
}

/* ---------- draw ring ---------- */
function drawRing (lm) {
  const img = currentHandImg
  if (!img || !img.complete) return
  const pt = lm[8] || lm[9]
  if (!pt) return
  const x = pt.x * handCanvas.width
  const y = pt.y * handCanvas.height
  const w = 60
  const h = 60
  handCtx.save()
  handCtx.drawImage(img, x - w / 2, y - h / 2, w, h)
  handCtx.restore()
}

/* ---------- products ---------- */
const productPanel = document.getElementById('productPanel')
const btnToggle = document.getElementById('btnToggle')

btnToggle.onclick = () => {
  productPanel.classList.toggle('collapsed')
  btnToggle.textContent = productPanel.classList.contains('collapsed') ? '+' : '−'
}

// add to cart
document.querySelectorAll('.p-add').forEach(btn => {
  btn.addEventListener('click', () => {
    const name = btn.dataset.name
    const li = document.createElement('li')
    li.textContent = name + ' ×1'
    cartList.appendChild(li)
  })
})

// try it on
document.querySelectorAll('.p-try').forEach(btn => {
  btn.addEventListener('click', async () => {
    const type = btn.dataset.type
    const src = btn.dataset.src
    const name = btn.dataset.name || ''

    if (btnCam.dataset.on !== '1') {
      await toggleCam()
    }

    if (type === 'head') {
      await loadFace()
    } else if (type === 'hand') {
      await loadHands()
    }

    if (src) {
      const img = new Image()
      img.src = src
      img.onload = () => {
        if (type === 'head') currentHeadImg = img
        else currentHandImg = img
      }
    }

    if (arBox) arBox.classList.add('zoomed')

    statusEl.textContent = (type === 'head' ? 'Face try-on: ' : 'Hand try-on: ') + name
  })
})

/* ---------- auto comments ---------- */
const danmuEl = document.getElementById('danmu')
const danmuData = [
  'Susu1114: Can I change the color?',
  'User66: Show me closer pls',
  'Host: Free shipping over £59',
  'Guest: Looks like liquid metal',
  'Studio: Face tracking available now',
  'Becky_0712: Does it support bracelet?'
]

function buildDanmu () {
  if (!danmuEl) return
  danmuEl.innerHTML = ''
  danmuData.forEach((txt, i) => {
    const div = document.createElement('div')
    div.className = 'danmu-floating-item'
    div.style.animationDelay = (i * 1.1) + 's'
    div.textContent = txt
    danmuEl.appendChild(div)
  })
}
buildDanmu()

/* ---------- input comments ---------- */
const dmList = document.getElementById('danmuList')
const dmText = document.getElementById('dmText')
const dmSend = document.getElementById('dmSend')

function pushDanmu (text) {
  if (!dmList) return
  const item = document.createElement('div')
  item.className = 'dm-item'
  item.textContent = text
  dmList.appendChild(item)
  dmList.scrollTop = dmList.scrollHeight
}

if (dmSend) {
  dmSend.addEventListener('click', () => {
    const v = dmText.value.trim()
    if (!v) return
    pushDanmu('Me: ' + v)
    dmText.value = ''
  })
}
if (dmText) {
  dmText.addEventListener('keydown', e => {
    if (e.key === 'Enter') dmSend.click()
  })
}

/* ---------- events ---------- */
btnCam.onclick = toggleCam
btnFace.onclick = loadFace
btnHand.onclick = loadHands

window.addEventListener('resize', resizeCanvas)
loop()
