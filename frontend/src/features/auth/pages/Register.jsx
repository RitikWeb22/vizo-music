import { useState } from "react";
import "../styles/auth.form.scss";
import { Link, useNavigate } from "react-router-dom";
import { useAuth } from "../hooks/useAuth";
import Loading from "../components/Loading";
import FormGroup from "../components/FormGroup";
const Register = () => {
  const [username, setUsername] = useState("");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const navigate = useNavigate();
  const { handleRegister, loading } = useAuth();
  const handleSubmit = async (e) => {
    e.preventDefault();
    await handleRegister({email, password, username}).then((res) => {
      console.log("Registration successful:" , res);
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
            src="https://i.pinimg.com/736x/b3/6e/31/b36e317833054b35ad70fe7160ec8c55.jpg"
            alt=""
          />
        </div>
        <div className="right">
          <form onSubmit={handleSubmit}>
            <h2>Register</h2>
            <FormGroup
              label="Username"
              placeholder="Enter your username"
              onChange={(e) => setUsername(e.target.value)}
              value={username}
              type="text"
            />
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
              Register
            </button>
            <p>
              Already have an account? <Link to="/login">Login here</Link>
            </p>
          </form>
        </div>
      </div>
    </main>
  );
};
export default Register;
