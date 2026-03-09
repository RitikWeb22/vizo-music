# VIZO 🎵

A full-stack face-driven music player that detects your emotional state through facial expressions and recommends songs that match your mood in real-time.

## Features ✨

- **Real-Time Mood Detection**: Uses MediaPipe Vision to analyze facial expressions and determine emotional state
- **User Authentication**: Secure sign up and login system with JWT-based authentication
- **Profile Management**: View username in navbar with quick logout functionality
- **Song Upload**: Upload MP3 files with mood categorization (Happy, Sad, Surprised)
- **Smart Music Player**: Manual playback control with full player features (play/pause, seek, volume, speed control)
- **Mood-Based Recommendations**: Get song suggestions based on your real-time emotional state
- **Protected Routes**: Secure pages that require authentication
- **Redis Caching**: Improved performance with Redis-based caching
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
- **State Management**: React Context API
- **Form Handling**: Two-way data binding with controlled components
- **Linting**: ESLint

## Project Structure 📁

```
Vizo/
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
    │   ├── │   ├── components/  # Auth components
    │   │   │   ├── hooks/       # useAuth, useUpload hooks
    │   │   │   ├── pages/       # Login, Register, SongUpload
    │   │   │   ├── services/    # API services
    │   │   │   ├── styles/      # Auth & upload styles
    │   │   │   ├── auth.context.jsx     # Auth context
    │   │   │   └── upload.context.jsx   # Upload context
    │   │   ├── Home/       # Home & song features
    │   │   │   ├── components/  # Player component
    │   │   │   ├── hooks/       # useSong hook
    │   │   │   └── song.context.jsx
    │   │   ├── faceExpressions/  # Facial recognition
    │   │   │   ├── components/   # ExpressionTrack, Navbar
    │   │   │   ├── styles/       # Navbar styles
    │   │   │   └── utils/        # Face detection utils
    │   │   └── shared/     # Shared styles
    │   ├── components/     # Shared components (Navbar)eatures
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
MONGODB_URI=mongodb://localhost:27017/vizo
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
  GET /logout` - Logout user
- `GET /get-me` - Get current user profile

### Songs (`/api/songs`)

- `GET /` - Get songs (optionally filtered by mood)
- `POST /upload-song` - Upload a new song (MP3 file with mood)
- Query params: `mood` (happy|sad|surprised), `limit` (default: 1)

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
- Recommends songs that match your curresurprised)
- Processes video frames from your webcam
- Real-time camera indicator in navbar
- Recommends songs that match your current mood

### Authentication & User Management

Secure user authentication with:

- Password hashing using bcryptjs
- JWT tokens for session management
- Cookie-based token storage
- Protected routes requiring authentication
- User profile display with username in navbar
- One-click logout functionality

### Song Upload & Management

Upload songs with comprehensive features:

- **File Upload**: Drag & drop or click to browse MP3 files
- **File Validation**:
  - Only MP3 files accepted
  - Maximum file size: 10MB
  - Real-time file size display
- **Mood Categorization**: Select from Happy 😊, Sad 😢, or Surprised 😮
- **Metadata Extraction**: Automatic extraction of ID3 tags (title, artist, album art)
- **Cloud Storage**: Files stored securely using ImageKit CDN
- **Two-way Data Binding**: Real-time form updates with React state

### Music Player

Full-featured music player with:
username, email, and password 2. **Login**: Access your account with email and password 3. **Home Page**:

- Enable webcam for facial expression detection
- Click "Detect Face Expression" to analyze your mood
- See your current mood displayed in real-time

4. **Upload Songs**:
   - Click "Upload Song" in the navbar
   - Drag & drop or browse for an MP3 file (max 10MB)
   - Select the mood category
   - Click "Upload Song"
5. **Music Player**:
   - Songs load based on detected mood
   - Click play button to start music (no autoplay)
   - Use controls for volume, speed, seek, and navigation
6. **Profile Management**:
   - View your username in the navbar
   - Click "Logout" to end your session

- **Album Art Display**: Show song poster/cover image

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

Project Highlights 🌟

- **Context API Architecture**: Multiple context providers (Auth, Upload, Song) for state management
- **Custom Hooks**: Reusable hooks (useAuth, useUpload, useSong) for clean component logic
- **Protected Routes**: Automatic redirection for unauthenticated users
- **Responsive Design**: Mobile-first approach with SCSS mixins
- **Error Handling**: Comprehensive error messages and validation
- **Loading States**: Visual feedback during async operations
- **File Validation**: Client-side validation before upload
- **Two-Way Binding**: Controlled form components with React state

##

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
- Safari (v14open an issue on GitHub.

## Recent Updates 🆕

- ✅ Disabled autoplay - songs only play when user clicks play button
- ✅ Added logout button to navbar with styled design
- ✅ Added username display in navbar
- ✅ Created comprehensive song upload form with file validation
- ✅ Implemented two-way data binding for all form inputs
- ✅ Added mood selection dropdown (Happy, Sad, Surprised)
- ✅ Integrated upload context and custom hooks
- ✅ Added real-time file size display
- ✅ Implemented drag & drop file upload interface
- ✅ Added success/error message handling
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

For support, email ritik30@gmail.com or open an issue on GitHub.

---

**Made with ❤️ as part of the What's Matter Series**
