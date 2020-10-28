import React, { Fragment, useEffect, useContext, useState } from 'react';
import Breadcrumb from '../common/breadcrumb';
import { LeaveContext } from '../../context/LeaveState';
import { Button } from 'react-bootstrap';
import '../Leaves/Leaves.css'
import '../AdminLeave/AdminLeaves.css'
import { toast } from "react-toastify";
import Pagination from 'react-js-pagination'
import { AppContext } from "../../context/AppState";
import {
  JsonToExcel
} from 'react-json-excel';

const HolidayList = () => {

  const { getHoliday, holidayDataList, uploadFile } = useContext(LeaveContext);
  const { user } = useContext(AppContext);
  const [fileUpload, setFileUpload] = useState();

  /*-----------------Pagination------------------*/
  const [currentPage, setCurrentPage] = useState(1);
  const recordPerPage = 10;
  const totalRecords = holidayDataList !== null && holidayDataList.length;
  const pageRange = 10;

  const indexOfLastRecord = currentPage * recordPerPage;
  const indexOfFirstRecord = indexOfLastRecord - recordPerPage;
  const currentRecords = holidayDataList !== null ? holidayDataList.slice(indexOfFirstRecord, indexOfLastRecord) : [];

  const handlePageChange = pageNumber => {
    setCurrentPage(pageNumber);
  }
  /*-----------------Pagination------------------*/

  useEffect(() => {
    getHoliday()
  }, [])

  console.log("holiday", holidayDataList)
  const changeHandler = (event) => {
    let fileObj = event.target.files[0];
    console.log("clicked", fileObj)
    setFileUpload(fileObj)
    // uploadFile(fileObj)
    // setTimeout(()=>{
    //   window.location.reload()
    // }, 5000)

  }

  //File export 
  const filename = 'holidaylist';
  let fields = {
    "holidayId": "S. No",
    "holidayDate": "Date",
    "holidayName": "Name",
    "year": "Year",
    "state": "State",
    "department": "Department"
  }

  let data = [];
  for (let i = 0; i < holidayDataList.length; i++) {
    console.log(holidayDataList[i].holidayDate)
    data.push({
      holidayId: i + 1,
      holidayDate: holidayDataList[i].holidayDate,
      holidayName: holidayDataList[i].holidayName,
      year: holidayDataList[i].year,
      state: holidayDataList[i].state,
      department: holidayDataList[i].department
    })
  }

  const handleUpload = () => {
    if (fileUpload !== undefined && fileUpload !== null) {
      uploadFile(fileUpload)
    } else {
      toast.info("Please select a file to upload")
    }

    setTimeout(() => {
      window.location.reload()
    }, 5000)
  }

  return (
    <Fragment>
      <Breadcrumb title="Holiday List" parent="Holiday List" />
      <div className="container-fluid">
        <div className="row">
          <div className="col-sm-12">
            <div className="card" style={{ overflowX: "auto" }}>
              {
                (user.loginType === "1" || user.additionalRole === "1") ?
                  <div className="title_bar" >
                    <input
                      className="btn"
                      type="file"
                      accept=".xlsx, .xls, .csv"
                      onChange={(e) => {
                        getHoliday()
                        changeHandler(e)
                      }}
                      style={{ padding: "10px" }}
                    />
                    <Button className="btn btn-light mr-2" onClick={handleUpload}>Upload File</Button>
                    {data.length > 0 &&
                      <JsonToExcel
                        data={data}
                        className="btn btn-light mr-2"
                        filename={filename}
                        fields={fields}

                        text="Export excel"
                      />}

                    {/* <ReactHTMLTableToExcel
                      className="btn btn-light mr-2"
                      table="table-to-xls"
                      filename="holidaylist"
                      sheet="Sheet"
                      buttonText="Export excel" /> */}
                  </div>
                  : <div className="title_bar" >

                  </div>
              }


              <div className="table-responsive">
                <table id="table-to-xls" className="table table-hover">
                  <thead className="thead-light" style={{ backgroundColor: "#2f3c4e" }}>
                    <tr>
                      <th>S. No</th>
                      <th scope="col"> Date</th>
                      <th scope="col"> Name</th>
                      <th scope="col">Year</th>
                      <th scope="col">State</th>
                      <th scope="col">Department</th>
                    </tr>
                  </thead>

                  {currentRecords !== null && currentRecords !== undefined && currentRecords.length > 0 &&
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
                      )
                    })}

                </table>

              </div>

            </div>
          </div>
        </div>
        {holidayDataList !== null && holidayDataList.length > 10 &&
          <Pagination
            itemClass="page-item"
            linkClass="page-link"
            activePage={currentPage}
            itemsCountPerPage={recordPerPage}
            totalItemsCount={totalRecords}
            pageRangeDisplayed={pageRange}
            onChange={handlePageChange}
          />
        }

      </div>
    </Fragment>
  );

};

export default HolidayList;