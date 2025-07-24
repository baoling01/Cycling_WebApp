
# Cycling Web App

A responsive web application for sharing and voting on cycling tips.

## Features
- Submit cycling tips
- View latest tips
- Upvote/downvote tips
- Responsive design (Bootstrap)

## Tech Stack
- Node.js
- Express
- SQLite
- EJS
- Bootstrap

## Getting Started

1. **Install dependencies:**
   ```powershell
   npm install
   ```
2. **Start the server:**
   ```powershell
   npm start
   ```
3. **Access the app:**
   Open your browser and go to `http://localhost:3000`

## How It Works
- The backend (`index.js`) uses Express to serve the EJS template (`views/index.ejs`).
- Tips are stored in a local SQLite database (`cycling_tips.db`).
- Users can submit new tips and vote (up/down) on existing tips.
