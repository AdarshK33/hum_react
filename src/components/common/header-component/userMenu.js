import React, { Fragment, useContext, useEffect, useState } from "react";
import man from "../../../assets/images/dashboard/userImage.png";
import { User, LogOut, Users, UserPlus } from "react-feather";
import { AppContext } from "../../../context/AppState";
import { useHistory } from "react-router-dom";
import { PermissionContext } from "../../../context/PermissionState";
import { Row, Col, Form, Button } from "react-bootstrap";
// const loginUrl = `${process.env.REACT_APP_FEDID_AUTH_URL}?response_type=code&client_id=${process.env.REACT_APP_FEDID_CLIENTID}&scope=openid%20profile&redirect_uri=${process.env.REACT_APP_REDIRECT_URL}`;
const UserMenu = () => {
  const { user, getUserMenu, userLogout } = useContext(AppContext);
  const { viewServiceGroup, groupList, permissionRoleAccess, rolePermission } =
    useContext(PermissionContext);
  let history = useHistory();

  useEffect(() => {
    viewServiceGroup();
  }, []);

  const handleMenuListProfile = () => {
    if(user.department === "Finance & Legal" || user.department === "Finance" || 
    user.department === "IT"){
      let departmentList = user !==null && user!==undefined && user.generalUserMenus !== null && user.generalUserMenus !== undefined && Object.keys(user.generalUserMenus).length && user.generalUserMenus.filter(
        (item) =>
    item.menuName !== "Roster" &&
    item.menuName !== "Dashboard" &&
    item.menuName !== "My Roster" 
    )
      getUserMenu(departmentList, "profile", user);
    }else if((user.department === "Finance & Legal" ||
    user.department === "Finance" || 
    user.department === "IT") && 
    user.contractType === "Internship"){
      let departmentList = user !==null && user!==undefined && user.generalUserMenus !== null && user.generalUserMenus !== undefined && Object.keys(user.generalUserMenus).length && user.generalUserMenus.filter(
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
        item.menuName !== "My Profile" &&
        item.menuName !== "Roster" &&
        item.menuName !== "Dashboard" &&
        item.menuName !== "My Roster" 
      );
      getUserMenu(departmentList, "profile", user);
    }
    localStorage.setItem("type", "profile");
    localStorage.setItem("flag", "0");
    // history.push("/dashboard/storedashboard");31/05/2022
    history.push("/employee360");

  };

  const handleMenuListAdmin = () => {
    if(user.department ==="Finance & Legal" ||user.department === "Finance" || user.department === "IT"){
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
    localStorage.setItem("type", "admin");
    localStorage.setItem("flag", "0");
    // history.push("/dashboard/storedashboard");31/05/2022
    history.push("/manager360");

  };

  const handleMenuListTeam = () => {
    if(user.department === "Finance & Legal" || user.department === "Finance" ||
    user.department === "IT"){
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

    localStorage.setItem("type", "team");
    localStorage.setItem("flag", "0");
    // history.push("/dashboard/storedashboard");31/05/2022
    history.push("/manager360");

  };

  const handleMenuListCluster = () => {
    getUserMenu(user.clusterManagerMenus);
    localStorage.setItem("type", "leader");
    localStorage.setItem("flag", "1");
    // history.push("/dashboard/storedashboard");31/05/2022
    history.push("/employee360");

  };

  const TicketListingPage = () => {
    getUserMenu(user.supportMenus);
    localStorage.setItem("type", "support");
    localStorage.setItem("flag", "0");
    history.push("/ticketlistingpage");
  };

  /* const offerClick = ()=> {
        history.push("/offer-accept");
    } */

  return (
    <Fragment>
      <li className="onhover-dropdown">
        <div className="media align-items-center">
          <img
            className="align-self-center pull-right img-50 rounded-circle blur-up lazyloaded"
            src={man}
            alt="header-user"
          />
        </div>
        {/* <div className="dotted-animation">
                        <span className="animate-circle"></span>
                        <span className="main-circle"></span>
                    </div> */}

        <ul className="profile-dropdown onhover-show-div p-20 profile-dropdown-hover">
          <li onClick={handleMenuListProfile}>
            <a href="#profile">
              <User />
              My Profile
            </a>
          </li>
          {
            user.adminMenus !== null && rolePermission == "admin" && (
              <li onClick={handleMenuListAdmin}>
                <a href="#admin">
                  <UserPlus />
                  Admin
                </a>
              </li>
            )
            // <Fragment>

            //     <li onClick={handleMenuListTeam}><a href="#javascript"><Users />My Team</a></li>
            // </Fragment>
          }
          {user.managerMenus !== null &&
            (rolePermission == "superCostCenterManager" ||
              rolePermission == "costCenterManager" ||
              rolePermission == "manager") && (
              <li onClick={handleMenuListTeam}>
                <a href="#team">
                  <Users />
                  My Team
                </a>
              </li>
            )}
          {user.clusterManagerMenus !== null && (
            <li onClick={handleMenuListCluster}>
              <a href="#leader">
                <Users />
                Cluster Leader
              </a>
            </li>
          )}
          {groupList !== null ? (
            groupList.groupStatus === 0 ? (
              <li onClick={TicketListingPage}>
                <a href="#support">
                  <Users />
                  Support
                </a>
              </li>
            ) : (
              ""
            )
          ) : (
            <li onClick={TicketListingPage}>
              <a href="#support">
                <Users />
                Support
              </a>
            </li>
          )}
          {/*  <li><a href="#javascript"><Settings />Settings</a></li> */}
          {/* <li><a href="#javascript"><LogOut /> Log out</a></li> */}
          {/* <li><a href={loginUrl}><LogIn />Log In</a></li> */}
          {/* <li onClick={gotoProfilePage}><a href="#profile">Profile Edit</a></li> */}
          {/*  <li onClick={offerClick}>Offer Accept</li> */}
          <li
            onClick={() => {
              userLogout();
            }}
          >
            <a href="#javascript">
              <LogOut /> Log out
            </a>
          </li>
        </ul>
      </li>
    </Fragment>
  );
};

export default UserMenu;
