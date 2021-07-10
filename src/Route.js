import React, { Fragment, useEffect, useContext, useState } from "react";
import { Route, Switch } from "react-router-dom";

import App from "./components/app";

// Import custom Components
import Signin from "./auth/signin";
import Login from "./auth/login";
import Default from "./components/dashboard/defaultCompo/default";
// sample page
import Samplepage from "./components/sample/samplepage";
import Roster from "./components/roster/roster";
// import EditShift from "./components/roster/editShift";
import ViewShift from "./components/roster/viewShift";
//Leave Page
import LeaveView from "./components/Leaves/LeaveView";
import AdminLeaveView from "./components/AdminLeave/AdminLeaveView";
import AdminLeavesList from "./components/AdminLeave/AdminLeavesList";
import AdminMasterLeave from "./components/AdminLeave/AdminMasterLeave";
import AdminLeaveApproval from "./components/AdminLeave/AdminLeaveApproval";
import AdminSalaryModule from "./components/AdminLeave/AdminSalaryModule";
//Cluster
import ViewCluster from "./components/cluster/viewCluster";
// Added by Ranjith 31 july 2020

import HolidayList from "./components/Holiday/HolidayList";
import SalaryView from "./components/salary/salaryView";
import AdminRoster from "./components/roster/adminRoster";
//Grant Leave Page
import GrantLeaveView from "./components/admin/GrantLeaveView";
// import ManagerReportForm from './components/Report/ManagerReportForm'
import AdminReportForm from "./components/Report/AdminReportForm";
import ProductivityReportForm from "./components/Report/ProductivityReportForm";
// import ProductivityReportManager from './components/Report/ProductivityReportManager'
import StoreProductTarget from "./components/ProductTarget/StoreProductTarget/StoreProductTarget";
import LeaderStoreProductTarget from "./components/ProductTarget/LeaderStoreProductTarget/LeaderStoreProductTarget";
import ClusterProductTarget from "./components/ProductTarget/ClusterProductTarget/ClusterProductTarget";
import LeaderCluster from "./components/ProductTarget/LeaderCluster/LeaderCluster";
import RoleManagemenetList from "./components/RoleManagement/RoleManagementList";
import { AppContext } from "./context/AppState";
import ManagerLeaveList from "./components/ManagerLeave/ManagerLeaveList";
import AdminCluster from "./components/cluster/admincluster";
import Permissions from "./components/Permissions/Permissions";
import MasterCountry from "./components/MasterTables/MasterCountry";
import MasterState from "./components/MasterTables/MasterState";
import MasterWeek from "./components/MasterTables/MasterWeek";
import MasterWorkLocation from "./components/MasterTables/MasterWorkLocation";
import MasterSport from "./components/MasterTables/MasterSport";
import MasterContractType from "./components/MasterTables/MasterContractType";
import MasterCity from "./components/MasterTables/MasterCity";
import MasterLeave from "./components/MasterTables/MasterLeave";
import MasterMonthlyQuantity from "./components/MasterTables/MasterMonthlyQuantity";
import MasterDailyQty from "./components/MasterTables/MasterDailyQty";
import MasterCostCenter from "./components/MasterTables/MasterCostCenter";
import CreateTicket from "./components/support/createTicket";
import PromotionList from "./components/Promotion/PromotionList";
import OnBoardingStepper from "./components/OnBording/OnBoardingStepper";
import RosterDashboard from "./components/rosterDashboard/rosterDashboard";
import TicketListingPage from "./components/support/ticketListingPage";
import ViewTicket from "./components/support/viewTicket";
import ViewGroup from "./components/group/ViewGroup";
import ManagerOfferRelease from "./components/Offers/managerOfferRelease";
import OfferReleaseList from "./components/Offers/OfferReleaseList";
import EditOfferRelease from "./components/Offers/editOfferRelease";
import OfferAccept from "./components/Offers/OfferAcceptance/OfferAccept";
import LoginOnboard from "./components/Login/LoginOnboard";
import ViewOfferRelease from "./components/Offers/viewOfferRelease";
import FinanceClearanceList from "./components/FinanceClearance/ClearanceList";

