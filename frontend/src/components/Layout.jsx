import React from 'react'
import { Outlet } from 'react-router-dom';
import HeaderPage from './header';

const Layout = () => {
  return (
    <div className='py-4 px-8 flex flex-col min-h-screen'>
        <HeaderPage />
        <Outlet />
    </div>
  )
}

export default Layout;
