# 🚀 Job & Skill Development Platform

[![Spring Boot](https://img.shields.io/badge/Backend-Spring%20Boot-6DB33F?style=for-the-badge&logo=springboot&logoColor=white)](https://spring.io/projects/spring-boot)
[![React](https://img.shields.io/badge/Frontend-React-61DAFB?style=for-the-badge&logo=react&logoColor=black)](https://reactjs.org/)
[![MySQL](https://img.shields.io/badge/Database-MySQL-4479A1?style=for-the-badge&logo=mysql&logoColor=white)](https://www.mysql.com/)
[![Tailwind CSS](https://img.shields.io/badge/Styling-Tailwind%20CSS-38B2AC?style=for-the-badge&logo=tailwindcss&logoColor=white)](https://tailwindcss.com/)

A premium, state-of-the-art job portal and skill development platform designed for modern recruitment and career growth. Featuring an intelligent Admin Control Center, real-time job tracking, and seamless Google OAuth integration.

---

## ✨ Key Features

### 🏢 For Employers & Admins
- **Admin Control Center**: A centralized dashboard to manage all job vacancies and applications with real-time stats.
- **Job Approval Workflow**: Robust system to Approve, Reject, or Delete job postings to maintain platform quality.
- **Bento-Style Dashboard**: Modern, high-performance UI showing Total, Pending, and Approved job counts.
- **Secure Job Posting**: Intuitive multi-step form for creating detailed job vacancies.

### 👤 For Job Seekers
- **Featured Opportunities**: Discover top-rated jobs on a beautifully animated, high-conversion homepage.
- **Interactive Job Applications**: Apply for jobs with a custom cover letter through a premium, glassmorphism modal.
- **Application Tracking**: (Coming Soon) Track the status of your applications from "Pending" to "Accepted."
- **Role-Based Navigation**: Dynamic interface that adapts based on whether you are a job seeker or an administrator.

### 🛡️ Core Capabilities
- **Google OAuth 2.0**: Secure, one-click login and signup using Google accounts.
- **JWT Authentication**: Stateless, secure communication between frontend and backend.
- **Modern Animations**: Powered by **Framer Motion** for a fluid, premium user experience.
- **Glassmorphism UI**: High-end visual design with dark mode support and interactive elements.

---

## 🛠️ Technology Stack

### Backend
- **Java 17** with **Spring Boot 3**
- **Spring Security** (JWT + OAuth2)
- **Spring Data JPA** (Hibernate)
- **MySQL Database**
- **Maven** for dependency management

### Frontend
- **React 18** with **Vite**
- **Tailwind CSS** for premium styling
- **Framer Motion** for world-class animations
- **React Hot Toast** for real-time notifications
- **Axios** for API communication
- **React Router 6** for navigation

---

## 🚀 Getting Started

### Prerequisites
- JDK 17 or higher
- Node.js (v18+)
- MySQL Server
- Google Cloud Console Project (for OAuth)

### 1. Backend Setup
1. Navigate to the `backend` folder.
2. Create an `application.properties` or `.env` file with your database credentials:
   ```properties
   spring.datasource.url=jdbc:mysql://localhost:3306/job_portal
   spring.datasource.username=YOUR_USERNAME
   spring.datasource.password=YOUR_PASSWORD
   security.jwt.secret-key=YOUR_64_CHAR_SECRET
   security.jwt.expiration-time=3600000
   ```
3. Run the application:
   ```bash
   mvn spring-boot:run
   ```

### 2. Frontend Setup
1. Navigate to the `frontend` folder.
2. Install dependencies:
   ```bash
   npm install
   ```
3. Create a `.env` file:
   ```env
   VITE_API_BASE_URL=http://localhost:8080
   VITE_GOOGLE_CLIENT_ID=YOUR_GOOGLE_CLIENT_ID
   ```
4. Start the development server:
   ```bash
   npm run dev
   ```

---

## 🎨 Visual Preview

| Homepage Hero | Admin Dashboard |
| :---: | :---: |
| ![Hero](https://via.placeholder.com/400x250?text=Premium+Hero+Section) | ![Dashboard](https://via.placeholder.com/400x250?text=Admin+Control+Center) |

---

## 🤝 Contributing
Contributions are welcome! If you have suggestions for new features or improvements, feel free to open an issue or submit a pull request.

1. Fork the Project
2. Create your Feature Branch (`git checkout -b feature/AmazingFeature`)
3. Commit your Changes (`git commit -m 'Add some AmazingFeature'`)
4. Push to the Branch (`git push origin feature/AmazingFeature`)
5. Open a Pull Request

---

## 📄 License
Distributed under the MIT License. See `LICENSE` for more information.

---

<p align="center">
  Built with ❤️ by Vidus Halakshan
</p>
