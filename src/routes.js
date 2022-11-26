import React from 'react'

const Dashboard = React.lazy(() => import('./views/dashboard/Dashboard'))
const ManageProfile = React.lazy(() => import('./views/ManageProfile/ManageProfile'))
const RecruitmentPage = React.lazy(() => import('./views/Recuirment/RecruitmentPage/RecruitmentPage'))
const RecruitmentDetailPage = React.lazy(() => import('./views/Recuirment/RecruitmentDetailPage/RecruitmentDetailPage'))
const ForgetPassword = React.lazy(() => import('./views/pages/ForgetPassword/ForgetPassword')) 
const ResetPassword = React.lazy(() => import('./views/pages/ResetPassword/ResetPassword')) 
const AboutUsPage = React.lazy(() => import('./views/AboutUs/AboutUsPage')) 
const ContactUsPage = React.lazy(() => import('./views/ContactUs/ContactUsPage')) 

const routes = [
  { path: '/', exact: true, name: 'Home' },
  { path: '/dashboard', name: 'Dashboard', element: Dashboard },
  { path: '/manage-profile/*', name: 'Manage Profile', element: ManageProfile },
  { path: '/all-recruitment', name: 'Recruitment Page', element: RecruitmentPage },
  { path: '/recruitment-detail/:id', name: 'Recruitment Detail', element: RecruitmentDetailPage },
  { path: '/forget-password', name: 'Forget Password', element: ForgetPassword },
  { path: '/reset-password/:email/:token', name: 'Reset Password', element: ResetPassword },
  { path: '/about-us', name: 'About Us', element: AboutUsPage }, 
  { path: '/contact-us', name: 'Contact Us', element: ContactUsPage }, 
]

export default routes
