
import { useState } from "react"; // for state management
import axios from "axios"; //For API Access
import { Link } from "react-router-dom"; ////For link to other component

const Addproduct = () => {

      //Initialize product details hooks
  const [product_name, setProductName] = useState("");
  const [product_description, setProductDescription] = useState("");
  const [product_cost, setProductCost] = useState("");
  const [product_photo, setProductPhoto] = useState("");
    // Hooks for information messages
  const [loading, setLoading] = useState("");
  const [message, setMessage] = useState("");
  const [error, setError] = useState("");

  //Submit Function
  const submit = async (e) => {
    //Prevent default actions
    e.preventDefault();
    //update loading hook to show progress
    setLoading("Pleaser wait ... ");

    //add all updated hooks to data variable
    const data = new FormData();
    data.append("product_name", product_name);
    data.append("product_description", product_description);
    data.append("product_cost", product_cost);
    data.append("product_photo", product_photo);

    //Post data to Backend API
    try {
      const response = await axios.post(
        "https://modcom2.pythonanywhere.com/api/add_product",
        data
      );
      //Set loding message to empty, after a successful POST to API
      setLoading("")
      //Update message hook to successfully Added to notify the user.
      setMessage("Product Added successfully!");
    //   setMessage(response.data.success);

      // reset the input fields 
      setProductName("");
      setProductDescription("");
      setProductCost("");
      setProductPhoto("");

      //Catch Any server error, i.e internet issues , server errors
    } catch (error) {
      setError("Failed to add product. Please try again.");
    }
  };

 

  return (
    
    <div className="row justify-content-center mt-4">

      <nav className="p-3">
           <Link to='/' className="btn btn-dark">GET ALL PRODUCTS</Link>
      </nav>

      <div className="col-md-6 card shadow p-4">
        <form onSubmit={submit}>
            {/* Bind user loding, success, error messages */}
            {loading}
            {message}
            {error}
            <h3>Upload Products</h3>
            {/* Call setProductName onChange to update  produce name Hook */}
            <input
              type="text"
              placeholder="Enter Product Name"
              className="form-control"
              value={product_name}
              onChange={(e) => setProductName(e.target.value)}
              required
            /> <br />

            {/* Call setProductDescription onChange to update  produce description Hook */}
           <textarea
              className="form-control"
              placeholder="Describe your Product"
              value={product_description}
              onChange={(e) => setProductDescription(e.target.value)}
              required
            ></textarea>
            <br />
      
             {/* Call setProductCost onChange to update  produce cost Hook */}
            <input
              type="number"
              placeholder="Enter Product Cost"
              className="form-control"
              value={product_cost}
              onChange={(e) => setProductCost(e.target.value)}
              required
            />
            <br />
        
             {/* Call setProductPhoto onChange to update  produce photo Hook */}
             <b>Browse/Upload Product Image</b>
            <input
              type="file"
              className="form-control"
              accept="image/*"
              onChange={(e) => setProductPhoto(e.target.files[0])}
              required
            />
            <br />
           {/* submit button */}
          <button type="submit" className="btn btn-primary">
               Upload Product
          </button>
        </form>
      </div>
    </div>
  );
};

export default Addproduct;