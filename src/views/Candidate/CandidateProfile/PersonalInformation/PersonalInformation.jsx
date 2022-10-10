import React from "react";
import "./PersonalInformation.scss";
import { useSelector } from "react-redux";

const PersonalInformation = () => {
  const currentUser = useSelector((state) => state.auth.login.currentUser.data);

  return (
    <div className="personal-information-container pb-4">
      <div className="inline-flex w-full my-2">
        <div className="w-1/2">
          <span className="font-normal">Email: </span>
          <span className="font-thin">{currentUser.email}</span>
        </div>
        <div className="w-1/2">
          <span className="font-normal">Name: </span>
          <span className="font-thin">{currentUser.name}</span>
        </div>
      </div>
      <div className="inline-flex w-full my-2">
        <div className="w-1/2">
          <span className="font-normal">Ngày sinh: </span>
          <span className="font-thin">01/12/2000</span>
        </div>
        <div className="w-1/2">
          <span className="font-normal">Phone: </span>
          <span className="font-thin">3452345623423</span>
        </div>
      </div>
      <div className="inline-flex w-full my-2">
        <div className="w-full">
          <span className="font-normal">Địa chỉ: </span>
          <span className="font-thin">125 D2, phuong Tang Nhon Phu A, quan 9, Tp Ho Chi Minh</span>
        </div>
      </div>
    </div>
  );
};

export default PersonalInformation;
