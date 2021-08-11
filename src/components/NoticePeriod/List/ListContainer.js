import React, { useEffect, useContext, useState } from "react";
import { Container } from "react-bootstrap";
import Pagination from "react-js-pagination";
import Breadcrumb from "../../common/breadcrumb";
import HeaderComp from "./HeaderComp";
import LoaderIcon from "../../Loader/LoaderIcon";
import TableComponent from "../../table/Table.component";
import { NoticePeriodContext } from "../../../context/NoticePeriodState";
import { OfferContext } from "../../../context/OfferState";

const NoticePeriodListContainer = () => {
  const TableHeaders = {
    sno: "SNo",
    dept: "Department",
    contractType: "Contract Type",
    noticePeriod: "Notice Period",
    view: "View",
    action: "Edit",
  };
  const recordsPerPage = 10;
  const pageRange = 10;
  const { getNoticePeriodList, noticePeriodList, loader, total } =
    useContext(NoticePeriodContext);
  const { departmentView, departmentName } = useContext(OfferContext);
  const [tableBody, setTableBody] = useState([]);
  const [activePage, setActivePage] = useState(1);
  const [searchValue, setSearchValue] = useState("All");
  const [searchInput, setSearchInput] = useState("");
  const [apiUrl, setApiUrl] = useState(
    `/api/v1/notice/view?department=${searchValue}&page=${
      activePage - 1
    }&size=${recordsPerPage}`
  );

  useEffect(() => {
    departmentView();
  }, []);

  useEffect(() => {
    getNoticePeriodList(apiUrl);
  }, [apiUrl]);

  useEffect(() => {
    if (
      noticePeriodList !== null &&
      noticePeriodList !== undefined &&
      noticePeriodList.length > 0
    ) {
      let tableData = noticePeriodList.map((item, index) => {
        return {
          sno: index + 1,
          dept: item.department,
          contractType: item.contractType,
          noticePeriod: `${item.noticePeriod} ${
            item.noticePeriod === 1 ? "Month" : "Months"
          }`,
          view: {
            active: true,
            link: `/master/view-notice-period/${item.noticePeriodId}`,
          },
          action: {
            edit: {
              active: true,
              link: `/master/edit-notice-period/${item.noticePeriodId}`,
            },
          },
        };
      });
      setTableBody(tableData);
    } else {
      setTableBody([]);
    }
  }, [noticePeriodList]);

  const searchInputHandler = (e) => {
    setSearchInput(e.target.value);
  };

  const searchDataHandler = () => {
    const searchText = searchInput !== "" ? searchInput : "All";
    setSearchValue(searchText);
    setActivePage(1);
    setApiUrl(
      `/api/v1/notice/view?department=${searchText}&page=${
        activePage - 1
      }&size=${recordsPerPage}`
    );
  };

  const handlePageChange = (page) => {
    setActivePage(page);
    setApiUrl(
      `/api/v1/notice/view?department=${searchValue}&page=${
        activePage - 1
      }&size=${recordsPerPage}`
    );
  };

  return (
    <div className="notice-period-list-container">
      <Breadcrumb title="NOTICE PERIOD" parent="NOTICE PERIOD" />
      <Container fluid>
        <div className="card" style={{ borderRadius: "1rem" }}>
          <HeaderComp
            searchInput={searchInput}
            searchInputHandler={searchInputHandler}
            searchDataHandler={searchDataHandler}
            departmentList={departmentName}
          />
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
    </div>
  );
};

export default NoticePeriodListContainer;
