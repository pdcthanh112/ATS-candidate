import React from 'react'
import CommonNotification from './CommonNotification/CommonNotification'
import InterviewNotificaton from './InterviewNotification/InterviewNotificaton'
import './Notification.scss'

const Notification = () => {

  return (
    <div className='px-4'>
      <div className="bg-white h-12 font-bold text-2xl mb-3 rounded-md pt-2 px-4">Xác nhận lịch phỏng vấn</div>
      <div className='interview-notification-content'>
        <InterviewNotificaton />
      </div>
      <div className='common-notification-content'>
        <CommonNotification />
      </div>
    </div>
  )
}

export default Notification