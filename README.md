# 🚀 CareerFlow: Job & Skill Development Platform

![CareerFlow Platform Overview](https://img.shields.io/badge/Status-Active_Development-brightgreen)
![Spring Boot](https://img.shields.io/badge/Spring_Boot-3.4.4-6DB33F?logo=spring-boot)
![React](https://img.shields.io/badge/React-18.x-61DAFB?logo=react)
![Gemini AI](https://img.shields.io/badge/AI_Powered-Gemini_2.5_Flash-8E75B2?logo=google)

CareerFlow is a next-generation, premium marketplace connecting ambitious talent with top-tier companies. It features a professional glassmorphism UI, an integrated learning management system (LMS) for skill development, and an advanced AI-driven resume parser.

---

## ✨ Core Features

*   **🧠 AI Resume Architect:** Automatically parses user CVs/Resumes (PDFs) using Google's `gemini-2.5-flash` model via LangChain4j. It extracts structured data (skills, experience, education) and synchronizes it directly to the user's database profile.
*   **💼 Intelligent Job Board:** Employers can post jobs, and candidates can apply. The platform streamlines the hiring process by sending candidate profiles directly to employer emails.
*   **🎓 Integrated Learning (Courses):** A built-in platform for upskilling. Administrators can publish professional development courses, and users can track their progress through interactive course roadmaps.
*   **🎨 Premium Glassmorphism UI:** A highly polished, responsive dark-mode interface built with Tailwind CSS and Framer Motion, providing an elite user experience.
*   **🔒 Secure Architecture:** Robust JWT-based authentication via Spring Security, ensuring that user data and employer communications remain private.

---

## 🛠️ Technology Stack

### Frontend
*   **Framework:** React (Vite)
*   **Styling:** Tailwind CSS
*   **Animations:** Framer Motion
*   **Icons:** Lucide React
*   **Networking:** Axios (with Interceptors for JWT handling)

### Backend
*   **Core:** Java 17, Spring Boot 3.4.4
*   **Database:** MySQL 8, Spring Data JPA / Hibernate
*   **Security:** Spring Security, JSON Web Tokens (JWT)
*   **AI Integration:** LangChain4j, Google Gemini API
*   **PDF Processing:** Apache PDFBox

---

## ⚙️ Local Development Setup

Follow these instructions to get a copy of the project up and running on your local machine.

### Prerequisites
*   Node.js (v18+)
*   Java Development Kit (JDK 17)
*   MySQL Server running on port 3306
*   A Google AI Studio API Key (for the resume parser)

### 1. Environment Configuration
Create a `.env` file in the **root** of the project directory (`/JobAndSkillDevelopmentPlatForm`) with the following variables:

```env
JWT_SECRET_KEY=your_very_long_secure_jwt_secret_key_here
SUPPORT_EMAIL=your_email@gmail.com
APP_PASSWORD=your_gmail_app_password
GOOGLE_CLIENT_ID=your_google_oauth_client_id
GEMINI_API_KEY=your_google_gemini_api_key
```
*(Note: The backend is configured to automatically load this file from the parent directory).*

### 2. Database Setup
Create a database in MySQL called `jobs`:
```sql
CREATE DATABASE jobs;
```
The application uses `spring.jpa.hibernate.ddl-auto=update`, so all tables will be generated automatically upon startup.

### 3. Running the Backend
The backend runs on **Port 8081** to prevent standard port conflicts.
```bash
cd backend
.\mvnw spring-boot:run
```

### 4. Running the Frontend
The frontend runs on **Port 5173**.
```bash
cd frontend
npm install
npm run dev
```

---

## 📂 Project Structure Highlights

*   `/backend/src/main/java/.../config/SecurityConfiguration.java`: Manages CORS, endpoint permissions, and the JWT filter chain.
*   `/backend/src/main/java/.../controller/AiController.java`: Handles PDF uploads and delegates to the AI service.
*   `/frontend/src/components/ai/AiResumeParser.jsx`: The premium React component responsible for file uploads, loading animations, and syncing data to the user profile.
*   `/frontend/src/service/axios.jsx`: Centralized network requests handling API base URLs (`localhost:8081`) and token injection.

---

## 🤝 Best Practices Implemented
*   **Port Conflict Avoidance:** Backend explicitly set to 8081.
*   **CORS Preflight Management:** Explicit `OPTIONS` methods allowed in Spring Security to support modern React applications.
*   **Centralized API Management:** Axios interceptors ensure no token logic is duplicated across UI components.
*   **Graceful AI Error Handling:** Structured prompts ensure Gemini returns consistent JSON schemas, mapped directly to Java DTOs.