/*------------------- Candidate Verification -----------------------------------*/
import CandidateVerification from "./components/CandidateVerification/ManageCandidates";
import Verification from "./components/CandidateVerification/Verification";
import FinanaceAdminNoDueClearance from "./components/Separation/FinanceAdminNoDueClearance/FinanceAdminNoDueClearance";
import AdminNoDueClearance from "./components/Separation/AdminNoDueClearance/AdminNoDueClearance";
import NoDueClearance from "./components/Separation/NoDueClearance";
import ViewEditRelease from "./components/OfferReleaseandOnboarding/ViewOfferRelease";
import Documents from "./components/OnBording/Documents";
import HistoryView from "./components/Separation/FinanceAdminNoDueClearance/HistoryView";
import EmployeeExitList from "./components/ManagerApproveEmployeExit/EmployeeExitList";
import EmployeeExitAction from "./components/ManagerApproveEmployeExit/EmployeeExitAction";
import EmployeeExitView from "./components/ManagerApproveEmployeExit/EmployeeExitView";
import ManagerInitiateExit from "./components/ManagerApproveEmployeExit/ManagerInitiateExit";
import PromotionInitiate from "./components/Promotion/PromotionInitiate/PromotionInitiate";
import PromotionView from "./components/Promotion/PromotionView/PromotionView";

import EmpResignation from "./components/employeeSeparation/empResignation";
import EmployeeSeparationListing from "./components/managerSeparation/employeeSeparationListing";
import CostCenterManagerExitListing from "./components/CostcenterManagerApproveExit/exitListing";
import viewEmployeeInfo from "./components/CostcenterManagerApproveExit/viewEmployeeInfo";

import ProbationList from "./components/Probation/ProbationList";
import ProbationAction from "./components/Probation/ProbationAction";
import ProbationView from "./components/Probation/ProbationView";
import PromotionManagerEdit from "./components/Promotion/PromotionManagerEdit";
import PromotionApproval from "./components/Promotion/PromotionApproval/PromotionApproval";

import ManagerDisciplinaryList from "./components/Disciplinary/Manager/ManagerDisciplinaryList";
import IssueShowCauseNotice from "./components/Disciplinary/Manager/IssueShowCauseNotice";
import DisciplinaryView from "./components/Disciplinary/Manager/DisciplinaryView";
import CostCenterManagerAction from "./components/Disciplinary/CostCenterManagerAction/CostCenterManagerAction";
import DisciplinarySeparation from "./components/Disciplinary/Manager/DiscplinarySeparation";

import ViewBonus from "./components/Bonus/ViewBonus";
import EmployeeDocementsList from "./components/EmployeeLetters/MyDocsList";
import EmployeShowCaseLetter from "./components/EmployeeLetters/ShowCauseLetter";
import EmployeWarningLetter from "./components/EmployeeLetters/WarningLetter";

import ManagerWarningAction from "./components/Disciplinary/WarningManager/ManagerWarningAction";

/* Transfer Module  */
import TransfersList from "./components/Transfers/List/TransfersList";
import TransferInitiation from "./components/Transfers/Initiation/TransferInitiation";
import TransferView from "./components/Transfers/view/TransferView";
import RegularTransferAcceptance from "./components/Transfers/Acceptance/RegularTransferAcceptance";

