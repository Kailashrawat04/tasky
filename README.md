# 🧠 Tasky – Intelligent Workflow & Task Orchestration System

---
## 🎯 Overview

**Tasky** is a full-stack Task Management Web Application built using the MERN Stack (MongoDB, Express, React, Node.js).

It helps individuals and teams organize, track, and manage tasks efficiently through a centralized dashboard.

Users can create tasks, monitor progress, manage users, and visualize productivity through interactive charts and analytics.

This project is developed as part of a B.Tech Major Project, focusing on building a scalable workflow management system with modern web technologies.

✨ The system focuses on **simplicity**, **productivity**, and **intuitive UI** design for everyday task management.

## ⚙️ Features

- 📋 **Task Management** – Create, update, delete, and manage tasks efficiently.

- 🔐 **Authentication System** – Secure user signup and login functionality.

- 📊 **Dashboard Analytics** – Visual representation of task progress using charts.

- 👨‍💼 **Admin Dashboard** – Admin can monitor tasks and manage users.

- 📥 **Report Generation** – Download detailed reports of tasks and user activities.

- 📈 **Task Status Tracking** – Track task progress such as pending, in progress, and completed.

## 🧩 Tech Stack
| Layer |	Technology |
|-------|------------|
| **Frontend** | React (Vite) + Tailwind CSS |
| **Backend** |	Node.js + Express.js |
| **Database** | MongoDB + MongoDB Atlas |
| **Charts** |	Recharts |
| **API Communication** |	Axios |
| **Version Control** |	Git + GitHub |

---

## 🗂️ Project Structure

```bash
tasky/
│
├── Backend/                          # Node.js + Express backend
│   │
│   ├── config/                       # Configuration files (DB connection etc.)
│   │
│   ├── controllers/                  # Business logic for APIs
│   │
│   ├── middlewares/                  # Authentication & request middleware
│   │
│   ├── models/                       # MongoDB schemas (User, Task)
│   │
│   ├── routes/                       # API route definitions
│   │
│   ├── uploads/                      # Uploaded profile images or files
│   │
│   ├── .env                          # Environment variables
│   │
│   ├── package.json                  # Backend dependencies
│   ├── package-lock.json
│   │
│   └── server.js                     # Express server entry point
│
│
├── Frontend/                           # React + Vite frontend
│   │
│   ├── hooks/                        # Custom React hooks
│   │
│   ├── src/                          # Main source code
│   │   ├── components/               # Reusable UI components
│   │   ├── pages/                    # Application pages
│   │   ├── assets/                   # Images, icons, static files
│   │   ├── utils/                    # Helper functions
│   │   └── App.jsx                   # Main React component
│   │
│   ├── index.html                    # Application entry HTML
│   │
│   ├── package.json                  # Frontend dependencies
│   ├── package-lock.json
│   │
│   ├── vite.config.js                # Vite configuration
│   └── eslint.config.js              # ESLint configuration
│
│
└── README.md                         # Project documentation
```
---

## 🚀 How It Works
1. **User Authentication**

   - Users first create an account through the **sign-up page**.
   - The system verifies credentials and allows users to securely log in.
   - JWT authentication ensures secure communication between frontend and backend.

2. **Task Creation**

   - Admins can create tasks by providing details such as:

   • Task title
   • Task description
   • Priority level
   • Assigned user

   - These tasks are stored in the MongoDB database.

3. **Task Management**

   - The platform allows users to:

   • View assigned tasks
   • Update task details
   • Change task status
   • Track progress

   - This enables efficient workflow tracking.

4. **Dashboard Visualization**

   - The dashboard displays analytics including:

   • Total tasks
   • Pending tasks
   • Completed tasks
   • Task distribution charts

   - Charts help users quickly understand productivity trends.

5. **Report Generation**

   - Admins can generate downloadable reports that summarize:

   • Tasks assigned to users
   • Task completion statistics
   • Overall productivity metrics

   - This helps in tracking performance and project progress.

## 🧠 API Endpoints
🔐 1. **Authentication APIs**
```bash
POST /auth/signup
Create a new user account.

POST /auth/login
Authenticate user credentials and return a token.

GET /auth/user
Fetch logged-in user information.
```
📋 2. **Task Management APIs**
```bash
GET /tasks
Fetch all tasks.

POST /tasks/create
Create a new task.

PUT /tasks/update/:id
Update task details.

PATCH /tasks/status/:id
Update task status.

DELETE /tasks/:id
Delete a task.
```
📊 3. **Reporting APIs**
```bash
GET /reports/tasks
Generate detailed task reports.

GET /reports/users
Generate user activity reports.
```
---

## 🖥️ Setup & Run
🔹 **Backend Setup**
```bash
cd backend
npm install
npm run dev
```
🔹 **Frontend Setup**
```bash
cd frontend
npm install
npm run dev
```


Then open the link shown in your terminal
(usually http://localhost:5173/).

---

## 🎓 About the Project

This project was developed as part of a Major Project during B.Tech in Computer Science Engineering.

The goal of this project is to design and implement a modern task management system that demonstrates full-stack development using the **MERN Stack (MongoDB, Express, React, Node.js)**. The system focuses on improving productivity and workflow organization through task tracking, dashboards, and analytics.

This project was developed collaboratively by:

**Kailash (Group Leader)** – Responsible for designing and implementing the **backend architecture**, including **API development**, **database integration**, and **server-side logic**.

**Meghansh** – Responsible for developing the **frontend interface**, including UI design, dashboard components, and integration of frontend features with backend APIs.

Together, the project demonstrates a complete full-stack web application workflow, combining backend services with an interactive frontend to create an efficient task management platform.

***Thanks For Reading this*** 
