import { createBrowserRouter } from "react-router-dom";
import Login from "../pages/authentication/Login";
import Register from "../pages/authentication/Register";
import ForgotPassword from "../pages/authentication/ForgotPassword";
import OtpPage from "../pages/authentication/OtpPage";
import NewPassword from "../pages/authentication/NewPassword";
import App from "../App";
import HomePage from "../pages/HomePage/HomePage";
import EditPage from "../pages/EditPage/EditPage";
import UserRegister from "../pages/User/UserRegister";
import UserHomePage from "../pages/User/UserHomePage";
import SupervisorDashboard from "../pages/Supervisor/SupervisorDashboard";
import UserEditPage from "../pages/User/UserEditPage";
import AdminProductHomePage from "../Products/AdminProducts/AdminProductHomePage";
import AdminAddProduct from "../Products/AdminProducts/AdminAddProduct";
import UserDetails from "../pages/User/UserDetails";
import BuyProduct from "../Products/UserProducts/BuyProduct";

const router= createBrowserRouter([
    {path: '/', element: <App />},
    {path: '/register', element: <Register />},
    {path: '/login', element: <Login />},
    {path: '/login/forgotPassword', element: <ForgotPassword />},
    {path: '/login/forgotPassword/otp', element: <OtpPage />},
    {path: '/login/forgotPassword/otp/reset', element: <NewPassword />},
    {path: '/login/homePage', element: <HomePage />},
    {path: '/homePage/editUser', element: <EditPage />},
    {path: '/userRegistration', element: <UserRegister />},
    {path: '/user/userHomepage', element: <UserHomePage />},
    {path: '/user/userdetails', element: <UserDetails />},
    {path: '/user/userHomepage/userEdit', element: <UserEditPage />},
    {path: '/supervisorPage', element: <SupervisorDashboard />} ,
    {path: '/admin/product', element: <AdminProductHomePage />} ,
    {path: '/admin/product/add', element: <AdminAddProduct />} ,
    {path: '/userhomeage', element: <UserHomePage />},
    {path: '/purchase', element: <BuyProduct />},

]);

export default router;