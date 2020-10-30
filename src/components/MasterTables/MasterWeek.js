import React, { Fragment, useEffect, useContext, useState } from 'react';
import Breadcrumb from '../common/breadcrumb';
import ReactHTMLTableToExcel from 'react-html-table-to-excel';
import Pagination from 'react-js-pagination'
import { AppContext } from "../../context/AppState";
import { RosterContext } from "../../context/RosterState";
import { MasterFilesContext } from "../../context/MasterFilesState";
import {
  JsonToExcel
} from 'react-json-excel';
import { toast } from "react-toastify";
import { Button } from 'react-bootstrap';

const MasterWeek = () => {

  const [fileUpload, setFileUpload] = useState();

  const { getallWeeks, weeksInYear, uploadWeeks } = useContext(RosterContext);

  useEffect(() => {
    getallWeeks()
  }, [])


  const changeHandler = (event) => {
    let fileObj = event.target.files[0];
    console.log("clicked", fileObj)
    setFileUpload(fileObj)
  }

  //File export 
  const filename = 'weeklist';
  let fields = {
    "weekId": "S. No",
    "weekName": "Week Name",
    "startDate": "Start Date",
    "endDate": "End Date",
    "year": "Year"
  }

  let data = [];
  for (let i = 0; i < weeksInYear.length; i++) {
    if (weeksInYear !== null) {
      data.push({
        weekId: i + 1,
        weekName: weeksInYear[i].weekName,
        startDate: weeksInYear[i].startDate,
        endDate: weeksInYear[i].endDate,
        year: weeksInYear[i].year
      })
    }
  }

  const handleUpload = () => {
    if (fileUpload !== undefined && fileUpload !== null) {
      uploadWeeks(fileUpload)
    } else {
      toast.info("Please select a file to upload")
    }

    setTimeout(() => {
      window.location.reload()
    }, 5000)
  }

  return (
    <Fragment>
      <Breadcrumb title="Master" parent="Week Master" />
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
                    onChange={(e) => {
                      getallWeeks()
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
                  {/* <input
                      className="btn"
                      type="file"
                      accept=".xlsx, .xls, .csv"
                      onChange={(e) => changeHandler(e)}
                      style={{ padding: "10px" }}
                    />
                    <ReactHTMLTableToExcel
                      className="btn btn-light mr-2"
                      table="table-to-xls"
                      filename="weeklist"
                      sheet="Sheet"
                      buttonText="Export excel" /> */}
                </div>
              }


              <div className="table-responsive">
                <table id="table-to-xls" className="table table-hover">
                  <thead className="thead-light" style={{ backgroundColor: "#2f3c4e" }}>
                    <tr>
                      <th>S. No</th>
                      <th scope="col"> Week Name</th>
                      <th scope="col"> Start Date</th>
                      <th scope="col"> End Date </th>
                      <th scope="col"> Year </th>
                    </tr>
                  </thead>

                  {weeksInYear !== null && weeksInYear !== undefined && weeksInYear.length > 0 &&
                    weeksInYear.map((item, i) => {
                      return (
                        <tbody key={i + 1}>
                          <tr>
                            <td>{i + 1}</td>
                            <td>{item.weekName}</td>
                            <td>{item.startDate}</td>
                            <td>{item.endDate}</td>
                            <td>{item.year}</td>
                          </tr>
                        </tbody>
                      )
                    })}


                </table>

              </div>

            </div>
          </div>
        </div>

      </div>
    </Fragment>
  );

};

export default MasterWeek;