import React, { useState, useContext, Fragment } from "react";
import logo from "../../../assets/images/humineNewLogo.jpg";
import UserMenu from "./userMenu";
import { Link } from "react-router-dom";
import { AppContext } from "../../../context/AppState";
import { AlignLeft, Maximize, MoreHorizontal } from "react-feather";
import { Row, Col, Form, Button } from "react-bootstrap";
import { PermissionContext } from "../../../context/PermissionState";
import { useHistory } from "react-router-dom";
const Header = () => {
  const [sidebar, setSidebar] = useState(false);
  const [headerbar, setHeaderbar] = useState(true);
  const [adminChecked, setAdminChecked] = useState(false);
  const [scChecked, setScChecked] = useState(false);
  const [costChecked, setCostChecked] = useState(false);
  const [managerChecked, setManagerChecked] = useState(false);
  const { user, getUserMenu } = useContext(AppContext);
  let history = useHistory();
  const { viewServiceGroup, groupList, permissionRoleAccess, rolePermission } =
    useContext(PermissionContext);
  const openCloseSidebar = () => {
    if (sidebar) {
      setSidebar(!sidebar);
      document.querySelector(".page-main-header").classList.remove("open");
      document.querySelector(".page-sidebar").classList.remove("open");
    } else {
      setSidebar(!sidebar);
      document.querySelector(".page-main-header").classList.add("open");
      document.querySelector(".page-sidebar").classList.add("open");
    }
  };

  // function showRightSidebar() {
  //   if (rightSidebar) {
  //     setRightSidebar(!rightSidebar)
  //     document.querySelector(".right-sidebar").classList.add('show');
  //   } else {
  //     setRightSidebar(!rightSidebar)
  //     document.querySelector(".right-sidebar").classList.remove('show');
  //   }
  // }

  //full screen function
  function goFull() {
    if (
      (document.fullScreenElement && document.fullScreenElement !== null) ||
      (!document.mozFullScreen && !document.webkitIsFullScreen)
    ) {
      if (document.documentElement.requestFullScreen) {
        document.documentElement.requestFullScreen();
      } else if (document.documentElement.mozRequestFullScreen) {
        document.documentElement.mozRequestFullScreen();
      } else if (document.documentElement.webkitRequestFullScreen) {
        document.documentElement.webkitRequestFullScreen(
          Element.ALLOW_KEYBOARD_INPUT
        );
      }
    } else {
      if (document.cancelFullScreen) {
        document.cancelFullScreen();
      } else if (document.mozCancelFullScreen) {
        document.mozCancelFullScreen();
      } else if (document.webkitCancelFullScreen) {
        document.webkitCancelFullScreen();
      }
    }
  }
  const adminHandler = (e) => {
    if(adminChecked == false){
    localStorage.setItem("loginRole", "admin");
          setAdminChecked(true);
    setScChecked(false);
    setCostChecked(false);
    setManagerChecked(false);
    permissionRoleAccess(localStorage.getItem("loginRole"));
    if(user.department ==="Finance & Legal" || user.department === "Finance" || user.department === "IT"){
      getUserMenu(user.adminMenus);
    }else{
      let departmentList = user !==null && user!==undefined && user.adminMenus !== null && user.adminMenus !== undefined && Object.keys(user.adminMenus).length &&user.adminMenus.filter(
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
    // history.push("/dashboard/storedashboard#admin");31/05/2022
    history.push("/manager360#admin");
  }else{
    setAdminChecked(false);
    setScChecked(false);
    setCostChecked(false);
    setManagerChecked(false);
    // getUserMenu(user.supportMenus);
    // localStorage.removeItem("type");
    // localStorage.removeItem("loginRole");
    // localStorage.setItem("flag", "0");
    // history.push("/employee360");
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
    localStorage.setItem("loginRole","Employee");
    permissionRoleAccess(localStorage.getItem("loginRole"));
    // history.push("/dashboard/storedashboard");31/05/2022
    history.push("/employee360");
  }

  };

  const scHandler = () => {
    if(scChecked == false){
    localStorage.setItem("loginRole", "superCostCenterManager");
    setAdminChecked(false);
    setScChecked(true);
    setCostChecked(false);
    setManagerChecked(false);
    permissionRoleAccess(localStorage.getItem("loginRole"));
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
        item.menuName !== "Employee Documents Verification"&& 
        item.menuName !== "DSI Charters" &&
        item.menuName !== "DSI Charter"  
      );
      getUserMenu(departmentList);
    }
    localStorage.setItem("type", "team");
    localStorage.setItem("flag", "0");
    // history.push("/dashboard/storedashboard#team");31/05/2022
    history.push("/manager360#team");
  }else{
    setAdminChecked(false);
    setScChecked(false);
    setCostChecked(false);
    setManagerChecked(false);
    // getUserMenu(user.supportMenus);
    // localStorage.removeItem("type");
    // localStorage.removeItem("loginRole");
    // localStorage.setItem("flag", "0");
    // history.push("/employee360")
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
    localStorage.setItem("loginRole","Employee");
    permissionRoleAccess(localStorage.getItem("loginRole"));
    // history.push("/dashboard/storedashboard");31/05/2022
    history.push("/employee360");
  }

  };

  const costHandler = () => {
    if(costChecked == false){
    localStorage.setItem("loginRole", "costCenterManager");
    setAdminChecked(false);
    setScChecked(false);
    setCostChecked(true);
    setManagerChecked(false);
    permissionRoleAccess(localStorage.getItem("loginRole"));
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
    // history.push("/dashboard/storedashboard#team");31/05/2022
    history.push("/manager360#team");
  }else{
    setAdminChecked(false);
    setScChecked(false);
    setCostChecked(false);
    setManagerChecked(false);
    // getUserMenu(user.supportMenus);
    // localStorage.removeItem("type");
    // localStorage.removeItem("loginRole");
    // localStorage.setItem("flag", "0");
    // history.push("/employee360"); 
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
    localStorage.setItem("loginRole","Employee");
    permissionRoleAccess(localStorage.getItem("loginRole"));
    // history.push("/dashboard/storedashboard");31/05/2022
    history.push("/employee360");
  }

  };

  const managerHandler = () => {
    if(managerChecked == false){
    localStorage.setItem("loginRole", "manager");
    setAdminChecked(false);
    setScChecked(false);
    setCostChecked(false);
    setManagerChecked(true);
    permissionRoleAccess(localStorage.getItem("loginRole"));
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
        item.menuName !== "Employee Documents Verification"&& 
        item.menuName !== "DSI Charters" &&
        item.menuName !== "DSI Charter"  
      );
      getUserMenu(departmentList);
    }
    localStorage.setItem("type", "team");
    localStorage.setItem("flag", "0");
    // history.push("/dashboard/storedashboard#team");31/05/2022
    history.push("/manager360#team");
  }else{
    setAdminChecked(false);
    setScChecked(false);
    setCostChecked(false);
    setManagerChecked(false);
    // getUserMenu(user.supportMenus);
    // localStorage.removeItem("type");
    // localStorage.removeItem("loginRole");
    // localStorage.setItem("flag", "0");
    // history.push("/employee360");

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
     localStorage.setItem("loginRole","Employee");
     permissionRoleAccess(localStorage.getItem("loginRole"));

    // history.push("/dashboard/storedashboard");31/05/2022
    history.push("/employee360");
  }
  };

  return (
    <Fragment>
      <div className="page-main-header page-main-header-height">
        <div className="main-header-right row">
          <div className="main-header-left d-lg-none">
            <div className="logo-wrapper">
              <Link to="/dashboard/default">
                <img className="img-fluid" src={logo} alt="" />
              </Link>
            </div>
          </div>
          <div className="mobile-sidebar d-block">
            <div className="media-body text-right switch-sm">
              <label className="switch">
                <a href="#javascript" onClick={() => openCloseSidebar()}>
                  <AlignLeft />
                </a>
              </label>
            </div>
          </div>
          <div className="nav-right col p-0">
            <ul className={`nav-menus ${headerbar ? "" : "open"}`}>
              {/* <li>
                <SearchHeader />
              </li> */}

              <li>
                <a onClick={goFull} className="text-dark" href="#!">
                  <Maximize />
                </a>
              </li>
              <div className="row" style={{ flexDirection: "column" }}>
                <h6
                  style={{
                    fontSize: "16px",
                    fontWeight: "600",
                    color: "#006EBB",
                    textAlign: "left",
                  }}
                >
                  Hello, {user !== null ? user.firstName : ""}
                </h6>
                <h6
                  style={{
                    fontSize: "12px",
                    color: "#006EBB",
                    lineHeight: "5px",
                    textAlign: "left",
                  }}
                >
                  {" "}
                  {user !== null ? user.costCentre : ""}
                </h6>

                <h6
                  style={{
                    fontSize: "12px",
                    color: "#006EBB",
                    textAlign: "left",
                  }}
                >
                  {" "}
                  {user !== null ? user.employeeId : ""}
                </h6>
                <h6
                  style={{
                    fontSize: "12px",
                    color: "#006EBB",
                    lineHeight: "5px",
                    textAlign: "left",
                  }}
                >
                  {" "}
                  {user !== null ? user.position : ""}
                </h6>
              </div>

              <UserMenu adminChecked={adminChecked} />
            </ul>
            <Row>
              <Col sm={12} className="role-text-center">
                {user.loginType == "1" || user.additionalRole == "1" ? (
                  <React.Fragment>
                    {" "}
                    <input
                      type="checkbox"
                      name="admin"
                      value={adminChecked}
                      checked={adminChecked}
                      onChange={adminHandler}
                    />{" "}
                    <Form.Label>Admin &nbsp; </Form.Label>
                  </React.Fragment>
                ) : (
                  ""
                )}
                {(user.loginType == "9" || user.additionalRole == "9") &&
                user.isManager === true ? (
                  <React.Fragment>
                    {" "}
                    <input
                      type="checkbox"
                      name="scManager"
                      checked={scChecked}
                      onChange={scHandler}
                    />{" "}
                    <Form.Label>Super Cost Center Manager &nbsp; </Form.Label>
                  </React.Fragment>
                ) : (
                  ""
                )}

                {(user.loginType == "7" || user.additionalRole == "7") &&
                user.isManager === true ? (
                  <React.Fragment>
                    {" "}
                    <input
                      type="checkbox"
                      name="costManager"
                      checked={costChecked}
                      onChange={costHandler}
                    />{" "}
                    <Form.Label>Cost Center Manager &nbsp; </Form.Label>
                  </React.Fragment>
                ) : (
                  ""
                )}
                {user.isManager === true ? (
                  <React.Fragment>
                    {" "}
                    <input
                      type="checkbox"
                      name="manager"
                      checked={managerChecked}
                      onChange={managerHandler}
                    />{" "}
                    <Form.Label> Manager &nbsp; </Form.Label>
                  </React.Fragment>
                ) : (
                  ""
                )}
              </Col>
            </Row>
            <div
              className="d-lg-none mobile-toggle pull-right"
              onClick={() => setHeaderbar(!headerbar)}
            >
              <MoreHorizontal />
            </div>
          </div>
          <script id="result-template" type="text/x-handlebars-template">
            <div className="ProfileCard u-cf">
              <div className="ProfileCard-avatar">
                <svg
                  xmlns="http://www.w3.org/2000/svg"
                  width="24"
                  height="24"
                  viewBox="0 0 24 24"
                  fill="none"
                  stroke="currentColor"
                  strokeWidth="2"
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  className="feather feather-airplay m-0"
                >
                  <path d="M5 17H4a2 2 0 0 1-2-2V5a2 2 0 0 1 2-2h16a2 2 0 0 1 2 2v10a2 2 0 0 1-2 2h-1"></path>
                  <polygon points="12 15 17 21 7 21 12 15"></polygon>
                </svg>
              </div>
              <div className="ProfileCard-details">
                <div className="ProfileCard-realName"></div>
              </div>
            </div>
          </script>
          <script id="empty-template" type="text/x-handlebars-template">
            <div className="EmptyMessage">
              Your search turned up 0 results. This most likely means the
              backend is down, yikes!
            </div>
          </script>
        </div>
      </div>
    </Fragment>
  );
};
export default Header;
