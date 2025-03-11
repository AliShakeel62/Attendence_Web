import { useState } from "react";
import reactLogo from "./assets/react.svg";
import viteLogo from "/vite.svg";
import "../node_modules/bootstrap/dist/css/bootstrap-grid.min.css"
import Sidemenu from "./Component/menu";
import {createBrowserRouter , RouterProvider} from "react-router-dom"
import "./App.css";
import Navbar from "./Component/Navbar";
import Home from "./Pages/Home";
import About from "./Pages/AddStudent";
import Error from "./Pages/Error";
import AddClasses from "./Pages/AddClasses";
import Teacher from "./Pages/Teacher";
import AddStudent from "./Pages/AddStudent";


function App() {
 const router = createBrowserRouter([
  {
    path: "/",
    element:<Home/>
  },
  {
    path: "/addstudent",
    element:<AddStudent/>
  },
  {
    path:"/*",
    element:<Error/>
  }
  ,
  {
    path:"/addclasses",
    element:<AddClasses/>
  },
  {
    path:"/teacher",
    element:<Teacher/>
  }
  

 ])
 return <>
 
<RouterProvider router={router}/>
  
  </>;
}

export default App;

