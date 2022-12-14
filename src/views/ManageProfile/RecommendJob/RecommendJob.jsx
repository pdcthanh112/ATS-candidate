import React, { useState, useEffect } from 'react'
import { getNewestRecruitmentRequest } from '../../../apis/recruimentRequestApi'
import './RecommendJob.scss'
import SalaryIcon from '../../../assets/icon/salary.png'
import TypeOfWorkIcon from '../../../assets/icon/typeOfWork.png'
import { Link } from 'react-router-dom'

const RecommendJob = () => {

  const [listRecruitmentRequest, setListRecruitmentRequest] = useState([])

  useEffect(() => {
    const fetchData = async () => {
      const response = await getNewestRecruitmentRequest();
      if (response) {
        setListRecruitmentRequest(response.data)
      }
    }
    fetchData();
  }, [])
  return (
    <React.Fragment>
      <div className='font-semibold text-center text-lg bg-[#d0ffc8] rounded-t-lg py-2'>Top việc làm mới</div>
      {listRecruitmentRequest.map((item, id) => (
        <Link to={`/recruitment-detail/${item.id}`} target={'_blank'} key={id}>
        <div className='job-container'>
          <div className='font-semibold text-lg font-mono'>{item.position.name}</div>
          <div className='font-sans'>{item.industry}</div>
          <div className='flex justify-between'>
            <div className='flex text-xs w-[40%] items-center'><img src={TypeOfWorkIcon} alt='' width={22} style={{marginRight: 5}}/>{item.typeOfWork}</div>
            <div className='flex text-xs w-[60%] items-center'><img src={SalaryIcon} alt='' width={22} style={{marginRight: 5}}/>{item.salaryDetail}</div>
          </div>
        </div>
        </Link>
      ))}
    </React.Fragment>
  )
}

export default RecommendJob