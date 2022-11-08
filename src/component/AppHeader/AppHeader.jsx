import React from 'react'
import './AppHeader.scss'
import { Link, useNavigate } from 'react-router-dom'
import { useSelector, useDispatch } from 'react-redux'
import headerLogo from '../../assets/image/big-logo.png'
import defaultUser from '../../assets/image/defaultUser.png'
import { logoutUser } from '../../apis/authApi'

const AppHeader = () => {

  const currentUser = useSelector((state) => state.auth.login.currentUser?.candidate)

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
      <div className='header-menu'>
        {currentUser ?
          <React.Fragment>
            <div className="dropdown">
              <a className="" href="/" role="button" data-bs-toggle="dropdown" aria-expanded="false">
                <div className='inline-flex rounded-3xl px-2' style={{border: '1px solid #60d860'}}>
                  <img src={currentUser.image || defaultUser} alt='' className='profile-image py-1.5' width={'30rem'} />
                  <div className='mx-2 py-2.5 font-medium text-lg' style={{ width: '13rem' }}>{currentUser.name}</div>
                  <i className="fa-solid fa-chevron-down m-1.5 py-2.5 text-xs"></i>
                </div>
              </a>
              <ul className="dropdown-menu">
                <a href='/#/manage-profile' className='dropdown-item header-menu-item'><i className="fa-regular fa-address-card mr-2 text-[#60d860]"></i>Thông tin cá nhân</a>
                <a href='/#/manage-profile/change-password' className='dropdown-item header-menu-item'><i className="fa-sharp fa-solid fa-shield-halved mr-2 text-[#60d860]"></i>Thay đổi mật khẩu</a>
                <div className='linee'></div>
                <Link to='/#/logout' onClick={handleLogout} className='dropdown-item header-menu-item'><i className="fa-solid fa-arrow-right-from-bracket mr-2 text-[#ff5858] "></i>Đăng xuất</Link>
              </ul>
            </div>
          </React.Fragment> : <React.Fragment>
            <a href='/#/login' className='mx-2 btn' style={{ backgroundColor: '#fff', color: '#116835' }}>Đăng nhập</a>
            <a href='/#/register' className='text-white mx-2 btn' style={{ border: "1px solid white", backgroundColor: '#116835' }}>Đăng ký</a>
          </React.Fragment>
        }
      </div>
    </div>
  )
}

export default AppHeader
