import {Outlet} from 'react-router-dom'
import Navbar from './Navbar'
import React from 'react'

const Nav = () => {
  return (
    <div className='main'>
        <div className='menu'>
          <Navbar />
        </div>
        <div className='card1'>
            <Outlet></Outlet>
        </div>
    </div>
    )
}

export default Nav
