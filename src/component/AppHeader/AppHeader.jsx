import React from 'react'
import './AppHeader.scss'
import { NavLink } from 'react-router-dom'
import { useSelector, useDispatch } from 'react-redux'
import headerLogo from '../../assets/image/big-logo.png'

const AppHeader = () => {

  return (

    <div className='header-container'>
      <div className='header-logo'>
        <a href="#/dashboard"><img src={headerLogo} alt='Logo' width={180} height={40}/></a>
      </div>
      <div className='header-auth'>
        <a href='/#/login' className='mx-2 btn' style={{backgroundColor: '#fff', color: '#116835'}}>Đăng nhập</a>
        <a href='/#/register' className='text-white mx-2 btn' style={{border: "1px solid white"}}>Đăng ký</a>      
      </div>
    </div>
  )
}

export default AppHeader
