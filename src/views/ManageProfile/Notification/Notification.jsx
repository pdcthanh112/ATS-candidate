import React from 'react'
import { useSelector } from 'react-redux'
import CommonNotification from './CommonNotification/CommonNotification'
import InterviewNotificaton from './InterviewNotification/InterviewNotificaton'
import './Notification.scss'

const Notification = () => {

  const currentUser = useSelector((state) => state.auth.login.currentUser)

  return (
    <React.Fragment>
      {currentUser ? <div className='px-4'>
        <div className="bg-white h-12 font-bold text-2xl mb-3 rounded-md pt-2 px-4">Xác nhận lịch phỏng vấn</div>
        <div className='interview-notification-content'>
          <InterviewNotificaton />
        </div>
        <div className='common-notification-content'>
          <CommonNotification />
        </div>
      </div> : <div className='px-5 py-16 font-medium text-2xl flex justify-center'>Hãy đăng nhập để xem các thông báo mới</div>}
      
    </React.Fragment>
  )
}

export default Notification