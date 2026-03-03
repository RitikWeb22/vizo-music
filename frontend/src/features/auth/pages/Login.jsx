import { useState } from "react";
import "../styles/auth.form.scss";
import { Link, useNavigate } from "react-router-dom";
import FormGroup from "../components/FormGroup";
import { useAuth } from "../hooks/useAuth";
import Loading from "../components/Loading";
const Login = () => {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const navigate = useNavigate();

  const { handleLogin, loading } = useAuth();
  const handleSubmit = (e) => {
    e.preventDefault();
    handleLogin({email, password}).then((res) => {
      console.log("Login successful:" , res);
      navigate("/");
    });
  };
  if (loading) {
    return <Loading />;
  }
  return (
    <main>
      <div className="form-container">
        <div className="left">
          <img
            src="https://i.pinimg.com/1200x/bc/48/2e/bc482eca088c1d8784d35d168c5b4ad7.jpg"
            alt=""
          />
        </div>
        <div className="right">
          <form onSubmit={handleSubmit}>
            <h2>Login</h2>
            <FormGroup
              label="Email"
              placeholder="Enter your email"
              onChange={(e) => setEmail(e.target.value)}
              value={email}
              type="email"
            />
            <FormGroup
              label="Password"
              placeholder="Enter your password"
              onChange={(e) => setPassword(e.target.value)}
              value={password}
              type="password"
            />
            <button type="submit" className="button btn-primary">
              Login
            </button>
            <p>
              Don't have an account? <Link to="/register">Register here</Link>
            </p>
          </form>
        </div>
      </div>
    </main>
  );
};
export default Login;
