import React from "react";
import "./PersonalInformation.scss";
import { useSelector } from "react-redux";

const PersonalInformation = () => {
  const currentUser = useSelector((state) => state.auth.login.currentUser.data);

  return (
    <div className="personal-information-container pb-4  ml-2">
      <div className="inline-flex w-full my-2">
        <div className="w-1/2">
          <span className="font-normal text-xl">Email: </span>
          <span className="font-thin text-xl">{currentUser.email}</span>
        </div>
        <div className="w-1/2">
          <span className="font-normal text-xl">Name: </span>
          <span className="font-thin text-xl">{currentUser.candidate.name}</span>
        </div>
      </div>
      <div className="inline-flex w-full my-2">
        <div className="w-1/2">
          <span className="font-normal text-xl">Ngày sinh: </span>
          <span className="font-thin text-xl">01/12/2000</span>
        </div>
        <div className="w-1/2">
          <span className="font-normal text-xl">Phone: </span>
          <span className="font-thin text-xl">{currentUser.candidate.phone}</span>
        </div>
      </div>
      <div className="inline-flex w-full my-2">
        <div className="w-full">
          <span className="font-normal text-xl">Địa chỉ: </span>
          <span className="font-thin text-xl">{currentUser.candidate.address}</span>
        </div>
      </div>
    </div>
  );
};

export default PersonalInformation;
