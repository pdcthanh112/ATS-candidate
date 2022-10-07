import React from 'react'
import './AppHeader.scss'
import { Link, useNavigate } from 'react-router-dom'
import { useSelector, useDispatch } from 'react-redux'
import headerLogo from '../../assets/image/big-logo.png'
import { logoutUser } from '../../apis/authApi/authApi'

const AppHeader = () => {

  const currentUser = useSelector((state) => state.auth.login.currentUser)

  const dispatch = useDispatch();
  const navigate = useNavigate();

  const handleLogout = () => {
    logoutUser(dispatch, navigate)
  }

  return (
    <div className='header-container'>
      <div className='header-logo'>
        <a href="#/dashboard"><img src={headerLogo} alt='Logo' width={180} height={40} /></a>
      </div>
      <div className='header-auth'>
        {currentUser ?
          <>   
          <a href='/#/view-profile' >View profile</a>        
            <Link to='/#/logout' onClick={handleLogout} className='mx-2 btn' style={{ backgroundColor: '#fff', color: '#116835' }}>Đăng xuất</Link>
          </> : <>
            <a href='/#/login' className='mx-2 btn' style={{ backgroundColor: '#fff', color: '#116835' }}>Đăng nhập</a>
            <a href='/#/register' className='text-white mx-2 btn' style={{ border: "1px solid white" }}>Đăng ký</a>
          </>
        }
      </div>
    </div>
  )
}

export default AppHeader
