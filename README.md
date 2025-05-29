# 🏙️ CityCommerce-EJS

An Express.js + EJS e-commerce platform built as a final web development project.

## 🚀 Features

- 🛒 Product catalog with categories
- 🧾 Add to cart and checkout process
- 👤 User registration and login
- 🛠️ Admin dashboard for managing products and users
- 📄 Dynamic content rendering using EJS templates
- 📂 File upload (e.g. product images)
- 🌐 Clean and responsive Bootstrap UI

---

## 🧱 Project Structure

- `app.js` – Main Express server
- `routes/` – Express routing logic (user, admin, product)
- `views/` – EJS templates for UI rendering
- `public/` – Static assets (CSS, JS, images)
- `models/` – Data models (if using MongoDB / JSON / Local storage)
- `controllers/` – Application logic (optional)
- `package.json` – Project metadata and dependencies

---

## 🛠️ Technologies Used

- Node.js
- Express.js
- EJS
- Bootstrap 5
- (Optional) MongoDB or file-based storage
- Multer (for file uploads)
- Sessions (for user state)

---

## 🧪 How to Run Locally

```bash
# 1. Clone the project
git clone https://github.com/Hchakib/CityCommerce-EJS.git

# 2. Navigate to the folder
cd CityCommerce-EJS

# 3. Install dependencies
npm install

# 4. Run the application
node app.js
