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
import PaymentSuccess from "../Pages/PaymentSuccess";
import PaymentCancelled from "../Pages/PaymentCancelled";
import UpdateContest from "../DashboardPages/CreatorDashboard/updateContest";
import SubmissionDetails from "../DashboardPages/CreatorDashboard/SubmissionDetails";
import MyProfile from "../DashboardPages/UserDashboard/MyProfile";
import AdminRoutes from "./AdminRoutes";
import CreatorRoutes from "./CreatorRoutes";
import DashboardPage from "../DashboardPages/DashboardPage";
import AboutUs from "../Pages/AboutUs";
import FAQPage from "../Pages/FAQPage";
import Leaderboard from "../Pages/Leaderboard";



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
                path: 'aboutUs',
                Component: AboutUs
            },
            {
                path: 'faq',
                Component: FAQPage
            },
            {
                path: 'leaderboard',
                Component: Leaderboard,
            },
            {
                path: '/contest-details/:id',
                element: <ContestDetails></ContestDetails>
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
                Component: NotFound,
            }
        ]
    },
    {
        path: 'dashboard',
        element: <PrivateRoute>
            <DashboardLayout></DashboardLayout>
        </PrivateRoute>,
        children: [
            {
                index: true,
                element: <DashboardPage></DashboardPage>
            },
            {
                path: 'manage-contests',
                element: <AdminRoutes>
                    <ManageContests></ManageContests>
                </AdminRoutes>

            },
            {
                path: 'manage-users',
                element: <AdminRoutes>
                    <ManageUsers></ManageUsers>
                </AdminRoutes>
            },
            {
                path: 'add-contest',
                element: <CreatorRoutes>
                    <AddContest></AddContest>
                </CreatorRoutes>

            },
            {
                path: 'myCreated-contest',
                element: <CreatorRoutes>
                    <MyCreatedContest></MyCreatedContest>
                </CreatorRoutes>

            },
            {
                path: 'contest/:id',
                element: <CreatorRoutes>
                    <UpdateContest></UpdateContest>
                </CreatorRoutes>
            },
            {
                path: 'submitted-tasks',
                 element: <CreatorRoutes>
                    <SubmittedTasks></SubmittedTasks>
                </CreatorRoutes>
                
            },
            {
                path: 'submission-details/:id',
                 element: <CreatorRoutes>
                    <SubmissionDetails></SubmissionDetails>
                </CreatorRoutes>              
            },
            {
                path: 'myParticipated-contest',
                Component: MyParticipatedContest
            },
            {
                path: 'my-profile',
                Component: MyProfile,
            },
            {
                path: 'myWinning-contest',
                Component: MyWinningContest
            },
            {
                path: 'payment-success',
                Component: PaymentSuccess
            },
            {
                path: 'payment-cancelled/:id',
                Component: PaymentCancelled
            },


        ]
    }
]);