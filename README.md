# ChatMate

ChatMate is a real-time chat application built using the **MERN stack**. It allows users to communicate with each other instantly, with features like user authentication, real-time message exchange, and a responsive UI.

## Features
- **User Authentication**: Users can sign up, log in, and manage their profiles.
- **Real-Time Messaging**: Users can send and receive messages in real-time using **Socket.io**.
- **Image Sharing**: Users can send and receive photos, which are stored securely using **Cloudinary**.
- **Message History**: The chat history is stored in a **MongoDB** database for future reference.
- **Responsive Design**: The application is fully responsive and works across devices.

## Tech Stack
- **Frontend**: React.js
- **Backend**: Node.js, Express.js
- **Database**: MongoDB, Cloudinary ( for storing images / videos )
- **Real-Time Communication**: Socket.io
- **HTTP Requests**: Axios

## Installation

### Clone the repository

```bash
git clone https://github.com/charanpagadala07/ChatMate.git
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

### Application Running on Port 3000
 - Now open your browser and navigate to:
```bash
http://localhost:3000
```

## 🌟 Usage  

### How to Use Flux:  
1. **Sign Up/Sign In**: Create an account or log in with an existing one.  
2. **Create Blogs**: Write Blogs with text, images, videos.  
3. **Follow and Engage**: Build a network by following users and interacting with their blogs.  

---

## 🤝 Contributing  

Contributions are welcome! Here's how you can get involved:  

1. Fork the repository.  
2. Create a new branch (`git checkout -b feature-name`).  
3. Commit your changes (`git commit -m 'Add some feature'`).  
4. Push to the branch (`git push origin feature-name`).  
5. Open a pull request.  

---

## 📧 Contact  

If you have any questions or suggestions, feel free to reach out:  
- **Name**: Charan Pagadala
- **Email**: [charanpagadala2004@gmail.com](mailto:charanpagadala2004@gmail.com)  
- **GitHub**: [CharanPagadala](https://github.com/charanpagadala07)  

---

### 📌 Note  

Feel free to update this README file as the project evolves. Let me know if you'd like me to refine it further!  


