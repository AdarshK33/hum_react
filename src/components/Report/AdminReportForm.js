import React, { Fragment, useEffect, useContext, useState } from 'react';
import { Form, Container, Row, Button } from 'react-bootstrap'
import Breadcrumb from '../common/breadcrumb';
import { LeaveContext } from '../../context/LeaveState'
import DatePicker from 'react-datepicker'
import "react-datepicker/dist/react-datepicker.css";
import moment from 'moment'
import { AdminContext } from '../../context/AdminState'
import AdminReportView from './AdminReportView'
import Select from 'react-select';

const AdminReportForm = () => {
    const [reportType, setReportType] = useState('')
    const [startDate, setStartDate] = useState();
    const [endDate, setEndDate] = useState()
    const [startYear, setStartYear] = useState()
    const [leave, setLeave] = useState([])
    const [costCenter, setCostCenter] = useState()
    const [employeeCostCenter, setEmployeeCostCenter] = useState([])
    
    const reportTypeList = [{reportTypeData:'Monthly', id:1}, {reportTypeData:'Yearly', id:2}]

    const { getLeave, leaveType, reportLeave, reportList} = useContext(LeaveContext);
    const {CostCenter,costCenterList, employeeIdData, employeeIdList } = useContext(AdminContext)

    useEffect(() => {
        getLeave()
        CostCenter()
    }, []);

   /*  useEffect(() => {
        employeeIdData(costCenter)
    },[costCenter]) */

    const setCostCenterHandler = (e) => {
        let data1 = e.target.value
       setCostCenter(data1)
       employeeIdData(data1)
       console.log("data1", data1)
    }
    const setEmployeeCostCenterHandler = (options) => {
        setEmployeeCostCenter(options)
        console.log("options", options)
    }
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

    const setLeaveHandler = (options) => {
        setLeave(options)
    }

    const submitData = (e) => {
        e.preventDefault();

        const monthReportData = {
            employeeIds: employeeCostCenter.map((e,i) => employeeCostCenter[i].value),
            fromDate: moment(startDate).format("YYYY-MM-DD"),
            leaveTypeIds: leave.map((e,i) => leave[i].value),
            toDate: moment(endDate).format("YYYY-MM-DD"),
            year: 'string'
        }
        const yearReportData = {
            employeeIds: employeeCostCenter.map((e,i) => employeeCostCenter[i].value),
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
        setCostCenter('')
        setEmployeeCostCenter([])
        setStartDate()
        setEndDate()
        setStartYear()
        setLeave([])

    }
    return (
        <Fragment>
            <Breadcrumb title="Report" parent="Admin Leave Report" />
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
                        <div className="col-sm-4">
                            <Form.Group>
                                <Form.Label>Cost Center</Form.Label>
                                <Form.Control as="select" required value={costCenter}
                                 onChange={(e) => setCostCenterHandler(e)}>
                                    <option>Select Cost Center</option>
                                    {costCenterList.length > 0 && costCenterList.map((item, i) => {
                                            return (
                                                <option key={item.costCenterId} value={item.costCentreName}>
                                                {item.costCentreName}</option>
                                            )
                                        })
                                        }
                                </Form.Control>
                            </Form.Group>
                        </div>
                    </Row>
                    <Row>
                        <div className="col-sm-4">
                            <Form.Group>
                                <Form.Label>Employee Id</Form.Label>
                                <Select
                                name="filters"
                                placeholder="Select Employee Id"
                                value={employeeCostCenter} 
                                style={{fontSize:"0.8rem"}}
                                options={employeeIdList.map(e => ({label: e.firstName + " - " + e.employeeId, value: e.employeeId}))}
                                onChange={setEmployeeCostCenterHandler}
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
                                options={leaveType.map(e => ({label: e.leaveName , value: e.leaveTypeId}))}
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
            <AdminReportView AdminReportList={reportList} />
        </Fragment>
    );
};

export default AdminReportForm;