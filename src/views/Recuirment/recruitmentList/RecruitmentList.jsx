import React, { useState, useEffect } from 'react'
import './RecruitmentList.scss'
import { getAllRecruimentRequest } from '../../../apis/recruimentRequestApi'

const RecruitmentList = () => {

  const [listRecruitment, setListRecruitment] = useState([])

  useEffect(() => {
    const fetchData = async () => {
      const response = await getAllRecruimentRequest();
      if (response) {
        console.log(response.data);
        console.log('check type:', typeof response.data);
        setListRecruitment(response.data)
      }
    }
    fetchData();
  }, [])

  return (
    <div className='recruitment-container grid grid-cols-4 gap-4'>
      {listRecruitment.map((item, id) => (
        <div key={id} className='recruiment-item'>
          {item.industry}
        </div>
      ))}
    </div>

  )
}

export default RecruitmentList