# BooknStay 🏨✈️

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
BooknStay/<br>
├─ controllers/ # Route logic<br>
├─ models/ # Mongoose schemas<br>
├─ routes/ # Express routers<br>
├─ views/ # EJS templates<br>
├─ public/ # Static files<br>
├─ utils/ # Helpers (error handling, etc.)<br>
├─ app.js # Main entry point<br>
├─ cloudConfig.js # Cloudinary setup<br>
├─ schema.js # Joi validation schemas<br>
└─ package.json
