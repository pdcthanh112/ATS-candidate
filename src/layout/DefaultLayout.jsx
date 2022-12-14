import React from 'react'
import AppContent from '../component/AppContent/AppContent'
import AppFooter from '../component/AppFooter/AppFooter'
import AppHeader from '../component/AppHeader/AppHeader'

function DefaultLayout() {
  return (
    <div>
      <div className="wrapper d-flex flex-column min-vh-100 bg-light">
        <AppHeader />
        <div className="flex-grow-1 bg-[#FBF9F6]">
          <AppContent />
        </div>
        <AppFooter />
      </div>
    </div>
  )
}

export default DefaultLayout