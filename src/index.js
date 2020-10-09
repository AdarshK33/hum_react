import React, { Fragment, useEffect } from "react";
import ReactDOM from "react-dom";
import "./index.scss";
import { BrowserRouter, Route, Switch } from "react-router-dom";
import { ScrollContext } from "react-router-scroll-4";
import * as serviceWorker from "./serviceWorker";



// Added by Ranjith 31 july 2020
import { GlobalCustomThemeProvider } from "./context/GlobalState";
import { RosterProvider } from "./context/RosterState";
import { LeaveProvider } from "./context/LeaveState";
import { ClusterProvider } from "./context/ClusterState";
import { DashboardProvider } from "./context/DashboardState";
import { StoreProductProvider } from "./context/StoreProductState";
import { RoleManagementProvider } from "./context/RoleManagementState";
import { ClusterProductProvider } from "./context/ClusterProductState";
import { AppProvider } from "./context/AppState";
import { AdminProvider } from "./context/AdminState";

import Route1 from "./Route";


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
                  <RoleManagementProvider>
                    <AdminProvider>
                      <BrowserRouter basename={"/"}>
                        <ScrollContext>
                          <Route1 />
                        </ScrollContext>
                      </BrowserRouter>
                      {/* </Provider>  */}
                    </AdminProvider>
                    </RoleManagementProvider>
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
