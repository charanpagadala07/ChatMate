# ChatMate

ChatMate is a real-time chat application built using the **MERN stack**. It allows users to communicate with each other instantly, with features like user authentication, real-time message exchange, and a responsive UI.

## Features
- **User Authentication**: Users can sign up, log in, and manage their profiles.
- **Real-Time Messaging**: Users can send and receive messages in real-time using **Socket.io**.
- **Message History**: The chat history is stored in a **MongoDB** database for future reference.
- **Responsive Design**: The application is fully responsive and works across devices.

## Tech Stack
- **Frontend**: React.js
- **Backend**: Node.js, Express.js
- **Database**: MongoDB
- **Real-Time Communication**: Socket.io
- **HTTP Requests**: Axios

## Installation

### Clone the repository

```bash
git clone https://github.com/charanpagadala07/chatmate.git
```

### Navigate to project directory and Install dependencies

```bash
cd chatmate
npm install
```

### Setup Your .env file
```bash
MONGODB_URI=
PORT=
JWT_SECRET=
CLOUDINARY_CLOUD_NAME=
CLOUDINARY_API_KEY=
CLOUDINARY_API_SECRET=
NODE_ENV=development
```

### Start the application
After setting up the .env file successfully, now its time to run the application. To run the application you need to start the backend server and frontend seperately
1. Start the backend server
```bash
cd backend/
npm start
```
2. Run the Frontend
```bash
cd frontend/
npm run dev
```

### Navigate to PORT localhost:5173 
Once both frontend and backend are running, navigate to `http://localhost:5173` in your browser to access ChatMate.

