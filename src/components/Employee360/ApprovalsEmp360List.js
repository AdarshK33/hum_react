import React, { Fragment, useEffect, useContext, useState } from "react";
import { Container, Row, Col, Form, Button } from "react-bootstrap";
import { Search } from "react-feather";
import { Link } from "react-router-dom";
import Pagination from "react-js-pagination";
import { TransferContext } from "../../context/TransferState";
import APPROVALS_EMP360_TABLE_HEADERS from "./ApprovalsEmp360Header";
import TableComponent from "../table/Table.component";
import { AppContext } from "../../context/AppState";
import { BonusContext } from "../../context/BonusState";
import { PermissionContext } from "../../context/PermissionState";
import { Employee360Context } from "../../context/Employee360State";

const ApprovalsEmp360List = ({ ListType }) => {
  const recordsPerPage = 10;
  const pageRange = 10;
  const {
    getTransferList,
    transferList,
    loader,
    total,
    chnageTransferType,
    TRANSFERtype,
  } = useContext(TransferContext);
  const { Employee360ListView, employee360ListData } =
    useContext(Employee360Context);
  const { rolePermission } = useContext(PermissionContext);
  const { makeBonusByContractTypeEmpty } = useContext(BonusContext);
  const { user } = useContext(AppContext);
  const [transferType, setTransferType] = useState(TRANSFERtype);
  const [searchValue, setSearchValue] = useState("all");
  const [searchInput, setSearchInput] = useState("");
  const [status, setStatus] = useState(5);
  const [activePage, setActivePage] = useState(1);
  const [listHeading, setListHeading] = useState(`${transferType} List`);
  const [apiUrl, setApiUrl] = useState(
    `/api/v1/transfer/view?key=${searchValue}&page=${
      activePage - 1
    }&size=${recordsPerPage}&status=${status}&transferType=${ListType}`
  );
  const isDateBeforeToday = (date) => {
    console.log("yes");
    if (date !== null && date !== undefined && date !== "") {
      console.log("oooooo", new Date(date) < new Date());
      return new Date(date) < new Date();
    } else {
      console.log("no");
      return false;
    }
  };
  const TableHeaders =
    ListType === "promotion"
      ? APPROVALS_EMP360_TABLE_HEADERS.promotion
      : transferType === "transfer"
      ? APPROVALS_EMP360_TABLE_HEADERS.transfer
      : transferType === "leaves"
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
            sno: index + 1,
            empId: item.employeeId,
            empName: item.empName,
            position: item.oldPosition,
            pstPromotedTo: item.promotedPosition,
            promotionDate: item.promotionDate,
            status: item.statusDesc,
          };
        });
        setTableBody(tableData);
      } else if (ListType === "transfer") {
        let tableData = employee360ListData.map((item, index) => {
          return {
            sno: index + 1,
            empId: item.currentEmployeeId,
            empName: item.employeeName,
            effectiveDate: item.promotedJoiningDate,
            transferType: item.transferType,
            status: item.statusDesc,
          };
        });
        setTableBody(tableData);
      } else if (ListType === "leaves") {
        let tableData = employee360ListData.map((item, index) => {
          return {
            sno: index + 1,
            empId: item.currentEmployeeId,
            empName: item.employeeName,
            oldEmpContractType: item.currentContractType,
            newEmpContractType: item.promotedContractType,
            effectiveDate: item.promotedJoiningDate,
            status: item.status === 0 ? "Completed" : item.statusDesc,
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

  const handlePageChange = (page) => {
    setActivePage(page);
    setApiUrl(
      `/api/v1/transfer/view?key=${searchValue}&page=${
        page - 1
      }&size=${recordsPerPage}&status=${status}&transferType=${ListType}`
    );
  };

  const changeInTransferType = (e) => {
    const transfer = e.target.value;
    setTransferType(transfer);
    setListHeading(`${transfer} Listings`);
    setActivePage(1);
    chnageTransferType(transfer);
    setApiUrl(
      `/api/v1/transfer/view?key=${searchValue}&page=${
        activePage - 1
      }&size=${recordsPerPage}&status=${status}&transferType=${transfer}`
    );
  };

  const searchInputHandler = (e) => {
    setSearchInput(e.target.value);
  };

  const searchDataHandler = () => {
    const searchText = searchInput !== "" ? searchInput : "all";
    setSearchValue(searchText);
    setActivePage(1);
    setApiUrl(
      `/api/v1/transfer/view?key=${searchText}&page=${
        activePage - 1
      }&size=${recordsPerPage}&status=${status}&transferType=${ListType}`
    );
  };

  const statusHandler = (e) => {
    setStatus(e.target.value);
    setActivePage(1);
    setApiUrl(
      `/api/v1/transfer/view?key=${searchValue}&page=${
        activePage - 1
      }&size=${recordsPerPage}&status=${
        e.target.value
      }&transferType=${ListType}`
    );
  };
  console.log("user->", user);
  return (
    <Fragment>
      <Row>
        <Col sm={12}>
          <div className="table-list">
            {false ? (
              <tbody>
                <tr>
                  <td colSpan="12">
                    <div
                      className="loader-box loader"
                      style={{ width: "100% !important" }}
                    >
                      <div className="loader">
                        <div className="line bg-primary"></div>
                        <div className="line bg-primary"></div>
                        <div className="line bg-primary"></div>
                        <div className="line bg-primary"></div>
                      </div>
                    </div>
                  </td>
                </tr>
              </tbody>
            ) : (
              <TableComponent
                tableHeaders={TableHeaders}
                tableBody={tableBody}
              />
            )}
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
