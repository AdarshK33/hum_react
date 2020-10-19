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
import AdminCluster from "./components/cluster/admincluster";
import Permissions from "./components/Permissions/Permissions";
import MasterCountry from "./components/MasterTables/MasterCountry";
import MasterState from "./components/MasterTables/MasterState";
import MasterWeek from "./components/MasterTables/MasterWeek";
import MasterWorkLocation from "./components/MasterTables/MasterWorkLocation";

const RoutePath = () => {
  const { user, state } = useContext(AppContext);
  const [routPath, setRoutPath] = useState(false);
  useEffect(() => {
    setRoutPath(user.loginType);
    console.log(user);
  }, [user.loginType]);

  return (
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

          {/* <Route
            path={`${process.env.PUBLIC_URL}/profileEdit`}
            component={ProfileEdit}
          /> */}
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


          {state.MenuPermissionsRoute.map((e) => {
            return (
              <div>
                { e.path === "/leaves/viewleave" ?
                  <Route
                    path={`${process.env.PUBLIC_URL}/leaves/viewleave`}
                    component={LeaveView}
                  />
                  :
                  e.path === "/managerleaves" ?
                    <Route
                      path={`${process.env.PUBLIC_URL}/managerleaves`}
                      component={ManagerLeaveList}
                    />
                    :
                    e.path === "/adminleave" ?
                      <Route
                        path={`${process.env.PUBLIC_URL}/adminleave`}
                        component={AdminLeavesList}
                      />
                      //   :e.path === "/adminleaves/adminleaveview" ?
                      //   <Route
                      //   path={`${process.env.PUBLIC_URL}/adminleaves/adminleaveview`}
                      //   component={AdminLeaveView}
                      // /> 
                      :
                      e.path === "/adminleaves/adminleaveslist" ?
                        <Route
                          path={`${process.env.PUBLIC_URL}/adminleaves/adminleaveslist`}
                          component={AdminLeavesList}
                        />
                        :
                        e.path === "/adminleaves/adminmasterleave" ?
                          <Route
                            path={`${process.env.PUBLIC_URL}/adminleaves/adminmasterleave`}
                            component={AdminMasterLeave}
                          />
                          :
                          e.path === "/adminleaves/adminleaveapproval" ?
                            <Route
                              path={`${process.env.PUBLIC_URL}/adminleaves/adminleaveapproval`}
                              component={AdminLeaveApproval}
                            />
                            :
                            e.path === "/adminleaves/adminsalarymodule" ?
                              <Route
                                path={`${process.env.PUBLIC_URL}/adminleaves/adminsalarymodule`}
                                component={AdminSalaryModule}
                              />
                              :
                              e.path === "/roster/teamroster" ?
                                <Route
                                  path={`${process.env.PUBLIC_URL}/roster/teamroster`}
                                  component={Roster}
                                />
                                :
                                e.path === "/roster/viewshift" ?
                                  <Route
                                    path={`${process.env.PUBLIC_URL}/roster/viewshift`}
                                    component={ViewShift}
                                  />
                                  :
                                  e.path === "/cluster/viewcluster" ?
                                    <Route
                                      path={`${process.env.PUBLIC_URL}/cluster/viewcluster`}
                                      component={ViewCluster}
                                    />
                                    :
                                    e.path === "/holiday/holidaylist" ?
                                      <Route
                                        path={`${process.env.PUBLIC_URL}/holiday/holidaylist`}
                                        component={HolidayList}
                                      />
                                      :
                                      e.path === "/salary/processsalary" ?
                                        <Route
                                          path={`${process.env.PUBLIC_URL}/salary/processsalary`}
                                          component={SalaryView}
                                        />
                                        :
                                        e.path === "/admin/grantleaveview" ?
                                          <Route
                                            path={`${process.env.PUBLIC_URL}/admin/grantleaveview`}
                                            component={GrantLeaveView}
                                          />
                                          :
                                          e.path === "/roster/adminroster" ?
                                            <Route
                                              path={`${process.env.PUBLIC_URL}/roster/adminroster`}
                                              component={AdminRoster}
                                            />
                                            :
                                            e.path === "/report/leavereport" ?
                                              <Route
                                                path={`${process.env.PUBLIC_URL}/report/leavereport`}
                                                component={AdminReportForm}
                                              />
                                              :
                                              e.path === "/report/productivityreport" ?
                                                <Route
                                                  path={`${process.env.PUBLIC_URL}/report/productivityreport`}
                                                  component={ProductivityReportForm}
                                                />
                                                :
                                                e.path === "/product-target/adminstoretarget" ?
                                                  <Route
                                                    path={`${process.env.PUBLIC_URL}/product-target/adminstoretarget`}
                                                    component={StoreProductTarget}
                                                  />
                                                  :
                                                  e.path === "/product-target/leaderstoretarget" ?
                                                    <Route
                                                      path={`${process.env.PUBLIC_URL}/product-target/leaderstoretarget`}
                                                      component={LeaderStoreProductTarget}
                                                    />
                                                    :
                                                    e.path === "/product-target/adminclustertarget" ?
                                                      <Route
                                                        path={`${process.env.PUBLIC_URL}/product-target/adminclustertarget`}
                                                        component={ClusterProductTarget}
                                                      />
                                                      :
                                                      e.path === "/product-target/leaderclustertarget" ?
                                                        <Route
                                                          path={`${process.env.PUBLIC_URL}/product-target/leaderclustertarget`}
                                                          component={LeaderCluster}
                                                        />
                                                        :
                                                        e.path === "/rolemanagement" ?
                                                          <Route
                                                            path={`${process.env.PUBLIC_URL}/rolemanagement`}
                                                            component={RoleManagemenetList}
                                                          />
                                                          :
                                                          e.path === "/cluster/admincluster" ?
                                                            <Route
                                                              path={`${process.env.PUBLIC_URL}/cluster/admincluster`}
                                                              component={AdminCluster}
                                                            />
                                                            :
                                                            e.path === "/permissions" ?
                                                              <Route
                                                                path={`${process.env.PUBLIC_URL}/permissions`}
                                                                component={Permissions}
                                                              />
                                                              :
                                                              e.path === "/master/country" ?
                                                                <Route
                                                                  path={`${process.env.PUBLIC_URL}/master/country`}
                                                                  component={MasterCountry}
                                                                />
                                                                :
                                                                e.path === "/master/state" ?
                                                                  <Route
                                                                    path={`${process.env.PUBLIC_URL}/master/state`}
                                                                    component={MasterState}
                                                                  />
                                                                  :
                                                                  e.path === "/master/week-master" ?
                                                                    <Route
                                                                      path={`${process.env.PUBLIC_URL}/master/week-master`}
                                                                      component={MasterWeek}
                                                                    />
                                                                    :
                                                                    e.path === "/master/work-location" ?
                                                                      <Route
                                                                        path={`${process.env.PUBLIC_URL}/master/work-location`}
                                                                        component={MasterWorkLocation}
                                                                      />
                                                                      : ""


                  //  <Route
                  // path={window.location.href}
                  // component={PageNotFound}
                  // />
                }
              </div>
            )
          })}
        </App>
      </Fragment>
    </Switch>
  );
}


export default RoutePath;
