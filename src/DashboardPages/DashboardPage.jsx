import React from 'react';
import useRole from '../hooks/useRole';
import ManageContests from './AdminDashboard/ManageContests';
import MyCreatedContest from './CreatorDashboard/MyCreatedContest';
import MyParticipatedContest from './UserDashboard/MyParticipatedContest';
import AdminDashboard from './AdminDashboard/AdminDashboard';
import CreatorDashboard from './CreatorDashboard/CreatorDashboard';
import UserDashboard from './UserDashboard/UserDashboard';

const DashboardPage = () => {

    const {role} = useRole();


    return (
        <div>
            {
                role === 'admin' && <AdminDashboard></AdminDashboard>
            }
            {
                role === 'creator' && <CreatorDashboard></CreatorDashboard>
            }
            {
                role === 'user' && <UserDashboard></UserDashboard>
            }
        </div>
    );
};

export default DashboardPage;

