# CAT 2026 Preparation Portal

A premium, interactive web application tailored for candidates preparing for the Common Admission Test (CAT) 2026. Built with React, it features a unified preparation dashboard, a dynamic syllabus checklist, and an AI-assisted vocabulary builder.

## Core Features

- **Personalized Daily Dashboard**: Tracks progress dynamically and displays a daily countdown HUD to the exam.
- **Syllabus Tracker**: A comprehensive, interactive checklist covering all key sections of the CAT syllabus:
  - **Quantitative Aptitude (Quant)**
  - **Data Interpretation & Logical Reasoning (DILR)**
  - **Verbal Ability & Reading Comprehension (VARC)**
- **Verbal Prep HUD**: Integrates a vocabulary builder card and a Reading Comprehension practice arena.
- **Gemini AI Integration**: Uses the Gemini API for dynamically generating high-quality context and personalized practice queries.

## Tech Stack

- **Frontend**: React (v19)
- **Styling**: Rich, custom-themed CSS (Parchment, Espresso, and Terracotta palette) with smooth micro-animations.
- **API Integration**: Gemini AI (via `REACT_APP_GEMINI_KEY` environment variable).

## Getting Started

### Prerequisites

Ensure you have [Node.js](https://nodejs.org/) installed.

### Installation

1. Install the dependencies:
   ```bash
   npm install
   ```

2. Create a `.env` file in the root directory and add your Gemini API Key:
   ```env
   REACT_APP_GEMINI_KEY=your_gemini_api_key_here
   ```

### Running the App

To run the application in development mode:
```bash
npm start
```
Open [http://localhost:3000](http://localhost:3000) to view it in your browser.

### Building for Production

To create an optimized production build:
```bash
npm run build
```
