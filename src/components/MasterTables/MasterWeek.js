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
import { Button, Form } from 'react-bootstrap';
import DatePicker from 'react-datepicker';
import moment from "moment";


const MasterWeek = () => {

  const [fileUpload, setFileUpload] = useState();
  const [year, setYear] = useState();

  const { getMasterWeeks, masterWeeks, uploadWeeks } = useContext(RosterContext);

  useEffect(() => {
    // getMasterWeeks()
  }, [])

  const onSubmit = (e) => {
    e.preventDefault();
    const y1 = moment(year, ["MMM Do YY"]).format("YYYY");
    getMasterWeeks(y1)
  }


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

  if (masterWeeks !== null && masterWeeks !== undefined) {

    for (let i = 0; i < masterWeeks.length; i++) {

      data.push({
        weekId: i + 1,
        weekName: masterWeeks[i].weekName,
        startDate: masterWeeks[i].startDate,
        endDate: masterWeeks[i].endDate,
        year: masterWeeks[i].year
      })
    }
  }
  // console.log(masterWeeks);
  // console.log("=============", data)

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

            <Form onSubmit={onSubmit}>
              <Form.Group>
                <Form.Label>Select Year</Form.Label><span style={{ color: 'red' }}>*</span> <br />
                <DatePicker
                  selected={year}
                  onChange={y => {
                    console.log(moment(y, ["MMM Do YY"]).format("YYYY"));
                    setYear(y)
                  }}
                  showYearPicker
                  dateFormat="yyyy"
                />
              </Form.Group>

              <Button
                type="submit"
                className="submitButton"
              // style={{paddingBottom:"10px"}}            
              >
                Submit</Button>
            </Form>


            {/* <label>Select Year</label>
            <DatePicker
              selected={year}
              onChange={y => {                
                console.log(moment(y, ["MMM Do YY"]).format("YYYY"));
                setYear(y)}}
              showYearPicker
              dateFormat="yyyy"
            />
            <br /> */}
            <br />
            <div className="card" style={{ overflowX: "auto" }}>
              {
                <div className="title_bar" >

                  <input
                    className="btn"
                    type="file"
                    accept=".xlsx, .xls, .csv"
                    onChange={(e) => {
                      // getMasterWeeks()
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

                  {masterWeeks !== null && masterWeeks !== undefined && masterWeeks.length > 0 ?
                    masterWeeks.map((item, i) => {
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
                    })
                    :
                    <p style={{ textAlign: "center" }}>Select a year</p>}


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