import { createBrowserRouter } from "react-router";
import MainLayout from "../Layouts/MainLayout";
import HomePage from "../Pages/HomePage";
import RegistrationPage from "../Pages/RegistrationPage";
import DashboardLayout from "../Layouts/DashboardLayout";
import ManageContests from "../DashboardPages/AdminDashboard/ManageContests";
import ManageUsers from "../DashboardPages/AdminDashboard/ManageUsers";
import AddContest from "../DashboardPages/CreatorDashboard/AddContest";
import SubmittedTasks from "../DashboardPages/CreatorDashboard/SubmittedTasks";
import MyParticipatedContest from "../DashboardPages/UserDashboard/MyParticipatedContest";
import MyWinningContest from "../DashboardPages/UserDashboard/MyWinningContest";
import AllContestPage from "../Pages/AllContestPage";
import LoginPage from "../Pages/Loginpage";
import PrivateRoute from "./PrivateRoute";
import NotFound from "../Pages/NotFount";
import MyCreatedContest from "../DashboardPages/CreatorDashboard/MyCreatedContest";
import ContestDetails from "../Pages/ContestDetails";



export const router = createBrowserRouter([
  {
    path: "/",
    Component: MainLayout,
    children: [
        {
            index: true,
            Component: HomePage
        },
        {
            path: 'all-contests',
            Component: AllContestPage
        },
        {
            path: '/contest-details/:id',
            element: <PrivateRoute>
                <ContestDetails></ContestDetails>
            </PrivateRoute>
        },
        {
            path: 'login',
            Component: LoginPage
        },
        {
            path: 'register',
            Component: RegistrationPage
        },
        {
        path: "*",
        Component: NotFound
      }
    ]
  },
  {
    path:'dashboard',
    element: <PrivateRoute>
        <DashboardLayout></DashboardLayout>
    </PrivateRoute>,
    children: [
        {
            path:'manage-contests',
            Component: ManageContests
        },
        {
            path:'manage-users',
            Component: ManageUsers
        },
        {
            path:'add-contest',
            Component: AddContest
        },
        {
            path:'myCreated-contest',
            Component: MyCreatedContest
        },
        {
            path:'submitted-tasks',
            Component: SubmittedTasks
        },
        {
            path:'myParticipated-contest',
            Component: MyParticipatedContest
        },
        {
            path:'my-profile',
            Component: SubmittedTasks
        },
        {
            path:'myWinning-contest',
            Component: MyWinningContest
        },

    ]
  }
]);