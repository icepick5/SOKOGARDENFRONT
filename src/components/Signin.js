import { useState } from "react"; //for state management
import { Link, useNavigate } from "react-router-dom";  //for routing/navigation
import axios from "axios"; //for API Access

const Signin = () => {

  // Initialize hooks to be used in this component.
  const [email, setEmail] = useState("");  //email hook
  const [password, setPassword] = useState(""); //password hook
  const [loading, setLoading] = useState(""); //laoding hook
  const [error, setError] = useState(""); //error hook
  const navigate = useNavigate() //hook for navigating to a new component

  //Function to submit data to API
  const submit = async (e) => {
    e.preventDefault();//Prevent default actions
    setLoading("Please wait as we log you in");//set progress message
  
    //Add data to form data object
    try {
      const data = new FormData();
      data.append("email", email);
      data.append("password", password);

      //Post above data to Backend API
      const response = await axios.post(
        "https://modcom2.pythonanywhere.com/api/signin",
        data);
      
      setLoading(""); //After successful posting, Clear the loading message
      // Check if the response has user item,
      
      if (response.data.user) {
        // If user is Found, Store user details in localStorage
        // Redirect to /getproducts Component
        navigate("/");
      } 
      else {
        //User Not Found, Show Error message
        setError("Login Failed");
      }
      //If there was an Error, Clear Loading
    } catch (error) {
      setLoading("");
      setError("There was a server Error");
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