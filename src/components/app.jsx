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

    const { authenticateUser, getUserInfo, state, user, getUserMenu, flag, app } = useContext(AppContext);
    const [flagValue, setFlagValue] = useState();
    const [menuItems, setMenuItems] = useState();
    const loginUrl = `${process.env.REACT_APP_FEDID_AUTH_URL}?response_type=code&client_id=${process.env.REACT_APP_FEDID_CLIENTID}&scope=openid%20profile&redirect_uri=${process.env.REACT_APP_REDIRECT_URL}`;

    useEffect(() => {
        checkTokenExists()
        setFlagValue(flag)
    }, []);
    useEffect(() => {
        const { MENUITEMS, flag } = state
        setMenuItems(MENUITEMS);
        
        if (flagValue === 0 && menuItems !== []) {
            setFlagValue(flag)
            if(window.location.href.includes("team")){
                getUserMenu(user.managerMenus);
            }else if (window.location.href.includes("admin")) {
                getUserMenu(user.adminMenus);
            }else {
                getUserMenu(user.generalUserMenus);
            }
            
        }
    })

    const checkTokenExists = () => {
        console.log("APP RESULT " + app.isLoggedin);
        // console.log("ALL TOKENS "+Cookies.get());
        let access_token = Cookies.get('APPAT');
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
