import React from 'react';
import "./AdminNavbar.css";

function AdminNavbar() {

  let logout = () => {
    localStorage.removeItem("admin");
    localStorage.removeItem("admin_id");
    window.location.href="/admin/login"
  }

  return (
    <nav class="navbar navbar-expand-lg navbar-light ">
  <div class="container-fluid">
    <a class="navbar-brand" href="/">Ecommerce_Admin</a>
    <button class="navbar-toggler" type="button" data-bs-toggle="collapse" data-bs-target="#navbarNav" aria-controls="navbarNav" aria-expanded="false" aria-label="Toggle navigation">
      <span class="navbar-toggler-icon"></span>
    </button>
    <div class="collapse navbar-collapse" id="navbarNav">
      <ul class="navbar-nav ms-auto">
        <li class="nav-item">
          <a class="nav-link" href="/admin/product">Product</a>
        </li>
        <li class="nav-item">
          <a class="nav-link" href="/admin/product/post">Product_Add</a>
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

export default AdminNavbar