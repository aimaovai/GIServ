import React from "react";
import { useState } from "react";
import logo from "./images/logo.png";
import "./App.css";
import Layout from "./components/SideNav";
import {
  BrowserRouter,
  Link,
  Route,
  Routes,
  useLocation,
} from "react-router-dom";
import Dashboard from "./pages/Dashboard";
import Employee from "./pages/Employee";
import Product from "./pages/Product";
import Vendor from "./pages/Vendor";
import SideNav from "./components/SideNav";
import Order from "./pages/Order";
import Login from "./pages/Login";
import Vehicle from "./pages/Vehicle";

function App() {
  const [loggedIn, setLoggedIn] = useState(0);

  return (
    <BrowserRouter>
      <div className="flex h-full">
        <SideNav />
        <div className="w-full">
          <Routes>
            <Route path="/" element={<Login />} />
            <Route path="/dashboard" element={<Dashboard />} />
            <Route path="/employee" element={<Employee />} />
            <Route path="/order" element={<Order />} />
            <Route path="/product" element={<Product />} />
            <Route path="/vendor" element={<Vendor />} />
            <Route path="/vehicles" element={<Vehicle />} />
          </Routes>
        </div>
      </div>
    </BrowserRouter>
  );
}

export default App;
