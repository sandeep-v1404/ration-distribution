import React, { useState } from "react";
import { databases } from "../appwrite/config";

const PurchaseItems = () => {
  const [products, setProducts] = useState([]);
  const promise = databases.listDocuments(
    "63eff2cce2b2bbd0b4c2",
    "63f243eedcd5d800f8b7"
  );
  promise.then(
    function (response) {
      setProducts(response.documents);
    },
    function (error) {
      console.log(error);
    }
  );
  return (
    <div class="p-6 overflow-x-auto">
      <table class="min-w-full divide-y-2 divide-gray-200 text-sm">
        <thead>
          <tr>
            <th class="whitespace-nowrap px-4 py-2 text-left font-medium text-gray-900">
              Product
            </th>
            <th class="whitespace-nowrap px-4 py-2 text-left font-medium text-gray-900">
              Quantity
            </th>
            <th class="whitespace-nowrap px-4 py-2 text-left font-medium text-gray-900">
              APL Price
            </th>
            <th class="whitespace-nowrap px-4 py-2 text-left font-medium text-gray-900">
              BPL Price
            </th>
            <th class="px-4 py-2"></th>
          </tr>
        </thead>

        <tbody class="divide-y divide-gray-200">
          {products.map((product) => (
            <tr>
              <td class="whitespace-nowrap px-4 py-2 font-medium text-gray-900">
                {product.productName}
              </td>
              <td class="whitespace-nowrap px-4 py-2 text-gray-700">
                {product.quantity}
              </td>
              <td class="whitespace-nowrap px-4 py-2 text-gray-700">
                {product.APL_Price}
              </td>
              <td class="whitespace-nowrap px-4 py-2 text-gray-700">
                {product.BPL_Price}
              </td>
              <td class="whitespace-nowrap px-4 py-2">
                <a
                  href="#"
                  class="inline-block rounded bg-indigo-600 px-4 py-2 text-xs font-medium text-white hover:bg-indigo-700"
                >
                  View
                </a>
              </td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
};

export default PurchaseItems;
