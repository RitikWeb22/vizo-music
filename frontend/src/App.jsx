import { RouterProvider } from "react-router-dom";
import { router } from "./AppRoute";
import "./features/shared/global.scss";
import { AuthProvider } from "./features/auth/auth.context";
import { SongProvider } from "./features/Home/song.context";

const App = () => {
  return (
    <AuthProvider>
      <SongProvider>
        <RouterProvider router={router} />
      </SongProvider>
    </AuthProvider>
  );
};

export default App;
