import React, { useEffect } from "react";
import ReactDOM from "react-dom";
import "./index.scss";
import { BrowserRouter } from "react-router-dom";
import { ScrollContext } from "react-router-scroll-4";
import * as serviceWorker from "./serviceWorker";

// Added by Ranjith 31 july 2020
//import { GlobalCustomThemeProvider } from "./context/GlobalState";
import { RosterProvider } from "./context/RosterState";
import { LeaveProvider } from "./context/LeaveState";
import { ClusterProvider } from "./context/ClusterState";
import { DashboardProvider } from "./context/DashboardState";
import { StoreProductProvider } from "./context/StoreProductState";
import { RoleManagementProvider } from "./context/RoleManagementState";
import { ClusterProductProvider } from "./context/ClusterProductState";
import { AppProvider } from "./context/AppState";
import { AdminProvider } from "./context/AdminState";

import { MasterFilesProvider } from "./context/MasterFilesState";
import { PermissionProvider } from "./context/PermissionState";
import { SearchProvider } from "./context/SearchState";
import { SupportProvider } from "./context/SupportState";
import { GroupProvider } from "./context/GroupState";
import { CandidateProvider } from "./context/CandidateState";
import { OfferProvider } from "./context/OfferState";
import { PromotionProvider } from "./context/PromotionState";
import { DisciplinaryProvider } from "./context/DisciplinaryState";
import { MyDocsProvider } from "./context/MyDocsState";
import { OnBoardProvider } from "./context/OnBoardState";
import { DocsVerificationProvider } from "./context/DocverificationState";
import { EmploeeSeparationProvider } from "./context/EmployeeSeparationState";
import { Employee360Provider } from "./context/Employee360State";
import { EmployeeProfileProvider } from "./context/EmployeeProfileState";
import { BonusProvider } from "./context/BonusState";
import { TransferProvider } from "./context/TransferState";
import { ModuleReportProvider } from "./context/ModuleReportState";
import { NoticePeriodProvider } from "./context/NoticePeriodState";
import { InsuranceProvider } from "./context/InsuranceState";
import { DocumentManagementProvider } from "./context/DocumentManagementState";
import {
  SeparationContext,
  SeparationProvider,
} from "./context/SepearationState";
import { ProbationProvider } from "./context/ProbationState";
/* import { OfferProvider } from './context/OfferState' */
import RoutePath from "./Route";
import WithAxios from "./utils/axios";
import CandidateWithAxios from "./utils/canditateLogin";
import "bootstrap/dist/css/bootstrap.min.css";
import { MitProvider } from "./context/MitReportState";

import { DSICharterProvider } from "./context/DSICharterState";
import { WeekOffProvider } from "./context/WeekOffState";
import { WorkHourProvider } from "./context/WorkHourState";
import { PayrollProvider } from "./context/PayrollState";
import { DocumentUploadProvider } from "./context/DocumentUploadState";
import { E_signProvider } from "./context/E_signState";
import { PartTimeSalaryInputProvider } from "./context/PartTimeSalaryInputState";
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
                <PermissionProvider>
                  <MasterFilesProvider>
                    <DashboardProvider>
                      <StoreProductProvider>
                        <RoleManagementProvider>
                          <SearchProvider>
                            <AdminProvider>
                            <WeekOffProvider>
                            <WorkHourProvider>
                              <SupportProvider>
                                <GroupProvider>
                                  <OfferProvider>
                                    <OnBoardProvider>
                                      <CandidateProvider>
                                        <DocsVerificationProvider>
                                          <EmploeeSeparationProvider>
                                            <Employee360Provider>
                                              <EmployeeProfileProvider>
                                                <PayrollProvider>
                                                  <E_signProvider>
                                                    <PartTimeSalaryInputProvider>
                                                      <DSICharterProvider>
                                                        <WeekOffProvider>
                                                          <WorkHourProvider>
                                                            <SeparationProvider>
                                                              <ProbationProvider>
                                                                <DisciplinaryProvider>
                                                                  <MyDocsProvider>
                                                                    <PromotionProvider>
                                                                      <BonusProvider>
                                                                        <TransferProvider>
                                                                          <ModuleReportProvider>
                                                                            <NoticePeriodProvider>
                                                                              <InsuranceProvider>
                                                                                <MitProvider>
                                                                                  <DocumentUploadProvider>
                                                                                    <DocumentManagementProvider>
                                                                                      <BrowserRouter
                                                                                        basename={
                                                                                          "/"
                                                                                        }
                                                                                      >
                                                                                        <ScrollContext>
                                                                                          <WithAxios>
                                                                                            <CandidateWithAxios>
                                                                                              <RoutePath />
                                                                                            </CandidateWithAxios>
                                                                                          </WithAxios>
                                                                                        </ScrollContext>
                                                                                      </BrowserRouter>
                                                                                    </DocumentManagementProvider>
                                                                                  </DocumentUploadProvider>
                                                                                </MitProvider>
                                                                              </InsuranceProvider>
                                                                            </NoticePeriodProvider>
                                                                          </ModuleReportProvider>
                                                                        </TransferProvider>
                                                                      </BonusProvider>
                                                                    </PromotionProvider>
                                                                  </MyDocsProvider>
                                                                </DisciplinaryProvider>
                                                              </ProbationProvider>
                                                            </SeparationProvider>
                                                          </WorkHourProvider>
                                                        </WeekOffProvider>
                                                      </DSICharterProvider>
                                                    </PartTimeSalaryInputProvider>
                                                  </E_signProvider>
                                                </PayrollProvider>
                                              </EmployeeProfileProvider>
                                            </Employee360Provider>
                                          </EmploeeSeparationProvider>
                                        </DocsVerificationProvider>
                                      </CandidateProvider>
                                    </OnBoardProvider>
                                  </OfferProvider>
                                  {/* //Support provider 14-12-20*/}

                                  {/* </Provider>  */}
                                </GroupProvider>
                              </SupportProvider>
                              </WorkHourProvider>
                            </WeekOffProvider>
                            </AdminProvider>
                          </SearchProvider>
                        </RoleManagementProvider>
                      </StoreProductProvider>
                    </DashboardProvider>
                  </MasterFilesProvider>
                </PermissionProvider>
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
