
import './App.css';
import { Route, BrowserRouter, Routes } from 'react-router-dom';
import Home from './dashbord/home';
import Home1 from "./dashbord1/home1";
import ListCategory from './views/listCategory';
import CreateCategory from './views/createCategory';
import UpdateCategory from './views/updateCategory';
import Listsubcategory from './views/listSubcategory';
import ListProduct from './views/listProduct';
import CreateProduct from './views/createProduct';
import UpdateSubCategory from './views/updateSubcategory';
import CreateSubCategory from "./views/createSubcategory";
import UpdateProduct from './views/UpdateProduct';

import ListUser from "./views/ListUser";

import Login from './views/Login';
import Signup from './views/Signup';
import Profile from './views/Profile';
import Order from './viewsclient/Order';
import Contact from './pages/Contact';
import About from './pages/About';
import Home2 from './pages/Home2';
import Shop from './pages/Shop';
import Layout2 from './pages/Layout2';
import Devis from './pages/Devis';
import ShopDetail from './pages/ShopDetail';
import Cart from './pages/Cart';
import Wishlist from './pages/Wishlist';
import Service from './pages/Service';
import ListService from './views/ListService';
import CreateService from './views/CreateService';
import UpdateService from './views/UpdateService';
import Login1 from './pages/Login1';
import ListDevis from './views/ListDevis';
import Listfournisseur from "./views/Listfournisseur";
import Addfournisseur from "./views/Addfournisseur";
import Updatefournisseur from "./views/Updatefournisseur";
import Orders from './views/orders/Orders';
import OrderDetails from "./views/orders/OrderDetails";
import ConfirmOrder from './pages/ConfirmOrder';
import AddServiceCategory from './views/servicescatg/addServiceCategory';
import ListServiceCategory from "./views/servicescatg/listservicecategory";
import Updateservicecategory from "./views/servicescatg/updateservicecategory";
import CreateCoupon from './views/CreateCoupon';
import ListCoupon from './views/ListCoupon';
import Shipping from './pages/Shipping';
import AccountAdmin from './views/accountadmin';
import UpdateProfil from './views/UpdateProfil';
import Adddepot from './views/Adddepot';
import Listdepot from './views/Listdepot';






function App() {
  return (
    <div className="App">
      <BrowserRouter>
        <Routes>
          <Route path="/dashbord" element={<Home></Home>}></Route>
          <Route
            path="/dashbord/category"
            element={<ListCategory></ListCategory>}
          ></Route>
          <Route
            path="/dashbord/addcategory"
            element={<CreateCategory></CreateCategory>}
          ></Route>
          <Route
            path="/dashbord/updatecategory/:id"
            element={<UpdateCategory></UpdateCategory>}
          ></Route>
          <Route
            path="/dashbord/listcoupon"
            element={<ListCoupon></ListCoupon>}
          ></Route>
          <Route
            path="/dashbord/addcoupon"
            element={<CreateCoupon></CreateCoupon>}
          ></Route>
          {/* <Route
            path="/dashbord/updatecoupon/:id"
            element={<UpdateCoupon></UpdateCoupon>}
          ></Route> */}
          <Route
            path="/dashbord/addsubcategory"
            element={<CreateSubCategory></CreateSubCategory>}
          ></Route>
          <Route
            path="/dashbord/subcategory"
            element={<Listsubcategory></Listsubcategory>}
          ></Route>
          <Route
            path="/dashbord/updateSubcategory/:id"
            element={<UpdateSubCategory></UpdateSubCategory>}
          ></Route>
          <Route
            path="/dashbord/product"
            element={<ListProduct></ListProduct>}
          ></Route>
          <Route
            path="/dashbord/addproduct"
            element={<CreateProduct></CreateProduct>}
          ></Route>
          <Route
            path="/dashbord/updateProduct/:id"
            element={<UpdateProduct></UpdateProduct>}
          ></Route>
          <Route
            path="/dashbord/listservicecategory"
            element={<ListServiceCategory></ListServiceCategory>}
          ></Route>
          <Route
            path="/dashbord/addservicecategory"
            element={<AddServiceCategory></AddServiceCategory>}
          ></Route>
          <Route
            path="/dashbord/updateservicecategory/:id"
            element={<Updateservicecategory></Updateservicecategory>}
          ></Route>
          <Route path="/dashbord/orders" element={<Orders></Orders>}></Route>
          <Route
            path="/dashbord/orders/:id"
            element={<OrderDetails></OrderDetails>}
          ></Route>
          <Route
            path="/dashbord/devis"
            element={<ListDevis></ListDevis>}
          ></Route>
          <Route
            path="/dashbord/listdepot"
            element={<Listdepot></Listdepot>}
          ></Route>
          <Route
            path="/dashbord/adddepot"
            element={<Adddepot></Adddepot>}
          ></Route>
      
          <Route
            path="/dashbord/account"
            element={<AccountAdmin></AccountAdmin>}
          ></Route>
          <Route
            path="/dashbord/account/:id"
            element={<UpdateProfil></UpdateProfil>}
          ></Route>
          <Route path="/login" element={<Login></Login>}></Route>
          <Route path="/" element={<Signup></Signup>}></Route>
          <Route path="/dashbord/profile" element={<Profile></Profile>}></Route>
          <Route path="/dashbord1" element={<Home1></Home1>}></Route>
          <Route path="/profile" element={<Profile></Profile>}></Route>
          <Route path="/order" element={<Order></Order>}></Route>
          <Route
            path="/dashbord/service"
            element={<ListService></ListService>}
          ></Route>
          <Route
            path="/dashbord/addservice"
            element={<CreateService></CreateService>}
          ></Route>
          <Route
            path="/dashbord/updateService/:id"
            element={<UpdateService></UpdateService>}
          ></Route>
          <Route
            path="/dashbord/listprovider"
            element={<Listfournisseur></Listfournisseur>}
          ></Route>
          <Route
            path="/dashbord/addprovider"
            element={<Addfournisseur></Addfournisseur>}
          ></Route>
          <Route
            path="/dashbord/updateprovider/:id"
            element={<Updatefournisseur></Updatefournisseur>}
          ></Route>
          <Route path="/dashbord/user" element={<ListUser></ListUser>}></Route>

          <Route path="/home" element={<Home2></Home2>} />

          <Route path="/about" element={<About></About>} />
          <Route path="/contact" element={<Contact></Contact>} />
          <Route path="/shop" element={<Shop></Shop>} />
          <Route path="/devis" element={<Devis></Devis>} />
          <Route path="/shopDetail/:id" element={<ShopDetail></ShopDetail>} />
          <Route path="/cart" element={<Cart></Cart>} />
          <Route path="/shipping" element={<Shipping></Shipping>} />
          <Route path="/wishlist" element={<Wishlist></Wishlist>} />
          <Route path="/service" element={<Service></Service>} />
          <Route path="/confirmorder" element={<ConfirmOrder></ConfirmOrder>} />
        </Routes>
      </BrowserRouter>
    </div>
  );
}

export default App;
