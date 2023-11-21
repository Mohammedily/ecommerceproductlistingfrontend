import React, { useState, useEffect } from 'react';
import "./Order.css";

function Order() {

    const [api, setApi] = useState([]);
    const [addresss, setAddress] = useState([]);
    const id = localStorage.getItem("user_id")

    useEffect(() => {
      fetch(`https://ecommerceproductlistingbackend.vercel.app/order/findget/${id}`)
      .then((res) => res.json())
       .then((asd) => setApi(asd.o))
    },[id]);

    useEffect(() => {
        fetch(`https://ecommerceproductlistingbackend.vercel.app/address/get`)
        .then((res) => res.json())
        .then((add) => setAddress(add));
    },[]);

    const addressfilter = addresss.filter((asd) => asd.user === localStorage.getItem("user_id"));
    
   
  
    
  return (
    <div>
        <div>

                    <div className="shopping-cart">
                    <div>
                     <div className='shopping'>
                     <h3>Orders</h3>
                     </div>
                     <div className='shopping1'>
                     <div id="c">
                     <div class="card mb-3" id="card-mb-3">
                         {
                             api.map((item) => (
               <div class="row g-0" id="row">
                 
                 <div class="col-md-8">
                   <div class="card-body">
                     <h5 class="card-title" id="card-text-1">{item._id}</h5>
                     <p class="card-text" id="card-text-2">Total Amount: {item.totalAmount}</p>
                     <p class="card-text" id="card-text-2">status: {item.status}</p>
                    
                   </div>
                 </div>
                 </div>
             
                             ))
                         }
               </div>
             </div>
                     </div>
                     </div>

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
                         </div>
                         
                       
                    
                     </div>
                 
            
        </div>
    </div>
  )
}

export default Order