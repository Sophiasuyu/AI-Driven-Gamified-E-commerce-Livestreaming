# AI-Driven Gamified E-commerce Livestreaming
**Author: Suyu Lu**
**Student ID: 24000975**
**Institution: University of the Arts London**
**Department: Creative Computing Institute**
**Degree Programme: MSc Computing and Creative Industry (Modular)**


This repository hosts my Master’s dissertation project, exploring how AI-driven interaction, AR try-on, and gamification mechanics shape user experience, engagement, and trust in contemporary livestream commerce.
It combines technical prototypes, research artifacts, and documentation used throughout the development and study process.

## Project Overview  

Modern e-commerce live streaming platforms exhibit conversion rates heavily reliant upon the personal charisma of hosts, discounts, brand influence, and emotionally driven interactive mechanisms. This is accompanied by high return rates following the subsidence of impulse purchases, which presents significant instability for merchants and creates an imbalance of power for hosts, requiring them to deliver high-intensity emotional value.



#### So this project investigates:

1. How AR try-on alters users' perceptions of product authenticity and appeal

2. How gamification mechanisms (tasks, badges, rewards, interaction loops) influence attention and purchasing behaviour

3. How AI-driven prompts (automatic recommendations, product rankings, adaptive interfaces) reshape audience agency

4. How these systems transform the dynamic interplay of trust, engagement, and co-creation




#### The project contains:

1. Try-On MVP: Built with MediaPipe, JavaScript, Three.js, and Vite; Simulating AR jewellery try-on functionality within e-commerce livestreaming scenarios

2. Research documentation: Design workflows, milestone reports, inspiration boards, system diagrams

3. Prototypes and tools: Including data processing scripts, early testing iterations, and other technical explorations




## Repository Structure

```
AI-Driven-Gamified-E-commerce-Livestreaming/
│
├── README.md                 // We are here now
│
├── docs/                     // Research documentation & reference materials
│     ├── Milestone Report.pdf
│     ├── inspiration.png
│     ├── systemMap_1.png
│     ├── backendDemo.png
│     └── mobile1.png
│
├── prototypes/               // All prototypes built during the project
│     ├── tryon-mvp/         // Final working AR Try-On MVP
│     └── douyin_live_chat_to_csv.py
└──

```



## Try-On MVP (Final Prototype)

Location:
`prototypes/tryon-mvp/`

This MVP simulates a livestream shopping environment with:

### Features

* **AR face jewellery try-on** using MediaPipe Face Landmarker
* **AR hand / bracelet try-on** using MediaPipe Hand Landmarker
* **Livestream-style UI** with host video, live chat, and bullet comments
* **Basic gamification cues**, such as interaction loops and attention rewards
* **3D asset fitting** using custom calculations in `fit.js`
* **Add-to-cart interactions** mimicking e-commerce behaviour

###  Tech Stack

* JavaScript (ES6)
* MediaPipe Tasks Vision (face / hand)
* Three.js (3D model alignment)
* HTML / CSS
* Vite

### **▶ How to Run**

```bash
cd prototypes/tryon-mvp
npm install
npm run dev
```

[Open the printed local URL in Chrome and allow camera access]



## Other Prototypes & Tools

###  `douyin_live_chat_to_csv.py`

This is a lightweight script developed during the project's preliminary research phase, designed to extract Douyin live stream comments into structured CSV files. It facilitates early-stage data exploration and analysis of audience behaviour within e-commerce live streaming sessions.



## Project Progress Log

A simplified timeline of major development milestones.

### Week 1  Research Setup & Technical Investigation

* Literature review: gamification, AI UX, livestream commerce
* Tested MediaPipe face tracking and hand landmarks
* Defined project scope and technical feasibility

### Week 2  First AR Try-On Demo

* Implemented basic face tracking
* Built initial overlay alignment
* Set up Vite environment and file structure
* Designed livestream UI mock-up

### Week 3  Interaction & Gamification Layer

* Added chatbox, fake comments, and UI actions
* Added add-to-cart drawer and thumbnail preview
* Implemented jitter smoothing for stable fitting
* Recorded early demonstration video

### Week 4  Multi-modal Try-On

* Added hand-based try-on (bracelet / ring simulation)
* Integrated multiple 3D assets
* Added host background video and timed events

### Week 5  Documentation & Refinement

* Cleaned code structure and wrote documentation
* Organised repository into `docs` and `prototypes`
* Prepared the MVP for dissertation submission



## Future Work

In the next stage, the project will focus on expanding both the interaction layer and the technical realism of the AR try-on system. 

Planned enhancements include: introducing advanced gesture-based interactions (such as swipe gestures for switching items), developing emotion-aware recommendation prompts that respond to users’ affective states, and improving visual fidelity through HDRI-based lighting and PBR materials for more realistic 3D jewellery rendering. 

On the system side, upcoming work involves building a backend service for user behaviour logging, enabling long-term engagement analysis, and integrating user testing data into adaptive UI logic, allowing the interface to evolve and personalise itself based on real user behaviour patterns.

But yeah, overall, I’m genuinely happy with how this project turned out. I hope you enjoy experiencing it as much as I enjoyed building it, and I’d love to hear any suggestions or thoughts you may have:)


