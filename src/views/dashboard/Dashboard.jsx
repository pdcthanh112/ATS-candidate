import React, { useState, useEffect } from 'react'
import './Dashboard.scss'

import { Link } from 'react-router-dom';
import { getAllRecruimentRequest, getCategory } from '../../apis/recruimentRequestApi';
import RecruitmentList from '../Recuirment/RecruitmentList/RecruitmentList';
import ReactLoading from 'react-loading'
import { Pagination, Stack } from '@mui/material';

import { useDispatch } from 'react-redux';
import HomeImage from '../../assets/image/home.png'
import RecruiterImage from '../../assets/icon/recruiter.png'

const Dashboard = () => {

  const [listRecruitment, setListRecruitment] = useState([])
  const [isLoading, setIsLoading] = useState(true)
  const [pagination, setPagination] = useState({ totalPage: 0, currentPage: 1 })

  const dispatch = useDispatch();

  useEffect(() => {
    const fetchData = async () => {
      setIsLoading(true)
      const response = await getAllRecruimentRequest(pagination.currentPage - 1, 12);
      if (response) {
        setPagination({ ...pagination, totalPage: response.data.totalPage })
        setListRecruitment(response.data.responseList)
        setIsLoading(false)
      }
    }
    fetchData();
  }, [pagination.currentPage])

  useEffect(() => {
    getCategory(dispatch)
  }, [])

  return (
    <React.Fragment>
      <div><img src={HomeImage} alt="" /></div>
      <div className='recruitmentDashboard-container'>
        <div className='flex justify-between px-5 py-3 bg-[#1DAF5A90]'>
          <div className='flex'>
            <img src={RecruiterImage} alt="" width={'30rem'} />
            <span className='font-semibold text-xl font-sans ml-2'>Tin tuyển dụng, việc làm hot</span>
          </div>
          <div className='flex text-white hover:underline'><Link to='all-recruitment' target={'_blank'} className='font-semibold mr-2 hover:text-white'>Xem tất cả <i className="fa-solid fa-arrow-right"></i></Link> </div>
        </div>

        {isLoading ? <ReactLoading className='mx-auto my-5' type='spinningBubbles' color='#bfbfbf' /> : <RecruitmentList listRecruitment={listRecruitment} />}

        <div className='flex justify-center pb-3'>
          <Stack spacing={2}>
            <Pagination count={pagination.totalPage} variant="outlined" shape="rounded" onChange={(event, page) => { setPagination({ ...pagination, currentPage: page }) }} />
          </Stack>
        </div>
      </div>
    </React.Fragment>
  )
}

export default Dashboard
