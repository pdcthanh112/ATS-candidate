import React, { useState, useEffect } from 'react'
import { useConfirm } from "material-ui-confirm";
import { ToastContainer, toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
import { responseStatus } from '../../../../utils/constants'
import { confirmInterview, getInterviewNotification, rejectInterview } from '../../../../apis/notificationApi';
import { useSelector } from 'react-redux';
import { Pagination, Stack } from '@mui/material';
import ApproveIcon from '../../../../assets/icon/approve.png'
import RejectIcon from '../../../../assets/icon/reject.png'
import ReactLoading from 'react-loading'

const InterviewNotificaton = () => {

  const currentUser = useSelector((state) => state.auth.login.currentUser)
  const confirm = useConfirm();

  const [listInterviewNotification, setListInterviewNotification] = useState([])
  const [isLoading, setIsLoading] = useState(false);
  const [pagination, setPagination] = useState({ totalPage: 0, currentPage: 1 })

  useEffect(() => {
    const fetchData = async () => {
      setIsLoading(true)
      const response = await getInterviewNotification(currentUser.token, currentUser.candidate.id, pagination.currentPage - 1, 4);
      if (response) {
        setPagination({ ...pagination, totalPage: response.data.totalPage })
        setListInterviewNotification(response.data.responseList)
        setIsLoading(false)
        console.log(listInterviewNotification);
      }
    }
    fetchData();
  }, [pagination.currentPage])


  const handleApproveInterview = async (interviewId) => {
    await confirm({ description: "Bạn xác nhận sẽ tham gia cuộc phỏng vấn này?" }).then(() => {
      confirmInterview(currentUser.token, currentUser.candidate.id, interviewId).then((response) => {
        response.status === responseStatus.SUCCESS ? toast.success('Xác nhận thành công') : toast.error('Có lỗi xảy ra')
      })
    })
  }

  const handleRejectInterview = async (interviewId) => {
    await confirm({ description: "Bạn xác nhận sẽ từ chối cuộc phỏng vấn này?" }).then(() => {
      rejectInterview(currentUser.token, currentUser.candidate.id, interviewId).then((response) => {
        response.status === responseStatus.SUCCESS ? toast.success('Xác nhận thành công') : toast.error('Có lỗi xảy ra')
      })
    })
  }

  const showStatusLabel = (status) => {
    if (status === 'APPROVED') {
      return <span className='bg-[#D0FFC8] text-[#1BC5BD] text-sm px-2 py-1 rounded-md'>APPROVED</span>
    } else if (status === 'CANCELED') {
      return <span className='bg-[#FFE2E5] text-[#F64E60] text-sm px-2 py-1 rounded-md'>Rejected</span>
    } else if (status === 'DONE') {
      return <span className='bg-[#C9F7F5] text-[#1BC5BD] text-sm px-2 py-1 rounded-md'>DONE</span>
    } else {
      return <span className='bg-[#FFF4DE] text-[#FFA800] text-sm px-2 py-1 rounded-md'>Pending</span>
    }
  }

  return (
    <React.Fragment>
      {isLoading ? <ReactLoading className='mx-auto my-5' type='spinningBubbles' color='#bfbfbf' /> : <React.Fragment>
        {listInterviewNotification && listInterviewNotification.map((item) => (
          <div key={item.id} className='notification-content_item'>
            <div className='flex justify-between'>
              <div className='font-medium'>Bạn được sắp xếp một cuộc phỏng vấn</div>
              <span>{showStatusLabel(item.status)}</span>
            </div>
            {item.type === 'OFFLINE' ? <React.Fragment>
              <div>
                <span className='font-medium'>Tại địa chỉ: </span>
                <span>{item.address}</span>
              </div>
              <div>
                <span className='font-medium'>Phòng: </span>
                <span>{item.room}</span>
              </div>
            </React.Fragment> : <div>
              <span className='font-medium'>Tại đường dẫn: </span>
              <span>{item.linkMeeting}</span>
            </div>
            }
            <div className='flex'>
              <div className='w-[30%]'>
                <span className='font-medium'>Vào lúc </span>
                <span>{item.time}</span>
              </div>
              <div className='w-[50%]'>
                <span className='font-medium'>Ngày </span>
                <span>{item.date}</span>
              </div>
            </div>
            {item.status === 'PENDING' && <div className='flex justify-evenly'>
              <div className='flex items-center'>Vui lòng xác nhận lịch phỏng vấn với chúng tôi</div>
              <div className='flex'>
                <img src={ApproveIcon} alt="" width={'50rem'} title='Xác nhận phỏng vấn' className='mr-2 hover:cursor-pointer' onClick={() => handleApproveInterview(item.id)} />
                <img src={RejectIcon} alt="" width={'50rem'} title='Từ chối phỏng vấn' className='mr-2 hover:cursor-pointer' onClick={() => handleRejectInterview(item.id)} />
              </div>
            </div>}
          </div>
        ))}
      </React.Fragment>}
      <div className='flex justify-center'>
        <Stack spacing={2}>
          <Pagination count={pagination.totalPage} onChange={(event, page) => { setPagination({ ...pagination, currentPage: page }) }} />
        </Stack>
      </div>

      <ToastContainer
        position="top-right"
        autoClose={5000}
        hideProgressBar={false}
        newestOnTop={false}
        closeOnClick
        rtl={false}
        pauseOnFocusLoss
        draggable
        pauseOnHover
        theme="light"
      />
    </React.Fragment>
  )
}

export default InterviewNotificaton