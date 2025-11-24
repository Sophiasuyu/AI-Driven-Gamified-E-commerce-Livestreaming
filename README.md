# AI-Driven Gamified E-commerce Livestreaming
**MSc Dissertation Project: Creative Computing Institute (UAL CCI)**
**Author: Suyu Lu **

This repository hosts my Master’s dissertation project, exploring how AI-driven interaction, AR try-on, and gamification mechanics shape user experience, engagement, and trust in contemporary livestream commerce.
It combines technical prototypes, research artifacts, and documentation used throughout the development and study process.

## Project Overview  

Modern e-commerce live streaming platforms exhibit conversion rates heavily reliant upon the personal charisma of hosts, discounts, brand influence, and emotionally driven interactive mechanisms. This is accompanied by high return rates following the subsidence of impulse purchases, which presents significant instability for merchants and creates an imbalance of power for hosts, requiring them to deliver high-intensity emotional value.



So this project investigates:

1. How AR try-on alters users' perceptions of product authenticity and appeal

2. How gamification mechanisms (tasks, badges, rewards, interaction loops) influence attention and purchasing behaviour

3. How AI-driven prompts (automatic recommendations, product rankings, adaptive interfaces) reshape audience agency

4. How these systems transform the dynamic interplay of trust, engagement, and co-creation



**The project comprises:**

1. Try-On MVP

Built with MediaPipe, JavaScript, Three.js, and Vite;

Simulating AR jewellery try-on functionality within e-commerce livestreaming scenarios


2. Research documentation
Design workflows, milestone reports, inspiration boards, system diagrams

3. Prototypes and tools
Including data processing scripts, early testing iterations, and other technical explorations


---

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

```

---


## Try-On MVP (Final Prototype)

Location:
`prototypes/tryon-mvp/`

This MVP simulates a livestream shopping environment with:

### ** Features**

* **AR face jewellery try-on** using MediaPipe Face Landmarker
* **AR hand / bracelet try-on** using MediaPipe Hand Landmarker
* **Livestream-style UI** with host video, live chat, and bullet comments
* **Basic gamification cues**, such as interaction loops and attention rewards
* **3D asset fitting** using custom calculations in `fit.js`
* **Add-to-cart interactions** mimicking e-commerce behaviour

### ** Tech Stack**

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

Open the printed local URL in Chrome and allow camera access.


---

## Research Components

All conceptual work, diagrams, and written artifacts used in the dissertation process are stored in `/docs`.
This includes:

* User journey diagrams
* System architecture
* Visual inspiration
* Milestone reports
* Technical workflow references

These documents support the theoretical analysis in the dissertation.

---


## Other Prototypes & Tools

###  `douyin_live_chat_to_csv.py`

A lightweight script for extracting Douyin livestream comments into structured CSV files.
Used during early data exploration and behavioural analysis.

More prototypes will be added as the project evolves.

---


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


---

## Future Work

* Advanced gesture interactions (swipe to switch items)
* Emotion-aware recommendation prompts
* More realistic 3D jewellery rendering (HDRI + PBR materials)
* Backend service for user behaviour logging
* Integrating user testing data into adaptive UI logic


---

## Acknowledgements

* Creative Computing Institute (UAL)
* MediaPipe (Google)
* Three.js Community
* Mentors and participants involved in user testing


