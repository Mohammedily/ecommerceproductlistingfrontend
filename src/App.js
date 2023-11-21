import './App.css';
import Register from './Register/register';
import Login from './Login/Login';
import { BrowserRouter as Router, Route, Switch } from "react-router-dom";
import Home from './Home/Home';
import Navbar from './Navbar/Navbar';
import AdminLogin from './admin/AdminLogin/AdminLogin';
import AdminRegister from './admin/AdminRegister/AdminRegister';
import AdminNavbar from './admin/AdminNavbar/AdminNavbar';
import ProductPost from './admin/ProductPost/ProductPost';
import AdminHome from './admin/AdminHome/AdminHome';
import AdminProductView from './admin/AdminProductView/AdminProductView';
import AdminEdit from './admin/AdminEdit/AdminEdit';
import Product from './Product/Product';
import Cart from './Cart/Cart';
import Order from './Order/Order';

function App() {

   const user = localStorage.getItem("user");
   const admin = localStorage.getItem("admin")

  return (
    <div className="App">
       <Router>
       {user && <Navbar/>} 
       {admin && <AdminNavbar />}
     <Switch>
      <Route exact path="/" component={Login} />
      <Route exact path="/register"  component={Register}  />
      <Route exact path="/home" component={Home} />
      <Route exact path="/admin/login" component={AdminLogin} />
      <Route exact path="/admin/register" component={AdminRegister} />
      <Route exact path="/admin/product/post" component={ProductPost} />
      <Route exact path="/admin/product" component={AdminHome} />
      <Route exact path="/admin/product/:id" component={AdminProductView} />
      <Route exact path="/admin/edit/:id" component={AdminEdit} />
      <Route exact path="/product/view/:id" component={Product} />
      <Route exact path="/cart" component={Cart} />
      <Route exact path="/order" component={Order} />
     </Switch>
      </Router>
    </div>
  );
}

export default App;
