import React, { useEffect } from "react";
import { useLocation } from "react-router-dom";

export default function Appbar() {
  const location = useLocation();
  
  useEffect(() => {

  }, []);
  return <div className="p-5 text-3xl text-center capitalize" role="application">{location.pathname.split("/")[1]}</div>;
}
