import React, { Fragment, useEffect, useContext, useState } from 'react';
import Breadcrumb from '../common/breadcrumb';
import Pagination from 'react-js-pagination'
import { toast } from "react-toastify";
import { MasterFilesContext } from "../../context/MasterFilesState";
import {
  JsonToCsv
} from 'react-json-csv';
import { Button } from 'react-bootstrap';


const MasterState = () => {


  const { viewStates, stateList, uploadStateFile } = useContext(MasterFilesContext);
  const [fileUpload, setFileUpload] = useState();

  const [currentPage, setCurrentPage] = useState(1);
  const recordPerPage = 10;
  let totalRecords = 0;
  let indexOfFirstRecord = 0;
  let indexOfLastRecord = 0;
  const pageRange = 10;
  let currentRecords = [];

  if (stateList !== null) {
    totalRecords = stateList.length;
    indexOfLastRecord = currentPage * recordPerPage;
    indexOfFirstRecord = indexOfLastRecord - recordPerPage;
    currentRecords = stateList.slice(indexOfFirstRecord, indexOfLastRecord);
  }

  const handlePageChange = pageNumber => {
    setCurrentPage(pageNumber);
  }

  useEffect(() => {
    viewStates()

  }, [])


  const changeHandler = (event) => {
    let fileObj = event.target.files[0];
    console.log("clicked", fileObj)
    setFileUpload(fileObj)
  }

  const filename = 'masterStateList';
  let fields = {
    "stateId": "S. No",
    "stateName": "State Name",
    "stateCode": "State Code",
  }

  let data = [];
  for (let i = 0; i < stateList.length; i++) {

    data.push({
      stateId: i + 1,
      stateName: stateList[i].stateName,
      stateCode: stateList[i].stateCode
    })
  }

  const handleUpload = () => {
    if (fileUpload !== undefined && fileUpload !== null) {
      uploadStateFile(fileUpload)
    } else {
      toast.info("Please select a file to upload")
    }

    setTimeout(() => {
      window.location.reload()
    }, 5000)
  }

  return (
    <Fragment>
      <Breadcrumb title="Master" parent="State Master" />
      <div className="container-fluid">
        <div className="row">
          <div className="col-sm-12">
            <div className="card" style={{ overflowX: "auto" }}>
              {
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
                    <JsonToCsv
                      data={data}
                      style={{padding: "2px",border:"none"}}
                      filename={filename}
                      fields={fields}

                      text="Export excel"
                    />}

                </div>
              }


              <div className="table-responsive">
                <table id="table-to-xls" className="table table-hover">
                  <thead className="thead-light" style={{ backgroundColor: "#2f3c4e" }}>
                    <tr>
                      <th>S. No</th>
                      <th scope="col"> State Name</th>
                      <th scope="col"> State Code</th>
                    </tr>
                  </thead>

                  {currentRecords !== null && currentRecords !== undefined && currentRecords.length > 0 &&
                    currentRecords.map((item, i) => {
                      return (
                        <tbody key={i + 1}>
                          <tr>
                            <td>{i + 1 + indexOfFirstRecord}</td>
                            <td>{item.stateName}</td>
                            <td>{item.stateCode}</td>


                          </tr>
                        </tbody>
                      )
                    })

                  }

                </table>

                {(stateList === null) ?
                  <p style={{ textAlign: "center" }}>No Record Found</p> : null}

                {stateList !== undefined && stateList !== null && stateList.length === 0 ?

                  <div className="loader-box loader" style={{ width: "100% !important" }}>
                    <div className="loader">
                      <div className="line bg-primary"></div>
                      <div className="line bg-primary"></div>
                      <div className="line bg-primary"></div>
                      <div className="line bg-primary"></div>
                    </div>
                  </div>
                  :
                  null}

              </div>
              <div>
                {stateList !== null && stateList.length > 10 &&
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

            </div>
          </div>
        </div>

      </div>
    </Fragment>
  );

};

export default MasterState;