import { useState, useEffect } from "react"; // for state management
import axios from "axios"; //For API Access
import { Link } from "react-router-dom"; // For link to other component

const Getproducts = () => {

    // IniHooks
    const [products, setProducts] = useState([]);  // Default to empty array instead of a string
    const [loading, setLoading] = useState(""); 
    const [error, setError] = useState("");

    useEffect(() => {
        setLoading("Please wait, We are retrieving the products .."); // Set loading message when fetching starts

        axios.get("https://modcom2.pythonanywhere.com/api/get_product_details")
            .then(function (response) {
                // Update Hooks
                console.log(response.data);
                setProducts(response.data); // important
                setLoading("");  // Clear loading message
            })
            .catch(function (error) {
                // Update Hooks
                console.log(error);
                setError("There was an Error");
                setLoading("");  // Clear loading message
            });
    }, []); // empty dependency array ensures this runs only once when the component mounts

    return (
        <div className="row">
            {loading}
            {error}
    
            {/* Map over products and display them */}
            {products.length > 0 && products.map((product) => (
                <div className="col-md-3">
                    {/* Apply margin to the card */}
                    <div className="card shadow card-margin mb-4">  
                        <div className="justify-content-center">
                            <img 
                                src={`https://modcom2.pythonanywhere.com/static/images/${product.product_photo}`} 
                                className="img-fluid" 
                                 
                            />
                        </div>
                        <div className="card-body">
                            <h3 className="mt-2">{product.product_name}</h3>
                            <p>{product.product_description}</p> 
                            <span className="badge bg-primary">{product.product_cost} USD</span>  <br />
                            <button className="btn btn-primary mt-2">Buy Now</button> 
                        </div>
                    </div>
                </div>
            ))}
        </div>
    );
    
    
    
    
}

export default Getproducts;
