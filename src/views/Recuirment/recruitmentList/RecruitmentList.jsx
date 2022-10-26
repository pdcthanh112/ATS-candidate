import React from 'react'
import './RecruitmentList.scss'
import { Link } from 'react-router-dom'

const RecruitmentList = ({ listRecruitment }) => {

  return (
    <div className='recruitment-container'>
      <span className='ml-10 font-semibold text-2xl'>Tin tuyển dụng</span>
      <div className='grid grid-cols-4 gap-4 p-4'>
        {listRecruitment.map((item, id) => (
          <Link to={`/recruitment-detail/${item.id}`} target={'_blank'} key={id} >
            <div className='recruiment-item'>
              <div className='recruiment-item__typeOfWork'>{item.position.name}</div>
              <div>Industry: {item.industry}</div>
              <div>Expiried Date: {item.expiryDate}</div>
            </div>
          </Link>
        ))}
      </div>
    </div>
  )
}

export default RecruitmentList