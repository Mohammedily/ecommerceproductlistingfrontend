import React, { useState } from 'react';
import axios from "axios";
import "./register.css";
import { ToastContainer, toast } from 'react-toastify';



function Register() {
 
    const [username, setUsername] = useState('');

    const [email, setEmail] = useState('');

    const [password, setPassword] = useState('');

    const notify = () => toast.success('Signup Successsfully', {
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
        const register = await axios.post("https://ecommerceproductlistingbackend.vercel.app/signup", {
            username, email, password
        })

        if(register.status === 201){
          notify()
          setTimeout(() => {
            window.location.href="/";
          },5000);
          
        }

     } catch (error) {
        console.log(error);
     }

  
    
   }

  return (
    <div className='register-div-1'>
        <div className='register-div-2'>
            <h1 className="register1">Registration</h1>
            <form className='register2' onSubmit={post}>
            <input type="text" value={username} onChange={(e) => setUsername(e.target.value)} placeholder="Enter Username" className='register-property' required/><br/>
            <input type="email" value={email} onChange={(e) => setEmail(e.target.value)} placeholder="Enter Email" className='register-property-1' required/><br/>
            <input type="password" value={password} onChange={(e) => setPassword(e.target.value)} placeholder='Enter Password' className='register-property-2' required/><br/>
            <button className='register-property-3' type="submit">Register Now</button><br/>
            <p>Already have an account? <a className='register-property-4' href='/'>Login</a></p>
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

export default Register;