import React from 'react'

const Dashboard = React.lazy(() => import('./views/dashboard/Dashboard'))
const ManageProfile = React.lazy(() => import('./views/ManageProfile/ManageProfile'))
const RecruitmentDetail = React.lazy(() => import('./views/Recuirment/recruitmentDetail/RecruitmentDetail'))
const ForgetPassword = React.lazy(() => import('./views/pages/ForgetPassword/ForgetPassword')) 
const ResetPassword = React.lazy(() => import('./views/pages/ResetPassword/ResetPassword')) 

const routes = [
  { path: '/', exact: true, name: 'Home' },
  { path: '/dashboard', name: 'Dashboard', element: Dashboard },
  { path: '/manage-profile/*', name: 'Manage Profile', element: ManageProfile },
  { path: '/recruitment-detail/:id', name: 'Recruitment Detail', element: RecruitmentDetail },
  { path: '/forget-password', name: 'Forget Password', element: ForgetPassword },
  { path: '/reset-password/:email/:token', name: 'Reset Password', element: ResetPassword },
  
]

export default routes
