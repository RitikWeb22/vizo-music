import { createBrowserRouter } from "react-router-dom";
import RootLayout from "./components/RootLayout";
import Login from "./features/auth/pages/Login";
import Register from "./features/auth/pages/Register";
import SongUpload from "./features/auth/pages/SongUpload";
import ProtectedRoute from "./features/auth/components/ProtectedRoute";
import Home from "./features/Home/pages/Home";
import Favorites from "./features/Home/pages/Favorites";

export const router = createBrowserRouter([
  {
    element: <RootLayout />,
    children: [
      {
        path: "/",
        element: (
          <ProtectedRoute>
            <Home />
          </ProtectedRoute>
        ),
      },
      {
        path: "/upload",
        element: (
          <ProtectedRoute>
            <SongUpload />
          </ProtectedRoute>
        ),
      },
      {
        path: "/favorites",
        element: (
          <ProtectedRoute>
            <Favorites />
          </ProtectedRoute>
        ),
      },
      {
        path: "/login",
        element: <Login />,
      },
      {
        path: "/register",
        element: <Register />,
      },
    ],
  },
]);
