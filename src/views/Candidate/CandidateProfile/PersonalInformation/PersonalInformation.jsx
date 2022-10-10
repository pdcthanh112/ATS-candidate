import React from "react";
import "./PersonalInformation.scss";
import { useSelector } from "react-redux";

const PersonalInformation = () => {
  const currentUser = useSelector((state) => state.auth.login.currentUser.data);
  console.log(currentUser);

  return (
    <div className="personal-information-container">
      <div className="inline-flex w-full">
        <div className="w-1/2">
          <span className="font-normal">Email: </span>
          <span className="font-thin">{currentUser.email}</span>
        </div>
        <div className="w-1/2">
          <span className="font-normal">Name: </span>
          <span className="font-thin">{currentUser.name}</span>
        </div>
      </div>
    </div>
  );
};

export default PersonalInformation;
