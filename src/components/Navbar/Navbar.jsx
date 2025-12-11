import React from 'react';
import { Link, NavLink } from 'react-router';
import Logo from '../Logo/Logo';
import useAuth from '../../hooks/useAuth';

 
const Navbar = () => {
  const {user, loading, logOut} = useAuth();
    const links = <>
     <li><NavLink to='/'>Home</NavLink></li>
     <li><NavLink to='/all-contests'>All Contests</NavLink></li>
     <li><NavLink to='/'>Extra sections</NavLink></li>
    </>


const handleLogout = () => {
  logOut()
  .then()
  .catch(error => {
    console.log(error);
    
  })
}
    return (
        <div className="navbar bg-base-100 shadow-sm">
  <div className="navbar-start">
    <div className="dropdown">
      <div tabIndex={0} role="button" className="btn btn-ghost lg:hidden">
        <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5" fill="none" viewBox="0 0 24 24" stroke="currentColor"> <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M4 6h16M4 12h8m-8 6h16" /> </svg>
      </div>
      <ul
        tabIndex="-1"
        className="menu menu-sm dropdown-content bg-base-100 rounded-box z-1 mt-3 w-52 p-2 shadow">
        {links}
      </ul>
    </div>
    <Logo></Logo>
  </div>
  <div className="navbar-center hidden lg:flex">
    <ul className="menu menu-horizontal px-1">
     
        {links}
    </ul>
  </div>
  <div className="navbar-end">
    {user && <>
    <div className="dropdown dropdown-end">
  <div tabIndex={0} role="button" className=" m-1"><img className='w-[50px] h-[50px] rounded-full object-cover' src={user?.photoURL} alt="" /></div>
  <ul tabIndex="-1" className="dropdown-content menu bg-base-100 rounded-box z-1 w-52 p-2 shadow-sm">
    <li className='text-center font-bold text-xl'>{user?.displayName}</li>
    <li><Link className='btn btn-primary rounded-md mt-2' to='/dashboard'>Dashboard</Link></li>
    <li><button className='btn btn-primary rounded-md mt-2' onClick={handleLogout}>Logout</button></li>
  
  </ul>
</div>
    
    </>}
  </div>
</div>
    );
};

export default Navbar;