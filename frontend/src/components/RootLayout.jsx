import { Outlet } from "react-router-dom";
import Navbar from "./Navbar";
import Player from "../features/Home/components/player";
import { useAuth } from "../features/auth/hooks/useAuth";

const RootLayout = () => {
  const { user, handleLogout } = useAuth();

  return (
    <>
      <Navbar username={user?.username} onLogout={handleLogout} />
      <main className="layout__content">
        <Outlet />
      </main>
      <Player />
    </>
  );
};

export default RootLayout;
