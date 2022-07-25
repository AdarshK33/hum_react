import React, { Fragment, useState, useContext, useEffect } from 'react';
import Breadcrumb from '../common/breadcrumb';
import Pagination from 'react-js-pagination'
import Select from 'react-select'
import { PermissionContext } from '../../context/PermissionState'
import { Button, Form, Row } from "react-bootstrap";
import DatePicker from "react-datepicker";
import "react-datepicker/dist/react-datepicker.css";
import {
    JsonToCsv
} from 'react-json-csv';
import { toast } from "react-toastify";
import { DashboardContext } from "../../context/DashboardState";
import moment from "moment";

const MasterMonthlyQuantity = () => {
    const { cosCentreList, viewCostCentre } = useContext(DashboardContext);
    const { monthlyQtyDetails, monthlyQtyDetailsList, uploadMonthFile, loader } = useContext(PermissionContext)
    const [fileUpload, setFileUpload] = useState();
    const [month, setMonth] = useState();
    const [year, setYear] = useState();
    const [costCenter, setCostCenter] = useState('');
    const [startDate, setStartDate] = useState('');

    useEffect(() => {
        viewCostCentre()

    }, [])
    var monthsNumber = new Array();
    monthsNumber["1"] = "Jan";
    monthsNumber["2"] = "Feb";
    monthsNumber["3"] = "Mar";
    monthsNumber["4"] = "Apr";
    monthsNumber["5"] = "May";
    monthsNumber["6"] = "Jun";
    monthsNumber["7"] = "Jul";
    monthsNumber["8"] = "Aug";
    monthsNumber["9"] = "Sep";
    monthsNumber["10"] = "Oct";
    monthsNumber["11"] = "Nov";
    monthsNumber["12"] = "Dec";


    const [currentPage, setCurrentPage] = useState(1);
    const recordPerPage = 10;
    let totalRecords = 0;
    let indexOfFirstRecord = 0;
    let indexOfLastRecord = 0;
    const pageRange = 10;
    let currentRecords = [];

    if (monthlyQtyDetailsList !== null) {
        totalRecords = monthlyQtyDetailsList.length;
        indexOfLastRecord = currentPage * recordPerPage;
        indexOfFirstRecord = indexOfLastRecord - recordPerPage;
        currentRecords = monthlyQtyDetailsList.slice(indexOfFirstRecord, indexOfLastRecord);
    }
    console.log(JSON.stringify(monthlyQtyDetailsList));
    console.log(monthlyQtyDetailsList.length);

    const handlePageChange = pageNumber => {
        setCurrentPage(pageNumber);
    }



    // const dateHandler = (d) => {
    //     setDate(d);
    //     // setMonth(monthsNumber[moment(date, ["YYYY-MM"]).format("M")]);
    //     // setYear(moment(date, ["MMM Do YY"]).format("YYYY"));     
    // }

    const onSubmit = (e) => {
        e.preventDefault();
        const validate = validation()

        const mon = moment(startDate, ["YYYY-MM"]).format("MMM");
        const y = moment(startDate, ["MMM Do YY"]).format("YYYY");
        if (validate) {
            monthlyQtyDetails(costCenter, mon, y);
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








    const filename = 'MonthlyQuantitylist';
    let fields = {
        "Id": "S. No",
        "storeId": "Store ID",
        "store": "Store",
        "year": "Year",
        "month": "Month",
        "hour": "Hour",
        "turnover": "Turnover",
        "quantity": "Quantity"
    }

    let data = [];
    if (monthlyQtyDetailsList !== undefined && monthlyQtyDetailsList !== null) {
        for (let i = 0; i < monthlyQtyDetailsList.length; i++) {
            //console.log(monthlyQtyDetailsList[i].holidayDate)
            data.push({
                Id: i + 1,
                storeId: monthlyQtyDetailsList[i].storeId,
                store: monthlyQtyDetailsList[i].store,
                year: monthlyQtyDetailsList[i].year,
                month: monthlyQtyDetailsList[i].month,
                hour: monthlyQtyDetailsList[i].hour,
                turnover: monthlyQtyDetailsList[i].turnover,
                quantity: monthlyQtyDetailsList[i].quantity
            })
        }
    }
    const changeHandler = (event) => {
        let fileObj = event.target.files[0];
        console.log("clicked", fileObj)
        setFileUpload(fileObj)
        // uploadDailyQty(fileObj)
        // setTimeout(()=>{
        //   window.location.reload()
        // }, 5000)
    }

    const handleUpload = () => {
        if (fileUpload !== undefined && fileUpload !== null) {
            uploadMonthFile(fileUpload)
        } else {
            toast.info("Please select a file to upload")
        }

        setTimeout(() => {
            window.location.reload()
        }, 5000)
    }
    return (
        <Fragment>
            <Breadcrumb title="Monthly Quantity" parent="Monthly Quantity" />
            <div className="container-fluid">
                <Form
                    onSubmit={onSubmit}
                >
                    <Row>
                        <div className="col-sm-4">
                            <Form.Group>
                                <Form.Label>Select Month and Year</Form.Label><span style={{ color: 'red' }}>*</span>
                                {/* <input
                                    type="month"
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
                                        className="form-control salary-view"
                                        placeholderText="Select Month and Year"
                                        dateFormat="MM/yyyy"
                                        showMonthYearPicker
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
                <br />
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
                    style={{padding: " 6px 12px;",border:"none", lineHeight: "35px",marginRight: "5px",fontFamily:"Cairo"}}
                            
                            filename={filename}
                            fields={fields}

                            text="Export excel"
                        />
                        // : 
                        // <JsonToExcel
                        //     data=""
                        //     className="btn btn-light mr-2"
                        //     filename={filename}
                        //     fields={fields}

                        //     text="Export excel"
                        //   />
                    }

                </div>
                <div className="table-responsive">
                    <table id="table-to-xls" className="table table-hover">
                        <thead className="thead-light" style={{ backgroundColor: "#2f3c4e" }}>
                            <tr>
                                <th scope="col">S. No</th>
                                <th scope="col">Store ID</th>
                                <th scope="col">Store</th>
                                <th scope="col">Year</th>
                                <th scope="col">Month</th>

                                <th scope="col">Hour</th>
                                <th scope="col">Turnover</th>
                                <th scope="col">Quantity</th>

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
                            currentRecords !== null && currentRecords !== undefined
                                && currentRecords.length > 0 ?
                                currentRecords.map((item, i) => {
                                    return (
                                        <tbody key={i + 1}>
                                            <tr>
                                                <td>{i + 1 + indexOfFirstRecord}</td>
                                                <td>{item.storeId}</td>
                                                <td>{item.store}</td>
                                                <td>{item.year}</td>
                                                <td>{item.month}</td>
                                                <td>{item.hour}</td>
                                                <td>{item.turnover}</td>
                                                <td>{item.quantity}</td>
                                            </tr>
                                        </tbody>

                                    )
                                }) :
                                <tbody>
                                    <tr>
                                        <td colspan='10'>No Record Found</td>
                                    </tr>
                                </tbody>
                        }
                    </table>





                </div>
                <div>
                    {monthlyQtyDetailsList !== null && monthlyQtyDetailsList.length > 10 &&
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
        </Fragment >
    )
}

export default MasterMonthlyQuantity;
//http://humine.theretailinsights.co/monthly/view?&month=Jun&storeId=IN1059&year=2019