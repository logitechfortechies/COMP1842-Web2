Vocab Builder - MEVN Stack CRUD Application

Overview
Vocab Builder is a full-stack web application designed to help users create, manage, and practice their own personalized vocabulary databases. Developed as part of the COMP1842 Web Programming 2 coursework, this project features a clean, minimalist UI inspired by modern language-learning platforms.

It is built on the MEVN stack (MongoDB, Express, Vue.js, Node.js) and demonstrates a complete implementation of RESTful API architecture and frontend-backend separation.

Key Features

Create: Add new vocabulary words, translations, and optional image URLs.

Read: Retrieve and display a comprehensive list of all saved vocabulary.

Update: Modify existing entries to correct typos or update meanings.

Delete: Delete vocabulary words from the database.

Practice Mode: An interactive testing environment for active recall.

Tech Stack

Frontend: Vue.js (Vue 3)

Backend: Node.js with Express.js

Database: MongoDB

API Communication: Axios (via custom API services)

Project Directory Structure
The repository is divided into two main directories to separate the client-side and server-side logic:

backend folder (Node.js/Express API server)

src/app.js: Main server entry point.

src/api/models/post.js: MongoDB schema definition.

src/api/routes/post.js: Express routing for API endpoints.

src/api/controllers/post.js: Business logic for handling CRUD requests.

frontend folder (Vue.js user interface)

src/App.vue and src/main.js: Vue application entry points.

src/router/index.js: Vue Router configuration for frontend navigation.

src/views/: Contains page-level components (Posts.vue, NewPost.vue, EditPost.vue, TestPage.vue).

src/components/: Reusable UI components (PostForm.vue).

src/services/: API connection logic (Api.js, PostsService.js) to communicate with the backend.

Setup and Installation Guide

Prerequisites:

Node.js installed on your machine.

A running instance of MongoDB (local or MongoDB Atlas).

Step 1: Backend Setup

Open a terminal and navigate to the backend directory.

Type: npm install (and press Enter)

Type: npm start (and press Enter)
Note: Ensure your MongoDB connection string is properly configured in your backend environment variables or app configuration.

Step 2: Frontend Setup

Open a new terminal window and navigate to the frontend directory.

Type: npm install (and press Enter)

Type: npm run serve (and press Enter)

Open your web browser and navigate to the local host address provided in the terminal
