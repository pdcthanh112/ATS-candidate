import React, { useState, useEffect } from 'react'
import { useSelector } from 'react-redux'
import { getCommonNotification } from '../../../../apis/notificationApi'
import moment from 'moment'
import ReactLoading from 'react-loading'
import { Pagination, Stack } from '@mui/material';

const CommonNotification = () => {

  const currentUser = useSelector((state) => state.auth.login.currentUser)

  const [listNotification, setListNotification] = useState([])
  const [isLoading, setIsLoading] = useState(false);
  const [pagination, setPagination] = useState({ totalPage: 0, currentPage: 1 })

  useEffect(() => {
    const fetchData = async () => {
      setIsLoading(true)
      const response = await getCommonNotification(currentUser.candidate.id, pagination.currentPage - 1, 5);
      if (response) {
        setPagination({ ...pagination, totalPage: response.data.totalPage })
        setListNotification(response.data.responseList)       
      }
      setIsLoading(false)
    }
    fetchData();
  }, [pagination.currentPage])

  return (
    <div>
      {isLoading ? <ReactLoading className='mx-auto my-5' type='spinningBubbles' color='#bfbfbf' /> : <React.Fragment>
          {listNotification && listNotification.map((item) => (
            <div className='common-notification-content_item'>
              <div className='font-medium'>{item.subject}</div>
              <div className='px-2'>{item.content}</div>
              <div className='text-[#00000090] flex justify-end'>{moment(item.createTime).fromNow()}</div>
            </div>
          ))}
        </React.Fragment>
      }
      <div className='flex justify-center'>
        <Stack spacing={2}>
          <Pagination count={pagination.totalPage} onChange={(event, page) => { setPagination({ ...pagination, currentPage: page }) }} />
        </Stack>
      </div>
    </div>
  )
}

export default CommonNotification