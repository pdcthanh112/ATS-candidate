import React from 'react'
import './RecruitmentList.scss'
import { Link } from 'react-router-dom'
import moment from 'moment'

const RecruitmentList = ({ listRecruitment }) => {

  return (
    <div className='recruitment-container'>
      <div className='grid grid-cols-3 gap-3'>
        {listRecruitment?.map((item, id) => (
          <Link to={`/recruitment-detail/${item.id}`} target={'_blank'} key={id} >
            <div className='recruiment-item'>
              <div className='font-medium text-lg text-[#20D489]'>{item.position.name}</div>
              <div className='text-xs'><span className='font-medium'>Chuyên môn: </span>{item.industry}</div>
              <div className='text-xs'><span className='font-medium'>Ngày hết hạn: </span>{moment(item.expiryDate).format('DD/MM/YYYY')}</div>
            </div>
          </Link>
        ))}
      </div>
    </div>
  )
}

export default RecruitmentList