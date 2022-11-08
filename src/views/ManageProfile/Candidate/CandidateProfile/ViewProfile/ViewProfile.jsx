import React, { useState } from "react";
import "./ViewProfile.scss";

import EditInformation from "../EditInformation/EditInformation";
import PersonalInformation from "../PersonalInformation/PersonalInformation";


const ViewProfile = () => {

  const [isEditProfile, setIsEditProfile] = useState(false)

  return (
    <div className="viewProfile-container">
      <div className="profile-container">
        <div className="text-2xl font-semibold pt-4">
          <span className="ml-3">Thông tin cá nhân </span>
          {isEditProfile ? <i className="fa-solid fa-xmark edit-icon" onClick={() => setIsEditProfile(false)}></i> : <i className="fa-regular fa-pen-to-square edit-icon" onClick={() => setIsEditProfile(true)}></i>}
        </div>
        {isEditProfile ? <><EditInformation /></> : <PersonalInformation />}
      </div>
    </div>
  );
};

export default ViewProfile;
