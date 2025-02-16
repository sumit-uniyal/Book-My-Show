import React from 'react'
import Header from './Header'
import Footer from './Footer'
import { Outlet } from 'react-router-dom'

const AppLayout = () => {
  return (
    <>
        <Header></Header>
            <Outlet />
        <Footer></Footer>
    </>
  )
}

export default AppLayout