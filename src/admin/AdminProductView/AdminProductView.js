import React, {useState, useEffect} from 'react';
import { useParams } from "react-router-dom";
import "./AdminProductView.css";
import axios from "axios";
import { ToastContainer, toast } from 'react-toastify';

function AdminProductView() {

    const [api, setApi] = useState({});

    const { id }= useParams();

    useEffect(() => {
       fetch(`https://ecommerceproductlistingbackend.vercel.app/admin/product/get/${id}`)
       .then((res) => res.json())
       .then((a) => setApi(a.product));
    },[id]);


    const notify = () => toast.success('Admin Product Delete Successsfully', {
        position: "top-right",
        autoClose: 5000,
        hideProgressBar: false,
        closeOnClick: true,
        pauseOnHover: true,
        draggable: true,
        progress: undefined,
        theme: "light",
        });

    const deletes = () => {

       const  del  = axios.delete(`https://ecommerceproductlistingbackend.vercel.app/admin/product/delete/${id}`)
                 
              notify();

               setTimeout(() => {
                 window.location.href="/admin/product"
               },5000)
          return del;
        
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
        <h5 class="card-title">{api.name}</h5>
        <p class="card-text" id="card-text">Description: {api.description}</p>
        <p class="card-text" id="card-text">₹: {api.price}/-</p>
        <p class="card-text" id="card-text">Qty: {api.qty}/-</p>
        <div className='edde-button'>
            <button onClick={() => window.location.href=`/admin/edit/${api._id}`} className='edit-button'>Edit</button>
            <button onClick={deletes} className='delete-button'>Delete</button>
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

export default AdminProductView