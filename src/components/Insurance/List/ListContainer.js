import React, { useEffect, useContext, useState } from "react";
import { Container } from "react-bootstrap";
import Pagination from "react-js-pagination";
import Breadcrumb from "../../common/breadcrumb";
import HeaderComp from "./HeaderComp";
import LoaderIcon from "../../Loader/LoaderIcon";
import TableComponent from "../../table/Table.component";
import { InsuranceContext } from "../../../context/InsuranceState";

const InsuranceListContainer = () => {
  const TableHeaders = {
    sno: "SNo",
    year: "Year",
    sumInsured: "Sum Insured",
    premiumAmount: "Premium Amount",
    view: "View",
    action: "Edit",
  };
  const recordsPerPage = 10;
  const pageRange = 10;
  const currentYear = new Date().getFullYear();
  const {
    getInsuranceList,
    insuranceList,
    loader,
    total,
    exportInsuranceNominations,
    getRange,
    yearRange,
  } = useContext(InsuranceContext);
  const [tableBody, setTableBody] = useState([]);
  const [activePage, setActivePage] = useState(1);
  const [searchValue, setSearchValue] = useState(0);
  const [searchInput, setSearchInput] = useState("");
  const [apiUrl, setApiUrl] = useState(
    `/api/v1/insurance/view?page=${
      activePage - 1
    }&size=${recordsPerPage}&year=${searchValue}`
  );

  useEffect(() => {
    getInsuranceList(apiUrl);
  }, [apiUrl]);

  useEffect(() => {
    getRange(currentYear, currentYear + 10, 1);
  }, []);

  useEffect(() => {
    if (
      insuranceList !== null &&
      insuranceList !== undefined &&
      insuranceList.length > 0
    ) {
      let tableData = insuranceList.map((item, index) => {
        return {
          sno: index + 1,
          year: item.year,
          sumInsured: item.sum,
          premiumAmount: item.premiumAmt,
          view: {
            active: true,
            link: `/master/view-insurance/${item.insuranceNominationId}`,
          },
          action: {
            edit: {
              active: true,
              link: `/master/edit-insurance/${item.insuranceNominationId}`,
            },
          },
        };
      });
      setTableBody(tableData);
    } else {
      setTableBody([]);
    }
  }, [insuranceList]);

  const searchInputHandler = (e) => {
    setSearchInput(e.target.value);
  };

  const searchDataHandler = () => {
    const searchText = searchInput !== "" ? parseInt(searchInput) : 0;
    setSearchValue(searchText);
    setActivePage(1);
    setApiUrl(
      `/api/v1/insurance/view?page=${
        activePage - 1
      }&size=${recordsPerPage}&year=${searchText}`
    );
  };

  const handlePageChange = (page) => {
    setActivePage(page);
    setApiUrl(
      `/api/v1/insurance/view?page=${
        activePage - 1
      }&size=${recordsPerPage}&year=${searchValue}`
    );
  };

  return (
    <div className="insurance-list-container">
      <Breadcrumb title="INSURANCE" parent="INSURANCE" />
      <Container fluid>
        <div className="card" style={{ borderRadius: "1rem" }}>
          <HeaderComp
            searchInput={searchInput}
            searchInputHandler={searchInputHandler}
            searchDataHandler={searchDataHandler}
            exportInsuranceNominations={exportInsuranceNominations}
            yearRange={yearRange}
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

export default InsuranceListContainer;
