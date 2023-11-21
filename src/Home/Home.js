import React, {useState, useEffect} from 'react';
import "./Home.css";

function Home() {
const [api, setApi] = useState([]);
const [search, setSearch] = useState('');
const [filter, setFilter] = useState('');

   useEffect(() => {
     fetch(`https://ecommerceproductlistingbackend.vercel.app/admin/product/get`)
     .then(res => res.json())
     .then(asd => setApi(asd.product))
   },[]);
 console.log(api)
   console.log(filter)


  return (
    <div>
      <div className='home'>
           <div className='home1'>
            <input type='text' onChange={(e) => setSearch(e.target.value)} placeholder='Search...' className='search' />
            <select name="category" value={filter} onChange={(e) => setFilter(e.target.value)}  id="category">
              <option value="">Category</option>
              <option value="shirt">shirt</option>
              <option value="t-shirt">T-shirt</option>
              <option value="pant">Pant</option>
              <option vlaue="shoe">Shoe</option>
              <option value="watch">Watch</option>
            </select>
           </div>
       </div>
       <div>
       <div className='container'>
       <div className='row' id="row">
        {
          api.filter((value) => {
            if(search == ""){
              return value;
            }else if(value.name.toLowerCase().includes(search.toLowerCase())){
              return value;
            }
}).filter((value) => {
  if(filter == ""){
    return value;
  }else if(value.category.toLowerCase().includes(filter.toLowerCase())){
    return value;
  }
}).map((apis) => (
            <div className='col-2' id="col-2">
            <div className='card'>
              <img src={apis.img} alt={apis.name} className='card-img-top' id="card-img-top" />
              <div className='card-body' id="card-body">
                <h5 className='card-title' id="card-title">{apis.name.slice(0,25)}...</h5>
                <a href={`/product/view/${apis._id}`} className='card-link'>View</a>
              </div>
            </div>
          </div>
          ))
        }
       </div>
      </div>
       </div>
    </div>
  )}

export default Home