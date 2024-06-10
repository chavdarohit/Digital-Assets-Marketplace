"use client";
import { Label } from "@radix-ui/react-dropdown-menu";
import axios from "axios";
import { Input } from "@/components/ui/input";
import React from "react";
import { useState } from "react";
import { useEffect } from "react";

const UserDetails = ({ userId }) => {
  const [userDetails, setUserDetails] = useState(null);

  const getUserDetails = async () => {
    const data = await axios.get(`http://localhost:5001/user/${userId}`);
    console.log("here in data : ", data);
    setUserDetails(data?.data?.user);
  };

  useEffect(() => {
    getUserDetails();
  }, []);

  return (
    <>
      {userDetails ? (
        <div className="container relative flex pt-4 pb-4 flex-col items-center justify-center lg:px-0">
          <div className="mx-auto flex w-full flex-col justify-center space-y-4 sm:w-[350px]">
            <div className="flex flex-col items-center text-center">
              <h1 className="text-2xl font-semibold tracking-tight">Profile</h1>
            </div>

            <div className="grid gap-6">
              <form>
                <div className="grid gap-2">
                  <div className="grid gap-1 py-2">
                    <Label htmlFor="name">Name</Label>
                    <Input value={userDetails?.name} disabled />
                  </div>
                  <div className="grid gap-1 py-2">
                    <Label htmlFor="number">Phone Number</Label>
                    <Input value={userDetails?.number} disabled />
                  </div>
                  <div className="grid gap-1 py-2">
                    <Label htmlFor="email">Email</Label>
                    <Input value={userDetails?.email} disabled />
                  </div>

                  <div className="grid gap-1 py-2">
                    <Label htmlFor="email">Role</Label>
                    <Input value={userDetails?.role} disabled />
                  </div>
                </div>
              </form>
            </div>
          </div>
        </div>
      ) : (
        <div className="container relative flex pt-4 pb-4 flex-col items-center justify-center lg:px-0">
          <div className="bg-white rounded-lg shadow-md p-4 animate-pulse justify-center	align-middle	">
            <div
              className="w-64 h-8 bg-gray-300 rounded mb-2"
              style={{ margin: "20px", width: "500px" }}
            ></div>

            <div
              className="w-full h-6 bg-gray-300 rounded mb-2"
              style={{ margin: "20px", width: "500px" }}
            ></div>
            <div
              className="w-full h-6 bg-gray-300 rounded mb-2"
              style={{ margin: "20px", width: "500px" }}
            ></div>
            <div
              className="w-full h-6 bg-gray-300 rounded"
              style={{ margin: "20px", width: "500px" }}
            ></div>
          </div>
        </div>
      )}
    </>
  );
};

export default UserDetails;
