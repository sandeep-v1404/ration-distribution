import React, { useState } from "react";
import { functions } from "../appwrite/config";

const CreateItem = () => {
  const [product, setProduct] = useState({
    productName: "",
    quantity: null,
    APL_Price: null,
    BPL_Price: null,
  });

  const createProductInDB = async (e) => {
    e.preventDefault();

    const promise = functions.createExecution(
      process.env.REACT_APP_ITEM_FUNC_ID,
      JSON.stringify(product)
    );

    promise.then(
      function (res) {
        alert("created");
        window.location.reload();
      },
      function (error) {
        console.log(error); // Failure
      }
    );
  };
  return (
    <div className="mx-auto max-w-screen-xl px-4 py-8 sm:px-6 lg:px-8">
      <div className="mx-auto max-w-lg text-center">
        <h1 className="text-2xl font-bold sm:text-3xl">Create Item</h1>
      </div>

      <form className="mx-auto mt-8 mb-0 max-w-md space-y-4">
        <div>
          <label
            htmlFor="product"
            className="block text-sm font-medium text-gray-700"
          >
            Product Name
          </label>

          <div className="relative">
            <input
              type="text"
              className="w-full rounded-lg border-gray-200 p-4 pr-12 text-sm shadow-sm"
              placeholder="Enter Product Name"
              required
              onChange={(e) =>
                setProduct({
                  ...product,
                  productName: e.target.value,
                })
              }
            />
          </div>
        </div>

        <div>
          <label
            htmlFor="quantity"
            className="block text-sm font-medium text-gray-700"
          >
            Quantity
          </label>
          <div className="relative">
            <input
              type="number"
              className="w-full rounded-lg border-gray-200 p-4 pr-12 text-sm shadow-sm"
              placeholder="Enter Quantity"
              onChange={(e) =>
                setProduct({
                  ...product,
                  quantity: e.target.value,
                })
              }
            />
          </div>
        </div>

        <div>
          <label
            htmlFor="APL_Price"
            className="block text-sm font-medium text-gray-700"
          >
            APL Price
          </label>
          <div className="relative">
            <input
              type="number"
              className="w-full rounded-lg border-gray-200 p-4 pr-12 text-sm shadow-sm"
              placeholder="Enter APL Price"
              onChange={(e) =>
                setProduct({
                  ...product,
                  APL_Price: e.target.value,
                })
              }
            />
          </div>
        </div>

        <div>
          <label
            htmlFor="BPL_Price"
            className="block text-sm font-medium text-gray-700"
          >
            BPL Price
          </label>
          <div className="relative">
            <input
              type="number"
              className="w-full rounded-lg border-gray-200 p-4 pr-12 text-sm shadow-sm"
              placeholder="Enter BPL Price"
              onChange={(e) =>
                setProduct({
                  ...product,
                  BPL_Price: e.target.value,
                })
              }
            />
          </div>
        </div>

        <div className="flex items-center justify-between">
          <button
            onClick={createProductInDB}
            type="submit"
            className="ml-3 inline-block rounded-lg bg-blue-500 px-5 py-3 text-sm font-medium text-white"
          >
            Create
          </button>
        </div>
      </form>
    </div>
  );
};

export default CreateItem;
