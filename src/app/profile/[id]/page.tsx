"use client";
import axios from "axios";
import { useRouter } from "next/navigation";
import React, { useEffect, useState } from "react";
import toast from "react-hot-toast";

const UserProfile = ({ params }: any) => {
  const [userdata, setUserData] = useState<any>({});
  const router = useRouter();
  const handleLogout = async () => {
    try {
      await axios.get("/api/users/logout");
      toast.success("User logged out successfully");
      localStorage.clear();
      router.push("/login");
    } catch (error) {
      console.log(error);
      toast.error("Some kind of error occured");
    }
  };
  const getProfile = async () => {
    try {
      const response = await axios.get("/api/users/me");
      console.log(response?.data?.data);
      toast.success("fetched all the user data");
      localStorage.setItem("userData", JSON.stringify(response?.data?.data));
    } catch (e: any) {
      toast.error(e.message as string);
    }
  };
  useEffect(() => {
    console.log("Triggered");
    getProfile();
    const data = localStorage.getItem("userData") || null;
    if (data) {
      const parsedData = JSON.parse(data);
      setUserData(parsedData);
    }
  }, []);

  return (
    <div>
      <div>This is User Profile {params.id}</div>
      <div className="w-full flex flex-col text-center text-white font-semibold">
        {console.log(userdata)}
        {userdata?.userName}
      </div>
      <button
        className="p-3 bg-blue-200 text-black rounded-xl"
        onClick={handleLogout}>
        Logout
      </button>
    </div>
  );
};
export default UserProfile;
