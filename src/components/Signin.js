import React, { useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import axios from "axios";

const Signin = () => {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [loading, setLoading] = useState("false");
  const [error, setError] = useState("null");

  const navigate = useNavigate(); // For redirection

  const submit = async (e) => {
    e.preventDefault();
    setLoading("Please wait as we log you in");
    setError("");

    try {
      const data = new FormData();
      data.append("email", email);
      data.append("password", password);

      const response = await axios.post(
        "https://modcom2.pythonanywhere.com/api/signin",
        data);

      setLoading("");

      if (response.data.user) {
        // Store user details in localStorage or context if needed
        localStorage.setItem("user", JSON.stringify(response.data.user));
        // Redirect to /land-details
        navigate("/");
      } 
      else {
        setError(response.data.message);
      }
    } catch (error) {
      setLoading("");
      setError(err.response.data.message);
    }
  };


  return (
    <div className="row justify-content-center mt-5">
      <div className="col-md-6 card shadow p-4">
            <h2>Sign In</h2>

            <form onSubmit={submit}>
                {loading}
                {error}
              <input
                type="email"
                className="form-control mb-3"
                placeholder="Email"
                value={email}
                onChange={(e) => setEmail(e.target.value)}
                required
              />
              <input
                type="password"
                className="form-control mb-3"
                placeholder="Password"
                value={password}
                onChange={(e) => setPassword(e.target.value)}
                required
              />
              <button type="submit" className="btn btn-primary w-100">
                Sign In
              </button>
            </form>

              Don't have an account? <Link to="/signup">Sign Up</Link>
        
      </div>
    </div>
  );
};

export default Signin;