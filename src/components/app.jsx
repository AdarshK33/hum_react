import React, { useEffect, useContext, useState } from 'react';
import Header from './common/header-component/header';
import Sidebar from './common/sidebar-component/sidebar';
import "./common/style.css";
import { ToastContainer } from 'react-toastify';
import Loader from "../components/common/loader";
import 'react-toastify/dist/ReactToastify.css';
import { AppContext } from "../context/AppState";
import { UserManager } from 'oidc-client';
import { useHistory } from "react-router-dom";
import Cookies from "js-cookie";
import { access_token } from '../auth/signin';
import { accessToken } from '../utils/axios';

const AppLayout = ({ children }) => {
    let history = useHistory();
    const { authenticateUser, getUserInfo, state, getUserMenu, flag, app } = useContext(AppContext);
    const [flagValue, setFlagValue] = useState();
    const [menuItems, setMenuItems] = useState();
    const loginUrl = `${process.env.REACT_APP_FEDID_AUTH_URL}?response_type=code&client_id=${process.env.REACT_APP_FEDID_CLIENTID}&scope=openid%20profile&redirect_uri=${process.env.REACT_APP_REDIRECT_URL}`;



    useEffect(() => {
        // checkTokenExists()
        setFlagValue(flag)

    }, []);


    useEffect(() => {
        checkTokenExists(accessToken)
        // setFlagValue(flag)

    }, [accessToken]);


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

    const checkTokenExists = (accessToken) => {
        console.log("APP RESULT " + app.isLoggedin);
        console.log("inside the check token exist")
        
        // let access_token = Cookies.get('APPAT');

        if (accessToken) {
            console.log("access token present ")
            authenticateUser(true)
            getUserInfo()
            console.log("login valid")
        }
        else {
            console.log("access token not present")
            const userManager = new UserManager();
            authenticateUser(false)
            console.log("Invalid Login")
            //  window.location.href = loginUrl
            // userManager.signinRedirect();
             history.push("/login");
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