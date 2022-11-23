import React, { useEffect, useState } from 'react'
import './Notification.scss'

import { Link } from 'react-router-dom'
import ReactLoading from 'react-loading'
import { useSelector } from 'react-redux'
import { getAllNotification } from '../../../apis/NotificationApi'
import { Pagination, Stack } from '@mui/material';

const Notification = () => {

  const currentUser = useSelector((state) => state.auth.login.currentUser)

  const [listNotification, setListNotification] = useState([])
  const [isLoading, setIsLoading] = useState(false);
  const [pagination, setPagination] = useState({ totalPage: 0, currentPage: 1 })

  useEffect(() => {
    const fetchData = async () => {
      setIsLoading(true)
      const response = await getAllNotification(currentUser.token, currentUser.candidate.id, pagination.currentPage - 1, 4);
      if (response) {
        setPagination({ ...pagination, totalPage: response.data.totalPage })
        setListNotification(response.data.responseList)
        setIsLoading(false)
        console.log(listNotification);
      }
    }
    fetchData();
  }, [pagination.currentPage])

  return (
    <div className='px-4'>
      <div className="bg-white h-12 font-bold text-2xl mb-3 rounded-md pt-2 px-4">Thông báo</div>
      <div className='notification-content'>
        {isLoading ? <ReactLoading className='mx-auto my-5' type='spinningBubbles' color='#bfbfbf' /> : <React.Fragment>
          {listNotification.map((item, id) => (
            <Link to={`/recruitment-detail/${item.recruitmentRequest.id}`} target={'_blank'}  key={id}>
              <div className='notification-content_item'>
                
              </div>
            </Link>
          ))}
        </React.Fragment>}
        <div className='flex justify-center'>
          <Stack spacing={2}>
            <Pagination count={pagination.totalPage} onChange={(event, page) => { setPagination({ ...pagination, currentPage: page }) }} />
          </Stack>
        </div>
      </div>
    </div>
  )
}

export default Notification