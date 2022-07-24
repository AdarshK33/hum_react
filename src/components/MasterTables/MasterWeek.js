import React, { Fragment, useEffect, useContext, useState } from 'react';
import Breadcrumb from '../common/breadcrumb';
import Pagination from 'react-js-pagination'
import { RosterContext } from "../../context/RosterState";
import {
  JsonToCsv
} from 'react-json-csv';
import { toast } from "react-toastify";
import { Button, Form } from 'react-bootstrap';
import DatePicker from 'react-datepicker';
import moment from "moment";


const MasterWeek = () => {

  const [fileUpload, setFileUpload] = useState();
  const [year, setYear] = useState();
  const [data, setData] = useState([]);

  const today = new Date();

  useEffect(() => {
    setYear(today)
    getMasterWeeks(today)
  }, [])

  const { getMasterWeeks, masterWeeks, uploadWeeks } = useContext(RosterContext);

  const [currentPage, setCurrentPage] = useState(1);
  const recordPerPage = 10;
  let totalRecords = 0;
  let indexOfFirstRecord = 0;
  let indexOfLastRecord = 0;
  const pageRange = 10;
  let currentRecords = [];

  if (masterWeeks !== null) {
    totalRecords = masterWeeks.length;
    indexOfLastRecord = currentPage * recordPerPage;
    indexOfFirstRecord = indexOfLastRecord - recordPerPage;
    currentRecords = masterWeeks.slice(indexOfFirstRecord, indexOfLastRecord);
  }

  const handlePageChange = pageNumber => {
    setCurrentPage(pageNumber);
  }


  const ref = React.useRef(null);



  useEffect(() => {

    let d = [];
    setData([])
    if (masterWeeks !== null && masterWeeks !== undefined) {

      for (let i = 0; i < masterWeeks.length; i++) {

        d.push({
          weekId: i + 1,
          weekName: masterWeeks[i].weekName,
          startDate: masterWeeks[i].startDate,
          endDate: masterWeeks[i].endDate,
          year: masterWeeks[i].year
        })
      }
      setTimeout(() => {
        setData(d);
      }, 100)


    }
  }, [masterWeeks])

  const onSubmit = (e) => {
    e.preventDefault();
    const y1 = moment(year, ["MMM Do YY"]).format("YYYY");
    getMasterWeeks(y1)
  }


  const changeHandler = (event) => {
    let fileObj = event.target.files[0];
    console.log("clicked", event.target.value)
    setFileUpload(fileObj)

    // setTimeout(() => {
    //   event.target.value = null;
    // }, 5000)

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
                  className="form-control"
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
                    ref={ref}
                    onChange={(e) => {
                      // getMasterWeeks()
                      changeHandler(e)
                      // removeFileName(e)
                    }}
                    style={{ padding: "10px" }}
                  />
                  <Button className="btn btn-light mr-2" onClick={handleUpload}>Upload File</Button>

                  {data.length > 0 ?
                    <JsonToCsv
                      data={data}
                      style={{padding: "2px",border:"none"}}
                      filename={filename}
                      fields={fields}

                      text="Export excel"
                    /> :
                    <Button className="btn btn-light mr-2">Export Excel</Button>
                  }
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

                  {currentRecords !== null && currentRecords !== undefined && currentRecords.length > 0 &&
                    currentRecords.map((item, i) => {
                      return (
                        <tbody key={i + 1}>
                          <tr>
                            <td>{i + 1 + indexOfFirstRecord}</td>
                            <td>{item.weekName}</td>
                            <td>{item.startDate}</td>
                            <td>{item.endDate}</td>
                            <td>{item.year}</td>
                          </tr>
                        </tbody>
                      )
                    })
                  }
                </table>
                {(masterWeeks === null) ?
                  <p style={{ textAlign: "center" }}>No Record Found</p> : null}

                {masterWeeks !== undefined && masterWeeks !== null && masterWeeks.length === 0 ?

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
                {masterWeeks !== null && masterWeeks.length > 10 &&
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

export default MasterWeek;