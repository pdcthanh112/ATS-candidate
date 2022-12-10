import { Pagination, Stack } from '@mui/material';
import { useConfirm } from "material-ui-confirm";
import moment from 'moment';
import React, { useState } from 'react';
import ReactLoading from 'react-loading';
import { useQuery } from 'react-query';
import { useSelector } from 'react-redux';
import { toast, ToastContainer } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
import { getInterviewNotification } from '../../../../apis/notificationApi';
import { useHandleApproveInterview, useHandleRejectInterview } from '../hooks/notificationHook';

const InterviewNotificaton = () => {

  const currentUser = useSelector((state) => state.auth.login.currentUser)
  const confirm = useConfirm();

  const [pagination, setPagination] = useState({ totalPage: 0, currentPage: 1 })

  const { mutate: handleApproveInterview } = useHandleApproveInterview();
  const { mutate: handleRejectInterview } = useHandleRejectInterview();

  const { data: listInterviewNotification, isLoading } = useQuery(['listNoti', pagination], () => getInterviewNotification(currentUser.candidate.id, pagination.currentPage - 1, 4).then((response) => response.data.responseList))

  const approveInterview = async (interviewId) => {
    await confirm({ description: "Bạn xác nhận sẽ tham gia cuộc phỏng vấn này?" }).then(() => {
      handleApproveInterview(interviewId, {
        onSuccess: () => toast.success('Xác nhận thành công'),
        onError: () => toast.error('Có lỗi xảy ra')
      })
    })
  }
  const rejectInterview = async (interviewId) => {
    await confirm({ description: "Bạn xác nhận từ chối cuộc phỏng vấn này?" }).then(() => {
      handleRejectInterview(interviewId, {
        onSuccess: () => toast.success('Xác nhận thành công'),
        onError: () => toast.error('Có lỗi xảy ra')
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
        {listInterviewNotification?.map((item) => (
          <div key={item.id} className='notification-content_item'>
            <div className='flex justify-between'>
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
                <span>{moment(item.date).format('DD/MM/YYYY')}</span>
              </div>
            </div>
            {item.status === 'PENDING' && item.candidateConfirm == null && <div className='flex justify-evenly'>
              <div className='flex items-center'>Vui lòng xác nhận lịch phỏng vấn với chúng tôi</div>
              <div className='flex'>
                <button style={{ width: '6rem', height: '2.2rem' }} title='Từ chối phỏng vấn' className='hover:cursor-pointer bg-[#F64E60] text-[#FBFBFB] rounded-lg ml-4' onClick={() => rejectInterview(item.id)}>Từ chối</button>
                <button style={{ width: '6rem', height: '2.2rem' }} title='Chấp nhận phỏng vấn' className='hover:cursor-pointer bg-[#20D489] text-[#FBFBFB] rounded-lg ml-4' onClick={() => approveInterview(item.id)}>Chấp nhận</button>
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