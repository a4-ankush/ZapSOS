# ⚡ ZapSOS – Emergency Alert System with AI Assistance

ZapSOS is a modern, full-stack emergency alert platform that enables **real-time reporting of emergencies** like road accidents, harassment, health issues, and fire hazards. It integrates **AI-powered suggestions** for message clarity and features **ZapAI Chat** for students to get instant help from an AI assistant. 

🌐 **Live Website:** [https://zap-sos.vercel.app](https://zap-sos.vercel.app)

---

## 🚀 Features

- 📍 Real-time Emergency Alert System with **Geo-location**
- 🔐 Secure Authentication (Admin & Student)
- 🧠 **AI Suggestions** for alert messages (Admin Dashboard)
- 💬 **ZapAI Chat** – Smart AI assistant for students
- 🗺️ Map Integration using **Leaflet** for location-based tracking
- 🧭 Role-based dashboards (Admin / Student)
- ☁️ Alerts stored in **MongoDB** with live update via **Socket.io**
- 🎨 Beautiful dark-themed responsive UI using **TailwindCSS**

---

## 🧠 AI-Powered Features

- 🧾 Smart auto-suggestions for emergency messages 
- 🤖 ZapAI Chat: Ask questions and get instant answers
- ✨ Admins receive enhanced, auto-suggested summaries for every alert

---

## 🧩 Tech Stack

**Frontend**  
- React.js  
- Tailwind CSS  
- Axios  
- Leaflet.js  
- Google Gemini AI (ZapAI Chat + Alert Suggestion)

**Backend**  
- Node.js  
- Express.js  
- MongoDB & Mongoose  
- Socket.IO  
- JWT (Cookies Based Auth)  
- dotenv, bcryptjs, passport (for optional Google login)

---

## 📁 Project Structure

```bash
ZapSOS/
│
├── client/                  # React Frontend (TailwindCSS + Leaflet)
│   ├── public/
│   ├── src/
│   │   ├── Fonts/
│   │   ├── Logo/
│   │   ├── landing_pages/
│   │   ├── App.js
│   │   ├── Footer.js
│   │   ├── Navbar.js
│   │   ├── PagenotFound.js
│   │   ├── index.js / index.css
│   │   └── ProtectedRoute.js
│
├── server/                 # Node.js + Express Backend
│   ├── config/             # Passport strategy
│   ├── controllers/        # AI Chat, Alerts, Auth logic
│   ├── middleware/         # Auth middleware
│   ├── models/             # MongoDB schemas
│   ├── routes/             # API endpoints
│   └── server.js
│
├── .env                    # Environment variables
└── README.md
```
---

## ⚙️ Installation Instructions (Local Setup)

# Clone the repository
```
git clone https://github.com/your-username/zapsos.git
cd zapsos
```
# Install server dependencies
```
cd server
npm install
```
# Create a .env file in the server folder with the following:
```
# Replace values with your actual configuration
PORT=8000
MONGO_URL=your_mongodb_uri
JWT_SECRET=your_jwt_secret
```
# (Optional)
```
Add GOOGLE_CLIENT_ID and GOOGLE_CLIENT_SECRET if using Google Auth

GOOGLE_CLIENT_ID=your_google_client_id
GOOGLE_CLIENT_SECRET=your_google_client_secret
FRONTEND_URL=https://zap-sos.vercel.app
```
# Start the backend server
```
npm start
```
# Open a new terminal and install client dependencies
```
cd ../client
npm install
```
# Start the React frontend
```
npm start
```

---

## 🛡️ Security & Auth
- Cookie-based JWT Auth (7-day persistent login)
- Protected routes using middleware
- Role-based UI logic

---

## 🧪 Testing Features

- Login as Student or Admin
- Send SOS with location
- Admin views alerts in real-time on map
- Mark alerts as resolved
- Try AI suggestion + ZapAI Chat

---

## 📜 License
- This project is licensed under the MIT License.
  
---

## 🙌 Acknowledgements
- OpenStreetMap & Leaflet
- Google Gemini (for AI)
- Render & Vercel for deployment

---
## 📬 Contact
- For queries or collaboration, feel free to connect via GitHub or raise an issue.

- Built with 💻 by Ankush Kajla — Empowering safety through smart tech.

---

