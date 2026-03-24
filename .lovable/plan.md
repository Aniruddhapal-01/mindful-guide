

# Mental Wellness Web Application

## Overview
A modern, responsive Mental Wellness Assistant that helps users assess well-being, track mood, analyze relationship health, and get personalized suggestions. All content framed as general wellness guidance with mandatory disclaimers.

## Pages & Navigation
- **Home** — Hero section with app overview, disclaimer banner, quick-access cards to each feature
- **Assessment** — GAD-7 (anxiety) & PHQ-9 (depression) inspired questionnaires with scored results
- **Relationship Check** — Relationship health questionnaire with categorized results
- **Dashboard** — Mood tracker with daily logging and visual trends

## Core Features

### 1. Mental Health Self-Assessment
- Step-by-step questionnaire (0–3 scale per question) for anxiety and depression
- Animated progress bar showing completion
- Results page with score, category (Low/Moderate/High), friendly explanation, and tailored suggestions
- Emergency banner for high-distress scores with helpline placeholders

### 2. Smart Recommendations
- Dynamic suggestion cards based on score level:
  - **Low** → Relaxation tips, breathing exercises
  - **Moderate** → Lifestyle improvements, journaling, sleep habits
  - **High** → Professional help prompt + all suggestions
- Categories: Breathing, Meditation, Journaling, Sleep, Physical Activity

### 3. Relationship Health Checker
- Questions on communication, trust, conflict frequency
- Results: Healthy / Needs Attention / Potentially Toxic
- Red flag indicators, communication tips, and simple advice cards

### 4. Mood Tracker Dashboard
- Daily mood logging (Happy, Sad, Stressed, Neutral, Anxious) with emoji selection
- Data stored in localStorage
- Visual mood trend chart using Recharts (line/bar chart over time)
- Mood history list with date entries

### 5. Emergency / Safety Feature
- Auto-triggered warning when high distress detected
- Persistent disclaimer on home and results pages
- Helpline placeholder section

## Design
- Soft pastel color palette (calming blues, greens, lavender)
- Card-based layout with rounded corners and subtle shadows
- Smooth page transitions and animated score reveals
- Fully responsive (mobile-first)
- Dark mode toggle in navbar

## Bonus Features
- Dark mode toggle
- Simple rule-based chatbot UI for quick wellness tips
- Animated progress bars for assessment scores
- Personalized suggestion cards based on specific answers

