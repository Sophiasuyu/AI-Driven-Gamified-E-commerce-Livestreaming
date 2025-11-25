# AI-Driven Gamified E-commerce Livestreaming
**Author: Suyu Lu**

**Student ID: 24000975**

**Institution: University of the Arts London**

**Department: Creative Computing Institute**

**Degree Programme: MSc Computing and Creative Industry (Modular)**


This repository hosts my Master’s dissertation project, exploring how AI-driven interaction, AR try-on, and gamification mechanics shape user experience, engagement, and trust in contemporary livestream commerce. It combines technical prototypes, research artifacts, and documentation used throughout the development and study process.

## Project Overview  

Modern e-commerce live streaming platforms exhibit conversion rates heavily reliant upon the personal charisma of hosts, discounts, brand influence, and emotionally driven interactive mechanisms. This is accompanied by high return rates following the subsidence of impulse purchases, which presents significant instability for merchants and creates an imbalance of power for hosts, requiring them to deliver high-intensity emotional value.

This work fulfils the assessment requirements outlined by UAL CCI’s Creative Making: MSc Advanced Project brief, including code publication, development documentation, and creative & technical reflection.



#### So this project investigates:

1. How AR try-on alters users' perceptions of product authenticity and appeal

2. How gamification loops (missions, rewards, interactive cues) influence engagement

3. How AI-driven prompts (automatic recommendations, product rankings, adaptive interfaces) reshape audience agency

4. How these computational systems impact user trust, agency, and purchase intention

By combining interaction design, computational creativity, and e-commerce behaviour studies, this project examines how technologically mediated “co-creation” between platform and user transforms the livestream shopping experience.


#### The project contains:

1. AR Try-On MVP: Built with MediaPipe, JavaScript, Three.js, and Vite; Simulating AR jewellery try-on functionality within e-commerce livestreaming scenarios

2. Research documentation: Design workflows, milestone reports (Weekly development weblogs), inspiration boards, system diagrams

3. Prototypes and tools: Including data processing scripts, early testing iterations, and other technical explorations

4. A final written thesis (PDF submitted on Moodle)

5. A project demo video



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
└── thesis

```



## Try-On MVP (Final Prototype)

Location:
`prototypes/tryon-mvp/`

This is the primary deliverable of the technical build: a browser-based AR try-on environment simulating a livestream shopping interface.


### Features

* **AR face jewellery try-on** using MediaPipe Face Landmarker (478 points)
* **AR hand / bracelet try-on** using MediaPipe Hand Landmarker (21 landmarks)
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

The following records my weekly progress of major development milestones.


### Week 1  Research Setup & Technical Investigation

* Literature review: gamification, AI UX, livestream commerce
* Tested MediaPipe face tracking and hand landmarks
* Defined project scope and technical feasibility

This week was mostly about grounding the project. I went through papers and articles on gamification, AI-driven UX, and livestream commerce, trying to understand what emotional engagement actually means in a shopping context.

I also spent quite a bit of time experimenting with MediaPipe face tracking and hand landmarks to check what’s feasible in a browser environment. The tests helped define what was technically realistic for the final prototype.

By the end of the week, I had a clearer project scope, a draft of the system diagram, and a pretty good sense of how the whole pipeline should work.


### Week 2  First AR Try-On Demo

* Implemented basic face tracking
* Built initial overlay alignment
* Set up Vite environment and file structure
* Designed livestream UI mock-up

This week I pushed toward getting a first working AR demo. I set up the Vite environment, organised the file structure, and got basic face tracking running smoothly.

I managed to build the initial overlay alignment for accessories, even though it was still rough. At the same time, I mocked up the livestream UI layout to understand how the try-on and the commercial interface would sit together visually.

Overall, this was the first time the project started to look real (although it's not good enough).


### Week 3  Interaction & Gamification Layer

* Added chatbox, fake comments, and UI actions
* Added add-to-cart drawer and thumbnail preview
* Implemented jitter smoothing for stable fitting
* Recorded early demonstration video

This week was about making the prototype feel like an actual livestream experience instead of just a tracking demo.

I added the chatbox, a stream of fake comments, small UI interactions, and even an add-to-cart drawer with thumbnail previews.

Since the tracking was wired, I tried a smoothing function to stabilise accessory movement which made a big difference.

By the end of the week, the first mini demo video was recorded. It still looked early-stage, but the core interaction loop was finally there.



### Week 4  Multi-modal Try-On

* Added hand-based try-on (bracelet / ring simulation)
* Integrated multiple 3D assets
* Added host background video and timed events

This week I explored how to add more ways of interacting with the system. I extended the pipeline to support hand-based try-on, and started integrating multiple 3D assets so users could switch items more naturally.

I also added the host background video and a few timed UI events, making the whole thing feel closer to a real livestream show.


### Week 5  Documentation & Refinement

* Cleaned code structure and wrote documentation
* Organised repository into `docs` and `prototypes`
* Prepared the MVP for dissertation submission

This week was about polishing everything.

I cleaned up the project structure, reorganised the repo into docs and prototypes, updated comments, and wrote all the necessary explanations for submission.

This was also the week the MVP became stable enough for dissertation integration.
All the final checks, screenshots, and notes were completed here.




## Future Work

In the next stage, the project will focus on expanding both the interaction layer and the technical realism of the AR try-on system. 

Planned enhancements include: introducing advanced gesture-based interactions (such as swipe gestures for switching items), developing emotion-aware recommendation prompts that respond to users’ affective states, and improving visual fidelity through HDRI-based lighting and PBR materials for more realistic 3D jewellery rendering. 

On the system side, upcoming work involves building a backend service for user behaviour logging, enabling long-term engagement analysis, and integrating user testing data into adaptive UI logic, allowing the interface to evolve and personalise itself based on real user behaviour patterns.

But yeah, overall, I’m satisfied with how this project turned out. I hope you enjoy experiencing it as much as I enjoyed building it, and I’d love to hear any suggestions or thoughts you may have:)


