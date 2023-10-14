"use client"
import React,{useState} from "react";
import { useRouter } from "next/navigation";
import Link from "next/link";
import axios from "axios"
import toast from "react-hot-toast";
const Signup = () => {
  const router = useRouter();
  const [userDetails , setUserDetails] = useState({
    userName : "",
    email:"",
    password:"",
    confirm_password:""
  });
  const onSignUp=async()=>{
    try {
      const {userName , email ,password} = userDetails;
      console.log(userDetails);
      const response = await axios.post("/api/users/signup" , {userName , email , password});
      console.log(response);
      router.push("/login");
      toast.success("Signup Successful...Please login");
    } catch (error : any) {
      console.log(error);
      toast.error("Couldnt signup")
    }
  }
  const handleInputChange = (e : any)=>{
    const {name , value} = e.target;
    setUserDetails({
      ...userDetails,
      [name] : value
    });
  }
  return (
    <div className="bg-grey-lighter min-h-screen flex flex-col">
      <div className="container max-w-sm mx-auto flex-1 flex flex-col items-center justify-center px-2">
        <div className="bg-white px-6 py-8 rounded shadow-md text-black w-full">
          <h1 className="mb-8 text-3xl text-center">Sign up</h1>
          <input
            type="text"
            onChange={handleInputChange}
            className="block border border-grey-light w-full p-3 rounded mb-4"
            name="userName"
            placeholder="Full Name"
          />

          <input
            type="text"
            onChange={handleInputChange}
            className="block border border-grey-light w-full p-3 rounded mb-4"
            name="email"
            placeholder="Email"
          />

          <input
            type="password"
            onChange={handleInputChange}
            className="block border border-grey-light w-full p-3 rounded mb-4"
            name="password"
            placeholder="Password"
          />
          <input
            type="password"
            onChange={handleInputChange}
            className="block border border-grey-light w-full p-3 rounded mb-4"
            name="confirm_password"
            placeholder="Confirm Password"
          />

          <button
            type="submit"
            onClick={onSignUp}
            className="w-full text-center py-3 rounded bg-green-500 text-white hover:bg-green-800 focus:outline-none my-1">
            Create Account
          </button>

          <div className="text-center text-sm text-grey-dark mt-4">
            By signing up, you agree to the
            <a
              className="no-underline border-b border-grey-dark text-grey-dark"
              href="#">
              Terms of Service
            </a>{" "}
            and
            <a
              className="no-underline border-b border-grey-dark text-grey-dark"
              href="#">
              Privacy Policy
            </a>
          </div>
        </div>

        <div className="text-grey-dark mt-6">
          Already have an account?
         <Link href="/login">
            Log in
            </Link>
          
        </div>
      </div>
    </div>
  );
};

export default Signup;
