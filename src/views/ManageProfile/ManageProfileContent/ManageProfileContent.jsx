import React, { Suspense } from 'react'
import './ManageProfileContent.scss'

import { Route, Routes } from 'react-router-dom'
import ViewProfile from '../Candidate/CandidateProfile/ViewProfile/ViewProfile'
import ChangePassword from '../ChangePassword/ChangePassword'

const ManageProfileContent = () => {
  return (
    <React.Fragment>
      <Suspense>
        <Routes>
          <Route path='/view-profile' element={<ViewProfile />} />
          <Route path='/change-password' element={<ChangePassword />} />
        </Routes>
      </Suspense>
    </React.Fragment>
  )
}

export default ManageProfileContent