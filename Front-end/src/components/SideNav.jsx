import React, { useEffect, useState } from "react";
import { Link, useLocation } from "react-router-dom";
import logo from "../images/logo.png";
import logo2 from "../images/logo2.png";
import dash from "../images/Icon material-dashboard.svg";
import vendorsicon from "../images/Icon awesome-handshake.svg";
import ordersicon from "../images/Icon awesome-shopping-basket.svg";
import employeeicon from "../images/Icon ionic-md-person.svg";
import producticon from "../images/Icon map-food.svg";
import lougouticon from "../images/Icon ionic-ios-log-out.svg";
import van from "../images/Icon awesome-shuttle-van.svg";

export default function SideNav({ children }) {
  const [loggedin, setLoggedin] = useState(false);

  const location = useLocation();
  useEffect(() => {
    if (location.pathname !== "/") {
      setLoggedin(true);
    }
  }, []);

  return loggedin ? (
    <div className="w-48 bg-black">
      <div className="flex flex-col min-h-screen gap-4 mx-3 my-10">
      <div className="flex justify-center"><img src={logo} /></div>
      <div className="flex justify-center"><img src={logo2} /></div>
        <div
          className={`flex justify-between p-3 text-center rounded-md ${
            location.pathname.includes("dashboard")
              ? `bg-neutral-700 text-white`
              : `text-white bg-black`
          }`}
        >
          <Link to="/dashboard">Dashboard</Link>
          <img
            src={dash}
            height="25px"
            width="25px"
          />
        </div>
        <div
          className={`flex justify-between p-3 text-center rounded-md ${
            location.pathname.includes("vendor")
              ? `bg-neutral-700 text-white`
              : `text-white bg-black`
          }`}
        >
          <Link to="/vendor">Vendors</Link>
          <img
            src={vendorsicon}
            height="25px"
            width="25px"
          />
        </div>
        <div
          className={`flex justify-between p-3 text-center rounded-md ${
            location.pathname.includes("order")
              ? `bg-neutral-700 text-white`
              : `text-white bg-black`
          }`}
        >
          <Link to="/order">Orders</Link>
          <img
            src={ordersicon}
            height="25px"
            width="25px"
          />
        </div>

        <div
          className={`flex justify-between p-3 text-center rounded-md ${
            location.pathname.includes("employee")
              ? `bg-neutral-700 text-white`
              : `text-white bg-black`
          }`}
        >
          <Link to="/employee">Employees</Link>
          <img
            src={employeeicon}
            height="25px"
            width="25px"
          />
        </div>

        <div
          className={`flex justify-between p-3 text-center rounded-md ${
            location.pathname.includes("vehicles")
              ? `bg-neutral-700 text-white`
              : `text-white bg-black`
          }`}
        >
          <Link to="/vehicles">Vehicles</Link>
          <img
            src={van}
            height="25px"
            width="25px"
          />
        </div>

        <div
          className={`flex justify-between p-3 text-center rounded-md ${
            location.pathname.includes("product")
              ? `bg-neutral-700 text-white`
              : `text-white bg-black`
          }`}
        >
          <Link to="/product">Products</Link>
          <img
            src={producticon}
            height="25px"
            width="25px"
          />
        </div>

        <div
          className={`flex justify-between p-3 text-center rounded-md ${
            location.pathname.includes("logout")
              ? `bg-neutral-700 text-white`
              : `text-white bg-black`
          }`}
        >
          <Link
            to="/"
            onClick={() => {
              localStorage.removeItem("loggedin");
              setLoggedin(false);
            }}
          >
            Logout
          </Link>
          <img
            src={lougouticon}
            height="25px"
            width="25px"
          />
        </div>
      </div>
    </div>
  ) : (
    ""
  );
}
