import React, { useState } from "react";
import { useNavigate } from "react-router-dom";
import { functions } from "../appwrite/config";

const Login = () => {
  const navigate = useNavigate();
  const [user, setUser] = useState({
    aadhar: "",
    password: "",
  });

  const loginUser = async (e) => {
    e.preventDefault();

    const promise = functions.createExecution(
      process.env.REACT_APP_LOGIN_FUNC_ID,
      JSON.stringify(user)
    );

    promise.then(
      function (res) {
        if (JSON.parse(res.response).token) {
          localStorage.setItem("profile", res.response);
          navigate("/purchase-items", { replace: true }); //success
        } else {
          console.log(res);
        }
      },
      function (error) {
        console.log(error); // Failure
      }
    );
  };
  return (
    <div className="mx-auto max-w-screen-xl px-4 py-8 sm:px-6 lg:px-8">
      <div className="mx-auto max-w-lg text-center">
        <h1 className="text-2xl font-bold sm:text-3xl">Login</h1>

        <p className="mt-4 text-gray-500">Login</p>
      </div>

      <form className="mx-auto mt-8 mb-0 max-w-md space-y-4">
        <div>
          <label
            htmlFor="aadhar"
            className="block text-sm font-medium text-gray-700"
          >
            Aadhar
          </label>

          <div className="relative">
            <input
              type="number"
              className="w-full rounded-lg border-gray-200 p-4 pr-12 text-sm shadow-sm"
              placeholder="Enter Aadhar number"
              required
              onChange={(e) =>
                setUser({
                  ...user,
                  aadhar: e.target.value,
                })
              }
            />
          </div>
        </div>

        <div>
          <label
            htmlFor="password"
            className="block text-sm font-medium text-gray-700"
          >
            Password
          </label>
          <div className="relative">
            <input
              type="password"
              className="w-full rounded-lg border-gray-200 p-4 pr-12 text-sm shadow-sm"
              placeholder="Enter password"
              onChange={(e) =>
                setUser({
                  ...user,
                  password: e.target.value,
                })
              }
            />
          </div>
        </div>

        <div className="flex items-center justify-between">
          <p
            className="text-sm text-gray-500 underline cursor-pointer"
            onClick={() => navigate("/")}
          >
            No account? Signup
          </p>

          <button
            onClick={loginUser}
            type="submit"
            className="ml-3 inline-block rounded-lg bg-blue-500 px-5 py-3 text-sm font-medium text-white"
          >
            Sign in
          </button>
        </div>
      </form>
    </div>
  );
};

export default Login;
