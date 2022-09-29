import React, { useState } from 'react'
import RecruitmentList from '../pages/recruitmentList/RecruitmentList';

const Dashboard = () => {

  

  console.log(process.env.REACT_APP_API_URL);

  return (
    <React.Fragment>
      <RecruitmentList/>
    </React.Fragment>
  )
}

export default Dashboard
