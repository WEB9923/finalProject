import {createBrowserRouter} from "react-router-dom";
import App from "../App.jsx";
import Login from "../pages/auth/Login.jsx";
import AuthLayout from "../pages/auth/AuthLayout.jsx";
import Register from "../pages/auth/Register.jsx";
import Home from "../pages/home-page/Home.jsx";
import Layout from "./Layout.jsx";
import Products from "../pages/products-page/Products.jsx";
import SingleProduct from "../pages/single-product-page/SingleProduct.jsx";
import Favorites from "../pages/favorites-page/Favorites.jsx";
import Cart from "../pages/cart-page/Cart.jsx";
const Routes = createBrowserRouter([
    {
        path:"/",
        element:<App/>,
        children:[
            {
                path:"/auth",
                element:<AuthLayout/>,
                children:[
                    {index:true,element:<Login/>},
                    {path:"/auth/login",element:<Login/>},
                    {path:"/auth/register",element:<Register/>}
                ]
            },
            {
                path:"/",
                element:<Layout/>,
                children:[
                    {index: true, element: <Home/>},
                    {path: "/home",element: <Home/>},
                    {path: "/products",element: <Products/>},
                    {path: "/product/:productId",element: <SingleProduct/>},
                    {path: "/favorites",element: <Favorites/>},
                    {path: "/cart",element: <Cart/>}
                ]
            }
        ]
    }
]);
export default Routes;
