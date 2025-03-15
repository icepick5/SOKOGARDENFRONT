import { useState, useEffect } from "react"; // for state management
import axios from "axios"; //For API Access
import { Link } from "react-router-dom"; // For link to other component

const Getproducts = () => {

    // Initialize Hooks
    const [products, setProducts] = useState([]);  // Default to empty array instead of a string
    const [loading, setLoading] = useState(""); //For loading message
    const [error, setError] = useState(""); //error message hook
    
    //Specify image location URL
    const img_url = "https://modcom2.pythonanywhere.com/static/images/"
    
    const getproducts = async()=>{
        setLoading("Please wait, We are retrieving the products .."); // Set loading message when fetching starts
        try {
        const response = await axios.get("https://modcom2.pythonanywhere.com/api/get_product_details")
        setProducts(response.data)
        setLoading("")
        }
        catch(error){
            setLoading("")
            setError("There was an Error")    
        }
    }//end function

    // Call getproducts on Use Effect
    useEffect(() => {
       getproducts()
    }, []); // empty dependency array ensures this runs only once when the component mounts

    return (
        <div className="row">

         <h3 className="mt-5">Available Products</h3>

        {/* Bind Error Messages */}
          {loading}
          {error}

        {/* Map over products and display them */}
        {products.map((product) => (
            <div className="col-md-3 justify-content-center mb-4">
                {/* Card with equal size */}
                <div className="card shadow card-margin">
                        <img 
                            className=" product_img mt-4"
                            src={img_url + product.product_photo} 
                        />
                  
                    <div className="card-body">
                        <h5 className="mt-2">{product.product_name}</h5>
                        <p className="text-muted">{product.product_description}</p>
                        <b className="text-warning">{product.product_cost} KES</b>  <br />
                        <button className="btn btn-dark mt-2 w-100">Purchase Now</button>
                    </div>
                </div>
            </div>
        ))}
    </div>
    );

}

export default Getproducts;
