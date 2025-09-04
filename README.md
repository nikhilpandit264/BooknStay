# BooknStay 🏨✈️🎫

A full-stack web app for discovering and sharing stays, built with **Node.js**, **Express**, **MongoDB**, **EJS**, and **Cloudinary** for image uploads.

🔗 **Live Demo:** [BooknStay](https://booknstay-qoa5.onrender.com/listings)

---

## ✨ Features

- 🔑 User authentication (sign up / login / logout)
- 🏠 Add, edit, delete **listings**
- ⭐ Leave and manage **reviews**
- 🖼️ Image uploads (Cloudinary + Multer)
- ✅ Form validation with Joi
- 💬 Flash messages & error handling
- 📱 Responsive EJS templates
- 🗺️ (Optional) Mapbox integration for geolocation

---

## 🧰 Tech Stack

- **Backend:** Node.js, Express
- **Database:** MongoDB + Mongoose
- **Templating:** EJS
- **Authentication:** express-session
- **File Uploads:** Multer + Cloudinary
- **Validation:** Joi
- **Deployment:** Render

---

## 📁 Project Structure
BooknStay/
├─ controllers/ # Route logic
├─ models/ # Mongoose schemas
├─ routes/ # Express routers
├─ views/ # EJS templates
├─ public/ # Static files
├─ utils/ # Helpers (error handling, etc.)
├─ app.js # Main entry point
├─ cloudConfig.js # Cloudinary setup
├─ schema.js # Joi validation schemas
└─ package.json

PORT=3000
NODE_ENV=development
SESSION_SECRET=your_secret_key

# Database
MONGO_URL=mongodb://127.0.0.1:27017/booknstay
# Or MongoDB Atlas connection string

# Cloudinary
CLOUD_NAME=your_cloud_name
CLOUD_API_KEY=your_cloudinary_key
CLOUD_API_SECRET=your_cloudinary_secret

# Mapbox (optional)
MAP_TOKEN=your_mapbox_token
# Development (if nodemon is installed)
npm run dev

# Or standard start
npm start
