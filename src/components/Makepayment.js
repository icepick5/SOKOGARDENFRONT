
import { useState } from 'react';
import {useLocation} from 'react-router-dom'
import  axios  from 'axios';
const Makepayment = ()=> {
    // Extract the received product using useLocation()
    const { product } = useLocation().state || {}; 
    //Hook to Hold Phone Number
    const [phone, setPhone] = useState("")
    const [message, setMessage] = useState("")
    
    //Create a submit Function
    const submit = async(e) =>{
        e.preventDefault(); // prebent default JS actions
     //Update loading Hook with a message
     setMessage("Please wait as we Processs!");

      // Put updated hooks in data variable
      const data = new FormData();
      data.append("phone", phone);
      data.append("amount", product.product_cost);

      //post your data to your Backend API
      const response = await axios.post(
        "https://modcom2.pythonanywhere.com/api/mpesa_payment",
        data
      );

      setMessage("Please Complete Payment on Your Phone")
    }

    return(
        <div>
            <h1>LIPA NA MPESA</h1>
            <p>Product NAME: {product.product_name}</p>  
            <p>Product Cost: {product.product_cost}</p>
      
            <form onSubmit={submit}>
                   {message} <br />
                  <input 
                     type="text" 
                     placeholder='Enter Phone Number'
                     value={phone}
                     onChange={(e)=>setPhone(e.target.value)}/> <br /><br />
                  <button className='btn btn-dark'>
                       Make Payment
                  </button>
            </form>
        </div>
    )
}

export default Makepayment;