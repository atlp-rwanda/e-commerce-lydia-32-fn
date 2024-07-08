import React from "react";
import { SlUser } from "react-icons/sl";
import { useSelector } from "react-redux";
const Profile: React.FC = () => {
    const { userInfo } = useSelector((state: any) => state.auth);
  return (
    <div className="min-h-screen bg-white py-12">
      <div
        className="w-full h-64  grid mt-20 place-content-center "
        style={{ backgroundImage: "url('./Background.jpg')" }}
      >
        <h5 className="font-bold text-white text-3xl">MY ACCOUNT</h5>
      </div>
      <div className="flex flex-row justify-around mt-24 ">
        <div className=" flex flex-col text-start">
          <div className="flex flex-col mb-11">
            <SlUser className="text-6xl border-solid rounded-full text-black bg-slate-400 mb-3" />
            <h5 className="font-bold">HELLO</h5>
            <p className="font-light text-slate-400">{userInfo.user.firstname}</p>
          </div>
          <div className="flex flex-col font-sans text-gray-400">
            <p>Dashboard</p>
            <p>Orders</p>
            <p>Account Details</p>
            <p>Edit Profile</p>
            <p>Logout</p>
          </div>
        </div>
        <div className="flex flex-col">
          <div>
            <p className="font-semibold">First Name</p>
            <input
              type="text"
              value={userInfo.user.firstname}
              className="border border-gray-400 text-gray-500  bg-white rounded min-w-96   p-1  pr-96 mb-4"
              disabled
            />
            <p className="font-semibold">Last Name</p>
            <input
              type="text"
              value={userInfo.user.othername}
              className="border border-gray-400 text-gray-500  bg-white rounded min-w-96   p-1  pr-96 mb-4"
              disabled
            />
            <p className="font-semibold">Email</p>
            <input
              type="text"
              value={userInfo.user.email}
              className="border border-gray-400 text-gray-500  bg-white rounded min-w-96   p-1  pr-96 mb-4"
              disabled
            />
            <p className="font-semibold">Phone Number</p>
            <input
              type="text"
              value={userInfo.user.phone}
              className="border border-gray-400 text-gray-500  bg-white  rounded min-w-96   p-1  pr-96 mb-4"
              disabled
            />
          </div>
          <div>
            <h5 className="text-center font-bold  bg-white text-xl my-3">
              Address
            </h5>
            <p className="font-semibold">Country</p>
            <input
              type="text"
              value={userInfo.user.country}
              className="border border-gray-400 text-gray-500  bg-white rounded min-w-96   p-1  pr-96 mb-4"
              disabled
            />
            <p className="font-semibold">City</p>
            <input
              type="text"
              value={userInfo.user.city}
              className="border border-gray-400 text-gray-500  bg-white rounded min-w-96   p-1  pr-96 mb-4"
              disabled
            />
            <p className="font-semibold">Street</p>
            <input
              type="text"
              value={userInfo.user.street}
              className="border border-gray-400 text-gray-500  bg-white rounded min-w-96   p-1  pr-96 mb-4"
              disabled
            />
            <p className="font-semibold">Postal code</p>
            <input
              type="number"
              value={userInfo.user.Postal}
              className="border border-gray-400 text-gray-500 bg-white rounded min-w-96   p-1  pr-96 mb-4"
              disabled
            />
          </div>
          <div>
            <h5 className="text-center font-bold  bg-white text-xl my-3">
              Change Password
            </h5>
            <p className="font-semibold">Old Password</p>
            <input
              type="password"
              className="border border-gray-400 text-gray-500 rounded  bg-white min-w-96    p-1 pr-96  mb-4"
              disabled
            />
            <p className="font-semibold">New Password</p>
            <input
              type="password"
              className="border border-gray-400 text-gray-500 rounded  bg-white min-w-96   p-1  pr-96 mb-4"
              disabled
            />
          </div>
          <button className="bg-black w-32 text-white p-2 hover:text-gray-400 hover:bg-slate-900">
            Save Changes
          </button>
        </div>
      </div>
    </div>
  );
};

export default Profile;
