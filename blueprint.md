# Application Blueprint

## Overview
A web-based Swimming Coach application designed to help users improve their swimming techniques.

## Project History & Features
- **Initial Setup**: Basic HTML/CSS/JS structure.
- **Features**: Workout Logger, Analysis (Simulated), Club System, User Profile.
- **Localization**: KO, EN, JP, CN support.
- **Personalization**: Age/Gender based planning, Training Terminology Guide.

## Current Implementation Plan
### Goal: Enhance Club Features (Logo Upload & Board)
- [ ] **Club Logo Upload**: 
    - Allow users to upload an image for the club logo instead of just selecting an emoji.
    - Handle image processing (Base64) and display (fallback to emoji).
- [ ] **Club Board**: 
    - Replace simulated "Share Record" with a real "Write Post" feature.
    - Implement a modal for writing posts.
    - Persist posts to LocalStorage per club.
    - Display posts in the feed with author and timestamp.

### Goal: Create Daily Swimming Coach Base
- [x] Update `index.html` with semantic structure.
- [x] Create `style.css` with swimming-themed color palette.
- [x] Implement basic interactivity in `main.js`.

### Goal: Implement Core Features
- [x] Workout Logger with LocalStorage.
- [x] Personal Records (PR) section.
- [x] **(Real)** AI Precision Analysis (MediaPipe Integration):
    - [x] Real video upload and preview.
    - [x] **(New)** Pose Estimation:
        - [x] Integrate `@mediapipe/pose` and `@mediapipe/drawing_utils`.
        - [x] Real-time skeletal tracking on uploaded video.
    - [x] **(New)** Stroke Classification Logic:
        - [x] Symmetric (Breast/Fly) vs Asymmetric (Free/Back) detection.
    - [x] **(New)** Stroke Counting & Metrics:
        - [x] Calculate stroke cycles based on wrist/shoulder Y-coordinates.
        - [x] Real-time stroke rate display.
        - [x] **(Enhanced)** Chart.js integration for real-time Pace Graph (Stroke Rate vs Time).
    - [x] **(Enhanced)** Form Correction Feedback:
        - [x] Vector Angle Analysis (Shoulder-Elbow-Wrist).
        - [x] Visual Feedback: Color-coded overlay (Green=Good, Red=Bad) for High Elbow Catch.
    - [x] **(Advanced)** Multi-Lane Analysis (Hybrid).
    - [x] **(Advanced)** Accurate Recording Logic.
    - [x] **(Advanced)** Audio-Synchronized Start.
    - [x] Playback speed control.
    - [x] Dynamic AI Coaching report based on metrics.

### Goal: Community & Social Features
- [x] Club System (Join/Leave, Public/Private).
- [x] Team Leaderboard.
- [x] **(In Progress)** Custom Logo & Real Board Posts.

### Goal: User Profile & Persistence
- [x] User Profile (Nickname, Level, Goal, Age, Gender).
- [x] Personalized Daily Plans.
- [x] Training Terminology Guide.