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
- [x] **(Enhanced)** AI Precision Analysis:
    - [x] Real video upload and preview.
    - [x] Simulated YOLO metrics (Stroke Count, DPS, Split times, SWOLF).
    - [x] Playback speed control (Slow-motion for detail analysis).
    - [x] Dynamic AI Coaching report based on metrics.

### Goal: Community & Social Features
- [x] Club System (Join/Leave, Public/Private).
- [x] Team Leaderboard.
- [x] **(In Progress)** Custom Logo & Real Board Posts.

### Goal: User Profile & Persistence
- [x] User Profile (Nickname, Level, Goal, Age, Gender).
- [x] Personalized Daily Plans.
- [x] Training Terminology Guide.