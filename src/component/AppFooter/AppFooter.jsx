import React from 'react'
import './AppFooter.scss'

const AppFooter = () => {
  return (
    <div className='footer-container'>
      <div className='footer-content'>
        <div className='footer-infor'>
          <b>TRỤ SỞ</b>: Tầng trệt, Toà nhà Rosana, 60 Nguyễn Đình Chiểu, Phường Đa Kao, Quận 1, Tp.HCM<br /><br /><br />
          Phone: (+8428) 7106 8279 Email: info@ckhrconsulting.vn Website: ckhrconsulting.vn
        </div>
        <div className='footer-social'>
          <i className="fa-brands fa-facebook"></i>
          <i className="fa-brands fa-linkedin"></i>
          <i className="fa-solid fa-square-phone"></i>
        </div>
      </div>
      <div className='footer-link'>
        <a href='#' className='custom-link'>Submit Resume</a> | <a href='#' className='custom-link'>Contact Details</a>
      </div>
    </div>
  )
}

export default React.memo(AppFooter)
