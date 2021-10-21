import React, { Fragment, useEffect, useContext, useState } from "react";
import { Container, Row, Col, Form, Button } from "react-bootstrap";
import { Search } from "react-feather";
import { Link } from "react-router-dom";
import Pagination from "react-js-pagination";
import APPROVALS_MANAGER360_TABLE_HEADERS from "./ApprovalsManager360Headers";
import TableComponent from "../table/Table.component";
import TableComponentManager360 from "../table/Manager360Table";
import { AppContext } from "../../context/AppState";
import { BonusContext } from "../../context/BonusState";
import { PermissionContext } from "../../context/PermissionState";
import { Employee360Context } from "../../context/Employee360State";
import LoaderIcon from "../Loader/LoaderIcon";

const ApprovalsManager360List = ({ ListType }) => {
  const { Manager360ListView, Manager360ListData, approvalsLoader } =
    useContext(Employee360Context);
  const { rolePermission } = useContext(PermissionContext);
  const { makeBonusByContractTypeEmpty } = useContext(BonusContext);
  const { user } = useContext(AppContext);
  const [transferType, setTransferType] = useState(ListType);
  const [searchValue, setSearchValue] = useState("all");
  const [searchInput, setSearchInput] = useState("");
  const [status, setStatus] = useState(5);
  const [activePage, setActivePage] = useState(1);

  const TableHeaders =
    ListType === "promotion"
      ? APPROVALS_MANAGER360_TABLE_HEADERS.promotion
      : ListType === "transfer"
      ? APPROVALS_MANAGER360_TABLE_HEADERS.transfer
      : ListType === "leaves"
      ? APPROVALS_MANAGER360_TABLE_HEADERS.leaves
      : APPROVALS_MANAGER360_TABLE_HEADERS.leaves;
  const [tableBody, setTableBody] = useState([]);

  useEffect(() => {
    Manager360ListView(ListType);
  }, [ListType]);
  console.log("Manager360ListData", Manager360ListData);
  useEffect(() => {
    makeBonusByContractTypeEmpty();
  }, []);
  /* Creating Table Body Data */
  useEffect(() => {
    if (
      Manager360ListData !== null &&
      Manager360ListData !== undefined &&
      Object.keys(Manager360ListData).length != 0
    ) {
      if (ListType === "promotion") {
        let tableData = Manager360ListData.map((item, index) => {
          return {
            empId: item.employeeId,
            empName: item.empName,
            position: item.oldPosition,
            pstPromotedTo: item.promotedPosition,
            promotionDate: item.promotionDate,
            validateByCCM: item.validatedManagerName,
            validateByCCMdate: item.managerValidatedDate,
            validateByAdmin: item.validatedAdminName,
            validateByAdminDate: item.adminValidatedDate,
            status: item.status === 3 ? "Approved" : "Disapproved",
          };
        });
        setTableBody(tableData);
      } else if (ListType === "transfer") {
        let tableData = Manager360ListData.map((item, index) => {
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
      } else if (ListType === "leaves") {
        let tableData = Manager360ListData.map((item, index) => {
          return {
            name: item.empName,
            leaveDate: item.fromDate + " to " + item.todate,
            duration: item.numberOfDays + "Days",
            reason: item.reason,
            status: item.status == "1" ? "Approved" : "Disapproved",
          };
        });
        setTableBody(tableData);
      } else {
        setTableBody([]);
      }
    } else {
      setTableBody([]);
    }
  }, [Manager360ListData]);

  return (
    <Fragment>
      <div>
        {approvalsLoader ? (
          <LoaderIcon />
        ) : (
          <TableComponentManager360
            tableHeaders={TableHeaders}
            tableBody={tableBody}
            button={true}
            height={"370px"}
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

export default ApprovalsManager360List;
