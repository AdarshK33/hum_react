import React, { Fragment, useEffect, useContext, useState } from 'react';
import { Form, Container, Row, Button } from 'react-bootstrap'
import DatePicker from 'react-datepicker'
import "react-datepicker/dist/react-datepicker.css";
import Breadcrumb from '../common/breadcrumb';
import { LeaveContext } from '../../context/LeaveState'
import ManagerReportView from './ManagerReportView'
import moment from 'moment'
import Select from 'react-select';
import { AppContext } from "../../context/AppState";
/* import {subYears} from 'date-fns/subYears' */

const ManagerReportForm = () => {
    const [startDate, setStartDate] = useState();
    const [endDate, setEndDate] = useState()
    const [startYear, setStartYear] = useState()
    const [leave, setLeave] = useState('')
    const [employeeId, setEmployeeID] = useState()
    const [reportType, setReportType] = useState('')
    const { user } = useContext(AppContext);

    const reportTypeList = [{reportTypeData:'Monthly', id:1}, {reportTypeData:'Yearly', id:2}]
    const { getLeaveReport, leaveTypeReport, reportLeave, reportList, employeeType, employeeList } = useContext(LeaveContext);

    useEffect(() => {
        employeeType()
    }, [user.employeeId]);

    useEffect(() => {
        getLeaveReport()
    },[])

    const fromDateHandler = (date) => {
        let value = date
        console.log("fromDate", value)
        setStartDate(value);
    }

    const toDateHandler = (date) => {
        let value1 = date
        console.log("toDate", value1)
        setEndDate(value1);
    }

    /*  const setStartYearHandler = (date) => {
         let value2 = date
         setStartYear(value2);
         console.log("year", value2)
     } */

    const setLeaveHandler = (options) => {
        setLeave(options)
    }

    const employeeChangeHandler = (options) => {
        setEmployeeID(options)
    }

    const submitData = (e) => {
        e.preventDefault();

        const monthReportData = {
            employeeIds: employeeId.map((e,i) => employeeId[i].value),
            fromDate: moment(startDate).format("YYYY-MM-DD"),
            leaveTypeIds: leave.map((e,i) => leave[i].value),
            toDate: moment(endDate).format("YYYY-MM-DD"),
            year: 'string'
        }
        const yearReportData = {
            employeeIds: employeeId.map((e,i) => employeeId[i].value),
            fromDate: 'string',
            leaveTypeIds: leave.map((e,i) => leave[i].value),
            toDate: 'string',
            year: moment(startYear).format("YYYY")
        }
        if(reportType === 'Monthly'){
            reportLeave(monthReportData)
        }
        if(reportType === 'Yearly'){
            reportLeave(yearReportData)
        }
        setReportType('')
        setEmployeeID([])
        setStartDate()
        setEndDate()
        setStartYear()
        setLeave([])

    }
    return (
        <Fragment>
            <Breadcrumb title="Report" parent="Manager Leave Report" />
            <Container>
                <Form onSubmit={submitData}>
                    <Row>
                        <div className="col-sm-4">
                            <Form.Group>
                                <Form.Label>Type of report</Form.Label>
                                <Form.Control as="select" onChange={(e) => setReportType(e.target.value)}
                                value={reportType} >
                                    <option value="">Select Report Type</option>
                                    {reportTypeList.map((item,i) => {
                                        return(
                                            <option key={item.id} value={item.reportTypeData}>{item.reportTypeData}</option>
                                        )
                                    })}
                                </Form.Control>
                            </Form.Group>
                        </div>
                    </Row>
                    <Row>
                        <div className="col-sm-4">
                            <Form.Group>
                                <Form.Label>Employee ID</Form.Label>
                                <Select
                                name="filters"
                                placeholder="Select Employee Id"
                                value={employeeId} 
                                style={{fontSize:"0.8rem"}}
                                options={employeeList.map(e => ({label: e, value: e}))}
                                onChange={employeeChangeHandler}
                                isMulti />
                            </Form.Group>
                        </div>
                        <div className="col-sm-4">
                            <Form.Group>
                                <Form.Label>Leave Category</Form.Label>
                                <Select
                                name="filters"
                                placeholder="Select Leave Type"
                                value={leave} 
                                style={{fontSize:"0.8rem"}}
                                options={leaveTypeReport !== undefined && leaveTypeReport.map(e => ({label: e.leaveName , value: e.leaveTypeId}))}
                                onChange={setLeaveHandler}
                                isMulti />
                            </Form.Group>
                        </div>
                    </Row>
                    {reportType === 'Monthly' &&
                    <Row>
                        <div className="col-sm-4">
                            <Form.Group>
                                <Form.Label>From Date</Form.Label>
                                <div>
                                    <DatePicker selected={startDate} onChange={(e) => fromDateHandler(e)}
                                        className="form-control" dateFormat="yyyy-MM-dd"
                                        /*  minDate={currentYear} */
                                        placeholderText="From Date" required />
                                </div>
                            </Form.Group>
                        </div>
                        <div className="col-sm-4">
                            <Form.Group>
                                <Form.Label>To Date</Form.Label>
                                <div>
                                    <DatePicker selected={endDate} onChange={(e) => toDateHandler(e)}
                                        className="form-control" dateFormat="yyyy-MM-dd"
                                        minDate={startDate}
                                        placeholderText="To Date" />
                                </div>

                            </Form.Group>
                        </div>
                    </Row>
                    }
                    {reportType === 'Yearly' &&
                    <Row>
                        <div className="col-sm-4">
                            <Form.Group>
                                <Form.Label>Select Year</Form.Label>
                                <div>
                                    <DatePicker selected={startYear} onChange={date => setStartYear(date)}
                                        showYearPicker
                                        maxDate={new Date()}
                                       /*  minDate={subYears(new Date(), 2)} */
                                        className="input_date" dateFormat="yyyy" /* yearItemNumber={5} */
                                    placeholderText="Select Year" />
                                </div>

                            </Form.Group>
                        </div>
                    </Row>
                    }
                    <Button type="submit">Submit</Button>
                </Form>
            </Container>
            <ManagerReportView ManagerReportList={reportList} />
        </Fragment >
    );
};

export default ManagerReportForm;