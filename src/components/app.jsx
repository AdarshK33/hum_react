import React, { useEffect, useContext } from 'react';
import Header from './common/header-component/header';
import Sidebar from './common/sidebar-component/sidebar';
import "./common/style.css";
import { ToastContainer } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
import { AppContext } from "../context/AppState";
import Cookies from "js-cookie";
const AppLayout = ({ children }) => {

    const { authenticateUser, getUserInfo, state } = useContext(AppContext);
    const loginUrl = `https://preprod.idpdecathlon.oxylane.com/as/authorization.oauth2?response_type=code&client_id=${process.env.REACT_APP_FEDID_CLIENTID}&scope=openid%20profile&redirect_uri=${process.env.REACT_APP_REDIRECT_URL}`;

    useEffect(() => {
        checkTokenExists()
        getUserInfo()
    }, []);
    useEffect(() => {
        const { app, user } = state
        console.log("=== ", app)
        console.log("for user", user)
    })
    const checkTokenExists = () => {
        // console.log("ALL TOKENS "+Cookies.get());
        let access_token = Cookies.get('APPAT');
        if (access_token) {
            authenticateUser(true)
            console.log("login valid")
        }
        else {
            authenticateUser(false)
            console.log("Invalid Login")
            window.location.href = loginUrl
        }
    }
    return (
        <div>

            <div className="page-wrapper">
                <div className="page-body-wrapper">
                    <Header />
                    <Sidebar />
                    <div className="page-body">
                        {children}


                    </div>
                </div>
            </div>
            <ToastContainer />
        </div>
    );
}

export default AppLayout;
