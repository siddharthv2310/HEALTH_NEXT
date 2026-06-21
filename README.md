## Live Links

### User Website
https://health-next-iw4c.vercel.app/

### Admin Panel
https://healthnest-admin-panel.vercel.app/admin-login

### Backend API
https://healthnest-backend-g62t.onrender.com

## 👨‍💻 Author

Siddharth Verma

B.Tech CSE | NIT Patna

GitHub: https://github.com/siddharthv2310
----

# 🏥 HealthNest

HealthNest is a full-stack healthcare appointment booking platform built using the MERN stack. It enables patients to book appointments with doctors, manage profiles, make online payments, and interact with an AI-powered healthcare assistant. The platform also provides dedicated Admin and Doctor dashboards for efficient management.

## 🚀 Features

### 👤 Patient Features

* User Registration & Login
* Google OAuth Authentication
* Book Doctor Appointments
* Cancel Appointments
* View Upcoming & Cancelled Appointments
* Razorpay Payment Integration
* Profile Management
* Forgot Password with OTP Verification
* AI Healthcare Assistant (HealthNest AI)

### 👨‍⚕️ Doctor Features

* Secure Doctor Login
* Doctor Dashboard
* Manage Availability
* View Appointments
* Complete Appointments
* Cancel Appointments
* Update Profile & Image

### 🛠️ Admin Features

* Secure Admin Authentication
* Add Doctors
* Manage Doctor Availability
* View All Doctors
* View All Appointments
* Dashboard Analytics
* Monitor Platform Activity

### 🤖 HealthNest AI

* Doctor Discovery
* Doctor Availability Checking
* Appointment Booking via Natural Language
* Appointment Cancellation via Natural Language
* Symptom-Based Doctor Recommendations
* Slot Suggestions
* Conversational Appointment Management

---

## 🏗️ Tech Stack

### Frontend

* React.js
* Vite
* Tailwind CSS
* React Router
* Axios

### Backend

* Node.js
* Express.js
* MongoDB
* Mongoose
* JWT Authentication

### AI Integration

* Google Gemini 2.5 Flash

### Authentication

* JWT
* Google OAuth

### Payments

* Razorpay

### Cloud Services

* Cloudinary (Image Storage)
* MongoDB Atlas

---

## 📂 Project Structure

```text
HealthNest
│
├── Backend
│   ├── controllers
│   ├── routes
│   ├── models
│   ├── services
│   ├── middlewares
│   └── utils
│
├── frontend
│   ├── src
│   ├── components
│   ├── pages
│   └── context
│
├── admin
│   ├── src
│   ├── pages
│   └── context
│
└── README.md
```

---

## 🔐 Authentication

* JWT Based Authentication
* Google OAuth Login
* Role-Based Access Control

  * User
  * Doctor
  * Admin

---

## 💳 Payment Gateway

HealthNest integrates Razorpay for secure appointment payments.

Features:

* Create Orders
* Payment Verification
* Appointment Payment Tracking

---

## 🤖 AI Appointment Assistant

HealthNest AI helps users:

* Find doctors
* Check doctor availability
* Book appointments
* Cancel appointments
* Get doctor recommendations based on symptoms
* Suggest nearest available slots

Powered by Google Gemini.

---

## 📦 Installation

### Clone Repository

```bash
git clone https://github.com/siddharthv2310/HEALTH_NEXT.git
cd HEALTH_NEXT
```

### Backend

```bash
cd Backend
npm install
npm run server
```

### Frontend

```bash
cd frontend
npm install
npm run dev
```

### Admin Panel

```bash
cd admin
npm install
npm run dev
```

---

## ⚙️ Environment Variables

### Backend

Create a `.env` file inside the Backend folder:

```env
MONGODB_URI=
JWT_SECRET=

ADMIN_EMAIL=
ADMIN_PASSWORD=

CLOUDINARY_NAME=
CLOUDINARY_API_KEY=
CLOUDINARY_SECRET_KEY=

GOOGLE_CLIENT_ID=

RAZORPAY_KEY_ID=
RAZORPAY_KEY_SECRET=

GEMINI_API_KEY=

CURRENCY=INR
```

### Frontend

```env
VITE_BACKEND_URL=
VITE_RAZORPAY_KEY_ID=
VITE_GOOGLE_CLIENT_ID=
```

---

## 📈 Future Enhancements

* Real-Time Notifications
* Video Consultations
* Prescription Management
* Medical Records Storage
* AI Health Insights
* Multi-Language Support

---


## ⭐ If you found this project useful, consider giving it a star.
