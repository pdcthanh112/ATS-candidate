import React from 'react'

const Dashboard = React.lazy(() => import('./views/dashboard/Dashboard'))
// const Login = React.lazy(() => import('./views/pages/login/Login'))
// const Register = React.lazy(() => import('./views/pages/register/Register'))
const ViewProfile = React.lazy(() => import('./component/Candidate/CandidateProfile/ViewProfile'))
const RecruitmentDetail = React.lazy(() => import('./views/pages/recruitmentDetail/RecruitmentDetail'))


const routes = [
  { path: '/', exact: true, name: 'Home' },
  { path: '/dashboard', name: 'Dashboard', element: Dashboard },
  // { path: '/login', name: 'Login', element: Login },
  // { path: '/register', name: 'Register', element: Register },
  { path: '/view-profile', name: 'Register', element: ViewProfile },
  { path: '/recruitment-detail', name: 'Recruitment Detail', element: RecruitmentDetail },
]

export default routes
