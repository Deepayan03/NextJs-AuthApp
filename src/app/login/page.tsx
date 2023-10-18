"use client";
import Link from "next/link";
import React, { useState } from "react";
import axios from "axios";
import toast from "react-hot-toast";
import { useRouter } from "next/navigation";
const LoginPage = () => {
  const router = useRouter();
  interface Users {
    email: string;
    password: string;
  }
  const [userDetails, setUserDetails] = useState<Users>({
    email: "",
    password: "",
  });
  const handleInputChange = (e: any) => {
    const { name, value } = e.target;
    setUserDetails({
      ...userDetails,
      [name]: value,
    });
  };
  const handleLogin = async (e: any) => {
    // e.preventDefault();
    const { email, password } = userDetails;
    try {
      if (!email || !password) {
        toast.error("All fields are mandatory");
        return;
      }
      const res = await axios.post("/api/users/login", { email, password });
      toast.success("User logged in successfully");
      res && localStorage.setItem("userDetails", JSON.stringify(res.data.data));
      router.push(`/profile/${res?.data?.data?._id}`);
    } catch (error) {
      console.log(error);
    }
  };
  return (
    <div className="bg-grey-lighter min-h-screen flex flex-col">
      <div className="container max-w-sm mx-auto flex-1 flex flex-col items-center justify-center px-2">
        <div className="bg-white px-6 py-8 rounded shadow-md text-black w-full">
          <h1 className="mb-8 text-3xl text-center">Log in</h1>

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

          <button
            type="submit"
            onClick={handleLogin}
            className="w-full text-center py-3 rounded bg-green-400 text-white hover:bg-green-dark focus:outline-none my-1">
            Login
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
          {" Don't have an account?"}
          <Link href="/signUp">Register</Link>
        </div>
      </div>
    </div>
  );
};

export default LoginPage;
