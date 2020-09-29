import React, { Fragment, useEffect } from "react";
import ReactDOM from "react-dom";
import "./index.scss";
import { BrowserRouter, Route, Switch } from "react-router-dom";
import { ScrollContext } from "react-router-scroll-4";
import * as serviceWorker from "./serviceWorker";

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
import { GlobalCustomThemeProvider } from "./context/GlobalState";
import { RosterProvider } from "./context/RosterState";
import { LeaveProvider } from "./context/LeaveState";
import { ClusterProvider } from "./context/ClusterState";
import { DashboardProvider } from "./context/DashboardState";
import { StoreProductProvider } from "./context/StoreProductState";

import { ClusterProductProvider } from "./context/ClusterProductState";
import { AppProvider } from "./context/AppState";
import { AdminProvider } from "./context/AdminState";
import HolidayList from "./components/Holiday/HolidayList";
import SalaryView from "./components/salary/salaryView";
import AdminRoster from "./components/roster/adminRoster";
//Grant Leave Page
import GrantLeaveView from './components/admin/GrantLeaveView';
import ManagerReportForm from './components/Report/ManagerReportForm'
import AdminReportForm from './components/Report/AdminReportForm'
import ProductivityReportForm from './components/Report/ProductivityReportForm'
import StoreProductTarget from "./components/ProductTarget/StoreProductTarget/StoreProductTarget";
import LeaderStoreProductTarget from "./components/ProductTarget/LeaderStoreProductTarget/LeaderStoreProductTarget";
import ClusterProductTarget from './components/ProductTarget/ClusterProductTarget/ClusterProductTarget';
import LeaderCluster from './components/ProductTarget/LeaderCluster/LeaderCluster';

//firebase Auth
function Root() {
  useEffect(() => {
    const layout = localStorage.getItem("layout_version");
    document.body.classList.add(layout);
  }, []);
  return (
    <div className="App">
      {/* <Provider store={store}>  */}
      {/* <GlobalCustomThemeProvider> */}
      <AppProvider>
        <RosterProvider>
          <LeaveProvider>
            <ClusterProvider>
              <ClusterProductProvider>
                <DashboardProvider>
                  <StoreProductProvider>
                    <AdminProvider>
                      <BrowserRouter basename={"/"}>
                        <ScrollContext>
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
                                  path={`${process.env.PUBLIC_URL}/dashboard/default`}
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
                                  path={`${process.env.PUBLIC_URL}/leaves/leaveView`}
                                  component={LeaveView}
                                />
                                {/*Admin Leaves Page */}
                                <Route
                                  path={`${process.env.PUBLIC_URL}/adminLeaves/adminLeaveView`}
                                  component={AdminLeaveView}
                                />
                                {/*Admin Leaves Page */}
                                <Route
                                  path={`${process.env.PUBLIC_URL}/adminLeaves/adminLeavesList`}
                                  component={AdminLeavesList}
                                />

                                {/*Admin Leaves Mater Page */}
                                <Route
                                  path={`${process.env.PUBLIC_URL}/adminLeaves/adminMasterLeave`}
                                  component={AdminMasterLeave}
                                />

                                {/*Admin Leaves Approval Page */}
                                <Route
                                  path={`${process.env.PUBLIC_URL}/adminLeaves/adminLeaveApproval`}
                                  component={AdminLeaveApproval}
                                />
                                {/*Admin Salary Approval Page */}
                                <Route
                                  path={`${process.env.PUBLIC_URL}/adminLeaves/adminSalaryModule`}
                                  component={AdminSalaryModule}
                                />

                                {/* Roaster */}
                                <Route
                                  path={`${process.env.PUBLIC_URL}/roster/roster`}
                                  component={Roster}
                                />

                                {/* <Route path={`${process.env.PUBLIC_URL}/roster/editShift`} component={EditShift} />  */}
                                <Route
                                  path={`${process.env.PUBLIC_URL}/roster/viewShift`}
                                  component={ViewShift}
                                />
                                {/* Cluster */}

                                <Route
                                  path={`${process.env.PUBLIC_URL}/cluster/viewCluster`}
                                  component={ViewCluster}
                                />
                                <Route
                                  path={`${process.env.PUBLIC_URL}/holiday/holidayList`}
                                  component={HolidayList}
                                />
                                <Route
                                  path={`${process.env.PUBLIC_URL}/salary/salaryView`}
                                  component={SalaryView}
                                />
                                <Route
                                  path={`${process.env.PUBLIC_URL}/admin/GrantLeaveView`}
                                  component={GrantLeaveView}
                                />


                                  <Route
                                  path={`${process.env.PUBLIC_URL}/roster/adminRoster`}
                                  component={AdminRoster}
                                />
                                  {/*Manager Report Page */}
                                <Route
                                  path={`${process.env.PUBLIC_URL}/report/managerReport`}
                                  component={ManagerReportForm}
                                />
                                {/*Admin Report Page */}
                                <Route
                                  path={`${process.env.PUBLIC_URL}/report/adminReport`}
                                  component={AdminReportForm}
                                />

                                  {/*Admin Report Page */}
                                  <Route
                                  path={`${process.env.PUBLIC_URL}/report/productivityAdminReport`}
                                  component={ProductivityReportForm}
                                />

                                {/*Admin Store Product target Page */}
                                <Route
                                    path={`${process.env.PUBLIC_URL}/productTarget/adminStoreTarget`}
                                    component={StoreProductTarget}
                                  />

                                   {/*Leader Store Product target Page */}
                                <Route
                                    path={`${process.env.PUBLIC_URL}/productTarget/leaderStoreTarget`}
                                    component={LeaderStoreProductTarget}
                                  />

                                  {/*Admin Cluster Product target Page */}
                                  <Route
                                      path={`${process.env.PUBLIC_URL}/productTarget/adminClusterTarget`}
                                      component={ClusterProductTarget}
                                    />

                                     {/*Leader Cluster Product target Page */}
                                  <Route
                                      path={`${process.env.PUBLIC_URL}/productTarget/leaderClusterTarget`}
                                      component={LeaderCluster}
                                    />

                              </App>
                            </Fragment>
                          </Switch>
                        </ScrollContext>
                      </BrowserRouter>
                      {/* </Provider>  */}
                    </AdminProvider>
                  </StoreProductProvider>
                </DashboardProvider>
              </ClusterProductProvider>
            </ClusterProvider>
          </LeaveProvider>
        </RosterProvider>
        {/* </GlobalCustomThemeProvider> */}
      </AppProvider>
    </div>
  );
}

ReactDOM.render(<Root />, document.getElementById("root"));

serviceWorker.unregister();
