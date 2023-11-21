import React, { useState } from 'react';
import axios from "axios";
import "./ProductPost.css";
import { ToastContainer, toast } from 'react-toastify';


function ProductPost() {

    const [name, setName] = useState('');
    const [description, setDescription] = useState('');
    const [img, setImg] = useState('');
    const [price, setPrice] = useState();
    const [category, setCategory] = useState('');
    const [qty, setQty] = useState();

    const notify = () => toast.success('Admin Product Post Successsfully', {
        position: "top-right",
        autoClose: 5000,
        hideProgressBar: false,
        closeOnClick: true,
        pauseOnHover: true,
        draggable: true,
        progress: undefined,
        theme: "light",
        });

        const post = async(e) => {
            e.preventDefault();

            try{
                const product = await axios.post(`https://ecommerceproductlistingbackend.vercel.app/admin/product/post`, {
                    name: name, description: description,  img: img, price: price, category: category,  qty: qty, admin: localStorage.getItem("admin_id")
                });
                if(product.status === 201){
                    notify();
                }
            }catch(err){
              console.log(err)
            }
          

        }

  return (
    <div className='register-div-1'>
    <div className='register-div-2'>
        <h1 className="register1">Product Post</h1>
        <form className='register2' onSubmit={post}>
        <input type="text" value={name} onChange={(e) => setName(e.target.value)}  placeholder="Enter Product Name" className='register-property-1' required/><br/>
        <textarea type="text" value={description} onChange={(e) => setDescription(e.target.value)}  placeholder='Enter Product Description' className='register-property-2-2' required></textarea><br/>
        <input type="text" value={img} onChange={(e) => setImg(e.target.value)}  placeholder="Enter Image Url" className='register-property-1' required/><br/>
        <input type="number" value={price} onChange={(e) => setPrice(e.target.value)}  placeholder="Enter Product Price" className='register-property-1' required/><br/>
        <input type="text" value={category} onChange={(e) => setCategory(e.target.value)}  placeholder="Enter Product Category" className='register-property-1' required/><br/>
        <input type="number" value={qty} onChange={(e) => setQty(e.target.value)} placeholder="Enter Product Quantity" className='register-property-1' required/><br/>
        <button className='register-property-3' type="submit">Post</button><br/>
        </form>
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
  )
}

export default ProductPost;