const RoutePath = () => {
  const { user, state } = useContext(AppContext);
  console.log(user, state, "route8888888888888");
  const [routPath, setRoutPath] = useState(false);
  useEffect(() => {
    setRoutPath(user.loginType);
    console.log(user);
  }, [user.loginType]);
  console.log(process.env.PUBLIC_URL, "env00000000000000");
  return (
    <Switch>
      <Route path={`${process.env.PUBLIC_URL}/signin`} component={Signin} />
      <Route path={`${process.env.PUBLIC_URL}/login`} component={Login} />

      <Route
        //  Rajasekhar
        path={`${process.env.PUBLIC_URL}/onboard`}
        component={OnBoardingStepper}
      />

      {/* <Route
            path={`${process.env.PUBLIC_URL}/onboard`}
            component={OnBoardingStepper}
      /> */}

      <Route
        path={`${process.env.PUBLIC_URL}/onboard-offer`}
        component={LoginOnboard}
      />

      <Route path={`${process.env.PUBLIC_URL}/offer`} component={OfferAccept} />

      <Fragment>
        <App>
          {/* dashboard menu */}
          {/* <Route
            exact
            path={`${process.env.PUBLIC_URL}/`}
            component={Default}
          /> */}
          {/* <Route
            path={`${process.env.PUBLIC_URL}/profileEdit`}
            component={ProfileEdit}
          /> */}
          <Route
            path={`${process.env.PUBLIC_URL}/no_due_clearance`}
            component={NoDueClearance}
          />
          <Route
            path={`${process.env.PUBLIC_URL}/admin_no_due_clearance`}
            component={AdminNoDueClearance}
          />
          <Route
            path={`${process.env.PUBLIC_URL}/manager-warning-action-view/:employeeId`}
            component={ManagerWarningAction}
          />

          <Route
            path={`${process.env.PUBLIC_URL}/admin-finance-clearance`}
            component={FinanaceAdminNoDueClearance}
          />
          <Route
            path={`${process.env.PUBLIC_URL}/finance-clearance`}
            component={FinanceClearanceList}
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
          <Route
            path={`${process.env.PUBLIC_URL}/createticket`}
            component={CreateTicket}
          />
          <Route
            path={`${process.env.PUBLIC_URL}/ticketlistingpage`}
            component={TicketListingPage}
          />
          <Route
            path={`${process.env.PUBLIC_URL}/viewticket`}
            component={ViewTicket}
          />
          <Route
            path={`${process.env.PUBLIC_URL}/ViewGroup`}
            component={ViewGroup}
          />
          <Route
            path={`${process.env.PUBLIC_URL}/roster-dashboard`}
            component={RosterDashboard}
          />
          <Route
            path={`${process.env.PUBLIC_URL}/manager-offer-release`}
            component={ManagerOfferRelease}
          />
          <Route
            path={`${process.env.PUBLIC_URL}/offer-release-list`}
            component={OfferReleaseList}
          />

          <Route
            path={`${process.env.PUBLIC_URL}/edit-offer-release`}
            component={EditOfferRelease}
          />

          <Route
            path={`${process.env.PUBLIC_URL}/onboard-offer`}
            component={LoginOnboard}
          />
          <Route
            path={`${process.env.PUBLIC_URL}/offer`}
            component={OfferAccept}
          />
          <Route
            path={`${process.env.PUBLIC_URL}/view-offer-release`}
            component={ViewOfferRelease}
          />
          <Route
            path={`${process.env.PUBLIC_URL}/candidate-verification`}
            component={CandidateVerification}
          />
          <Route
            path={`${process.env.PUBLIC_URL}/exit-action/:employeeid`}
            component={EmployeeExitAction}
          />
          <Route
            path={`${process.env.PUBLIC_URL}/exit-view/:employeeid`}
            component={EmployeeExitView}
          />
          <Route
            path={`${process.env.PUBLIC_URL}/history-view/:employeeid`}
            component={HistoryView}
          />
          <Route
            path={`${process.env.PUBLIC_URL}/probation-action/:employeeid`}
            component={ProbationAction}
          />
          <Route
            path={`${process.env.PUBLIC_URL}/probation-view/:employeeid`}
            component={ProbationView}
          />
          <Route
            path={`${process.env.PUBLIC_URL}/manager-initiate-exit`}
            component={ManagerInitiateExit}
          />

          <Route
            path={`${process.env.PUBLIC_URL}/offer-relase-and-onboard`}
            component={ViewEditRelease}
          />
          <Route
            path={`${process.env.PUBLIC_URL}/verification/:candidateId`}
            component={Verification}
          />
          {/* <Route
           
            path={`${process.env.PUBLIC_URL}/employee-separation-listing`}
            component={EmployeeExitList}
          /> */}
          {/*Rajasekhar */}

          <Route
            path={`${process.env.PUBLIC_URL}/employee-resignation`}
            component={EmpResignation}
          />

          <Route
            path={`${process.env.PUBLIC_URL}/employee-separation-listing`}
            component={EmployeeExitList}
          />

          <Route
            path={`${process.env.PUBLIC_URL}/probation`}
            component={ProbationList}
          />
          <Route
            path={`${process.env.PUBLIC_URL}/disciplinary`}
            component={ManagerDisciplinaryList}
          />
          <Route
            path={`${process.env.PUBLIC_URL}/my_disciplinary`}
            component={EmployeeDocementsList}
          />
          <Route
            path={`${process.env.PUBLIC_URL}/letters/show-cause`}
            component={EmployeShowCaseLetter}
          />
          <Route
            path={`${process.env.PUBLIC_URL}/letters/warning`}
            component={EmployeWarningLetter}
          />

          <Route
            path={`${process.env.PUBLIC_URL}/issue-show-cause-notice`}
            component={IssueShowCauseNotice}
          />
          <Route
            path={`${process.env.PUBLIC_URL}/disciplinary-view/:employeeid`}
            component={DisciplinaryView}
          />
          <Route
            path={`${process.env.PUBLIC_URL}/disciplinary-action/:employeeid`}
            component={CostCenterManagerAction}
          />

          <Route
            path={`${process.env.PUBLIC_URL}/disciplinary-separation`}
            component={DisciplinarySeparation}
          />
          <Route
            path={`${process.env.PUBLIC_URL}/exit-approval`}
            component={CostCenterManagerExitListing}
          />
          <Route
            path={`${process.env.PUBLIC_URL}/employee-info/:employeeid`}
            component={viewEmployeeInfo}
          />
          <Route
            path={`${process.env.PUBLIC_URL}/promotion-list`}
            component={PromotionList}
          />
          <Route
            path={`${process.env.PUBLIC_URL}/promotion-initiate`}
            component={PromotionInitiate}
          />
          <Route
            path={`${process.env.PUBLIC_URL}/view-promotion/:promotionId`}
            component={PromotionView}
          />
          <Route
            path={`${process.env.PUBLIC_URL}/promotion-approval/:promotionId`}
            component={PromotionApproval}
          />
          <Route
            path={`${process.env.PUBLIC_URL}/promotion/:promotionId`}
            component={PromotionManagerEdit}
          />
          <Route
            path={`${process.env.PUBLIC_URL}/transfers`}
            component={TransfersList}
          />
          <Route
            path={`${process.env.PUBLIC_URL}/transfer-initiate`}
            component={TransferInitiation}
          />
          <Route
            path={`${process.env.PUBLIC_URL}/view-transfer/:transferId`}
            component={TransferView}
          />
          <Route
            path={`${process.env.PUBLIC_URL}/transfer/:transferId`}
            component={RegularTransferAcceptance}
          />
          {/* <Route
            path={`${process.env.PUBLIC_URL}/promotion/:promotionId`}
            component={PromotionManagerEdit}
          /> */}
          {/* <Route
            path={`${process.env.PUBLIC_URL}/promotion-approval/:promotionId`}
            component={PromotionApproval}
          /> */}

          {state.MenuPermissionsRoute.map((e) => {
            return (
              <div>
                {
                  e.path === "/leaves/viewleave" ? (
                    <Route
                      path={`${process.env.PUBLIC_URL}/leaves/viewleave`}
                      component={LeaveView}
                    />
                  ) : e.path === "/managerleaves" ? (
                    <Route
                      path={`${process.env.PUBLIC_URL}/managerleaves`}
                      component={ManagerLeaveList}
                    />
                  ) : e.path === "/adminleave" ? (
                    <Route
                      path={`${process.env.PUBLIC_URL}/adminleave`}
                      component={AdminLeavesList}
                    />
                  ) : //   :e.path === "/adminleaves/adminleaveview" ?
                  //   <Route
                  //   path={`${process.env.PUBLIC_URL}/adminleaves/adminleaveview`}
                  //   component={AdminLeaveView}
                  // />
                  e.path === "/adminleaves/adminleaveslist" ? (
                    <Route
                      path={`${process.env.PUBLIC_URL}/adminleaves/adminleaveslist`}
                      component={AdminLeavesList}
                    />
                  ) : e.path === "/adminleaves/adminmasterleave" ? (
                    <Route
                      path={`${process.env.PUBLIC_URL}/adminleaves/adminmasterleave`}
                      component={AdminMasterLeave}
                    />
                  ) : e.path === "/adminleaves/adminleaveapproval" ? (
                    <Route
                      path={`${process.env.PUBLIC_URL}/adminleaves/adminleaveapproval`}
                      component={AdminLeaveApproval}
                    />
                  ) : e.path === "/salary/approval" ? (
                    <Route
                      path={`${process.env.PUBLIC_URL}/salary/approval`}
                      component={AdminSalaryModule}
                    />
                  ) : e.path === "/roster/teamroster" ? (
                    <Route
                      path={`${process.env.PUBLIC_URL}/roster/teamroster`}
                      component={Roster}
                    />
                  ) : e.path === "/roster/viewshift" ? (
                    <Route
                      path={`${process.env.PUBLIC_URL}/roster/viewshift`}
                      component={ViewShift}
                    />
                  ) : e.path === "/cluster/viewcluster" ? (
                    <Route
                      path={`${process.env.PUBLIC_URL}/cluster/viewcluster`}
                      component={ViewCluster}
                    />
                  ) : e.path === "/holiday/holidaylist" ? (
                    <Route
                      path={`${process.env.PUBLIC_URL}/holiday/holidaylist`}
                      component={HolidayList}
                    />
                  ) : e.path === "/salary/processsalary" ? (
                    <Route
                      path={`${process.env.PUBLIC_URL}/salary/processsalary`}
                      component={SalaryView}
                    />
                  ) : e.path === "/admin/grantleaveview" ? (
                    <Route
                      path={`${process.env.PUBLIC_URL}/admin/grantleaveview`}
                      component={GrantLeaveView}
                    />
                  ) : e.path === "/roster/adminroster" ? (
                    <Route
                      path={`${process.env.PUBLIC_URL}/roster/adminroster`}
                      component={AdminRoster}
                    />
                  ) : e.path === "/report/leavereport" ? (
                    <Route
                      path={`${process.env.PUBLIC_URL}/report/leavereport`}
                      component={AdminReportForm}
                    />
                  ) : e.path === "/report/productivityreport" ? (
                    <Route
                      path={`${process.env.PUBLIC_URL}/report/productivityreport`}
                      component={ProductivityReportForm}
                    />
                  ) : e.path === "/product-target/adminstoretarget" ? (
                    <Route
                      path={`${process.env.PUBLIC_URL}/product-target/adminstoretarget`}
                      component={StoreProductTarget}
                    />
                  ) : e.path === "/product-target/leaderstoretarget" ? (
                    <Route
                      path={`${process.env.PUBLIC_URL}/product-target/leaderstoretarget`}
                      component={LeaderStoreProductTarget}
                    />
                  ) : e.path === "/product-target/adminclustertarget" ? (
                    <Route
                      path={`${process.env.PUBLIC_URL}/product-target/adminclustertarget`}
                      component={ClusterProductTarget}
                    />
                  ) : e.path === "/product-target/leaderclustertarget" ? (
                    <Route
                      path={`${process.env.PUBLIC_URL}/product-target/leaderclustertarget`}
                      component={LeaderCluster}
                    />
                  ) : e.path === "/rolemanagement" ? (
                    <Route
                      path={`${process.env.PUBLIC_URL}/rolemanagement`}
                      component={RoleManagemenetList}
                    />
                  ) : e.path === "/cluster/admincluster" ? (
                    <Route
                      path={`${process.env.PUBLIC_URL}/cluster/admincluster`}
                      component={AdminCluster}
                    />
                  ) : e.path === "/permissions" ? (
                    <Route
                      path={`${process.env.PUBLIC_URL}/permissions`}
                      component={Permissions}
                    />
                  ) : e.path === "/master/week-master" ? (
                    <Route
                      path={`${process.env.PUBLIC_URL}/master/week-master`}
                      component={MasterWeek}
                    />
                  ) : e.path === "/master/work-location" ? (
                    <Route
                      path={`${process.env.PUBLIC_URL}/master/work-location`}
                      component={MasterWorkLocation}
                    />
                  ) : e.path === "/master/sport" ? (
                    <Route
                      path={`${process.env.PUBLIC_URL}/master/sport`}
                      component={MasterSport}
                    />
                  ) : e.path === "/master/contract-type" ? (
                    <Route
                      path={`${process.env.PUBLIC_URL}/master/contract-type`}
                      component={MasterContractType}
                    />
                  ) : e.path === "/master/city-master" ? (
                    <Route
                      path={`${process.env.PUBLIC_URL}/master/city-master`}
                      component={MasterCity}
                    />
                  ) : e.path === "/master/leave" ? (
                    <Route
                      path={`${process.env.PUBLIC_URL}/master/leave`}
                      component={MasterLeave}
                    />
                  ) : e.path === "/master/country" ? (
                    <Route
                      path={`${process.env.PUBLIC_URL}/master/country`}
                      component={MasterCountry}
                    />
                  ) : e.path === "/master/state" ? (
                    <Route
                      path={`${process.env.PUBLIC_URL}/master/state`}
                      component={MasterState}
                    />
                  ) : e.path === "/master/monthly-qty" ? (
                    <Route
                      path={`${process.env.PUBLIC_URL}/master/monthly-qty`}
                      component={MasterMonthlyQuantity}
                    />
                  ) : e.path === "/master/daily-qty" ? (
                    <Route
                      path={`${process.env.PUBLIC_URL}/master/daily-qty`}
                      component={MasterDailyQty}
                    />
                  ) : e.path === "/master/cost-center" ? (
                    <Route
                      path={`${process.env.PUBLIC_URL}/master/cost-center`}
                      component={MasterCostCenter}
                    />
                  ) : e.path === "/service-group" ? (
                    <Route
                      path={`${process.env.PUBLIC_URL}/service-group`}
                      component={ViewGroup}
                    />
                  ) : e.path === "/master/bonus-structure" ? (
                    <Route
                      path={`${process.env.PUBLIC_URL}/master/bonus-structure`}
                      component={ViewBonus}
                    />
                  ) : (
                    ""
                  )

                  //  <Route
                  // path={window.location.href}
                  // component={PageNotFound}
                  // />
                }
              </div>
            );
          })}
        </App>
      </Fragment>
    </Switch>
  );
};

export default RoutePath;
