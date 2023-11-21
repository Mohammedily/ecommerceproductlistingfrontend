import React, {useState, useEffect} from 'react';
import "./Cart.css";
import axios from "axios";
import { ToastContainer, toast } from 'react-toastify';


function Cart() {

    const [api, setApi] = useState([]);
    const [door_no, setDoor_No] = useState("");
    const [street_name, setStreet_Name] = useState("");
    const [city, setCity] = useState("");
    const [state, setState] = useState("");
    const [country, setCountry] = useState("");
    const [pincode, setPinCode] = useState("");
    const [addresss, setAddress] = useState([]);

    useEffect(() => {
    fetch(`https://ecommerceproductlistingbackend.vercel.app/cart/product/get`)
      .then((res) => res.json())
     .then((add) => setApi(add.product))
    },[]);

    useEffect(() => {
        fetch(`https://ecommerceproductlistingbackend.vercel.app/address/get`)
        .then((res) => res.json())
        .then((add) => setAddress(add));
    },[]);

    const addressfilter = addresss.filter((asd) => asd.user === localStorage.getItem("user_id"));

    

       const notify = () => toast.success('Cart Item Deleted', {
        position: "top-right",
        autoClose: 5000,
        hideProgressBar: false,
        closeOnClick: true,
        pauseOnHover: true,
        draggable: true,
        progress: undefined,
        theme: "light",
        });

        const addressnotify = () => toast.success('Address Added Successfully', {
          position: "top-right",
          autoClose: 5000,
          hideProgressBar: false,
          closeOnClick: true,
          pauseOnHover: true,
          draggable: true,
          progress: undefined,
          theme: "light",
          });

          const ordernotify = () => toast.success('Order Successfully', {
            position: "top-right",
            autoClose: 5000,
            hideProgressBar: false,
            closeOnClick: true,
            pauseOnHover: true,
            draggable: true,
            progress: undefined,
            theme: "light",
            });

        const address = async(e) => {
          e.preventDefault();

          try {
            const address = await axios.post(`https://ecommerceproductlistingbackend.vercel.app/address/post`, {
              door_no, street_name, city, state, country, pincode, user: localStorage.getItem("user_id")
            })
            if(address.status === 201){
              addressnotify();
              setTimeout(() => {
                 
              },5000)
          }

          } catch (error) {
            console.log(error);
          }

        }

        
    const del = async(id) => {
      try {
        const del = await axios.delete(`https://ecommerceproductlistingbackend.vercel.app/cart/product/delete/${id}`)
          
   notify();
   setTimeout(() => {
     window.location.reload()
   },5000)

   return del;
      } catch (error) {
        console.log(error);
      }
    }

    const apis = api.filter((ass) => ass.user === localStorage.getItem("user_id"));

    console.log(apis)
 
     const totalPrice = api.map(item => item.qty  * item.price ).reduce((sum, item ) => sum + item,0)
    
     const orderpost = async() => {
      const order = await axios.post(`http://localhost:1000/order/post`, {
        address: addressfilter, product: apis, totalAmount: totalPrice,  user: localStorage.getItem("user_id")
      });
     ordernotify()
  
     setTimeout(() => {
      window.location.href="/order"
     },5000)
      
      return order;
      }


  return (
    <div>{
        apis.length === 0 ? (
          <div className='cart-empty'>
          <h3 className='cart-empty1'>Cart Is Empty</h3>
          </div>
        ) :(
<div className="shopping-cart">
       <div>
        <div className='shopping'>
        <h3>Shopping Cart</h3>
        </div>
        <div className='shopping1'>
        <div id="c">
        <div class="card mb-3" id="card-mb-3">
            {
                apis.map((item) => (
  <div class="row g-0" id="row">
    <div class="col-md-4" >
      <img src={item.img} class="img-fluid rounded-start" alt="..." />
    </div>
    <div class="col-md-8">
      <div class="card-body">
        <h5 class="card-title" id="card-text-1">{item.name}</h5>
        <p class="card-text" id="card-text-2">Description: {item.description}</p>
        <p class="card-text" id="card-text-3">₹: {item.price}/-</p>
        <p class="card-text" id="card-text-3">Qty: {item.qty}</p>
       
        <button className='delete' onClick={() => del(item._id)}>Delete</button>
      </div>
    </div>
    </div>

                ))
            }
  </div>
</div>
        </div>
        </div>
        {
          addressfilter.length === 0 ? (
            <div className='address-form'>
            <h1 className="shopping-cart1">Address</h1>
            <form className='shopping-cart3' onSubmit={address}>
            <input type="text" value={door_no} onChange={(e) => setDoor_No(e.target.value)}  placeholder="Door_No" className='shopping-cart2' required/><br/>
            <input type="text" value={street_name} onChange={(e) => setStreet_Name(e.target.value)}  placeholder="Street_name" className='shopping-cart2' required/><br/>
            <input type="text" value={city} onChange={(e) => setCity(e.target.value)}  placeholder="City" className='shopping-cart2' required/><br/>
            <input type="text" value={state} onChange={(e) => setState(e.target.value)} placeholder="State" className='shopping-cart2' required/><br/>
            <input type="text" value={country} onChange={(e) => setCountry(e.target.value)} placeholder="Country" className='shopping-cart2' required/><br/>
            <input type="text" value={pincode} onChange={(e) => setPinCode(e.target.value)} placeholder="Pincode" className='shopping-cart2' required/><br/>
            <button className='shopping-cart4' type="submit">Update</button><br/>
            </form>
             </div>
          ) :(
            <div className='address-detial'>
               {
                addressfilter.map((item) => (
                  <div>
                    <h1>Address Detial</h1>
                    <h5>Door No: {item.door_no},</h5>
                    <h5>Street Name: {item.street_name},</h5>
                    <h5>City: {item.city},</h5>
                    <h5>State: {item.state},</h5>
                    <h5>Country: {item.country},</h5>
                    <h5>Pincode: {item.pincode}.</h5>
                  </div>
                ))
               }
<div className='checkout'>
           <h6>Total Price: {totalPrice} /-</h6>
            <button className='checkout-button' onClick={orderpost}>Checkout</button>
           </div>
            </div>
            
          )
        }
       
        </div>
        )
      }
      
       
        <ToastContainer
position="top-right"
autoClose={5000}
hideProgressBar={false}
newestOnTop={false}
closeOnClick
rtl={false}
pauseOnFocusLoss
draggable
pauseOnHover
theme="light"
/>
{/* Same as */}
<ToastContainer />
    </div>
  )
}

export default Cart