import React, { Fragment, useEffect, useContext, useState } from "react";
import { BrowserRouter, Route, Switch } from "react-router-dom";

import App from "./components/app";

// Import custom Components
import Signin from "./auth/signin";
import Default from "./components/dashboard/defaultCompo/default";
// sample page
import Samplepage from "./components/sample/samplepage";
import Roster from "./components/roster/roster";
// import EditShift from "./components/roster/editShift";
import ViewShift from "./components/roster/viewShift";
//Leave Page
import LeaveView from "./components/Leaves/LeaveView";
import AdminLeaveView from './components/AdminLeave/AdminLeaveView';
import AdminLeavesList from './components/AdminLeave/AdminLeavesList';
import AdminMasterLeave from './components/AdminLeave/AdminMasterLeave';
import AdminLeaveApproval from './components/AdminLeave/AdminLeaveApproval';
import AdminSalaryModule from './components/AdminLeave/AdminSalaryModule';
//Cluster
import ViewCluster from "./components/cluster/viewCluster";
// Added by Ranjith 31 july 2020

import HolidayList from "./components/Holiday/HolidayList";
import SalaryView from "./components/salary/salaryView";
import AdminRoster from "./components/roster/adminRoster";
//Grant Leave Page
import GrantLeaveView from './components/admin/GrantLeaveView';
// import ManagerReportForm from './components/Report/ManagerReportForm'
import AdminReportForm from './components/Report/AdminReportForm'
import ProductivityReportForm from './components/Report/ProductivityReportForm'
// import ProductivityReportManager from './components/Report/ProductivityReportManager'
import StoreProductTarget from "./components/ProductTarget/StoreProductTarget/StoreProductTarget";
import LeaderStoreProductTarget from "./components/ProductTarget/LeaderStoreProductTarget/LeaderStoreProductTarget";
import ClusterProductTarget from './components/ProductTarget/ClusterProductTarget/ClusterProductTarget';
import LeaderCluster from './components/ProductTarget/LeaderCluster/LeaderCluster';
import RoleManagemenetList from './components/RoleManagement/RoleManagementList';
import { AppContext } from "./context/AppState";
import ManagerLeaveList from './components/ManagerLeave/ManagerLeaveList'


const RoutePath = () => {
    const { user, getUserInfo } = useContext(AppContext);
    const [routPath, setRoutPath] = useState(false);
    // useEffect(() => { 
    //     getUserInfo()
    //     // setRoutPath(user.loginType);
    // }, [user.loginType]);
    console.log("user");
    console.log(user);
    return(             
                        <Switch>
                            <Route
                                  path={`${process.env.PUBLIC_URL}/signin`}
                                  component={Signin}
                                />
      
                    
                            
                            <Fragment>
                              <App>
                                {/* dashboard menu */}
                                <Route
                                  exact
                                  path={`${process.env.PUBLIC_URL}/`}
                                  component={Default}
                                />
                                <Route
                                  
                                  path={`${process.env.PUBLIC_URL}/dashboard/storedashboard`}
                                  component={Default}
                                />
                                {/* <Route exact path={`${process.env.PUBLIC_URL}/dashboard/default`} component={Default} /> */}

                                {/* Sample page */}
                                <Route
                                  path={`${process.env.PUBLIC_URL}/sample/samplepage`}
                                  component={Samplepage}
                                />

                                {/* Leaves Page */}
                                <Route
                                  path={`${process.env.PUBLIC_URL}/leaves/viewleave`}
                                  component={LeaveView}
                                />
                                {/*Manager Leaves Page */}
                                <Route
                                  path={`${process.env.PUBLIC_URL}/manager/managerleaves`}
                                  component={ManagerLeaveList}
                                />
                                {/*Admin Leaves Page */}
                                <Route
                                  path={`${process.env.PUBLIC_URL}/adminleaves/adminleaveslist`}
                                  component={AdminLeavesList}
                                />

                                {/*Admin Leaves Mater Page */}
                                <Route
                                  path={`${process.env.PUBLIC_URL}/adminleaves/adminmasterleave`}
                                  component={AdminMasterLeave}
                                />

                                {/*Admin Leaves Approval Page */}
                                <Route
                                  path={`${process.env.PUBLIC_URL}/adminleaves/adminleaveapproval`}
                                  component={AdminLeaveApproval}
                                />
                                {/*Admin Salary Approval Page */}
                                <Route
                                  path={`${process.env.PUBLIC_URL}/adminleaves/adminsalarymodule`}
                                  component={AdminSalaryModule}
                                />

                                {/* Roaster */}
                                <Route
                                  path={`${process.env.PUBLIC_URL}/roster/teamroster`}
                                  component={Roster}
                                />

                                {/* <Route path={`${process.env.PUBLIC_URL}/roster/editShift`} component={EditShift} />  */}
                                <Route
                                  path={`${process.env.PUBLIC_URL}/roster/viewshift`}
                                  component={ViewShift}
                                />
                                {/* Cluster */}

                                <Route
                                  path={`${process.env.PUBLIC_URL}/cluster/viewcluster`}
                                  component={ViewCluster}
                                />
                                <Route
                                  path={`${process.env.PUBLIC_URL}/holiday/holidaylist`}
                                  component={HolidayList}
                                />
                                <Route
                                  path={`${process.env.PUBLIC_URL}/salary/processsalary`}
                                  component={SalaryView}
                                />
                                <Route
                                  path={`${process.env.PUBLIC_URL}/admin/grantleaveview`}
                                  component={GrantLeaveView}
                                />


                                  <Route
                                  path={`${process.env.PUBLIC_URL}/roster/adminroster`}
                                  component={AdminRoster}
                                />
                                  {/*Manager Report Page */}
                                {/* <Route
                                  path={`${process.env.PUBLIC_URL}/report/manager-report`}
                                  component={ManagerReportForm}
                                /> */}
                                {/*Admin Report Page */}
                                <Route
                                  path={`${process.env.PUBLIC_URL}/report/leavereport`}
                                  component={AdminReportForm}
                                />

                                  {/*Productivity  Admin Report Page */}
                                  <Route
                                  path={`${process.env.PUBLIC_URL}/report/productivityreport`}
                                  component={ProductivityReportForm}
                                />
                                
                                 {/*Productivity Manager Report Page */}
                                 {/* <Route
                                path={`${process.env.PUBLIC_URL}/report/productivitymanager-report`}
                                component={ProductivityReportManager}
                              /> */}

                                {/*Admin Store Product target Page */}
                                <Route
                                    path={`${process.env.PUBLIC_URL}/product-target/adminstoretarget`}
                                    component={StoreProductTarget}
                                  />

                                   {/*Leader Store Product target Page */}
                                <Route
                                    path={`${process.env.PUBLIC_URL}/product-target/leaderStoretarget`}
                                    component={LeaderStoreProductTarget}
                                  />

                                  {/*Admin Cluster Product target Page */}
                                  <Route
                                      path={`${process.env.PUBLIC_URL}/product-target/adminclustertarget`}
                                      component={ClusterProductTarget}
                                    />

                                     {/*Leader Cluster Product target Page */}
                                  <Route
                                      path={`${process.env.PUBLIC_URL}/product-target/leaderclustertarget`}
                                      component={LeaderCluster}
                                    />

                                    {/*Role Management Page */}
                                    <Route
                                          path={`${process.env.PUBLIC_URL}/rolemanagement`}
                                          component={RoleManagemenetList}
                                    />

                              </App>
                            </Fragment>
                         
                      
                        </Switch>
    );
}


export default RoutePath;
