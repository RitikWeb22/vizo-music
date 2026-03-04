# VIZO 🎵

A full-stack music application that detects your emotional state through facial expressions and recommends songs that match your mood in real-time.

## Features ✨

- **Mood Detection**: Uses MediaPipe Vision to analyze facial expressions and determine emotional state
- **User Authentication**: Secure sign up and login system with JWT-based authentication
- **Song Management**: Upload, store, and manage your personal music library
- **Smart Recommendations**: Get song recommendations based on your real-time emotional state
- **Caching**: Redis-based caching for improved performance
- **Responsive Design**: Works seamlessly on desktop and mobile devices

## Tech Stack 🛠️

### Backend

- **Runtime**: Node.js
- **Framework**: Express.js
- **Database**: MongoDB (with Mongoose ODM)
- **Caching**: Redis (ioredis)
- **Authentication**: JWT + bcryptjs
- **File Upload**: ImageKit + Multer
- **Metadata Processing**: node-id3

### Frontend

- **Framework**: React 19
- **Build Tool**: Vite
- **Styling**: Sass/SCSS
- **Routing**: React Router v7
- **HTTP Client**: Axios
- **Face Detection**: MediaPipe Tasks Vision
- **Linting**: ESLint

## Project Structure 📁

```
moodify/
├── backend/                 # Node.js/Express server
│   ├── src/
│   │   ├── app.js          # Express app configuration
│   │   ├── config/         # Database & cache configs
│   │   ├── controllers/    # Route controllers
│   │   ├── middlewares/    # Custom middlewares
│   │   ├── models/         # MongoDB models
│   │   ├── routes/         # API routes
│   │   └── services/       # Business logic & utilities
│   ├── public/             # Static files
│   ├── server.js           # Server entry point
│   └── package.json
│
└── frontend/               # React + Vite application
    ├── src/
    │   ├── features/       # Feature modules
    │   │   ├── auth/       # Authentication logic
    │   │   ├── Home/       # Home & song features
    │   │   ├── faceExpressions/  # Facial recognition
    │   │   └── shared/     # Shared styles
    │   ├── App.jsx         # Main app component
    │   ├── AppRoute.jsx    # Route definitions
    │   └── main.jsx        # React entry point
    ├── index.html
    ├── vite.config.js
    └── package.json
```

## Getting Started 🚀

### Prerequisites

- Node.js (v14 or higher)
- npm or yarn
- MongoDB instance (local or cloud)
- Redis instance (optional, for caching)

### Backend Setup

1. Navigate to the backend directory:

```bash
cd backend
```

2. Install dependencies:

```bash
npm install
```

3. Create a `.env` file in the backend directory with the following variables:

```
PORT=3000
MONGODB_URI=mongodb://localhost:27017/moodify
REDIS_URL=redis://localhost:6379
JWT_SECRET=your_secret_key_here
IMAGEKIT_PUBLIC_KEY=your_imagekit_public_key
IMAGEKIT_PRIVATE_KEY=your_imagekit_private_key
IMAGEKIT_URL_ENDPOINT=your_imagekit_url_endpoint
```

4. Start the backend server:

```bash
npm run dev
```

The backend will run on `http://localhost:3000`

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

The frontend will run on `http://localhost:5173`

## Available Scripts 📝

### Backend

- `npm run dev` - Start development server with hot reload (nodemon)
- `npm test` - Run test suite

### Frontend

- `npm run dev` - Start Vite development server
- `npm run build` - Build for production
- `npm run preview` - Preview production build
- `npm run lint` - Run ESLint to check code quality

## API Endpoints 🔌

### Authentication (`/api/auth`)

- `POST /register` - Register a new user
- `POST /login` - Login user
- `POST /logout` - Logout user
- `GET /profile` - Get current user profile

### Songs (`/api/songs`)

- `GET /` - Get all songs
- `POST /upload` - Upload a new song
- `GET /:id` - Get song details
- `DELETE /:id` - Delete a song
- `GET /mood/:emotion` - Get songs for specific mood

## Features in Detail 🎯

### Mood Detection

The application uses Google's MediaPipe Vision library to analyze facial expressions in real-time:

- Detects emotional states (happy, sad, angry, neutral, etc.)
- Processes video frames from your webcam
- Recommends songs that match your current mood

### Authentication

Secure user authentication with:

- Password hashing using bcryptjs
- JWT tokens for session management
- Cookie-based token storage

### Song Upload & Management

- Upload MP3 files with metadata extraction
- Store files securely using ImageKit CDN
- Extract and display song information (title, artist, duration)

## Environment Variables

Create a `.env` file in the backend directory with:

```
PORT=3000
MONGODB_URI=your_mongodb_connection_string
REDIS_URL=your_redis_connection_string
JWT_SECRET=your_jwt_secret_key
JWT_EXPIRE=7d
IMAGEKIT_PUBLIC_KEY=your_imagekit_key
IMAGEKIT_PRIVATE_KEY=your_imagekit_private_key
IMAGEKIT_URL_ENDPOINT=your_imagekit_endpoint
```

## Usage 💡

1. **Sign Up**: Create a new account with email and password
2. **Login**: Access your account
3. **Upload Songs**: Add songs to your library
4. **Enable Webcam**: Allow the app to access your camera
5. **View Mood**: See real-time facial expression analysis
6. **Get Recommendations**: Receive song suggestions based on your mood
7. **Play Music**: Enjoy personalized music from your library

## Browser Compatibility 🌐

- Chrome/Chromium (v90+)
- Firefox (v88+)
- Safari (v14+)
- Edge (v90+)

Note: Facial expression detection requires camera access and works best on desktop browsers.

## Contributing 🤝

Contributions are welcome! Please feel free to submit a Pull Request.

## License 📄

This project is licensed under the ISC License - see the LICENSE file for details.

## Acknowledgments 🙏

- [MediaPipe](https://github.com/google/mediapipe) for facial expression detection
- [ImageKit](https://imagekit.io/) for image and file hosting
- [MongoDB](https://www.mongodb.com/) for database
- [Redis](https://redis.io/) for caching

## Support 💬

For support, email support@moodify.com or open an issue on GitHub.

---

**Made with ❤️ as part of the What's Matter Series**
