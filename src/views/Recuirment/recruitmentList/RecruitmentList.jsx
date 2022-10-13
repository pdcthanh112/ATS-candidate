import React, { useState, useEffect } from 'react'
import './RecruitmentList.scss'
import { getAllRecruimentRequest } from '../../../apis/recruimentRequestApi'
import ReactLoading from 'react-loading'
import { Link } from 'react-router-dom'

const RecruitmentList = () => {

  const [listRecruitment, setListRecruitment] = useState([])
  const [isLoading, setIsLoading] = useState(true)

  useEffect(() => {
    const fetchData = async () => {
      setIsLoading(true)
      const response = await getAllRecruimentRequest(0, 10);
      if (response) {
        setListRecruitment(response.data)
        setIsLoading(false)
      }
    }
    fetchData();
  }, [])

  return (
    <React.Fragment>
      {isLoading ? <ReactLoading className='mx-auto my-5' type='spinningBubbles' color='#bfbfbf' /> : 
      <div className='recruitment-container grid grid-cols-4 gap-4 p-4'>
        {listRecruitment.map((item, id) => (
          <Link to={`/recruitment-detail/${item.id}`} target={'_blank'}>
            <div key={id} className='recruiment-item'>
              <div className='recruiment-item__typeOfWork'>{item.typeOfWork}</div>
              <div>Industry: {item.industry}</div>
              <div>Expiried Date: {item.expiryDate}</div>
            </div>
          </Link>
        ))}
      </div>
      }
    </React.Fragment >
  )
}

export default RecruitmentList