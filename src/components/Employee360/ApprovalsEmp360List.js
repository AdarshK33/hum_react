import React, { Fragment, useEffect, useContext, useState } from "react";
import { Container, Row, Col, Form, Button } from "react-bootstrap";
import { Search } from "react-feather";
import { Link } from "react-router-dom";
import Pagination from "react-js-pagination";
import APPROVALS_EMP360_TABLE_HEADERS from "./ApprovalsEmp360Header";
import TableComponent from "../table/Table.component";
import { AppContext } from "../../context/AppState";
import { BonusContext } from "../../context/BonusState";
import { PermissionContext } from "../../context/PermissionState";
import { Employee360Context } from "../../context/Employee360State";
import LoaderIcon from "../Loader/LoaderIcon";

const ApprovalsEmp360List = ({ ListType }) => {
  const { Employee360ListView, employee360ListData, approvalsLoader } =
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
      ? APPROVALS_EMP360_TABLE_HEADERS.promotion
      : ListType === "transfer"
      ? APPROVALS_EMP360_TABLE_HEADERS.transfer
      : ListType === "leaves"
      ? APPROVALS_EMP360_TABLE_HEADERS.leaves
      : APPROVALS_EMP360_TABLE_HEADERS.leaves;
  const [tableBody, setTableBody] = useState([]);

  useEffect(() => {
    Employee360ListView(ListType);
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
      } else if (ListType === "leaves") {
        let tableData = employee360ListData.map((item, index) => {
          return {
            leaveDate: item.todate + " to " + item.fromDate,
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
  }, [employee360ListData]);

  return (
    <Fragment>
      <Row>
        <Col sm={12}>
          <div className="table-responsive">
            <div className="table-list">
              {approvalsLoader ? (
                <LoaderIcon />
              ) : (
                <TableComponent
                  tableHeaders={TableHeaders}
                  tableBody={tableBody}
                  button={true}
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
            </div>
          </div>
        </Col>
      </Row>
      {/* {loader === false && tableBody.length > 0 && (
        <Pagination
          itemClass="page-item"
          linkClass="page-link"
          activePage={activePage}
          itemsCountPerPage={recordsPerPage}
          totalItemsCount={total}
          pageRangeDisplayed={pageRange}
          onChange={handlePageChange}
          firstPageText="First"
          lastPageText="Last"
        />
      )} */}
    </Fragment>
  );
};

export default ApprovalsEmp360List;
