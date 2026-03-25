import { RouterProvider } from "react-router-dom";
import { router } from "./AppRoute";
import "./features/shared/global.scss";
import { AuthProvider } from "./features/auth/auth.context";
import { UploadProvider } from "./features/auth/upload.context";
import { SongProvider } from "./features/Home/song.context";
import { FavoritesProvider } from "./features/Home/favorites.context";

const AppContent = () => {
  return (
    <UploadProvider>
      <SongProvider>
        <FavoritesProvider>
          <RouterProvider router={router} />
        </FavoritesProvider>
      </SongProvider>
    </UploadProvider>
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
