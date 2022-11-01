import React from 'react'
import Banner from '../component/Banner'
import MainLayout from '../layouts/MainLayout'
import SideNavBarLayout from '../layouts/SideNavBarLayout'
function HomePage() {
  return (
      <MainLayout>
        <SideNavBarLayout />
        <Banner />
    </MainLayout>
  )
}

export default HomePage