import React, { useEffect, useState } from "react";
import { SlUser } from "react-icons/sl";
import { useDispatch } from "react-redux";
import { useNavigate } from "react-router-dom";
import { useUpdateUserMutation, useChangePasswordMutation } from "../slices/authSlice/authApiSlice";
import toast from "react-hot-toast";
import { getCredentials } from "../slices/authSlice/authSlice";
const Profile: React.FC = () => {
  const userInfo = JSON.parse(localStorage.getItem("userInfo") as string);
  const navigate = useNavigate();
  const [firstnameError, setFirstnameError] = useState<string | null>(null);
  const [nameError, setothernameError] = useState<string | null>(null);
  const [phoneError, setPhoneError] = useState<string | null>(null);
  const [stateError, setStateError] = useState<string | null>(null);
  const [streetError, setStreetError] = useState<string | null>(null);
  const [cityError, setCityError] = useState<string | null>(null);
  const [countryError, setCountryError] = useState<string | null>(null);
  const dispatch = useDispatch();
  const [updateUser] = useUpdateUserMutation();
  const [changePassword] = useChangePasswordMutation();
  const [firstname, setFirstname] = useState(userInfo.user.firstname);
  const [othername, setOthername] = useState(userInfo.user.othername);
  const [newPassword, setNewPassword] = useState("");
  const [oldPassword, setOldPassword] = useState("");
  const [phone, setPhoneNumber] = useState(userInfo.user.phone);
  const [street, setStreet] = useState(userInfo.user.street);
  const [city, setCity] = useState(userInfo.user.city);
  const [country, setCountry] = useState(userInfo.user.country);
  const [state, setState] = useState(userInfo.user.state);
  const [postalcode, setPostalcode] = useState(userInfo.user.postal_code);
  const [isLoading, setIsLoading] = useState(false);
  const [isChangePassword, setIsChangePassword] = useState(false);

  const validateName = () => {
    if (!firstname || firstname.trim() === "") {
      setFirstnameError("Firstname is required");
      return false;
    }
    const nameRegex = /^[a-zA-Z]+$/;
    if (!nameRegex.test(firstname)) {
      setFirstnameError("Name must contain only letters");
      return false;
    }
    setFirstnameError(null);
    return true;
  };

  const validatePhone = () => {
    const phoneregex = /^[0-9]{10}$/;
    if (!phoneregex.test(phone)) {
      setPhoneError("invalid phone number");
      return false;
    }
    setPhoneError(null);
    return true;
  };

  const validateOtherName = () => {
     const nameRegex =/^[a-zA-Z ]+$/
;
    if (othername!="" && !nameRegex.test(othername)) {
      setothernameError("name must contains only letter");
      return false;
    }
    setothernameError(null);
    return true;
  };
  const validateCity = () => {
     const nameRegex = /^[a-zA-Z ]+$/;
    if (!nameRegex.test(city)) {
      setCityError("city must contains only letter");
      return false;
    }
    setCityError(null);
    return true;
  };
   const validateState = () => {
     const nameRegex = /^[a-zA-Z ]+$/;
     if (!nameRegex.test(state)) {
       setStateError("state must contains only letter");
       return false;
     }
     setStateError(null);
     return true;
   };
    const validateCountry = () => {
      const nameRegex = /^[a-zA-Z ]+$/;
      if (!nameRegex.test(country)) {
        setCountryError("country must contains only letter");
        return false;
      }
      setCountryError(null);
      return true;
    };
     const validateStreet = () => {
       const nameRegex = /^(?=.*[a-zA-Z])(?=.*\d)[a-zA-Z\d\s]+$/;
       if (!nameRegex.test(street)) {
         setStreetError("street must contains only letter");
         return false;
       }
       setStreetError(null);
       return true;
     };
  
  const handleUpdate = async (e: { preventDefault: () => void }) => {
    e.preventDefault();
    setIsLoading(true);
   
    try {
      const res = await updateUser({
        firstname: firstname,
        othername: othername,
        phone: phone,
        street: street,
        city: city,
        country: country,
        state: state,
        postal_code: postalcode,
      }).unwrap();
      dispatch(getCredentials(res));

      setIsLoading(false);
      toast.success(res.message);
    } catch (err: any) {
      const errorMessages = err?.data?.errors || [err.error];

      toast.error(errorMessages[0] || err?.data?.message);

      console.log(errorMessages[0], err?.data?.message);
      console.log(err);
    } finally {
      setIsLoading(false);
    }
  };
  const handleChangepassword= async (e:any)=>{
    e.preventDefault()
    setIsChangePassword(true)
    try {
      const res1 = await changePassword({
        oldPassword,
        newPassword,
      }).unwrap();
      toast.success(res1.message);
      setIsLoading(false);
    } catch (err: any) {
      const errorMessages = err?.data?.errors || [err.error];

      toast.error(errorMessages[0] || err?.data?.message);

      console.log(errorMessages[0], err?.data?.message);
      console.log(err);
    } finally {
      setIsChangePassword(false);
    }
  }
 

  useEffect(() => {
    if (!userInfo || !userInfo.user) {
      navigate("/");
    }
  }, [userInfo, navigate]);
  if (!userInfo || !userInfo.user) {
    return null;
  }

  return (
    <div className="min-h-screen  bg-white py-12">
      <div
        className="w-full h-64  mt-20 place-content-center "
        style={{ backgroundImage: "url('./Background.jpg')" }}
      >
        <h5 className="font-bold text-center text-white text-3xl">MY ACCOUNT</h5>
      </div>
      <div className=" flex flex-col md:flex-row lg:flex-row items-center justify-center lg:justify-around mt-24 ">
        <div className=" flex flex-col text-start">
          <div className="flex items-center justify-center flex-col mb-11">
            <SlUser className="text-center text-6xl border-solid rounded-full text-black bg-slate-400 mb-3" />
            <h5 className="font-bold">HELLO</h5>
            <p className="font-light text-slate-400">
              {userInfo.user.firstname}
            </p>
          </div>
          <div className="lg:flex md:flex md:flex-col lg:flex-col grid grid-cols-2 gap-x-8 font-sans text-gray-400">
            <p>Dashboard</p>
            <p>Orders</p>
            <p>Account</p>
            <p className="font-bold cursor-pointer text-black">Edit Profile</p>
            {/* <p>Logout</p> */}
          </div>
        </div>
        <div className="flex flex-col ">
          <div>
            <div className="mb-4">
              <p className="font-semibold">First Name</p>
              <input
                type="text"
                value={firstname}
                className="border border-gray-400 text-gray-500  bg-white rounded min-w-24   p-1  pr-0 lg:pr-96 "
                onChange={(e) => {
                  setFirstname(e.target.value);
                }}
                onBlur={validateName}
              />
              {firstnameError && (
                <p className="text-red-500">{firstnameError}</p>
              )}
            </div>
            <div className="mb-4">
              <p className="font-semibold">Last Name</p>
              <input
                type="text"
                value={othername}
                className="border border-gray-400 text-gray-500  bg-white rounded min-w-24   p-1  pr-0 lg:pr-96 "
                onChange={(e) => {
                  setOthername(e.target.value);
                }}
                onBlur={validateOtherName}
              />
              {nameError && <p className="text-red-500">{nameError}</p>}
            </div>

            <div className="mb-4">
              <p className="font-semibold">Phone Number</p>
              <input
                type="text"
                value={phone}
                className="border border-gray-400 text-gray-500  bg-white  rounded min-w-24   p-1  pr-0 lg:pr-96 "
                onChange={(e) => {
                  setPhoneNumber(e.target.value);
                }}
                onBlur={validatePhone}
              />
              {phoneError && <p className="text-red-500">{phoneError}</p>}
            </div>
          </div>
          <div>
            <h5 className="text-center font-bold  bg-white text-xl my-3">
              Address
            </h5>
            <div className="mb-4">
              <p className="font-semibold">Country</p>
              <input
                type="text"
                value={country}
                className="border border-gray-400 text-gray-500  bg-white rounded min-w-24   p-1  pr-0 lg:pr-96 "
                onChange={(e) => {
                  setCountry(e.target.value);
                }}
                onBlur={validateCountry}
              />
              {countryError && <p className="text-red-500">{countryError}</p>}
            </div>
            <div className="mb-4">
              <p className="font-semibold">State</p>
              <input
                type="text"
                value={state}
                className="border border-gray-400 text-gray-500  bg-white rounded min-w-24   p-1  pr-0 lg:pr-96 "
                onChange={(e) => {
                  setState(e.target.value);
                }}
                onBlur={validateState}
              />
              {stateError && <p className="text-red-500">{stateError}</p>}
            </div>
            <div className="mb-4">
              <p className="font-semibold">City</p>
              <input
                type="text"
                value={city}
                className="border border-gray-400 text-gray-500  bg-white rounded min-w-24   p-1  pr-0 lg:pr-96 "
                onChange={(e) => {
                  setCity(e.target.value);
                }}
                onBlur={validateCity}
              />
              {cityError && <p className="text-red-500">{cityError}</p>}
            </div>
            <div className="mb-4">
              <p className="font-semibold">Street</p>
              <input
                type="text"
                value={street}
                className="border border-gray-400 text-gray-500  bg-white rounded min-w-24   p-1  pr-0 lg:pr-96 "
                onChange={(e) => {
                  setStreet(e.target.value);
                }}
                onBlur={validateStreet}
              />
              {streetError && <p className="text-red-500">{streetError}</p>}
            </div>
            <div className="mb-4">
              <p className="font-semibold">Postal code</p>
              <input
                type="number"
                value={postalcode}
                className="border border-gray-400 text-gray-500 bg-white rounded min-w-24   p-1  pr-0 lg:pr-96 "
                onChange={(e) => {
                  setPostalcode(e.target.value);
                }}
              />
            </div>
            <div>
              <button
                onClick={handleUpdate}
                className="bg-black w-32 text-white p-2 hover:text-gray-400 hover:bg-slate-900"
              >
                {isLoading ? "Saving..." : "Save Changes"}
              </button>
            </div>
          </div>
          <div>
            <h5 className="text-center font-bold  bg-white text-xl my-3">
              Change Password
            </h5>
            <div className="mb-4">
            <p className="font-semibold">Old Password</p>
            <input
              type="password"
              className="border border-gray-400 text-gray-500 rounded  bg-white min-w-24    p-1 pr-0 lg:pr-96  "
              onChange={(e) => {
                setOldPassword(e.target.value);
              }}
            />
            </div>
             <div className="mb-4">
            <p className="font-semibold">New Password</p>
            <input
              type="password"
              className="border border-gray-400 text-gray-500 rounded  bg-white min-w-24   p-1  pr-0 lg:pr-96 "
              onChange={(e) => {
                setNewPassword(e.target.value);
              }}
            />
            </div>
          </div>
          <button
            onClick={handleChangepassword}
            className="bg-black w-48 text-white p-2  hover:text-gray-400 hover:bg-slate-900"
          >
            {isChangePassword ? "Changing Password..." : "Change Password"}
          </button>
        </div>
      </div>
    </div>
  );
};

export default Profile;
