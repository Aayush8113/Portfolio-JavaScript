# 🚀 Professional MERN Portfolio

A high-performance, full-stack portfolio application built with the **MERN Stack** (MongoDB, Express, React, Node.js). Designed for scalability, security, and a "pure smooth" user experience using serverless architecture optimizations.

## 🏗 Architecture & Features

### **Frontend (Client)**
* **Framework:** React + Vite (Fast Build Tool)
* **Animations:** Framer Motion (Page transitions, Magnetic Cursors)
* **Styling:** Tailwind CSS
* **Performance:**
    * **Lazy Loading:** Route-splitting to reduce initial bundle size.
    * **Error Boundaries:** Prevents white-screen crashes.
    * **Axios Interceptors:** Centralized error handling and response unwrapping.
    * **Custom Cursors:** Physics-based interactions using `useSpring`.

### **Backend (API)**
* **Runtime:** Node.js (Express) optimized for **Vercel Serverless**.
* **Database:** MongoDB Atlas (Mongoose) with **Connection Caching**.
* **Security:**
    * **Helmet:** Secure HTTP Headers.
    * **Rate Limiting:** DDoS/Spam protection for API routes.
    * **XSS Sanitization:** Inputs are stripped of malicious scripts.
    * **CORS:** Smart origin handling for Vercel & Localhost.
* **Utilities:** `nodemailer` for contact form handling.

---

## 🛠 Installation & Setup

### 1. Clone the Repository
```bash
git clone <your-repo-url>
cd your-project-folder