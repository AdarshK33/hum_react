import React, { Fragment, useEffect, useContext, useState } from 'react';
import Breadcrumb from '../common/breadcrumb';
import Pagination from 'react-js-pagination'
import { MasterFilesContext } from "../../context/MasterFilesState";
import { DashboardContext } from "../../context/DashboardState";
import Select from 'react-select'
import { Button, Form, Row, } from "react-bootstrap";
import { toast } from "react-toastify";
import moment from "moment";
import DatePicker from "react-datepicker";
import "react-datepicker/dist/react-datepicker.css";

import {
  JsonToCsv
} from 'react-json-csv';




const MasterDailyQty = () => {

  const { dailyQty, viewDailyQty, uploadDailyQty, loader } = useContext(MasterFilesContext);
  const { cosCentreList, viewCostCentre } = useContext(DashboardContext);
  const [fileUpload, setFileUpload] = useState();
  const [date, setDate] = useState();
  const [costCenter, setCostCenter] = useState('');
  const [startDate, setStartDate] = useState('');
  /*-----------------Pagination------------------*/
  const [currentPage, setCurrentPage] = useState(1);
  const recordPerPage = 10;
  const totalRecords = dailyQty !== null && dailyQty !== undefined && dailyQty.length;
  const pageRange = 10;

  const indexOfLastRecord = currentPage * recordPerPage;
  const indexOfFirstRecord = indexOfLastRecord - recordPerPage;
  const currentRecords = dailyQty !== null && dailyQty !== undefined ?
    dailyQty.slice(indexOfFirstRecord, indexOfLastRecord) : [];

  console.log("PRODUCTVITY LIST " + dailyQty)

  const handlePageChange = pageNumber => {
    setCurrentPage(pageNumber);
  }
  /*-----------------Pagination------------------*/
  useEffect(() => {
    viewCostCentre()
  }, [])


  const changeHandler = (event) => {
    let fileObj = event.target.files[0];
    console.log("clicked", fileObj)
    setFileUpload(fileObj)
    // uploadDailyQty(fileObj)
    // setTimeout(()=>{
    //   window.location.reload()
    // }, 5000)
  }

  // const costCenterHandler = e => {
  //   // console.log(e.target.value);
  //   setCostCenter(e.target.value);
  // }

  const dateHandler = (d) => {
    // console.log(d);
    setDate(d);
  }

  const onSubmit = (e) => {
    e.preventDefault();
    const validate = validation()
    if (validate) {
      const mydate = moment(startDate, ["MMM Do YY"]).format("YYYY-MM-DD");
      viewDailyQty(costCenter, mydate);
    }
  }

  const validation = () => {
    let flag = true
    if (costCenter === '') {
      toast.error("Select Cost Center")
      flag = false;
      return;
    }
    return flag;
  }


  const costCenterHandler = (options) => {
    let data = options !== null ? options.value : ''
    setCostCenter(data)
  }

  const filename = 'DailyQuantitylist';
  let fields = {
    "Id": "S. No",
    "dqStoreId": "Store ID",
    "dqDate": "Date",
    "dqDay": "Day",
    "dqWeek": "Week",
    "dqMonth": "Month",
    "dqTo": "To",
    "dqQty": "Quantity"
  }

  let data = [];
  if (dailyQty !== undefined && dailyQty !== null) {
    for (let i = 0; i < dailyQty.length; i++) {
      console.log(dailyQty[i].holidayDate)
      data.push({
        Id: i + 1,
        dqStoreId: dailyQty[i].dqStoreId,
        dqDate: dailyQty[i].dqDate,
        dqDay: dailyQty[i].dqDay,
        dqWeek: dailyQty[i].dqWeek,
        dqMonth: dailyQty[i].dqMonth,
        dqTo: dailyQty[i].dqTo,
        dqQty: dailyQty[i].dqQty
      })
    }
  }


  const handleUpload = () => {
    if (fileUpload !== undefined && fileUpload !== null) {
      uploadDailyQty(fileUpload)
    } else {
      toast.info("Please select a file to upload")
    }

    setTimeout(() => {
      window.location.reload()
    }, 5000)
  }

  return (
    <Fragment>
      <Breadcrumb title="Daily Quantity" parent="Daily Quantity" />
      <div className="container-fluid">
        <Form
          onSubmit={onSubmit}
        >
          <Row>
            <div className="col-sm-4">
              <Form.Group>
                <Form.Label>Select Date</Form.Label><span style={{ color: 'red' }}>*</span>
                <br />
                {/* <input
                  type="date"
                  style={{ fontSize: "0.8rem" }}
                  className="form-control digit"
                  placeholder="Enter Date"
                  required
                  onChange={(e) => dateHandler(e.target.value)}
                  value={date}
                /> */}
                <div className="salary-date">
                  <DatePicker
                    selected={startDate}
                    placeholderText=" Enter Date "
                    className="form-control salary-view"
                    onChange={date => setStartDate(date)} />
                </div>
              </Form.Group>
            </div>
            <div className="col-sm-4">
              <Form.Group>
                <Form.Label>Cost Center</Form.Label><span style={{ color: 'red' }}>*</span>
                {/* <Form.Control as="select"
                  required
                  value={costCenter}
                  onChange={(e) => costCenterHandler(e)}
                >
                  <option value="">Select</option>
                  {cosCentreList.map((e, i) => {
                    return (
                      <option key={i + 1} value={e.costCentreName}>{e.costCentreName}</option>)
                  })}

                </Form.Control> */}
                <Select
                  name="filters"
                  placeholder="Cost Center"
                  //value={costCenter1}
                  style={{ fontSize: "0.9rem", height: "0px" }}
                  options={cosCentreList !== null && cosCentreList !== undefined ?
                    cosCentreList.map(e => ({ label: e.costCentreName, value: e.costCentreName })) : []}
                  onChange={costCenterHandler}
                  required isSearchable />
              </Form.Group>
            </div>
          </Row>

          <Button
            type="submit"
            className="submitButton"
          // style={{paddingBottom:"10px"}}            
          >
            Submit</Button>


        </Form>
        <div className="row">
          <div className="col-sm-12">
            <br />
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
                    />
                    // : 
                    // <JsonToExcel
                    //   data=""
                    //   className="btn btn-light mr-2"
                    //   filename={filename}
                    //   fields={fields}

                    //   text="Export excel"
                    // />
                  }
                  {/* <ReactHTMLTableToExcel
                      className="btn btn-light mr-2"
                      table="table-to-xls"
                      filename="dailyQtyList"
                      sheet="Sheet"
                      buttonText="Export excel" /> */}
                </div>
              }


              <div className="table-responsive">
                <table id="table-to-xls" className="table table-hover">
                  <thead className="thead-light" style={{ backgroundColor: "#2f3c4e" }}>
                    <tr>
                      <th>S. No</th>
                      <th scope="col"> Store ID</th>
                      <th scope="col">  Date</th>
                      <th scope="col">  Day </th>
                      <th scope="col"> Week </th>
                      <th scope="col"> Month </th>
                      <th scope="col"> To </th>
                      <th scope="col"> Quantity </th>
                    </tr>
                  </thead>

                  {loader === true && currentRecords !== null && currentRecords !== undefined &&
                    currentRecords.length === 0 ?
                    <div className="loader-box loader" style={{ width: "100% !important", marginLeft: "300px" }}>
                      <div className="loader">
                        <div className="line bg-primary"></div>
                        <div className="line bg-primary"></div>
                        <div className="line bg-primary"></div>
                        <div className="line bg-primary"></div>
                      </div>
                    </div> :
                    currentRecords !== null && currentRecords !== undefined && currentRecords.length > 0 ?
                      currentRecords.map((item, i) => {
                        return (
                          <tbody key={i + 1}>
                            <tr>
                              <td>{i + 1}</td>
                              <td>{item.dqStoreId}</td>
                              <td>{item.dqDate}</td>
                              <td>{item.dqDay}</td>
                              <td>{item.dqWeek}</td>
                              <td>{item.dqMonth}</td>
                              <td>{item.dqTo}</td>
                              <td>{item.dqQty}</td>
                            </tr>
                          </tbody>
                        )
                      }) : <tbody>
                        <tr>
                          <td colspan='10'>No Record Found</td>
                        </tr>
                      </tbody>}

                </table>




              </div>

            </div>
          </div>
        </div>

      </div>
      {dailyQty !== null && dailyQty !== undefined && dailyQty.length > 10 &&
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
    </Fragment>
  );

};

export default MasterDailyQty;