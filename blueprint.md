# Application Blueprint

## Overview
A web-based Swimming Coach application designed to help users improve their swimming techniques.

## Project History & Features
- **Initial Setup**: Basic HTML/CSS/JS structure (Hello World).
- **Version Control**: Connected to GitHub repository `https://github.com/wjdgns9752/SwimmingCoach.git`.

## Current Implementation Plan
### Goal: Create Daily Swimming Coach Base
- [x] Update `index.html` with semantic structure (Header, Hero, Features).
- [x] Create `style.css` with swimming-themed color palette and responsive layout.
- [x] Implement basic interactivity in `main.js`.
- [x] Ensure mobile responsiveness.

### Goal: Implement Core Features (Tracker & Analysis)
- [x] Implement "Workout Logger" (Distance, Time, Mood) with LocalStorage persistence.
- [x] Implement "Personal Records (PR)" section.
- [x] Create "Video Analysis" section with file upload UI.
- [x] Implement simulated video processing logic to display metrics (Breakout, Strokes, Breaths, Splits).

### Goal: Community & Social Features
- [ ] Fix Critical Bug: Navigation broken due to plan generation error.
- [ ] Implement "Swim Club" system (Join Club).
- [ ] Create "Team Leaderboard" to compare user records with (simulated) club members.
- [ ] Add Club tab to Navigation.

### Goal: User Profile & Persistence
- [x] Update Onboarding to collect Nickname + Level.
- [x] Persist User Profile (Nickname, Level) in LocalStorage as a single object.
- [x] Display Nickname in Dashboard greeting.
- [x] Allow editing Nickname and Level in Profile settings.

### Goal: UI/UX Overhaul
- [x] Implement SPA-style routing (show/hide sections based on hash) to replace vertical scrolling.
- [x] Redesign "Workout Logger" UI with cards, emojis for mood, and better spacing.
- [x] Add a Bottom Navigation Bar for mobile-app-like experience.

### History
#### Goal: Advanced Coaching & Analysis
- [x] Implement "Multi-lane Selection" in analysis results (Lane 1-8).
- [x] Add "AI Coaching Solution" card providing actionable advice based on metrics.
- [x] Create detailed "Workout Guide Modal" with specific sets/drills when clicking the daily plan.

### History
#### Goal: Advanced Video Analysis
- [x] Add UI for selecting Pool Length (25m/50m) and Event Type (Single/IM/Relay).
- [ ] Implement specialized analysis logic for IM (Stroke transitions) and Relays (Split times, Relay Takeover).
- [ ] Display detailed split tables corresponding to the selected event.

### Goal: Localization & Advanced User Management
- [x] Translate entire UI to Korean.
- [x] Implement "User Level Onboarding" screen (Beginner to Elite) with visual cards.
- [x] Update "Profile/Records" to support detailed competition logging (Event Name, Date, Result).
- [x] Customize Daily Plan based on selected user level.

### History
#### Goal: Enhance Features
- [x] Increase video upload limit text and logic to 500MB.
- [x] Implement "Smart Schedule Algorithm" to generate daily plans based on stored PRs and recent volume.
- [x] Update Dashboard UI to display the dynamic plan.

### History
#### Goal: Implement Core Features (Tracker & Analysis)
- [x] Implement "Workout Logger" (Distance, Time, Mood) with LocalStorage persistence.
