import React, { Fragment, useEffect, useContext, useState } from "react";
import { Container, Row, Col, Form, Button } from "react-bootstrap";
import { Search } from "react-feather";
import { Link } from "react-router-dom";
import Pagination from "react-js-pagination";
import Breadcrumb from "../../common/breadcrumb";
import { TransferContext } from "../../../context/TransferState";
import TRANSFER_TABLE_HEADERS from "./TableHeaders";
import TableComponent from "../../table/Table.component";
import LoaderIcon from "../../Loader/LoaderIcon";
import { AppContext } from "../../../context/AppState";
import { BonusContext } from "../../../context/BonusState";
import { PermissionContext } from "../../../context/PermissionState";

const TransferPage = () => {
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
    }&size=${recordsPerPage}&status=${status}&transferType=${transferType}`
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
    transferType === "Regular Transfer"
      ? TRANSFER_TABLE_HEADERS.regular
      : transferType === "Entity Transfer"
      ? TRANSFER_TABLE_HEADERS.entity
      : transferType === "International Transfer"
      ? TRANSFER_TABLE_HEADERS.international
      : TRANSFER_TABLE_HEADERS.employment;
  const [tableBody, setTableBody] = useState([]);

  useEffect(() => {
    getTransferList(apiUrl);
  }, [apiUrl]);

  useEffect(() => {
    makeBonusByContractTypeEmpty();
  }, []);
  /* Creating Table Body Data */
  useEffect(() => {
    if (
      transferList !== null &&
      transferList !== undefined &&
      transferList.length > 0
    ) {
      if (transferType === "Regular Transfer") {
        let tableData = transferList.map((item, index) => {
          return {
            sno: index + 1,
            empId: item.currentEmployeeId,
            empName: item.employeeName,
            curDept: item.currentDepartment,
            curPos: item.currentPosition,
            curCostCent: item.currentCostCentre,
            curManager: item.currentManagerName,
            curLocation: item.currentLocationName,
            newDept: item.promotedDepartment,
            newPos: item.promotedPosition,
            newCostCent: item.promotedCostCentre,
            newManager: item.promotedManagerName,
            newLocation: item.promotedLocationName,
            status: item.statusDesc,
            view: {
              active: true,
              link: `/view-transfer/${item.transferId}`,
            },
            action: {
              edit: {
                active:
                  item.promotedManagerId === user.employeeId &&
                  item.status === 0
                    ? true
                    : false,
                link:
                  item.promotedManagerId === user.employeeId &&
                  item.status === 0
                    ? `/transfer/${item.transferId}`
                    : "",
                // item.transferType === "Regular Transfer"
                //   ? `/transfer/${item.transferId}`
                //   : "/transfers",
              },
            },
          };
        });
        setTableBody(tableData);
      } else if (transferType === "Entity Transfer") {
        let tableData = transferList.map((item, index) => {
          return {
            sno: index + 1,
            empId: item.currentEmployeeId,
            empName: item.employeeName,
            oldEntity: item.currentCompany,
            newEmpId: item.promotedEmployeeId,
            newEntity: item.promotedCompany,
            newManager: item.promotedManagerName,
            effectiveDate: item.promotedJoiningDate,
            status: item.statusDesc,

            view: {
              active: true,
              link: `/view-transfer/${item.transferId}`,
            },
            action: {
              edit: {
                active:
                  // true,
                  item.promotedManagerId === user.employeeId &&
                  item.status === 0
                    ? true
                    : false,
                link:
                  item.promotedManagerId === user.employeeId &&
                  item.status === 0
                    ? `/entity-transfer/${item.transferId}`
                    : "",
              },
            },
          };
        });
        setTableBody(tableData);
      } else if (transferType === "Employment Type Transfer") {
        let tableData = transferList.map((item, index) => {
          return {
            sno: index + 1,
            empId: item.currentEmployeeId,
            empName: item.employeeName,
            oldEmpContractType: item.currentContractType,
            newEmpContractType: item.promotedContractType,
            effectiveDate: item.promotedJoiningDate,
            status: item.status === 0 ? "Completed" : item.statusDesc,

            view: {
              active: true,
              link: `/view-transfer/${item.transferId}`,
            },
            action: {
              edit: {
                active: false,
              },
            },
          };
        });
        setTableBody(tableData);
      } else if (transferType === "International Transfer") {
        let tableData = transferList.map((item, index) => {
          return {
            sno: index + 1,
            empId: item.currentEmployeeId,
            empName: item.employeeName,
            oldCountry: item.currentCountry,
            oldDesignation: item.currentPosition,
            newCountry: item.promotedCountry,
            newDesignation: item.promotedDesignation,
            effDate: item.promotedJoiningDate,
            dateOfReturn: item.promotedDateOfReturn,
            termOfProject: item.promotedTermOfProject,
            contractStatus:
              item.contractStatus !== "" &&
              item.contractStatus !== null &&
              item.contractStatus !== undefined
                ? item.contractStatus
                : "NA",
            status:
              item.status === 0 ? "Request Sent To Admin" : item.statusDesc,
            view: {
              active: true,
              link: `/view-transfer/${item.transferId}`,
            },
            action: {
              edit: {
                active:
                  rolePermission == "admin" &&
                  (item.status === 0 ||
                    isDateBeforeToday(item.promotedDateOfReturn))
                    ? true
                    : false,
                link:
                  rolePermission == "admin" && item.status === 0
                    ? `/international-transfer/${item.transferId}`
                    : "",
              },
            },
          };
        });
        setTableBody(tableData);
      } else {
        setTableBody([]);
      }
    } else {
      setTableBody([]);
    }
  }, [transferList]);

  const handlePageChange = (page) => {
    setActivePage(page);
    setApiUrl(
      `/api/v1/transfer/view?key=${searchValue}&page=${
        page - 1
      }&size=${recordsPerPage}&status=${status}&transferType=${transferType}`
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
      }&size=${recordsPerPage}&status=${status}&transferType=${transferType}`
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
      }&transferType=${transferType}`
    );
  };
  console.log("user->", user);
  return (
    <Fragment>
      <Breadcrumb title="TRANSFERS LIST" parent="TRANSFERS LIST" />
      <Container fluid>
        <Row>
          <Col sm={12}>
            <div className="card" style={{ overflowX: "auto" }}>
              <div className="transfer-list-page">
                <div
                  className="title_bar"
                  style={{ textAlign: "center", fontSize: "larger" }}
                >
                  <Row
                    style={{
                      marginLeft: "1rem",
                      marginRight: "1rem",
                    }}
                  >
                    <Col md={2} style={{ marginTop: "-3px" }}>
                      <Form.Control
                        as="select"
                        aria-label="Select Transfer Type"
                        value={transferType}
                        onChange={changeInTransferType}
                        className="probation_status_search"
                      >
                        <option disabled>Select Transfer Type</option>
                        <option value="Regular Transfer">
                          Regular Transfer
                        </option>
                        <option value="Entity Transfer">Entity Transfer</option>
                        <option value="International Transfer">
                          International Transfer
                        </option>
                        <option value="Employment Type Transfer">
                          Change In Employment Type Transfer
                        </option>
                      </Form.Control>
                    </Col>

                    <Col md={2} style={{ marginTop: "7px" }}>
                      <Form.Control
                        type="text"
                        value={searchInput}
                        placeholder="Search"
                        onChange={searchInputHandler}
                        className="form-control searchButton"
                      />
                      <Search
                        className="search-icon mr-1"
                        style={{ color: "#313131" }}
                        onClick={searchDataHandler}
                      />
                    </Col>
                    <Col
                      md={4}
                      className="font-weight-bold text-uppercase text-center my-auto"
                    >
                      {transferType === "Employment Type Transfer"
                        ? "Change In Employment Type Transfer"
                        : listHeading}
                    </Col>
                    <Col md={2}>
                      <Link
                        to="/transfer-initiate"
                        className="text-decoration-none"
                      >
                        <Button className="apply-button btn btn-light mr-2">
                          Initiate Transfer
                        </Button>
                      </Link>
                    </Col>
                    {transferType === "Regular Transfer" ? (
                      <Col md={2} style={{ marginTop: "-3px" }}>
                        <Form.Control
                          as="select"
                          aria-label="Choose Status"
                          value={status}
                          onChange={statusHandler}
                          className="probation_status_search"
                        >
                          <option disabled>Choose Status</option>
                          <option value="0">Request Sent To Manager</option>
                          <option value="1">Completed</option>
                          <option value="2">Rejected</option>
                          <option value="5">All</option>
                        </Form.Control>
                      </Col>
                    ) : transferType === "Entity Transfer" ? (
                      <Col md={2} style={{ marginTop: "-3px" }}>
                        <Form.Control
                          as="select"
                          aria-label="Choose Status"
                          value={status}
                          onChange={statusHandler}
                          className="probation_status_search"
                        >
                          <option disabled>Choose Status</option>
                          <option value="0">Request Sent To Manager</option>
                          <option value="1">Completed</option>
                          <option value="5">All</option>
                        </Form.Control>
                      </Col>
                    ) : transferType === "International Transfer" ? (
                      <Col md={2} style={{ marginTop: "-3px" }}>
                        <Form.Control
                          as="select"
                          aria-label="Choose Status"
                          value={status}
                          onChange={statusHandler}
                          className="probation_status_search"
                        >
                          <option disabled>Choose Status</option>
                          <option value="0">Request Sent To Admin</option>
                          <option value="1">Completed</option>
                          <option value="5">All</option>
                        </Form.Control>
                      </Col>
                    ) : transferType === "Employment Type Transfer" ? (
                      <Col md={2} style={{ marginTop: "-3px" }}>
                        <Form.Control
                          as="select"
                          aria-label="Choose Status"
                          value={status}
                          onChange={statusHandler}
                          className="probation_status_search"
                        >
                          <option disabled>Choose Status</option>
                          <option value="0">Completed</option>
                          <option value="5">All</option>
                        </Form.Control>
                      </Col>
                    ) : (
                      ""
                    )}
                  </Row>
                </div>
                <div className="table-list">
                  {loader ? (
                    <LoaderIcon />
                  ) : (
                    <TableComponent
                      tableHeaders={TableHeaders}
                      tableBody={tableBody}
                    />
                  )}
                </div>
              </div>
            </div>
          </Col>
        </Row>
      </Container>
      {loader === false && tableBody.length > 0 && (
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
      )}
    </Fragment>
  );
};

export default TransferPage;
