import {createBrowserRouter, redirect} from "react-router-dom";
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
import {JWTdecoder} from "../utils/JWTdecoder.js";
import Error404 from "../pages/404/Error404.jsx";

const Routes = createBrowserRouter([
   {
      path: "/",
      element: <App/>,
      errorElement: <Error404/>,
      children: [
         {
            path: "/auth",
            element: <AuthLayout/>,
            loader: () => {
               const token = localStorage.getItem("token");
               if (token) {
                  const decodedToken = JWTdecoder(token);
                  const {exp} = decodedToken;
                  const now = Date.now() / 1000;
                  if (exp && exp > now) {
                     return redirect("/");
                  }
               }
               return null;
            },
            children: [
               {index: true, element: <Login/>},
               {path: "/auth/login", element: <Login/>},
               {path: "/auth/register", element: <Register/>}
            ]
         },
         {
            path: "/",
            element: <Layout/>,
            loader: () => {
               const token = localStorage.getItem("token");
               if (token) {
                  const decodedToken = JWTdecoder(token);
                  const {exp} = decodedToken;
                  const now = Date.now() / 1000;
                  if (!exp || exp < now) {
                     localStorage.removeItem("token");
                     return redirect("/auth");
                  }
                  return null;
               }
               return redirect("/auth");
            },
            children: [
               {index: true, element: <Home/>},
               {path: "/home", element: <Home/>},
               {path: "/products", element: <Products/>},
               {path: "/product/:productId", element: <SingleProduct/>},
               {path: "/favorites", element: <Favorites/>},
               {path: "/cart", element: <Cart/>}
            ]
         }
      ]
   }
]);
export default Routes;
