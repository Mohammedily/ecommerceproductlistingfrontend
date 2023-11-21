import React from 'react';
import "./Navbar.css";

function Navbar() {

  const logout = () =>{
    localStorage.removeItem("user_id");
    localStorage.removeItem("user");
    window.location.href="/"
  }

  return (
    <nav class="navbar navbar-expand-lg navbar-light ">
  <div class="container-fluid">
    <a class="navbar-brand" href="/">Ecommerce</a>
    <button class="navbar-toggler" type="button" data-bs-toggle="collapse" data-bs-target="#navbarNav" aria-controls="navbarNav" aria-expanded="false" aria-label="Toggle navigation">
      <span class="navbar-toggler-icon"></span>
    </button>
    <div class="collapse navbar-collapse" id="navbarNav">
      <ul class="navbar-nav ms-auto">
        <li class="nav-item">
          <a class="nav-link" href="/home">Home</a>
        </li>
        <li class="nav-item">
          <a class="nav-link" href="/cart">Cart</a>
        </li>
        <li class="nav-item">
        <a class="nav-link" href="/order">Order</a>
        </li>
        <li class="nav-item">
          <button className='logout' onClick={logout}>Logout</button>
        </li>
      </ul>
    </div>
  </div>
</nav>
  )
}

export default Navbar