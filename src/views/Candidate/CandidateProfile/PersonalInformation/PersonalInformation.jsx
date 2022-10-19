import React, { useEffect, useState } from "react";
import "./PersonalInformation.scss";
import { useSelector } from "react-redux";
import { getCandidateById } from "../../../../apis/candidateApi";
import ReactLoading from 'react-loading'

const PersonalInformation = () => {

  const currentUser = useSelector((state) => state.auth.login.currentUser.data);

  const [data, setData] = useState({})
  const [isLoading, setIsLoading] = useState(true)

  useEffect(() => {
    const fetchData = async () => {
      setIsLoading(true)
      const response = await getCandidateById(currentUser.candidate.id, currentUser.token);
      if (response) {
        setData(response.data)
        setIsLoading(false)
      }
    }
    fetchData();
  }, [])

  if (isLoading) return <ReactLoading className='mx-auto my-5' type='spinningBubbles' color='#bfbfbf' />

  return (
    <div className="personal-information-container pb-4  ml-2">
      <div className="inline-flex w-full my-2">
        <div className="w-1/2">
          <span className="font-normal text-xl">Email: </span>
          <span className="font-thin text-xl">{data.email}</span>
        </div>
        <div className="w-1/2">
          <span className="font-normal text-xl">Name: </span>
          <span className="font-thin text-xl">{data.name}</span>
        </div>
      </div>
      <div className="inline-flex w-full my-2">
        <div className="w-2/5">
          <span className="font-normal text-xl">Ngày sinh: </span>
          <span className="font-thin text-xl">{data.dob}</span>
        </div>
        <div className="w-2/5">
          <span className="font-normal text-xl">Phone: </span>
          <span className="font-thin text-xl">{data.phone}</span>
        </div>
        <div className="w-1/5">
          <span className="font-normal text-xl">Gender: </span>
          <span className="font-thin text-xl">{data.gender}</span>
        </div>
      </div>
      <div className="inline-flex w-full my-2">
        <div className="w-full">
          <span className="font-normal text-xl">Địa chỉ: </span>
          <span className="font-thin text-xl">{data.address}</span>
        </div>
      </div>
    </div>
  );
};

export default PersonalInformation;
