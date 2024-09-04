import React from "react";
import BtnPrimary from "./BtnPrimary";
import { useNavigate } from "react-router-dom";

import axios from "axios";

const Navbar = () => {
  const navigate = useNavigate();

  const handleLogout = async () => {
    try {
      const res = await axios.get("http://localhost:9000/auth/logout", {
        withCredentials: true,
      });
      if (res.status === 200) {
        navigate("/login");
      }
    } catch (err) {
      console.log(err);
    }
  };
  return (
    <div className="bg-white shadow h-14 py-2 text-right px-3">
      <BtnPrimary onClick={handleLogout}>Log Out</BtnPrimary>
    </div>
  );
};

export default Navbar;
