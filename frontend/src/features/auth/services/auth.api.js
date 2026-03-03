import axios from "axios";

const api =  axios.create({
  baseURL: "http://localhost:3000/api/auth",
  withCredentials: true,
});
// Register
export async function register({ username, email, password }) {
  const response = await api.post("/register", {
    username,
    email,
    password,
  });
  return response.data;
}

// Login
export async function login({ email, password }) {
  try {

    const response = await api.post("/login", {
      email,
      password,
    });

    return response.data;
  } catch (error) {
    console.log("Backend Error:", error.response?.data);
    throw error;
  }
}

// Get Me
export async function getMe() {
  const response = await api.get("/get-me");
  return response.data;
}

// Logout
export async function logout() {
  const response = await api.get("/logout");
  return response.data;
}