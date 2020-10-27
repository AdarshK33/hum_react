import React, { Fragment, useEffect, useContext, useState } from 'react';
import Breadcrumb from '../common/breadcrumb';
import { LeaveContext } from '../../context/LeaveState';
import ReactHTMLTableToExcel from 'react-html-table-to-excel';
import '../Leaves/Leaves.css'
import { Button } from 'react-bootstrap';
import '../AdminLeave/AdminLeaves.css'
import { toast } from "react-toastify";
import Pagination from 'react-js-pagination'
import {
  JsonToExcel
} from 'react-json-excel';

const MasterCity = () => {

  const { getCity, cityList, uploadMasterFile } = useContext(LeaveContext)
  const [fileUpload, setFileUpload] = useState();
  /*-----------------Pagination------------------*/
  const [currentPage, setCurrentPage] = useState(1);
  const recordPerPage = 10;
  const totalRecords = cityList !== null && cityList.length;
  const pageRange = 10;

  const indexOfLastRecord = currentPage * recordPerPage;
  const indexOfFirstRecord = indexOfLastRecord - recordPerPage;
  const currentRecords = cityList !== null ? cityList.slice(indexOfFirstRecord, indexOfLastRecord) : [];

  const handlePageChange = pageNumber => {
    setCurrentPage(pageNumber);
  }
  /*-----------------Pagination------------------*/

  useEffect(() => {
    getCity()
  }, [])

  const changeHandler = (event) => {
    let fileObj = event.target.files[0];
    console.log("clicked", fileObj)
    setFileUpload(fileObj)

  }
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
  for (let i = 0; i < cityList.length; i++) {
    console.log(cityList[i].holidayDate)
    data.push({
      holidayId: i + 1,
      cityName: cityList[i].cityName,
      stateId: cityList[i].stateId,

    })
  }

  const handleUpload = () => {
    if (fileUpload !== undefined && fileUpload !== null) {
      uploadMasterFile(fileUpload)
    } else {
      toast.info("Please select a file to upload")
    }

    setTimeout(() => {
      window.location.reload()
    }, 5000)
  }



  return (
    <Fragment>
      <Breadcrumb title="Master" parent="City Master" />
      <div className="container-fluid">
        <div className="row">
          <div className="col-sm-12">
            <div className="card" style={{ overflowX: "auto" }}>

              <div className="title_bar" >
                <input
                  className="btn"
                  type="file"
                  accept=".xlsx, .xls, .csv"
                  onChange={(e) => changeHandler(e)}
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
              </div>


              <div className="table-responsive">
                <table id="table-to-xls" className="table table-hover">
                  <thead className="thead-light" style={{ backgroundColor: "#2f3c4e" }}>
                    <tr>
                      <th>S. No</th>
                      <th scope="col">City Name</th>
                      <th scope="col">State Id</th>
                    </tr>
                  </thead>

                  {currentRecords !== null && /* currentRecords !== undefined && */ currentRecords.length > 0 &&
                    currentRecords.map((item, i) => {
                      return (
                        <tbody key={i + 1}>
                          <tr>
                            <td>{i + 1 + indexOfFirstRecord}</td>
                            <td>{item.cityName}</td>
                            <td>{item.stateId}</td>
                          </tr>
                        </tbody>
                      )
                    })}

                </table>

              </div>

            </div>
          </div>
        </div>
        {cityList !== null && cityList.length > 10 &&
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

export default MasterCity;