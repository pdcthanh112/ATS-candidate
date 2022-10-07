import React, { useState, useEffect } from "react";
import { useSelector } from "react-redux";
import { getCandidateById } from "../../apis/authApi/candidateApi";
import "./ViewProfile.scss";

const ViewProfile = () => {

  const [profile, setProfile] = useState({});

  const currentUser = useSelector((state) => state.auth.login.currentUser)

  useEffect(() => {
    const fetchData = async () => {
      const response = await getCandidateById(currentUser.data.token);
      console.log(response);
      setProfile(response)
    };
    fetchData();
  }, []);
  return (
    <div>
      <div className="personal-information">
        <div>Thông tin cá nhân</div>
        
      </div>
    </div>
  );
};

export default ViewProfile;
