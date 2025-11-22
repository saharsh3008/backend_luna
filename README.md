# Habit Tracker Backend

A simple Habit Tracker backend built using **Node.js**, **Express**, and **JSON file storage**, with an optional **AI habit suggestion feature** using Google Gemini API.  
A small `index.html` frontend is included to test the API.

---

## Features

- Add habits  
- List habits  
- Complete habits (streak increases)  
- Delete habits  
- Data stored in `data/habits.json`  
- AI endpoint to generate habit suggestions based on a goal  
- Simple HTML page for testing all endpoints  

---

## Setup

### 1. Install dependencies
npm install

shell
Copy code

### 2. Create `.env`
PORT=5000
DB_PATH=data/habits.json
GEMINI_API_KEY=YOUR_GEMINI_KEY_HERE # optional

shell
Copy code

### 3. Start server
npm start

arduino
Copy code

Server runs at:
http://localhost:5000

sql
Copy code

Check health:
http://localhost:5000/health

yaml
Copy code

---

## API Endpoints

### List habits  
GET /api/habits

shell
Copy code

### Create habit  
POST /api/habits
Body: { "name": "Drink Water" }

shell
Copy code

### Complete habit  
PATCH /api/habits/:id/complete

shell
Copy code

### Delete habit  
DELETE /api/habits/:id

shell
Copy code

### (Bonus) AI Habit Suggestions  
POST /api/suggest-habits
Body: { "goal": "get healthy" }

yaml
Copy code

---

## Frontend Testing

- Open `index.html` in your browser.  
- Make sure the backend is running.  
- You can:
  - Add habits  
  - Mark as complete  
  - Delete  
  - Generate AI-based habit ideas  

---

## File Structure

src/
app.js # server setup
config/index.js # env + config
controller/ # request handlers
models/ # file read/write
services/ # business logic + AI
routes/ # API routes
data/
habits.json # stored habits
index.html # simple UI
.env # environment variables
package.json # dependencies
