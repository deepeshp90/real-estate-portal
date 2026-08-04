# 🏠 Real Estate Property Management Portal

A full-stack MERN (MongoDB, Express.js, React.js, Node.js) web application that allows users to buy, sell, rent, and manage real estate properties online — complete with image uploads, secure authentication, advanced search filters, and interactive map-based geolocation.

---

## ✨ Features

- 🔐 **Secure Authentication** – Email/password sign-up & sign-in with JWT, plus Google OAuth login
- 🏘️ **Property Listings** – Create, update, and delete listings with full details (price, bedrooms, bathrooms, type, amenities)
- 🖼️ **Image Uploads** – Multiple property images stored via Cloudinary
- 🔍 **Advanced Search & Filters** – Filter by rent/sale, price, amenities (parking, furnished), and offers
- 📍 **Geolocation & Interactive Maps** – Property addresses are geocoded (via OpenStreetMap Nominatim API) and displayed on an interactive map (Leaflet.js) with a location pin
- 👤 **User Profiles** – Manage account details, view and manage your own listings
- 📩 **Contact System** – Directly contact property owners from the listing page
- 📱 **Fully Responsive** – Optimized for both desktop and mobile devices

---

## 🛠️ Tech Stack

**Frontend:** React.js, Redux Toolkit, React Router, Tailwind CSS, React-Leaflet  
**Backend:** Node.js, Express.js  
**Database:** MongoDB (Mongoose)  
**Authentication:** JWT, Google OAuth (Firebase)  
**Image Storage:** Cloudinary  
**Maps & Geolocation:** OpenStreetMap + Leaflet.js (Nominatim Geocoding API)

---

## 📂 Project Structure

RealState/
├── api/ # Backend (Express + MongoDB)
│ ├── controllers/
│ ├── models/
│ ├── routes/
│ ├── utils/
│ └── index.js
├── client/ # Frontend (React + Vite)
│ ├── src/
│ │ ├── components/
│ │ ├── pages/
│ │ ├── redux/
│ │ └── App.jsx
│ └── package.json
├── .env # Environment variables (not committed)
└── package.json


---

## ⚙️ Installation & Setup

### 1. Clone the repository
```bash
git clone https://github.com/your-username/repo-name.git
cd repo-name
```

### 2. Install backend dependencies
```bash
npm install
```

### 3. Install frontend dependencies
```bash
cd client
npm install
cd ..
```

### 4. Set up environment variables

Create a `.env` file in the root directory:


MONGO=your_mongodb_connection_string
JWT_SECRET=your_jwt_secret_key

Create a `.env` file inside `client/`:

VITE_FIREBASE_API_KEY=your_firebase_api_key
### 5. Run the application
```bash
npm run dev
```

The app will be available at `http://localhost:5173`

---

## 📍 Geolocation Feature

When creating or updating a listing, users can click **"Locate on Map"** after entering an address. The app uses the free **OpenStreetMap Nominatim API** to convert the address into latitude/longitude coordinates, then displays a preview map. On the listing detail page, an interactive map shows the exact property location using **Leaflet.js**.

---

## 👨‍💻 Author

**Deepesh**  
MCA Student | Full Stack Development with AI

---

## 📄 License

This project is created for academic/internship purposes.
