import React, { Fragment, useEffect, useContext, useState } from "react";
import { Container, Row, Col, Form, Button } from "react-bootstrap";
import { Search } from "react-feather";
import { Link } from "react-router-dom";
import Pagination from "react-js-pagination";
import Breadcrumb from "../../common/breadcrumb";
import { TransferContext } from "../../../context/TransferState";
import TRANSFER_TABLE_HEADERS from "./TableHeaders";
import TableComponent from "../../table/Table.component";
import NoDataComp from "../../no-data/NoData.component";
import LoaderIcon from "../../Loader/LoaderIcon";

const TransferPage = () => {
  const recordsPerPage = 10;
  const pageRange = 10;
  const { getTransferList, transferList, loader, total } =
    useContext(TransferContext);
  const [transferType, setTransferType] = useState("Regular Transfer");
  const [searchValue, setSearchValue] = useState("all");
  const [searchInput, setSearchInput] = useState("");
  const [status, setStatus] = useState(5);
  const [activePage, setActivePage] = useState(1);
  const [listHeading, setListHeading] = useState(`${transferType} Listings`);
  const [apiUrl, setApiUrl] = useState(
    `/api/v1/transfer/view?key=${searchValue}&page=${
      activePage - 1
    }&size=${recordsPerPage}&status=${status}&transferType=${transferType}`
  );
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

  /* Creating Table Body Data */
  useEffect(() => {
    if (
      transferList !== null &&
      transferList !== undefined &&
      transferList.length > 0
    ) {
      const tableData = transferList.map((item, index) => {
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
              active: true,
              link: `/transfer/${item.transferId}`,
            },
          },
        };
      });
      setTableBody(tableData);
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

  const changeTransferType = (e) => {
    const transfer = e.target.value;
    setTransferType(transfer);
    setListHeading(`${transfer} Listings`);
    setActivePage(1);
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

  return (
    <Fragment>
      <Breadcrumb title="TRANSFERS LIST" parent="TRANSFERS LIST" />
      <Container fluid>
        <Row>
          <Col sm={12}>
            <div className="card" style={{ overflowX: "auto" }}>
              {loader ? (
                <LoaderIcon />
              ) : (
                <div className="transfer-list-page">
                  <div
                    className="title_bar"
                    style={{ textAlign: "center", fontSize: "larger" }}
                  >
                    <Row className="pt-2 mx-2">
                      <Col md={2}>
                        <Form.Control
                          as="select"
                          aria-label="Select Transfer Type"
                          value={transferType}
                          onChange={changeTransferType}
                        >
                          <option disabled>Select Transfer Type</option>
                          <option value="Regular Transfer">
                            Regular Transfer
                          </option>
                          <option value="Entity Transfer">
                            Entity Transfer
                          </option>
                          <option value="International Transfer">
                            International Transfer
                          </option>
                          <option value="Employment Type Transfer">
                            Employment Type Transfer
                          </option>
                        </Form.Control>
                      </Col>
                      <Col md={2}>
                        <Form.Control
                          type="text"
                          value={searchInput}
                          placeholder="Search"
                          onChange={searchInputHandler}
                        />
                        <Search
                          className="search-icon mr-1"
                          style={{ color: "#313131" }}
                          onClick={searchDataHandler}
                        />
                      </Col>
                      <Col
                        md={3}
                        className="font-weight-bold text-uppercase text-center my-auto"
                      >
                        {listHeading}
                      </Col>
                      <Col md={3}>
                        <Link
                          to="/transfer-initiate"
                          className="text-decoration-none"
                        >
                          <Button variant="light" block>
                            Initiate Transfer
                          </Button>
                        </Link>
                      </Col>
                      <Col md={2}>
                        <Form.Control
                          as="select"
                          aria-label="Choose Status"
                          value={status}
                          onChange={statusHandler}
                        >
                          <option disabled>Choose Status</option>
                          <option value="0">In Progress</option>
                          <option value="1">Initiated</option>
                          <option value="2">Rejected</option>
                          <option value="5">All</option>
                        </Form.Control>
                      </Col>
                    </Row>
                  </div>
                  <div className="table-list">
                    {tableBody.length === 0 ? (
                      <NoDataComp msg="No Data Found" />
                    ) : (
                      <TableComponent
                        tableHeaders={TableHeaders}
                        tableBody={tableBody}
                      />
                    )}
                  </div>
                </div>
              )}
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
