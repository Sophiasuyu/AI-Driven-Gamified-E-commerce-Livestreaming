import * as THREE from 'three';
const NOSE = 1, L = 234, R = 454;

export function fitGlasses(mesh, camera, lm){
  if(!lm || lm.length < 468) return;

  const z = -0.6;
  const to3 = (i) => {
    const nx = lm[i].x * 2 - 1;
    const ny = - (lm[i].y * 2 - 1);
    return new THREE.Vector3(nx, ny, z).unproject(camera);
  };

  const nose = to3(NOSE);
  const l = to3(L);
  const r = to3(R);

  mesh.position.copy(nose);

  const dir = new THREE.Vector3().subVectors(r, l);
  const yaw = Math.atan2(dir.x, Math.abs(z));
  mesh.rotation.set(0, yaw, 0);

  const earDist = l.distanceTo(r);
  const modelInner = 0.20;
  const s = THREE.MathUtils.clamp((earDist * 0.9) / modelInner, 0.5, 3.0);
  mesh.scale.setScalar(s);
}
