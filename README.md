# Project Management App

A full-stack web application for managing projects, tasks, and team members with role-based access control. Built with Node.js, Express, MongoDB on the backend and React, Vite, and Tailwind CSS on the frontend.

## 🚀 Features

- **User Authentication**
  - Secure login and signup with JWT tokens
  - Password encryption using bcrypt
  - Role-based access control (Admin & Member)
  - Password visibility toggle

- **Project Management**
  - Create and manage projects
  - Add team members to projects via email
  - View all projects with member information
  - Delete projects with cascade deletion of related tasks
  - Professional project cards with member badges

- **Task Management**
  - Create tasks within projects
  - Assign tasks to project members
  - Update task status (Pending, In Progress, Completed)
  - Email-based validation for task assignment
  - View tasks organized by project

- **Dashboard**
  - Welcome message with user information
  - Task statistics and overview
  - Quick access to projects and tasks
  - Animated stat cards with gradient backgrounds

- **User Interface**
  - Dark theme with professional styling
  - Responsive design for all devices
  - Smooth animations and transitions
  - Animated disclaimers and error messages
  - Professional navbar with user role badge
  - Sidebar navigation with active link highlighting
  - Copyright footer with creator attribution

## 🛠️ Tech Stack

### Backend
- **Runtime**: Node.js
- **Framework**: Express.js
- **Database**: MongoDB with Mongoose ORM
- **Authentication**: JWT (JSON Web Tokens)
- **Security**: bcrypt for password hashing
- **Middleware**: CORS, Error handling, Role-based authorization

### Frontend
- **Library**: React with Vite
- **Styling**: Tailwind CSS
- **Build Tool**: Vite
- **HTTP Client**: Axios
- **Routing**: React Router
- **State Management**: React Hooks (useState, useEffect)

## 📁 Project Structure

```
project-management-app/
├── backend/
│   ├── src/
│   │   ├── app.js              # Express app configuration
│   │   ├── server.js           # Server entry point
│   │   ├── config/
│   │   │   └── db.js           # MongoDB connection
│   │   ├── controllers/
│   │   │   ├── auth.controller.js
│   │   │   ├── dashboard.controller.js
│   │   │   ├── project.controller.js
│   │   │   └── task.controller.js
│   │   ├── middleware/
│   │   │   ├── auth.middleware.js
│   │   │   ├── error.middleware.js
│   │   │   └── role.middleware.js
│   │   ├── models/
│   │   │   ├── user.model.js
│   │   │   ├── project.model.js
│   │   │   └── task.model.js
│   │   ├── routes/
│   │   │   ├── auth.routes.js
│   │   │   ├── dashboard.routes.js
│   │   │   ├── project.routes.js
│   │   │   └── task.routes.js
│   │   └── utils/
│   │       ├── generateToken.js
│   │       └── validators.js
│   └── package.json
│
└── frontend/
    ├── src/
    │   ├── main.jsx            # React entry point
    │   ├── App.jsx             # Main app component
    │   ├── App.css
    │   ├── index.css           # Global styles and animations
    │   ├── components/
    │   │   ├── Layout.jsx
    │   │   ├── Navbar.jsx
    │   │   ├── Sidebar.jsx
    │   │   └── TaskCard.jsx
    │   ├── pages/
    │   │   ├── Login.jsx
    │   │   ├── Signup.jsx
    │   │   ├── Dashboard.jsx
    │   │   ├── Projects.jsx
    │   │   └── Tasks.jsx
    │   ├── services/
    │   │   └── api.js          # API service with axios
    │   └── utils/
    │       └── helpers.js
    ├── vite.config.js
    ├── tailwind.config.js
    ├── postcss.config.js
    ├── eslint.config.js
    └── package.json
```

## 🔧 Installation

### Prerequisites
- Node.js (v14 or higher)
- npm or yarn
- MongoDB (local or cloud instance)

### Backend Setup

1. Navigate to the backend directory:
```bash
cd backend
```

2. Install dependencies:
```bash
npm install
```

3. Create a `.env` file with the following variables:
```
MONGO_URI=mongodb://localhost:27017/project-management
JWT_SECRET=your_jwt_secret_key_here
PORT=5000
```

4. Start the backend server:
```bash
npm start
```

The backend will run on `http://localhost:5000`

### Frontend Setup

1. Navigate to the frontend directory:
```bash
cd frontend
```

2. Install dependencies:
```bash
npm install
```

3. Start the development server:
```bash
npm run dev
```

The frontend will run on `http://localhost:5173` (or another available port)

## 🚀 Usage

### Getting Started

1. **Sign Up**: Create a new account by providing name, email, password, and selecting a role (Admin/Member)
2. **Login**: Log in with your email and password
3. **Dashboard**: View your welcome message and task statistics
4. **Projects**: 
   - Create new projects
   - Add team members by email
   - View all project members
5. **Tasks**:
   - Create tasks within projects
   - Assign tasks to project members
   - Update task status
   - View all tasks

### Role-Based Access

- **Admin**: Can create projects, add members, create and assign tasks, and manage the project
- **Member**: Can view assigned tasks and project information

## 📋 API Endpoints

### Authentication
- `POST /auth/signup` - Register a new user
- `POST /auth/login` - Login with email and password

### Projects
- `GET /project/getall` - Get all projects
- `POST /project/create` - Create a new project
- `POST /project/addmember` - Add member to project
- `DELETE /project/delete/:id` - Delete a project

### Tasks
- `GET /task/getall` - Get all tasks
- `POST /task/create` - Create a new task
- `PUT /task/update/:id` - Update task status
- `DELETE /task/delete/:id` - Delete a task

### Dashboard
- `GET /dashboard/stats` - Get dashboard statistics

## 🎨 Features Highlight

### Authentication & Security
- Secure JWT-based authentication
- Password visibility toggle on login/signup forms
- Error disclaimers for wrong credentials
- Email validation for member assignment

### Project & Task Management
- Member management with email verification
- Cascade deletion (deleting a project removes related tasks)
- Task assignment validation
- Error messages for invalid operations

### User Interface
- Professional dark theme with cyan accents
- Smooth fade-in and slide animations
- Responsive grid layouts
- Animated stat cards with gradients
- Professional navbar with user information
- Sidebar navigation
- Footer with copyright and creator attribution

## 🔐 Security Features

- **Password Hashing**: bcrypt for secure password storage
- **JWT Tokens**: Secure token-based authentication
- **Role-Based Access**: Admin and Member roles with appropriate permissions
- **Input Validation**: Email and password validation
- **Error Handling**: Graceful error messages without exposing sensitive information

## 📱 Responsive Design

The application is fully responsive and works seamlessly on:
- Desktop computers
- Tablets
- Mobile devices

## 🤝 Contributing

This is a personal project. Feel free to fork and customize for your needs.

## 👨‍💻 Created By

**Mustajab**

## 📄 License

This project is open source and available for personal and educational use.

## 🐛 Troubleshooting

### Backend won't start
- Ensure MongoDB is running
- Check that port 5000 is not in use
- Verify `.env` file configuration

### Frontend won't connect to backend
- Ensure backend is running on port 5000
- Check browser console for CORS errors
- Verify API endpoints in `frontend/src/services/api.js`

### Tasks won't assign to members
- Ensure members are added to the project first
- Check that email matches exactly
- Verify user role permissions

## 📞 Support

For issues or questions, review the error messages and check that all prerequisites are met.

---

**Last Updated**: May 2026
#   P r o j e c t - M a n a g e m e n t - P r o j e c t  
 