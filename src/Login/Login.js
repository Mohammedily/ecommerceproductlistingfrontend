import React, {useState} from 'react';
import axios from "axios";
import "./Login.css";
import { ToastContainer, toast } from 'react-toastify';

function Login() {



  const [email, setEmail] = useState('');

  const [password, setPassword] = useState('');

  const notify = () => toast.success('Signin Successsfully', {
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
      const login = await axios.post("https://ecommerceproductlistingbackend.vercel.app/signin", {
          email, password
      })

      console.log(login)

      localStorage.setItem("user", login.data.data);
      localStorage.setItem("user_id", login.data.existing._id);

      if(login.status === 201){
        notify()
        setTimeout(() => {
          window.location.href="/home"
        },5000);
        
      }

   } catch (error) {
      console.log(error);
   }
  }
  return (
    <div className='register-div-1'>
        <div className='register-div-2'>
            <h1 className="register1">Login</h1>
            <form className='register2' onSubmit={post}>
            <input type="email" value={email} onChange={(e) => setEmail(e.target.value)} placeholder="Enter Email" className='register-property-1' required/><br/>
            <input type="password" value={password} onChange={(e) => setPassword(e.target.value)} placeholder='Enter Password' className='register-property-2' required/><br/>
            <button className='register-property-3' type="submit">Login Now</button><br/>
            <p>Don't have an account? <a className='register-property-4' href='/'>Register</a></p>
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

export default Login;