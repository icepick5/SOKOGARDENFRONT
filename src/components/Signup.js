
import { useState } from "react"; //used for state management
import { Link} from "react-router-dom"; //used for routing
import axios from "axios"; //used for API access

//Arrow function
const Signup = () => {
    //Initialize Hooks
  const [username, setUsername] = useState("");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [phone, setPhone] = useState("");
  const [success, setSuccess] = useState("");
  const [error, setError] = useState("");
  const [loading, setLoading] = useState("");

  //submit function
  const submit = async (e) => {
    e.preventDefault(); // prebent default JS actions
    //Update loading Hook with a message
    setLoading("Please wait as we upload your data!");

    try {
      // Put updated hooksin data variable
      const data = new FormData();
      data.append("username", username);
      data.append("email", email);
      data.append("password", password);
      data.append("phone", phone);

      //post your data to your Backend API
      const response = await axios.post(
        "https://modcom2.pythonanywhere.com/api/signup",
        data
      );
      //After data has been posted, set success hook variable to empty
      setLoading("");
      //Update success hook with a success message
      setSuccess(response.data.message);


      // Clear form fields
      setUsername("");
      setEmail("");
      setPassword("");
      setPhone("");

    //Catch any errors/exceptions
    } catch (error) {
      setLoading("");//Update loading hook variable  to empty
      setError(error.message);
    }
  };

  return (
    <div className="row justify-content-center mt-4">
      <div className="col-md-6 card shadow p-4">
            
            <h2>Sign Up</h2>
            <form onSubmit={submit}>
                {loading}
                {success}
                {error}
             
                <input
                  type="text"
                  className="form-control"
                  placeholder="Enter Username"
                  value={username}
                  onChange={(e) => setUsername(e.target.value)}
                  required
                /> <br />
                {username}
             
             
                <input
                  type="email"
                  className="form-control"
                  placeholder="Enter Email"
                  value={email}
                  onChange={(e) => setEmail(e.target.value)}
                  required /> <br />
            
                <input
                  type="password"
                  className="form-control"
                  placeholder="Enter Password"
                  value={password}
                  onChange={(e) => setPassword(e.target.value)}
                  required
                /> <br />
        
             
                <input
                  type="text"
                  className="form-control"
                  placeholder="Enter Phone"
                  value={phone}
                  onChange={(e) => setPhone(e.target.value)}
                  required
                /> <br />
          
              <button type="submit" className="btn btn-primary">
                Sign Up
              </button>
            </form>
        
              Already have an account? <Link to="/signin">Sign In</Link>
           
      </div>
    </div>
  );
};

export default Signup;