import React, {useState, useEffect} from 'react';
import "./AdminEdit.css";
import { useParams } from "react-router-dom";
import { ToastContainer, toast } from 'react-toastify';
import axios from "axios";

function AdminEdit() {

    const [api, setApi] = useState({});

    const [name, setName] = useState('');
    const [description, setDescription] = useState('');
    const [price, setPrice] = useState();
    const [category, setCategory] = useState('');
    const [size, setSize] = useState('');
    const [qty, setQty] = useState();

    const notify = () => toast.success('Admin Product Update Successsfully', {
        position: "top-right",
        autoClose: 5000,
        hideProgressBar: false,
        closeOnClick: true,
        pauseOnHover: true,
        draggable: true,
        progress: undefined,
        theme: "light",
        });

    const {id} = useParams();

    useEffect(() => {
       fetch(`https://ecommerceproductlistingbackend.vercel.app/admin/product/get/${id}`)
       .then((res) => res.json())
       .then((data) => setApi(data.product))
    },[id]);

    console.log(api);

    const post = async(e) => {
        e.preventDefault();

        try{
            const product = await axios.put(`https://ecommerceproductlistingbackend.vercel.app/admin/product/update/${id}`, {
                name: name ? name : api.name, description: description ? description : api.description,  price: price ? price : api.price, category: category ? category : api.category , size: size ? size : api.size, qty: qty ? qty : api.qty
            });
            console.log(product)
            if(product.status === 200){
                notify();
                setTimeout(() => {
                    window.location.href="/admin/product"
                },5000)
            }
        }catch(err){
          console.log(err)
        }
    }

    

 

  return (
    <div className='register-div-1'>
    <div className='register-div-2'>
        <h1 className="register1">Product Edit</h1>
        <form className='register2' onSubmit={post}>
        <input type="text" value={name ? (name) : (api.name)} onChange={(e) => setName(e.target.value)}  placeholder="Enter Product Name" className='register-property-1' required/><br/>
        <textarea type="text" value={description ? (description) : (api.description)} onChange={(e) => setDescription(e.target.value)}  placeholder='Enter Product Description' className='register-property-2-2' required></textarea><br/>
        <input type="number" value={price? (price) : (api.price)} onChange={(e) => setPrice(e.target.value)}  placeholder="Enter Product Price" className='register-property-1' required/><br/>
        <input type="text" value={category ? (category) : (api.category)} onChange={(e) => setCategory(e.target.value)}  placeholder="Enter Product Category" className='register-property-1' required/><br/>
        <input type="text" value={size ? (size) : (api.size)} onChange={(e) => setSize(e.target.value)}  placeholder="Enter Product Size" className='register-property-1' required/><br/>
        <input type="number" value={qty ? (qty) : (api.qty)} onChange={(e) => setQty(e.target.value)} placeholder="Enter Product Quantity" className='register-property-1' required/><br/>
        <button className='register-property-3' type="submit">Update</button><br/>
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

export default AdminEdit