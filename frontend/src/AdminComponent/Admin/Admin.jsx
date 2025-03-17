import React, { useEffect, useState } from "react";
import AdminSideBar from "./AdminSideBar";
import { Route, Routes } from "react-router-dom";
import Orders from "../Orders/Orders";
import Menu from "../Menu/Menu";
import FoodCategory from "../FoodCategory/FoodCategory";
import Ingredients from "../Ingredients/Ingredients";
import Events from "../Events/Events";
import RestaurantDetails from "./RestaurantDetails";
import RestaurantDashboard from "../Dashboard/Dashboard";
import CreateMenuForm from "../Menu/CreateMenuForm";
import { IconButton } from "@mui/material";
import MenuIcon from "@mui/icons-material/Menu";
import { useDispatch, useSelector } from "react-redux";
import {
  getRestaurantById,
  getRestaurantsCategory,
} from "../../component/State/Restaurant/Action";
import { getMenuItemsByRestaurantId } from "../../component/State/Menu/Action";
import { fetchRestaurantOrder } from "../../component/State/RestaurantOrder/Action";

const Admin = () => {
  const dispatch = useDispatch();
  const jwt = localStorage.getItem("jwt");
  const { restaurant } = useSelector((store) => store);
  const [isSidebarOpen, setIsSidebarOpen] = useState(false);

  const handleSidebarToggle = () => {
    setIsSidebarOpen(!isSidebarOpen);
  };

  useEffect(() => {
    dispatch(
      getRestaurantsCategory({
        jwt,
        restaurantId: restaurant.usersRestaurant?.id,
      })
    );
    dispatch(
      fetchRestaurantOrder({
        jwt,
        restaurantId: restaurant.usersRestaurant?.id
      })
    );
  }, []);

  return (
    <div>
      <div className="lg:flex justify-between">
        <div>
          <IconButton onClick={handleSidebarToggle} className="lg:hidden">
            <MenuIcon />
          </IconButton>
          <AdminSideBar
            handleClose={handleSidebarToggle}
            isSidebarOpen={isSidebarOpen}
          />
        </div>
        <div className="lg:w-[80%]">
          <Routes>
            <Route path="/" element={<RestaurantDashboard />}></Route>
            <Route path="/orders" element={<Orders />}></Route>
            <Route path="/menu" element={<Menu />}></Route>
            <Route path="/category" element={<FoodCategory />}></Route>
            <Route path="/ingredients" element={<Ingredients />}></Route>
            <Route path="/event" element={<Events />}></Route>
            <Route path="/details" element={<RestaurantDetails />}></Route>
            <Route path="/add-menu" element={<CreateMenuForm />}></Route>
          </Routes>
        </div>
      </div>
    </div>
  );
};

export default Admin;
