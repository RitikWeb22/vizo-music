import { useContext, useEffect } from "react";
import { AuthContext } from "../auth.context";
import { register, login, getMe, logout } from "../services/auth.api";

export function useAuth() {
  const context = useContext(AuthContext);

  const { user, loading, setUser, setLoading } = context;

  // Auto check user on app load
  // useEffect(() => {
  //   const checkUser = async () => {
  //     try {
  //       setLoading(true);
  //       const data = await getMe();
  //       setUser(data.user);
  //     } catch (error) {
  //       setUser(null);
  //     } finally {
  //       setLoading(false);
  //     }
  //   };

  //   checkUser();
  // }, []);

  // Register
  const handleRegister = async ({ email, password, username }) => {
    try {
      setLoading(true);
      const data = await register({ email, password, username });
      setUser(data.user);
    } catch (error) {
      throw error;
    } finally {
      setLoading(false);
    }
  };

  // Login
  const handleLogin = async ({ email, password }) => {
    try {
      setLoading(true);
      const data = await login({ email, password });
      setUser(data.user);
    } catch (error) {
      throw error;
    } finally {
      setLoading(false);
    }
  };

  // Get Me
  const handleGetMe = async () => {
    try {
      setLoading(true);
      const data = await getMe();
      setUser(data.user);
    } catch (error) {
      throw error;
    }
    finally {
      setLoading(false);
    }
 
  }; 
  // Logout
  const handleLogout = async () => {
    try {
      setLoading(true);
      await logout();
      setUser(null);
    } finally {
      setLoading(false);
    }
  };  
  useEffect(() => {
    handleGetMe();
  }, []);



  return {
    user,
    loading,
    handleLogin,
    handleRegister,
    handleLogout,
    handleGetMe,
  };
}