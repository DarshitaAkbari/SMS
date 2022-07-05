import React from 'react'
import { NavLink } from 'react-router-dom'
import '../Sidebar/navbar.css';

const Navbar = () => {
  return (
    <>
        <div className='nav'>
        <ul>
          <NavLink to="home"><li><i class="fa-solid fa-house"></i>Home</li></NavLink>
          <NavLink to='userpro'><li><i class="fa-solid fa-user"></i>User Profile</li></NavLink>
          <NavLink to='table'><li><i class="fa-solid fa-table-list"></i>Table List</li></NavLink>
          <NavLink to='stud'><li><i class="fa-regular fa-keyboard"></i>Staff</li></NavLink>
          <NavLink to='fees'><li><i class="fa-regular fa-keyboard"></i>Fees</li></NavLink>
          {/* <NavLink to='help'><li><i class="fa-solid fa-cubes-stacked"></i>Icon</li></NavLink>
          <NavLink to='news'><li><i class="fa-solid fa-location-dot"></i>Map</li></NavLink>
          <NavLink to='news'><li><i class="fa-solid fa-bell"></i>Notification</li></NavLink> */}
        </ul>
        </div>
    </>
  )
}

export default Navbar
