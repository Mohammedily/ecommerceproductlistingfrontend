import React, {useState} from 'react';
import axios from "axios";
import { ToastContainer, toast } from 'react-toastify';
import "./AdminLogin.css";

function AdminLogin() {
    const [email, setEmail] = useState('');

    const [password, setPassword] = useState('');
  
    const notify = () => toast.success('Admin Signin Successsfully', {
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
  
     try {
        const adminlogin = await axios.post("https://ecommerceproductlistingbackend.vercel.app/admin/signin", {
            email, password
        })
  
        console.log(adminlogin)
  
        localStorage.setItem("admin", adminlogin.data.data);
        localStorage.setItem("admin_id", adminlogin.data.existing._id);
     
        if(adminlogin.status === 201){
          notify()
          setTimeout(() => {
            window.location.href="/admin/home"
          },5000);
          
        }
  
     } catch (error) {
        console.log(error);
     }
    }
    return (
      <div className='register-div-1'>
          <div className='register-div-2'>
              <h1 className="register1">Admin Login</h1>
              <form className='register2' onSubmit={post}>
              <input type="email" value={email} onChange={(e) => setEmail(e.target.value)} placeholder="Enter Email" className='register-property-1' required/><br/>
              <input type="password" value={password} onChange={(e) => setPassword(e.target.value)} placeholder='Enter Password' className='register-property-2' required/><br/>
              <button className='register-property-3' type="submit">Login Now</button><br/>
              <p>Don't have an account? <a className='register-property-4' href='/admin/register'>Admin Register</a></p>
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

export default AdminLogin