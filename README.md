# CodeSync - Real-time Collaborative Code Editor & Compiler

Screenshots of the site:
<img width="1847" height="1021" alt="image" src="https://github.com/user-attachments/assets/06ffe85b-8231-4949-81ee-36991e6dae08" />
<img width="1816" height="1011" alt="Screenshot 2025-08-06 155245" src="https://github.com/user-attachments/assets/e758221e-726f-4ae4-86dc-846c17e24237" />
<img width="1840" height="1017" alt="image" src="https://github.com/user-attachments/assets/b2a5ff92-1df6-4723-9231-483ca3d4c67a" />
<img width="1840" height="1021" alt="image" src="https://github.com/user-attachments/assets/e226672a-f0c6-44fc-a8e3-9535b60057a0" />



**CodeSync** is a full-stack MERN application that enables developers to write, edit, and run code together in real-time, no matter where they are. It provides a seamless, VS Code-inspired collaborative environment directly in the browser.

This project was built to demonstrate a comprehensive understanding of modern web technologies, real-time communication protocols, and professional UI/UX design principles.

---

## Key Features

* **Real-time Collaborative Editing:** Code changes are synchronized instantly across all connected clients in a room using WebSockets.
* **Multi-language Code Execution:** Compile and run code in JavaScript, Python, C++, and Java, with output displayed in a custom-built terminal overlay.
* **Persistent Rooms:** Create unique, shareable rooms where code is saved to a MongoDB database, ensuring no work is lost between sessions.
* **Professional IDE-Inspired UI:** A polished, VS Code-inspired interface featuring a live-updating sidebar of connected users, a minimalist header, and a pop-over terminal.
* **Modern & Interactive Landing Page:** A fully animated landing page with a dynamic, interactive dot-grid background.

---

## Tech Stack:
### **Backend**

* **Node.js:** JavaScript runtime environment.
* **Express.js:** Web application framework for Node.js.
* **Socket.IO:** Library for real-time, bidirectional event-based communication.
* **MongoDB:** NoSQL database for storing room and code data.
* **Mongoose:** Object Data Modeling (ODM) library for MongoDB.
* **Judge0 API:** Secure, third-party API for code compilation and execution.

### **Frontend**

* **React.js:** JavaScript library for building user interfaces.
* **Vite:** Next-generation frontend tooling for a fast development experience.
* **Socket.IO Client:** Client-side library for connecting to the Socket.IO server.
* **CodeMirror:** A versatile, extensible code editor for the web.
* **Tailwind CSS:** A utility-first CSS framework for rapid UI development.
* **React Router:** For client-side routing.

---

## Local Setup & Installation

To run this project on your local machine, follow these steps:

### **Prerequisites**

* Node.js (v18.x or higher)
* npm
* Git

### **1. Clone the Repository**
### **2. Backend setup:
        Create a .env file in the server directory and add the following environment variables:
        MONGO_URI=your_mongodb_connection_string
        RAPIDAPI_KEY=your_rapidapi_key_for_judge0
### **3. Frontend Setup:
        Create a .env file in the client directory and add the backend URL:
        VITE_BACKEND_URL=http://localhost:5001
Author
[Pratyush Kumar]
