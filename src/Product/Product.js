import React, {useState, useEffect} from 'react';
import "./Product.css";
import { useParams } from "react-router-dom";
import axios from "axios";
import { ToastContainer, toast } from 'react-toastify';

function Product() {
    

    const [api, setApi] = useState([]);
    const [qty, setQty] = useState(1);
    

    const { id } = useParams();

    const notify = () => toast.success('Added Cart', {
        position: "top-right",
        autoClose: 5000,
        hideProgressBar: false,
        closeOnClick: true,
        pauseOnHover: true,
        draggable: true,
        progress: undefined,
        theme: "light",
        });



    useEffect(() => {
    fetch(`https://ecommerceproductlistingbackend.vercel.app/admin/product/get/${id}`)
    .then((res) => res.json())
    .then((ads) => setApi(ads.product))
    },[id]);

    console.log(api);

    let increment = () => {
        setQty(qty + 1);
      }
    
      let decrement = () => {
        setQty(qty - 1);
      }
    
      if(qty === 0){
        setQty(1);
      }

   const post = async() => {
    try {
        const cart = await axios.post(`https://ecommerceproductlistingbackend.vercel.app/cart/product/post`, {
            name: api.name, description: api.description, img : api.img,price: api.price , category: api.category,  qty: qty, admin: api.admin, user: localStorage.getItem("user_id")
        });

        if(cart.status === 201){
          notify()
          setTimeout(() => {
           window.location.href="/cart";
          },5000)
        }


    } catch (error) {
        console.log(error);
    }
   }

  return (
    <div className='card-flex'>
    <div class="card mb-3" id="cardmb-3">
<div class="row g-0">
<div class="col-md-4">
  <img src={api.img} class="img-fluid rounded-start" alt="..." />
</div>
<div class="col-md-8">
  <div class="card-body">
    <h5 class="card-title" id="card-text">{api.name}</h5>
    <p class="card-text" id="card-text">Description: {api.description}</p>
    <p class="card-text" id="card-text">₹: {api.price * qty}/-</p>
    <div className='qty-button'>
            <button onClick={increment} className='plusbutton'>+</button>
            <h5 className='qty'>{qty}</h5>
            <button onClick={decrement} className='minusbutton'>-</button>
        </div>
    <div>
        <button className='cart' onClick={post}>Add To Cart</button>
    </div>
  </div>
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
</div>
</div>
</div>
  )
}

export default Product