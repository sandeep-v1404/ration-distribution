import React, { useState } from "react";
import { useNavigate } from "react-router-dom";
import { functions } from "../appwrite/config";
import { ethers,Contract,utils } from 'ethers'
import Web3Modal from 'web3modal'

import axios from 'axios'
import { NFTStorage, File } from 'nft.storage'



const NFT_STORAGE_KEY = 'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJzdWIiOiJkaWQ6ZXRocjoweDgwMjlFMGVFNWVGRmQxZjhGNEI2MjRDODUyQjYwMGFjMkMwNDU2M2UiLCJpc3MiOiJuZnQtc3RvcmFnZSIsImlhdCI6MTY1ODExOTEzNjY1MiwibmFtZSI6IlJ1cGFsaSBTaGFoIn0.lqKHXKG7FWxwaoIBgowQ1wcPgZ8XLdKXZCFYElSdcJQ'


const RegisterAsUser = () => {
  const navigate = useNavigate();
  const [u,setUrl] = useState("");
  const [user, setUser] = useState({
    name: "",
    walletJson: "",
    mobile: null,
    address: "",
    aadhar: null,
    category: "APL",
    password: "",
    type: "user",
  });
  const [f,setF] = useState(null);

  const saveDataBlokchain = async () => {

    let abi = [
      "function verifyString(string, uint8, bytes32, bytes32) public pure returns (address)"
  ];
  
   let provider = ethers.getDefaultProvider("goerli");
  
  // Create a wallet to sign the message with
  ethers.Wallet.fromEncryptedJson(user.walletJson, user.password).then(async function(wallet) {
    console.log("Address: " + wallet.address);
  //   let contractAddress = '0x80F85dA065115F576F1fbe5E14285dA51ea39260';
  // let contract = new Contract(contractAddress, abi, provider);
  let eUrl = utils.keccak256(utils.toUtf8Bytes(u));
  let message = {rNo: user.aadhar,walletAddress: wallet.address,url: eUrl};
  
  // Sign the string message
  let flatSig = await wallet.signMessage(message);
  
  // For Solidity, we need the expanded-format of a signature
  let sig = ethers.utils.splitSignature(flatSig);
  console.log(sig,flatSig);
    // "Address: 0x88a5C2d9919e46F883EB62F7b8Dd9d0CC45bc290"
});
  
  // console.log(wallet.address);
  // "0x14791697260E4c9A71f18484C9f997B308e59325"
  
  
  // Call the verifyString function
  // let recovered = await contract.verifyString(message, sig.v, sig.r, sig.s);
  
  // console.log(recovered);

 
  // "0x14791697260E4c9A71f18484C9f997B308e59325"
  }

  const uploadToIPFS = async () =>{
    const data = JSON.stringify({
    user
   });
   try {
    const nftstorage = new NFTStorage({ token: NFT_STORAGE_KEY });
    const url = await nftstorage.store({
      name: data,
      description: "res",
      image: f
    })
       // run a function that creates sale and passes in th url 
      console.log(url);
      setUrl(url);
   } catch (error) {
       console.log('Error uploading file:', error);
   }
  }
  //Signup
  const signupUser = async (e) => {
    if(f){
      e.preventDefault();
    
      const randomWallet = ethers.Wallet.createRandom();
      console.log(randomWallet);
  
   
   function callback(progress) {
      console.log("Encrypting: " + parseInt(progress * 100) + "% complete");
  }
  
  let encryptPromise =  randomWallet.encrypt(user.password, callback);
  let jData;
  encryptPromise.then(function(json) {
      console.log(json);
  jData = json
     
  setUser({
    ...user,
    walletJson: jData,
  })

  console.log(jData);
  user.walletJson = jData;
     
    
   
     uploadToIPFS();
     
    const promise = functions.createExecution(
      process.env.REACT_APP_SIGNUP_FUNC_ID,
      JSON.stringify(user)
    );

   
    promise.then(
      function (response) {
        saveDataBlokchain();
        console.log(response);
        navigate("/profile", { replace: true }); //success
      }, function (error) {
        console.log(error); // Failure
      }
    );


  
  
  });
  
     
    
     

    }
      };



  return (
    <div className="mx-auto max-w-screen-xl px-4 py-8 sm:px-6 lg:px-8">
      <div className="mx-auto max-w-lg text-center">
        <h1 className="text-2xl font-bold sm:text-3xl">RegisterAsUser</h1>

        <p className="mt-4 text-gray-500">RegisterAsUser</p>
      </div>

      <form className="mx-auto mt-8 mb-0 max-w-md space-y-4">
        <div>
        <label
            htmlFor="name"
            className="block text-sm font-medium text-gray-700"
          >
            Profile Picture
          </label>

        <input type="file"   required onChange={(e)=> {
        setF(e.target.files[0]);
        console.log(e.target.files[0])
      }}></input>
          <label
            htmlFor="name"
            className="block text-sm font-medium text-gray-700"
          >
            Name
          </label>

          <div className="relative">
            <input
              type="text"
              className="w-full mt-2 rounded-lg border-gray-200 p-4 pr-12 text-sm shadow-sm"
              placeholder="Enter name"
              required
              onChange={(e) =>
                setUser({
                  ...user,
                  name: e.target.value,
                })
              }
            />

            <span className="absolute inset-y-0 right-4 inline-flex items-center">
              <svg
                xmlns="http://www.w3.org/2000/svg"
                className="h-5 w-5 text-gray-400"
                fill="none"
                viewBox="0 0 24 24"
                stroke="currentColor"
              >
                <path
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  strokeWidth="2"
                  d="M16 12a4 4 0 10-8 0 4 4 0 008 0zm0 0v1.5a2.5 2.5 0 005 0V12a9 9 0 10-9 9m4.5-1.206a8.959 8.959 0 01-4.5 1.207"
                />
              </svg>
            </span>
          </div>
        </div>

        <div>
          <label
            htmlFor="name"
            className="block text-sm font-medium text-gray-700"
          >
            Mobile
          </label>

          <div className="relative">
            <input
              type="number"
              className="w-full mt-2 rounded-lg border-gray-200 p-4 pr-12 text-sm shadow-sm"
              placeholder="Enter mobile number"
              required
              onChange={(e) =>
                setUser({
                  ...user,
                  mobile: e.target.value,
                })
              }
            />
          </div>
        </div>

        <div>
          <label
            htmlFor="address"
            className="block text-sm font-medium text-gray-700"
          >
            Address
          </label>

          <div className="relative">
            <input
              type="text"
              className="w-full mt-2 rounded-lg border-gray-200 p-4 pr-12 text-sm shadow-sm"
              placeholder="Enter Address"
              required
              onChange={(e) =>
                setUser({
                  ...user,
                  address: e.target.value,
                })
              }
            />

            <span className="absolute inset-y-0 right-4 inline-flex items-center">
              <svg
                xmlns="http://www.w3.org/2000/svg"
                className="h-5 w-5 text-gray-400"
                fill="none"
                viewBox="0 0 24 24"
                stroke="currentColor"
              >
                <path
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  strokeWidth="2"
                  d="M16 12a4 4 0 10-8 0 4 4 0 008 0zm0 0v1.5a2.5 2.5 0 005 0V12a9 9 0 10-9 9m4.5-1.206a8.959 8.959 0 01-4.5 1.207"
                />
              </svg>
            </span>
          </div>
        </div>

        <div>
          <label
            htmlFor="address"
            className="block text-sm font-medium text-gray-700"
          >
            Aadhar
          </label>

          <div className="relative">
            <input
              type="number"
              className="w-full mt-2 rounded-lg border-gray-200 p-4 pr-12 text-sm shadow-sm"
              placeholder="Enter Aadhar Number"
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
            htmlFor="address"
            className="block text-sm font-medium text-gray-700"
          >
            Category
          </label>

          <div className="relative">
            <select
              value={user.category}
              onChange={(e) =>
                setUser({
                  ...user,
                  category: e.target.value,
                })
              }
              id="Currency"
              name="currency"
              className="h-full mt-2 w-full text-gray-500 bg-transparent border-t border-b border-r border-transparent border-gray-300 focus:ring-indigo-500 bo focus:border-indigo-500 pr-7 sm:text-sm rounded-r-md"
            >
              <option key="APL" value={"APL"}>
                APL
              </option>
              <option key="BPL" value={"BPL"}>
                BPL
              </option>
            </select>
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
              className="w-full mt-2 rounded-lg border-gray-200 p-4 pr-12 text-sm shadow-sm"
              placeholder="Enter password"
              onChange={(e) =>
                setUser({
                  ...user,
                  password: e.target.value,
                })
              }
            />

            <span className="absolute inset-y-0 right-4 inline-flex items-center">
              <svg
                xmlns="http://www.w3.org/2000/svg"
                className="h-5 w-5 text-gray-400"
                fill="none"
                viewBox="0 0 24 24"
                stroke="currentColor"
              >
                <path
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  strokeWidth="2"
                  d="M15 12a3 3 0 11-6 0 3 3 0 016 0z"
                />
                <path
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  strokeWidth="2"
                  d="M2.458 12C3.732 7.943 7.523 5 12 5c4.478 0 8.268 2.943 9.542 7-1.274 4.057-5.064 7-9.542 7-4.477 0-8.268-2.943-9.542-7z"
                />
              </svg>
            </span>
          </div>
        </div>

        <div className="flex items-center justify-between">
          <p
            className="text-sm text-gray-500 underline cursor-pointer"
            onClick={() => navigate("/login")}
          >
            Have account? Login
          </p>
          <button
            onClick={signupUser}
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

export default RegisterAsUser;
