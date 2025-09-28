import React from "react";
import Navbar from "./Component/Navbar/Navbar";
import { createBrowserRouter, RouterProvider } from "react-router-dom"; // ✅ لازم dom
import Layout from "./Component/Layout/Layout";
import Login from "./Component/Login/Login";
import Register from "./Component/Register/Register";
import "react-toastify/dist/ReactToastify.css";
import { ToastContainer } from "react-toastify";
import Home from "./Component/Home/Home";
import ProtectedRoute from "./Component/ProtectedRoute/ProtectedRoute";
import GardRoute from "./Component/GardRoute/GardRoute";
import TokenProvider from "./Component/Context/Token.context";
import CartProvider from "./Component/Context/Cart.context";
import Cart from "./Component/Cart/Cart";
import ProductDetails from "./Component/productDetails/ProductDetails";
import CheckOut from "./Component/CheckOut/CheckOut";
import Order from "./Component/Order/Order";
import { QueryClient, QueryClientProvider } from "@tanstack/react-query";
import Products from "./Component/Products/Products";
import WhishList from "./Component/whishList/WhishList";
import Brands from "./Component/brands/Brands";
import BrandsDetails from "./Component/brandsDetails/BrandsDetails";
import Categories from "./Component/Categories/Categories";



export default function App() {
  const routes = createBrowserRouter([
    {
      path: "",
      element: (
        <ProtectedRoute>
          <Layout />
        </ProtectedRoute>
      ),
      children: [
        { index:true, element: <Home /> },
        { path:'home', element: <Home /> },
        { path: "products", element: <Products/> },
        { path: "categories", element: <Categories/> },
        { path: "cart", element: <Cart/>},
        { path: "checkout", element: <CheckOut/>},
        { path: "allOrder", element: <Order/>},
       {path:'whishlist',element:<WhishList/>},
        { path: "brands", element: <Brands/>},
        { path: "brandsDetails/:id", element: <BrandsDetails/>},
        { path: "productDetails/:id", element: <ProductDetails/>},
      ],
    },
    {
      path: "",
      element: (
        <GardRoute>
          <Layout />
        </GardRoute>
      ),
      children: [
        { path: "login", element: <Login /> },
        { path: "register", element: <Register /> },
      ],
    },
  ]);

  const queryClient= new QueryClient()

 
  return (

    <>

    <QueryClientProvider client={queryClient}>

          <TokenProvider>
      <CartProvider>
        <RouterProvider router={routes} />
        <ToastContainer position="top-center" autoClose={2000} />
      </CartProvider>
    </TokenProvider>


    </QueryClientProvider>

    
    


    
    
    </>




  );
}
