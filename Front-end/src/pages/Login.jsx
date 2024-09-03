import React, { useState } from "react";
import { useNavigate } from "react-router-dom";
import logo2 from "../images/logo2.png";

export default function Login() {
  // const navigate = useNavigate();

  const [details, setDetails] = useState({
    id: null,
    passwordd: null,
  });

  const login = () => {
    if (details.id === "1" && details.password === "admin") {
      localStorage.setItem("loggedin", "true");
      location.href = "/dashboard";
    } else {
      alert("wrong password");
    }
  };

  return (
    <div data-testid="login" className="h-screen bg-gradient-to-b from-red-500 to-purple-700 w-full flex justify-center items-center">
      <div className="flex flex-col gap-6 bg-neutral-900 p-20 text-center rounded-lg">
        <div className="flex h-16 justify-center">
          <img src={logo2} />
        </div>
        <p className="text-white">Dashboard Login</p>
        <input
          placeholder="Id"
          onChange={(e) => setDetails({ ...details, id: e.target.value })}
          className="h-10 outline-none bg-neutral-700 text-center text-white rounded-md"
        />
        <input
          type="password"
          placeholder="password"
          onChange={(e) => setDetails({ ...details, password: e.target.value })}
          className="h-10 outline-none bg-neutral-700 text-center text-white rounded-md"
        />
        <button
          className="bg-indigo-900 h-10 rounded-md text-white text-sm text-center"
          onClick={() => login()}
        >
          Login
        </button>
      </div>
    </div>
  );
}
