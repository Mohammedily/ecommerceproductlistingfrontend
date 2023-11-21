import React, {useState, useEffect} from 'react';
import "./AdminHome.css";



function AdminHome() {

   const [api, setApi] = useState([]);

   useEffect(() => {
     fetch(`https://ecommerceproductlistingbackend.vercel.app/admin/product/get`)
     .then(res => res.json())
     .then(asd => setApi(asd.product))
   },[])



  return (
    <div>
      <div className='container'>
       <div className='row' id="row">
        {
          api.map((apis) => (
            <div className='col-2' id="col-2">
            <div className='card'>
              <img src={apis.img} alt={apis.name} className='card-img-top' id="card-img-top" />
              <div className='card-body' id="card-body">
                <h5 className='card-title' id="card-title">{apis.name.slice(0,25)}...</h5>
                <a href={`/admin/product/${apis._id}`} className='card-link'>View</a>
              </div>
            </div>
          </div>
          ))
        }
       </div>
      </div>
    </div>
  )
}

export default AdminHome