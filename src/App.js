import React from "react";
import { Routes, Route } from "react-router-dom";
import Home from "./components/Home";
import Home2 from "./components/Home2";
import Login from "./components/Login";
import PurchaseItems from "./components/PurchaseItems";
import RegisterAsUser from "./components/RegisterAsUser";
import RegisterAsVendor from "./components/RegisterAsVendor";
import UpdateUserInfo from "./components/UpdateUserInfo";
import Navbar from "./components/Navbar";
import CreateItem from "./components/CreateItem";

export default function App() {
  return (
    <>
      <Navbar />
      <Routes>
        <Route path="/" element={<Home />} />
        <Route path="/signup-user" element={<RegisterAsUser />} />
        <Route path="/signup-vendor" element={<RegisterAsVendor />} />
        <Route path="/login" element={<Login />} />
        <Route path="/purchase-items" element={<PurchaseItems />} />
        <Route path="/test" element={<Home2 />} />
        <Route path="/profile" element={<UpdateUserInfo />} />
        <Route path="/create-item" element={<CreateItem />} />
      </Routes>
    </>
  );
}
