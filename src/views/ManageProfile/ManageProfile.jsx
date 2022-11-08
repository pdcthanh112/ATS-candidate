import React, { Suspense } from 'react'
import './ManageProfile.scss'
import { NavLink, Route, Routes } from 'react-router-dom';

import ViewProfile from './Candidate/CandidateProfile/ViewProfile/ViewProfile'
import ChangePassword from './ChangePassword/ChangePassword'
import ManageProfileContent from './ManageProfileContent/ManageProfileContent';

const ManageProfile = () => {

  const SidebarData = [
    {
      title: 'Thông tin cá nhân',
      path: '/manage-profile/view-profile',
      // icon: <AiIcons.AiFillHome />,
      // cName: 'nav-text'
    },
    {
      title: 'Thay đổi mật khẩu',
      path: '/manage-profile/change-password',
      // icon: <IoIcons.IoIosPaper />,
      // cName: 'nav-text'
    },
    {
      title: 'Việc làm của tôi',
      path: '/products',
      // icon: <FaIcons.FaCartPlus />,
      // cName: 'nav-text'
    },
    {
      title: 'Thông báo',
      path: '/notification',
      // icon: <IoIcons.IoMdPeople />,
      // cName: 'nav-text'
    },
  ];

  return (
    <div className='manage-profile'>
      <div className='manage-profile__navigation'>
        <ul>
          {SidebarData.map((item, index) => {
            return (
              <li key={index}>
                <NavLink to={item.path}>
                  {item.icon}
                  <span>{item.title}</span>
                </NavLink>
              </li>
            );
          })}
        </ul>
      </div>

      <div className='manage-profile__content'>
        <ManageProfileContent />
      </div>

      <div>
        asdfjaslfjasdfjsldkajflj
      </div>

    </div>
  )
}

export default ManageProfile