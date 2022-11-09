import React, { Suspense } from 'react'
import './ManageProfileContent.scss'

import { Route, Routes } from 'react-router-dom'
import ViewProfile from '../Candidate/CandidateProfile/ViewProfile/ViewProfile'
import ChangePassword from '../ChangePassword/ChangePassword'
import AppliedJob from '../AppliedJob/AppliedJob'
import Notification from '../Notification/Notification'

const ManageProfileContent = () => {
  return (
    <React.Fragment>
      <Suspense>
        <Routes>
          <Route path='/view-profile' element={<ViewProfile />} />
          <Route path='/change-password' element={<ChangePassword />} />
          <Route path='/my-appliedJob' element={<AppliedJob />} />
          <Route path='/notification' element={<Notification />} />
        </Routes>
      </Suspense>
    </React.Fragment>
  )
}

export default ManageProfileContent