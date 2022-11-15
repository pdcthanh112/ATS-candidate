import React from "react";
import './AppNavigation.scss'
import { NavLink } from "react-router-dom";

const AppNavigation = () => {
  return (
    <div className="navigation-container">

      <NavLink to="/dashboard" className={({ isActive }) => isActive ? 'when-active' : 'navigation-item'}><span className="mx-4">Trang chủ</span></NavLink>

      <NavLink to="/employee" className={({ isActive }) => isActive ? 'when-active' : 'navigation-item'}><span className="mx-4">Tin tức</span></NavLink>

      <NavLink to="/about-us" className={({ isActive }) => isActive ? 'when-active' : 'navigation-item'}><span className="mx-4">Về chúng tôi</span></NavLink>

      <NavLink to="/contact-us" className={({ isActive }) => isActive ? 'when-active' : 'navigation-item'}><span className="mx-4">Liên hệ</span></NavLink>

    </div>
  );
};

export default AppNavigation;
