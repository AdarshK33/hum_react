import React, { Fragment, useEffect, useContext, useState } from "react";
import { Container, Row, Col, Form, Button } from "react-bootstrap";
import { Search } from "react-feather";
import { Link } from "react-router-dom";
import Pagination from "react-js-pagination";
import APPROVALS_EMP360_TABLE_HEADERS from "./ApprovalsEmp360Header";
import TableComponent from "../table/Table.component";
import TableComponent360 from "../table/Emp360Table";
import { AppContext } from "../../context/AppState";
import { BonusContext } from "../../context/BonusState";
import { PermissionContext } from "../../context/PermissionState";
import { Employee360Context } from "../../context/Employee360State";
import LoaderIcon from "../Loader/LoaderIcon";
import moment from "moment";

const ApprovalsEmp360List = ({ ListType }) => {
  const { Employee360ListView, employee360ListData, approvalsLoader } =
    useContext(Employee360Context);
  const { rolePermission } = useContext(PermissionContext);
  const { makeBonusByContractTypeEmpty } = useContext(BonusContext);
  const { user,fetchemployeeData } = useContext(AppContext);
  const [transferType, setTransferType] = useState(ListType);
  const [searchValue, setSearchValue] = useState("all");
  const [searchInput, setSearchInput] = useState("");
  const [status, setStatus] = useState(5);
  const [activePage, setActivePage] = useState(1);

  const TableHeaders =
    ListType === "promotion"
      ? APPROVALS_EMP360_TABLE_HEADERS.promotion
      : ListType === "transfer"
      ? APPROVALS_EMP360_TABLE_HEADERS.transfer
      : ListType === "disciplinary"
      ? APPROVALS_EMP360_TABLE_HEADERS.disciplinary
      : ListType === "probation"
      ? APPROVALS_EMP360_TABLE_HEADERS.probation
      : APPROVALS_EMP360_TABLE_HEADERS.promotion;
  const [tableBody, setTableBody] = useState([]);

  useEffect(() => {
    Employee360ListView(ListType, fetchemployeeData.employeeId);
  }, [ListType]);
  console.log("employee360ListData", employee360ListData);
  useEffect(() => {
    makeBonusByContractTypeEmpty();
  }, []);
  /* Creating Table Body Data */
  useEffect(() => {
    if (
      employee360ListData !== null &&
      employee360ListData !== undefined &&
      Object.keys(employee360ListData).length != 0
    ) {
      if (ListType === "promotion") {
        let tableData = employee360ListData.map((item, index) => {
          return {
            empId: item.employeeId,
            empName: item.empName,
            position: item.oldPosition,
            pstPromotedTo: item.promotedPosition,
            promotionDate: item.promotionDate,
            status: item.status === 3 ? "Approved" : "Disapproved",
          };
        });
        setTableBody(tableData);
      } else if (ListType === "transfer") {
        let tableData = employee360ListData.map((item, index) => {
          return {
            empId: item.currentEmployeeId,
            empName: item.employeeName,
            effectiveDate: item.promotedJoiningDate,
            transferType: item.transferType,
            status:
              item.statusDesc === "Completed" ? "Approved" : "Disapproved",
          };
        });
        setTableBody(tableData);
      } else if (ListType === "disciplinary") {
        let tableData = employee360ListData.map((item, index) => {
          return {
            empName: item.employeeName,
            showCauseDate:
              item.disciplinaryAction !== null &&
              item.disciplinaryAction !== undefined
                ? item.disciplinaryAction.actionIssuedDate
                : "NA",
            dueDays:
              item.disciplinaryAction !== null &&
              item.disciplinaryAction !== undefined
                ? item.disciplinaryAction.actionDueDays
                : "NA ",
            showCauseStatus:
              item.disciplinaryAction !== null &&
              item.disciplinaryAction !== undefined
                ? item.disciplinaryAction.employeeActionStatus
                : "NA ",
            warningDate:
              item.disciplinaryWarning !== null &&
              item.disciplinaryWarning !== undefined
                ? item.disciplinaryWarning.warningIssuedDate
                : "NA ",
            pipStartDate:
              item.disciplinaryWarning !== null &&
              item.disciplinaryWarning !== undefined
                ? item.disciplinaryWarning.warningIssuedDate
                : "NA ",
            pipEndDate:
              item.disciplinaryWarning !== null &&
              item.disciplinaryWarning !== undefined
                ? item.disciplinaryWarning.pipEndDate
                : "NA ",
            // pipStatus:
            //   item.disciplinaryWarning !== null &&
            //   item.disciplinaryWarning !== undefined
            //     ? item.disciplinaryWarning.statusDesc
            //     : "NA ",
            status: "Approved",
          };
        });
        setTableBody(tableData);
      } else if (ListType === "probation") {
        let tableData = employee360ListData.map((item, index) => {
          return {
            empName: item.empName,
            dateOfJoining: item.dateOfJoining,
            dateOfCnfrmation:
              item.status === 2 &&
              item.probationExtensionEndDate !== null &&
              item.probationExtensionEndDate !== "" &&
              item.probationExtensionEndDate !== undefined
                ? item.probationExtensionEndDate
                : item.probationConfirmationDate !== null &&
                  item.probationConfirmationDate !== "" &&
                  item.probationConfirmationDate !== undefined
                ? item.probationConfirmationDate
                : item.dateOfJoining !== null &&
                  item.dateOfJoining !== undefined &&
                  item.dateOfJoining !== "" &&
                  item.probationPeriod !== null &&
                  item.probationPeriod !== undefined &&
                  item.probationPeriod !== ""
                ? moment(
                    new Date(
                      new Date(item.dateOfJoining).setMonth(
                        new Date(item.dateOfJoining).getMonth() +
                          item.probationPeriod
                      )
                    )
                  ).format("yyyy-MM-DD")
                : "NA",
            dueDays: item.dueDays,
            status:
              item.status == 0
                ? "Due for"
                : item.status == 1
                ? "Approved"
                : item.status == 2
                ? "Extended"
                : "Disapproved",
          };
        });
        setTableBody(tableData);
      } else {
        setTableBody([]);
      }
    } else {
      setTableBody([]);
    }
  }, [employee360ListData]);

  return (
    <Fragment>
      <div>
        {approvalsLoader ? (
          <LoaderIcon />
        ) : (
          <TableComponent360
            tableHeaders={TableHeaders}
            tableBody={tableBody}
            button={true}
            height={"265px"}
          />
        )}

        {!approvalsLoader ? (
          <div style={{ float: "bottom", textAlign: "center" }}>
            <label className="itemResult">
              {/* onClick={(e) => setTabIndex(2)} */}
              View All
            </label>
          </div>
        ) : (
          ""
        )}
        {/* </div> */}
      </div>
    </Fragment>
  );
};

export default ApprovalsEmp360List;
