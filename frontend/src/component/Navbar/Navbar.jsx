import { Avatar, Badge, IconButton } from "@mui/material";
import React from "react";
import SearchIcon from "@mui/icons-material/Search";
import ShoppingCartIcon from "@mui/icons-material/ShoppingCart";
import "./Navbar.css";
import { useNavigate } from "react-router-dom";
import { Person } from "@mui/icons-material";
import { useSelector } from "react-redux";

const Navbar = () => {

  const {auth, cart} = useSelector(store=>store)
  
  const navigate = useNavigate();

  const handleAvatarClick = () => {
    if(auth.user?.role==="ROLE_CUSTOMER"){
      navigate("/my-profile")
    }
    else {
      navigate("/admin/restaurants")
    }
  }

  return (
    <div className="px-5 z-50 py-[0.8rem] bg-[#e91e63] lg:px-20 flex justify-between sticky top-0 left-0 w-full shadow-md">
      <div className="lg:mr-10 cursor-pointer flex items-center space-x-4">
        <li onClick={()=>navigate("/")} className="logo font-semibold text-gray-200 text-2xl">
          Berlin Food
        </li>
      </div>
      <div className="flex items-center space-x-2 lg:space-x-10">
        <div className="">
          <IconButton>
            <SearchIcon sx={{ fontSize: "1.5rem" }} />
          </IconButton>
        </div>
        <div className="">
          {auth.user ? <Avatar onClick={handleAvatarClick} sx={{ bgcolor: "white", color: "#ff69b4", cursor:"pointer" }}>{auth.user?.fullName[0].toUpperCase()}</Avatar>
           : <IconButton onClick={()=>navigate("/account/login")}>
              <Person/>
            </IconButton>}
        </div>
        <div className="">
          <IconButton onClick={()=>navigate("/cart")}>
          <Badge color="primary" badgeContent={cart.cart?.items.length}>
            <ShoppingCartIcon sx={{ fontSize: "1.5rem" }} />
          </Badge>
          </IconButton>
        </div>
      </div>
    </div>
  );
};

export default Navbar;
