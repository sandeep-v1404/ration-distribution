import { Routes, Route, useNavigate } from "react-router-dom";
import Home from "./components/Home";
import Home2 from "./components/Home2";
import Login from "./components/Login";
import PurchaseItems from "./components/PurchaseItems";
import RegisterAsUser from "./components/RegisterAsUser";
import RegisterAsVendor from "./components/RegisterAsVendor";
import UpdateUserInfo from "./components/UpdateUserInfo";
import { functions } from "./appwrite/config";
import { useEffect } from "react";
import ProtectedRoute from "./route/ProtectedRoute";
import Navbar from "./components/Navbar";

export default function App() {
  const navigate = useNavigate();
  useEffect(() => {
    const promise = functions.createExecution(
      process.env.REACT_APP_AUTH_FUNC_ID,
      localStorage.getItem("profile")
    );
    promise.then((data) => {
      console.log(JSON.parse(data.response).success);
      if (!JSON.parse(data.response).success) {
        navigate("/", { replace: true });
      }
    });
  }, []);

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
      </Routes>
    </>
  );
}
