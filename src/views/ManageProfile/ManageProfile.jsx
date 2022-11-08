import React from 'react'
import './ManageProfile.scss'
import { NavLink } from 'react-router-dom';

import ManageProfileContent from './ManageProfileContent/ManageProfileContent';
import RecommendJob from './RecommendJob/RecommendJob';

const ManageProfile = () => {

  const SidebarData = [
    {
      title: 'Thông tin cá nhân',
      path: '/manage-profile/view-profile',
      icon: <i className="fa-regular fa-address-card mr-2"></i>,
    },
    {
      title: 'Thay đổi mật khẩu',
      path: '/manage-profile/change-password',
      icon: <i className="fa-sharp fa-solid fa-shield-halved mr-2"></i>,

    },
    {
      title: 'Việc làm của tôi',
      path: '/manage-profile/my-appliedJob',
      icon: <i className="fa-solid fa-list-check mr-2"></i>,
    },
    {
      title: 'Thông báo',
      path: '/notification',
      icon: <i className="fa-regular fa-bell mr-2"></i>,
    },
  ];

  return (
    <div className='manage-profile'>
      <div className='manage-profile__navigation'>
        <div className='font-semibold text-xl text-center mb-3'>Quản lý thông tin</div>
        <ul>
          {SidebarData.map((item, index) => {
            return (
              <li key={index}>
                <NavLink to={item.path}>
                  <div className='manage-profile__navigation-item'>
                    {item.icon}
                    <span>{item.title}</span>
                  </div>
                </NavLink>
              </li>
            );
          })}
        </ul>
      </div>

      <div className='manage-profile__content'>
        <ManageProfileContent />
      </div>

      <div className='manage-profile__recommendJob'>
        <RecommendJob />
      </div>

    </div>
  )
}

export default ManageProfile