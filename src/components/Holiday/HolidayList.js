import React, { Fragment, useEffect, useContext, useState } from "react";
import Breadcrumb from "../common/breadcrumb";
import { LeaveContext } from "../../context/LeaveState";
import { Button } from "react-bootstrap";
import "../Leaves/Leaves.css";
import "../AdminLeave/AdminLeaves.css";
import "../../assets/css/search.css";
import { toast } from "react-toastify";
import Pagination from "react-js-pagination";
import { AppContext } from "../../context/AppState";
import { PermissionContext } from "../../context/PermissionState";

import { Search } from "react-feather";
import { JsonToExcel } from "react-json-excel";
import { SearchContext } from "../../context/SearchState";

const HolidayList = () => {
  const { getHoliday, holidayDataList, uploadFile, loader } =
    useContext(LeaveContext);
  const { user } = useContext(AppContext);
  const [fileUpload, setFileUpload] = useState();
  const [searchValue, setSearchValue] = useState(false);
  const [searchLeaveList, setLeaveList] = useState();
  const { searchHoliday, searchHolidayList } = useContext(SearchContext);
  const { rolePermission } = useContext(PermissionContext);

  /*-----------------Pagination------------------*/
  const [currentPage, setCurrentPage] = useState(1);
  const recordPerPage = 10;
  const totalRecords =
    searchLeaveList !== null &&
    searchLeaveList !== undefined &&
    searchLeaveList.length;
  const pageRange = 10;

  const indexOfLastRecord = currentPage * recordPerPage;
  const indexOfFirstRecord = indexOfLastRecord - recordPerPage;
  const currentRecords =
    searchLeaveList !== null && searchLeaveList !== undefined
      ? searchLeaveList.slice(indexOfFirstRecord, indexOfLastRecord)
      : [];

  const handlePageChange = (pageNumber) => {
    setCurrentPage(pageNumber);
  };
  /*-----------------Pagination------------------*/

  useEffect(() => {
    getHoliday();
  }, []);

  useEffect(() => {
    if (
      holidayDataList !== undefined &&
      holidayDataList !== null &&
      holidayDataList.length > 0
    ) {
      setLeaveList(holidayDataList);
    }
  }, [holidayDataList]);

  const searchHandler = (e) => {
    setSearchValue(e.target.value);
    if (e.target.value !== "") {
      searchHoliday(e.target.value);
    } else {
      getHoliday();
    }
  };

  /*  const searchDataHandler = () => {
    if (searchValue !== "") {
      searchHoliday(searchValue);
    } else {
      getHoliday()
    }

  } */

  useEffect(() => {
    if (
      searchHolidayList !== undefined &&
      searchHolidayList !== null &&
      searchHolidayList.length > 0
    ) {
      setLeaveList(searchHolidayList);
    }
  }, [searchHolidayList]);

  console.log("holiday", holidayDataList);
  const changeHandler = (event) => {
    let fileObj = event.target.files[0];
    console.log("clicked", fileObj);
    setFileUpload(fileObj);
    // uploadFile(fileObj)
    // setTimeout(()=>{
    //   window.location.reload()
    // }, 5000)
  };

  //File export
  const filename = "holidaylist";
  let fields = {
    holidayId: "S. No",
    holidayDate: "Date",
    holidayName: "Name",
    year: "Year",
    state: "State",
    department: "Department",
  };

  let data = [];
  if (holidayDataList !== undefined && holidayDataList !== null) {
    for (let i = 0; i < holidayDataList.length; i++) {
      console.log(holidayDataList[i].holidayDate);
      data.push({
        holidayId: i + 1,
        holidayDate: holidayDataList[i].holidayDate,
        holidayName: holidayDataList[i].holidayName,
        year: holidayDataList[i].year,
        state: holidayDataList[i].state,
        department: holidayDataList[i].department,
      });
    }
  }

  const handleUpload = () => {
    if (fileUpload !== undefined && fileUpload !== null) {
      uploadFile(fileUpload);
    } else {
      toast.info("Please select a file to upload");
    }

    setTimeout(() => {
      window.location.reload();
    }, 5000);
  };

  return (
    <Fragment>
      <Breadcrumb title="Holiday List" parent="Holiday List" />
      <div className="container-fluid">
        <div className="row">
          <div className="col-sm-12">
            <div className="card" style={{ overflowX: "auto" }}>
              {rolePermission == "admin" ? (
                <div className="title_bar">
                  <input
                    className="btn"
                    type="file"
                    accept=".xlsx, .xls, .csv"
                    onChange={(e) => {
                      getHoliday();
                      changeHandler(e);
                    }}
                    style={{ padding: "10px" }}
                  />
                  <Button className="btn btn-light mr-2" onClick={handleUpload}>
                    Upload File
                  </Button>
                  {data.length > 0 && (
                    <JsonToExcel
                      data={data}
                      className="btn btn-light mr-2"
                      filename={filename}
                      fields={fields}
                      text="Export excel"
                    />
                  )}

                  <div className="job-filter">
                    <div className="faq-form mr-2">
                      <input
                        className="form-control searchButton"
                        type="text"
                        placeholder="Search.."
                        onChange={(e) => searchHandler(e)}
                      />
                      {/* <Search className="search-icon" style={{ color: "#313131" }} onClick={searchDataHandler} /> */}
                    </div>
                  </div>
                </div>
              ) : (
                <div className="title_bar"></div>
              )}

              <div className="table-responsive">
                <table id="table-to-xls" className="table table-hover">
                  {rolePermission == "admin" ? (
                    <thead
                      className="thead-light"
                      style={{ backgroundColor: "#2f3c4e" }}
                    >
                      <tr>
                        <th>S. No</th>
                        <th scope="col"> Date</th>
                        <th scope="col"> Name</th>
                        <th scope="col">Year</th>
                        <th scope="col">State</th>
                        <th scope="col">Department</th>
                      </tr>
                    </thead>
                  ) : (
                    <thead
                      style={{ backgroundColor: "#006EBB", color: "white" }}
                    >
                      <tr>
                        <th>S. No</th>
                        <th scope="col"> Date</th>
                        <th scope="col"> Name</th>
                        <th scope="col">Year</th>
                        <th scope="col">State</th>
                        <th scope="col">Department</th>
                      </tr>
                    </thead>
                  )}

                  {loader === true &&
                  currentRecords !== null &&
                  currentRecords !== undefined ? (
                    <tbody>
                      <tr>
                        <td colSpan="10">
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
                  ) : currentRecords !== null &&
                    currentRecords !== undefined &&
                    currentRecords.length > 0 ? (
                    currentRecords.map((item, i) => {
                      return (
                        <tbody key={i + 1}>
                          <tr>
                            <td>{i + 1 + indexOfFirstRecord}</td>
                            <td>{item.holidayDate}</td>
                            <td>{item.holidayName}</td>
                            <td>{item.year}</td>
                            <td>{item.state}</td>
                            <td>{item.department}</td>
                          </tr>
                        </tbody>
                      );
                    })
                  ) : (
                    <tbody>
                      <tr>
                        <td colspan="6">No Record Found</td>
                      </tr>
                    </tbody>
                  )}
                </table>
                {/*  {(holidayDataList === null) ?
                  <p style={{ textAlign: "center" }}>No Record Found</p> : null}

                {currentRecords !== undefined && holidayDataList !== null && currentRecords.length === 0 ?

                  <div className="loader-box loader" style={{ width: "100% !important" }}>
                    <div className="loader">
                      <div className="line bg-primary"></div>
                      <div className="line bg-primary"></div>
                      <div className="line bg-primary"></div>
                      <div className="line bg-primary"></div>
                    </div>
                  </div>
                  :
                  null} */}
              </div>
            </div>
          </div>
        </div>
        {searchLeaveList !== null &&
          searchLeaveList !== undefined &&
          searchLeaveList.length > 10 && (
            <Pagination
              itemClass="page-item"
              linkClass="page-link"
              activePage={currentPage}
              itemsCountPerPage={recordPerPage}
              totalItemsCount={totalRecords}
              pageRangeDisplayed={pageRange}
              onChange={handlePageChange}
            />
          )}
      </div>
    </Fragment>
  );
};

export default HolidayList;
