import React, { useEffect, useContext, useState } from 'react';
import Header from './common/header-component/header';
import Sidebar from './common/sidebar-component/sidebar';
import "./common/style.css";
import { ToastContainer } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
import { AppContext } from "../context/AppState";
import Cookies from "js-cookie";
const AppLayout = ({ children }) => {

    const { authenticateUser, getUserInfo, state, user , getUserMenu, flag} = useContext(AppContext);
    const [flagValue, setFlagValue] = useState();
    const [menuItems, setMenuItems] = useState();
    const loginUrl = `https://preprod.idpdecathlon.oxylane.com/as/authorization.oauth2?response_type=code&client_id=${process.env.REACT_APP_FEDID_CLIENTID}&scope=openid%20profile&redirect_uri=${process.env.REACT_APP_REDIRECT_URL}`;

    useEffect(() => {
        checkTokenExists()
        getUserInfo()
        setFlagValue(flag)
    }, []);
    useEffect(() => {
        const {  MENUITEMS,flag } = state
        setMenuItems(MENUITEMS);
       if(flagValue === 0 && menuItems !== []){
        setFlagValue(flag)
        getUserMenu(user.generalUserMenus);
       }
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
                    {menuItems !== null && menuItems !== undefined ? 
                    <Sidebar  MENUITEMS = {menuItems}/>
                    :""}
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
