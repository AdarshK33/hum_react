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
        // console.log("checkTokenExists");
        let access_token = Cookies.get('APPAT');
        //console.log("INSIDE CHECK TOKEN EXISTS"+access_token)
        if (access_token) {
            authenticateUser(true)
        }
        else {
            authenticateUser(false)
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