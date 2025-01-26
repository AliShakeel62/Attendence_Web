import { useState } from "react";
import reactLogo from "./assets/react.svg";
import viteLogo from "/vite.svg";
import "../node_modules/bootstrap/dist/css/bootstrap-grid.min.css"
import Sidemenu from "./Component/menu";
import {createBrowserRouter , RouterProvider} from "react-router-dom"
import "./App.css";
import Navbar from "./Component/Navbar";
import Home from "./Pages/Home";
import About from "./Pages/About";
import Error from "./Pages/Error";
import AddClasses from "./Pages/AddClasses";


function App() {
 const router = createBrowserRouter([
  {
    path: "/",
    element:<Home/>
  },
  {
    path: "/about",
    element:<About/>
  },
  {
    path:"/*",
    element:<Error/>
  }
  ,
  {
    path:"/addclasses",
    element:<AddClasses/>
  }
  

 ])
 return <>
 
<RouterProvider router={router}/>
  
  </>;
}

export default App;

