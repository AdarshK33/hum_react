import React, { Fragment ,useEffect,useContext} from 'react';
import Breadcrumb from '../../common/breadcrumb';
import './default.css';
import Dashboard from '../dashboard';
import EmployeeDashboard from "../../Employee360/EmployeeDashboard";
import ManagerDashboard from "../../Employee360/ManagerDashboard";
import { AppContext } from "../../../context/AppState";
import { useHistory } from "react-router-dom";

const Default = () => {
    const { user, getUserMenu } = useContext(AppContext);
    let history = useHistory();

    useEffect(() => {
    if(user.department === "Finance & Legal" || user.department === "Finance" || 
    user.department === "IT" || user.loginType == 1 || user.additionalRole == 1){
      let departmentList = user !==null && user!==undefined && user.generalUserMenus !== null && user.generalUserMenus !== undefined && Object.keys(user.generalUserMenus).length && user.generalUserMenus.filter(
        (item) =>
    item.menuName !== "Roster" &&
    item.menuName !== "Dashboard" &&
    item.menuName !== "My Roster" 
    )
      getUserMenu(departmentList, "profile", user);
    }else if((user.department === "Finance & Legal" ||
    user.department === "Finance" || 
    user.department === "IT" || user.loginType == 1 || user.additionalRole == 1) && 
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
  }, []);
    // history.push("/dashboard/storedashboard");31/05/2022
    return (
        <Fragment>
            {/* <Breadcrumb parent="Dashboard" title="Default" /> */}
            <div className="container-fluid">
                {/* <div className="row"> */}
                    {/* <div className="col-sm-12"> */}
                        {/* <div className="card"> */}
                            {/* <div className="card-header"> */}
                                {/* <h5>Dashboard</h5><span>lorem ipsum dolor sit amet, consectetur adipisicing elit</span> */}
                                {/* <Dashboard /> */}
                                <EmployeeDashboard/>
                            {/* </div> */}
                            
                        {/* </div> */}
                    {/* </div> */}
                {/* </div> */}
            </div>
        </Fragment>
    );
};

export default Default;


