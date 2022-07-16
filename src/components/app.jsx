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
import { accessToken } from '../utils/axios';

const AppLayout = ({ children }) => {
    let history = useHistory();
    const { authenticateUser, getUserInfo, state, getUserMenu, flag, app } = useContext(AppContext);
    const [flagValue, setFlagValue] = useState();
    const [menuItems, setMenuItems] = useState();
   // const loginUrl = `${process.env.REACT_APP_FEDID_AUTH_URL}?response_type=code&client_id=${process.env.REACT_APP_FEDID_CLIENTID}&scope=openid%20profile&redirect_uri=${process.env.REACT_APP_REDIRECT_URL}`;



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
                if(user.department === "Finance & Legal" ||user.department === "Finance" || 
                user.department === "IT"|| user.loginType == 1 || user.additionalRole == 1){
                  getUserMenu(user.managerMenus);
                }else{
                  let departmentList = user !==null && user!==undefined && user.managerMenus !== null && user.managerMenus !== undefined && Object.keys(user.managerMenus).length &&user.managerMenus.filter(
                    (item) => item.menuName !== "Manager 360" && 
                    item.menuName !== "Manager Profile" && 
                    item.menuName !== "Documents" && 
                    item.menuName !== "Document Management" && 
                    item.menuName !== "Documents Upload" && 
                    item.menuName !== "Employee History" && 
                    item.menuName !== "Part Timer Salary Input" && 
                    item.menuName !== "Separation" && 
                    item.menuName !== "Initiate Exit"&& 
                    item.menuName !== "Exit Approval" && 
                    item.menuName !== "All Reports" && 
                    item.menuName !== "MIT Report" && 
                    item.menuName !== "Disciplinary" && 
                    item.menuName !== "Disciplinary Action" && 
                    item.menuName !== "Offer and Onbording" && 
                    item.menuName !== "Offers" && 
                    item.menuName !== "Candidate verification" && 
                    item.menuName !== "Transfer" && 
                    item.menuName !== "Probation" && 
                    item.menuName !== "Promotion" && 
                    item.menuName !== "My Profile" && 
                    item.menuName !== "Employee 360" && 
                    item.menuName !== "Payroll" && 
                    item.menuName !== "My Payroll" && 
                    item.menuName !== "Employee Documents Verification" && 
                    item.menuName !== "DSI Charters" &&
                    item.menuName !== "DSI Charter" 
                  );
                  getUserMenu(departmentList);
                }
            } else if (type === "admin") {
                if(user.department ==="Finance & Legal" ||user.department === "Finance" || user.department === "IT"|| user.loginType == 1 || user.additionalRole == 1){
                    getUserMenu(user.adminMenus);
                  }else{
                    let departmentList = user !==null && user!==undefined && user.adminMenus !== null && user.adminMenus !== undefined && Object.keys(user.adminMenus).length && user.adminMenus.filter(
                      (item) => item.menuName !== "Manager 360" && 
                       item.menuName !== "Employee Documents Verification" && item.menuName !== "Document Management" && 
                       item.menuName !== "Admin F & F  Clearance" && 
                       item.menuName !== "Admin No Due Clearance" && 

                       item.menuName !== "Charter" && 
                       item.menuName !== "Documents" && 
                       item.menuName !== "Documents Upload" && 
                       item.menuName !== "Part Timer Salary Input" && 
                       item.menuName !== "Employee History" && 
                       item.menuName !== "Insurance" && 
                       item.menuName !== "Bonus Structure" && 
                       item.menuName !== "Separation" && 
                       item.menuName !== "Initiate Exit" && 
                       item.menuName !== "Finance Clearance" && 
                       item.menuName !== "IT Clearance" && 
                       item.menuName !== "All Reports" && 
                       item.menuName !== "MIT Report" && 
                       item.menuName !== "Candidate verification" && 
                       item.menuName !== "Offer and Onbording" && 
                       item.menuName !== "Offers" && 
                       item.menuName !== "Manager Profile" && 
                       item.menuName !== "Notice Period" && 
                       item.menuName !== "Payroll" && 
                       item.menuName !== "Payroll Documents" && 
                       item.menuName !== "DSI Charter" && 
                       item.menuName !== "Exit Approval" && 
                       item.menuName !== "Disciplinary" && 
                       item.menuName !== "Disciplinary Action" && 
                       item.menuName !== "Transfer" && 
                       item.menuName !== "Probation" && 
                       item.menuName !== "Promotion"&& 
                       item.menuName !== "DSI Charters" &&
                       item.menuName !== "DSI Charter" &&
                       item.menuName !== "Charter"
                    );
                    getUserMenu(departmentList);
                  }  
            } else if (type === "leader") {
                getUserMenu(user.clusterManagerMenus);
            }else if (type === 'support') {
                    getUserMenu(user.supportMenus)
            } else {
                if(user.department === "Finance & Legal" ||user.department === "Finance" || 
                  user.department === "IT" || user.loginType == 1 || user.additionalRole == 1){
                    let departmentList = user !==null && user!==undefined && user.generalUserMenus !== null && user.generalUserMenus !== undefined && Object.keys(user.generalUserMenus).length && user.generalUserMenus.filter(
                        (item) =>
                    item.menuName !== "Roster" &&
                    item.menuName !== "Dashboard" &&
                    item.menuName !== "My Roster" 
                    )
                  getUserMenu(departmentList, "profile", user);
            }else if((user.department === "Finance & Legal" ||user.department === "Finance" || user.department === "IT" || user.loginType == 1 || user.additionalRole == 1) && 
              user.contractType === "Internship"){
            let departmentList = user !== null && user !== undefined && user.generalUserMenus !== null && user.generalUserMenus !== undefined && Object.keys(user.generalUserMenus).length && user.generalUserMenus.filter(
            (item) => item.menuName !== "Resignation" && 
                     item.menuName !== "Roster" &&
                    item.menuName !== "Dashboard" &&
                    item.menuName !== "My Roster" &&
                     item.menuName !== "Separation" 
      );
      getUserMenu(departmentList, "profile", user);
    }else if(user.department == "Retail"){
      let departmentList = user !==null && user!==undefined && user.generalUserMenus !== null && user.generalUserMenus !== undefined && Object.keys(user.generalUserMenus).length && user.generalUserMenus.filter(
        (item) => item.menuName !== "Documents" &&  
      
        item.menuName !== "Document Management" && 
        item.menuName !== "Resignation" && 
        item.menuName !== "Separation" && 
        item.menuName !== "Disciplinary" && 
        item.menuName !== "Payroll" && 
        item.menuName !== "Employee 360" && 
        item.menuName !== "My Disciplinary Action" && 
        item.menuName !== "My Payroll" && 
        item.menuName !== "My Profile"
      );
      getUserMenu(departmentList, "profile", user);
    }else{
      let departmentList = user !== null && user !== undefined && user.generalUserMenus !== null && user.generalUserMenus !== undefined && Object.keys(user.generalUserMenus).length && user.generalUserMenus.filter(
        (item) => item.menuName !== "Documents" &&  
        item.menuName !== "Document Management" && 
        item.menuName !== "Resignation" && 
        item.menuName !== "Separation" && 
        item.menuName !== "Disciplinary" && 
        item.menuName !== "Payroll" && 
        item.menuName !== "Employee 360" && 
        item.menuName !== "My Disciplinary Action" && 
        item.menuName !== "My Payroll" && 
        item.menuName !== "My Profile" &&
        item.menuName !== "Roster" &&
        item.menuName !== "Dashboard" &&
        item.menuName !== "My Roster" 
      );
      getUserMenu(departmentList, "profile", user);
    }
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