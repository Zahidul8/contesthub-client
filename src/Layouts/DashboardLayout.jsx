import React from 'react';
import { Link, Outlet } from 'react-router';
import {
  FaHome,
  FaTasks,
  FaUsersCog,
  FaUserEdit,
  FaPlusCircle,
  FaClipboardList,
  FaUserCircle,
  FaTrophy,
  FaFolderOpen,
} from "react-icons/fa";

const DashboardLayout = () => {
    return (
        <div className="drawer lg:drawer-open">
  <input id="my-drawer-4" type="checkbox" className="drawer-toggle" />
  <div className="drawer-content">
    {/* Navbar */}
    <nav className="navbar w-full bg-base-300">
      <label htmlFor="my-drawer-4" aria-label="open sidebar" className="btn btn-square btn-ghost">
        {/* Sidebar toggle icon */}
        <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" strokeLinejoin="round" strokeLinecap="round" strokeWidth="2" fill="none" stroke="currentColor" className="my-1.5 inline-block size-4"><path d="M4 4m0 2a2 2 0 0 1 2 -2h12a2 2 0 0 1 2 2v12a2 2 0 0 1 -2 2h-12a2 2 0 0 1 -2 -2z"></path><path d="M9 4v16"></path><path d="M14 10l2 2l-2 2"></path></svg>
      </label>
      <div className="px-4">Navbar Title</div>
    </nav>
    {/* Page content here */}
    <Outlet></Outlet>
  </div>

  <div className="drawer-side is-drawer-close:overflow-visible">
    <label htmlFor="my-drawer-4" aria-label="close sidebar" className="drawer-overlay"></label>
    <div className="flex min-h-full flex-col items-start bg-base-200 is-drawer-close:w-14 is-drawer-open:w-64">
      {/* Sidebar content here */}

     <ul className="menu w-full grow flex gap-4">

  {/* Home */}
  <li>
    <Link to="/" className="is-drawer-close:tooltip is-drawer-close:tooltip-right" data-tip="Homepage">
      <FaHome className="text-lg" />
      <span className="is-drawer-close:hidden">Homepage</span>
    </Link>
  </li>

  {/* ----------------- ADMIN ROUTES ----------------- */}
  <li>
    <Link to="/dashboard/manage-contests" className="is-drawer-close:tooltip is-drawer-close:tooltip-right" data-tip="Manage Contest">
      <FaTasks className="text-lg" />
      <span className="is-drawer-close:hidden">Manage Contest</span>
    </Link>
  </li>

  <li>
    <Link to="/dashboard/manage-users" className="is-drawer-close:tooltip is-drawer-close:tooltip-right" data-tip="Manage Users">
      <FaUsersCog className="text-lg" />
      <span className="is-drawer-close:hidden">Manage Users</span>
    </Link>
  </li>

  {/* ----------------- CREATOR ROUTES ----------------- */}
  <li>
    <Link to="/dashboard/add-contest" className="is-drawer-close:tooltip is-drawer-close:tooltip-right" data-tip="Add Contest">
      <FaPlusCircle className="text-lg" />
      <span className="is-drawer-close:hidden">Add Contest</span>
    </Link>
  </li>

  <li>
    <Link to="/dashboard/myCreated-contest" className="is-drawer-close:tooltip is-drawer-close:tooltip-right" data-tip="My Created Contests">
      <FaFolderOpen className="text-lg" />
      <span className="is-drawer-close:hidden">My Created Contests</span>
    </Link>
  </li>

  <li>
    <Link to="/dashboard/submitted-tasks" className="is-drawer-close:tooltip is-drawer-close:tooltip-right" data-tip="Submitted Tasks">
      <FaClipboardList className="text-lg" />
      <span className="is-drawer-close:hidden">Submitted Tasks</span>
    </Link>
  </li>

  {/* ----------------- USER ROUTES ----------------- */}
  <li>
    <Link to="/dashboard/myParticipated-contest" className="is-drawer-close:tooltip is-drawer-close:tooltip-right" data-tip="My Participated Contests">
      <FaTasks className="text-lg" />
      <span className="is-drawer-close:hidden">My Participated Contests</span>
    </Link>
  </li>

  <li>
    <Link to="/dashboard/my-profile" className="is-drawer-close:tooltip is-drawer-close:tooltip-right" data-tip="My Profile">
      <FaUserCircle className="text-lg" />
      <span className="is-drawer-close:hidden">My Profile</span>
    </Link>
  </li>

  <li>
    <Link to="/dashboard/myWinning-contest" className="is-drawer-close:tooltip is-drawer-close:tooltip-right" data-tip="My Winning List">
      <FaTrophy className="text-lg" />
      <span className="is-drawer-close:hidden">My Winning List</span>
    </Link>
  </li>

</ul>
    </div>
  </div>
</div>
    );
};

export default DashboardLayout;