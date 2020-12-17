import React, { useEffect, useContext, useState } from 'react';
import Header from './common/header-component/header';
import Sidebar from './common/sidebar-component/sidebar';
import "./common/style.css";
import { ToastContainer } from 'react-toastify';
import Loader from "../components/common/loader";
import 'react-toastify/dist/ReactToastify.css';
import { AppContext } from "../context/AppState";
import Cookies from "js-cookie";
const AppLayout = ({ children }) => {

    const { authenticateUser, getUserInfo, state, getUserMenu, flag, app, access_tokenState } = useContext(AppContext);
    const [flagValue, setFlagValue] = useState();
    const [menuItems, setMenuItems] = useState();
    const loginUrl = `${process.env.REACT_APP_FEDID_AUTH_URL}?response_type=code&client_id=${process.env.REACT_APP_FEDID_CLIENTID}&scope=openid%20profile&redirect_uri=${process.env.REACT_APP_REDIRECT_URL}`;

    useEffect(() => {
        checkTokenExists()
        setFlagValue(flag)
    }, []);
    useEffect(() => {
        const { MENUITEMS, flag, user } = state
        setMenuItems(MENUITEMS);
        let type = localStorage.getItem('type')
        if (flag === 0 && MENUITEMS !== []) {
            setFlagValue(flag)
            if (type === "team") {
                getUserMenu(user.managerMenus);
            } else if (type === "admin") {
                getUserMenu(user.adminMenus);
            } else if (type === "leader") {
                getUserMenu(user.clusterManagerMenus);
            } else {
                getUserMenu(user.generalUserMenus, "profile", user);
                localStorage.setItem('flag', "0")
            }
        }
    }, [window.location.href, state])

    useEffect(() => {
        setMenuItems(state.MENUITEMS);
    }, [state.MENUITEMS]);

    const checkTokenExists = () => {
        console.log("APP RESULT " + app.isLoggedin);
        // console.log("ALL TOKENS "+Cookies.get());

        let access_token = access_tokenState;
        console.log("CONTEXT API ", access_token)
        if (access_token) {
            authenticateUser(true)
            getUserInfo()
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
                    {
                        app.isLoggedin ?
                            <div>
                                <Header />
                                {menuItems !== null && menuItems !== undefined ?
                                    <Sidebar MENUITEMS={menuItems} />
                                    : ""}
                                <div className="page-body">
                                    {children}


                                </div>
                            </div>
                            : <Loader />
                    }

                </div>
            </div>
            <ToastContainer />
        </div>
    );
}

export default AppLayout;
