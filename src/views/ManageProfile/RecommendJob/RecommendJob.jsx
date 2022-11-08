import React, { useState, useEffect, Fragment } from 'react'
import { getNewestRecruitmentRequest } from '../../../apis/recruimentRequestApi'
import './RecommendJob.scss'
import SalaryIcon from '../../../assets/icon/salary.png'
import TypeOfWorkIcon from '../../../assets/icon/typeOfWork.png'
import { Link } from 'react-router-dom'

const RecommendJob = () => {

  const [listRecruitmentRequest, setListRecruitmentRequest] = useState([])
  //const [isLoading, setIsLoading] = useState(true)

  useEffect(() => {
    const fetchData = async () => {
      //setIsLoading(true)
      const response = await getNewestRecruitmentRequest();
      if (response) {
        console.log('UUUUUUU', response.data);
        setListRecruitmentRequest(response.data)
        //setIsLoading(false)
      }
    }
    fetchData();
  }, [])
  return (
    <React.Fragment>
      <div className='font-semibold text-center text-lg bg-[#d0ffc8] rounded-t-lg py-2'>Công việc mới nhất</div>
      {listRecruitmentRequest.map((item, id) => (
        <Link to={`/recruitment-detail/${item.id}`} target={'_blank'} key={id} >
        <div key={id} className='job-container'>
          <div className='font-semibold text-lg font-mono'>{item.position.name}</div>
          <div className='font-sans'>{item.industry}</div>
          <div className='flex justify-between'>
            <span className='flex text-base'><img src={TypeOfWorkIcon} alt='' width={22} style={{marginRight: 5}}/>{item.typeOfWork}</span>
            <span className='flex'><img src={SalaryIcon} alt='' width={22} style={{marginRight: 5}}/>{item.salaryDetail}</span>
          </div>
        </div>
        </Link>
      ))}
    </React.Fragment>
  )
}

export default RecommendJob