import React, { useState } from "react";
import { useSelector } from "react-redux";
import EditInformation from "../EditInformation/EditInformation";
import PersonalInformation from "../PersonalInformation/PersonalInformation";
import "./ViewProfile.scss";

const ViewProfile = () => {

 

  const [isEditProfile, setIsEditProfile] = useState(false)

  return (
    <div>
      <div className="personal-information">
        <div className="text-2xl font-semibold pt-2">
          <span>Thông tin cá nhân </span>
          <i className="fa-regular fa-pen-to-square edit-icon" onClick={() => setIsEditProfile(true)}></i>
        </div>
        {isEditProfile ? <EditInformation /> : <PersonalInformation />}
        {isEditProfile && <div>
          <button className='btn-register' onClick={() => setIsEditProfile(false)}>Cancel</button>
          <button type='submit' className='btn-register'>Save</button>
        </div>}
      </div>
    </div>
  );
};

export default ViewProfile;
