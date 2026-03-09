import { RouterProvider } from "react-router-dom";
import { router } from "./AppRoute";
import "./features/shared/global.scss";
import { AuthProvider } from "./features/auth/auth.context";
import { UploadProvider } from "./features/auth/upload.context";
import { SongProvider } from "./features/Home/song.context";
import Navbar from "./components/Navbar";
import { useAuth } from "./features/auth/hooks/useAuth";

const AppContent = () => {
  const { user, handleLogout } = useAuth();

  return (
    <>
      {/* <Navbar username={user?.username} onLogout={handleLogout} /> */}

      <UploadProvider>
        <SongProvider>
          <RouterProvider router={router} />
        </SongProvider>
      </UploadProvider>
    </>
  );
};

const App = () => {
  return (
    <AuthProvider>
      <AppContent />
    </AuthProvider>
  );
};

export default App;
