import React, { Fragment, useEffect, useContext, useState } from 'react';
import { Form, Container, Row, Button } from 'react-bootstrap'
import Breadcrumb from '../common/breadcrumb';
import { AdminContext } from '../../context/AdminState'
import { ClusterContext } from '../../context/ClusterState'
import { RosterContext } from '../../context/RosterState'
import { LeaveContext } from '../../context/LeaveState'
import "react-datepicker/dist/react-datepicker.css";
import moment from 'moment'
import ProductivityReportManagerView from './ProductivityReportManagerView'
import { AppContext } from "../../context/AppState";

const ProductivityReportManager = () => {
    const [reportType, setReportType] = useState('')
    const [employeeCostCenter, setEmployeeCostCenter] = useState(null)
    const [sports, setSports] = useState(null)
    const [cluster, setCluster] = useState(null)
    const [contractTypeData, setContractType] = useState('')
    const [getM, setGetM] = useState('2020-09')
    /* const [startYear, setStartYear] = useState() */

    const reportTypeList = [{ reportTypeData: 'Monthly', id: 1 }, { reportTypeData: 'Yearly', id: 2 }]
    const {  employeeIdData, employeeIdList } = useContext(AdminContext)
    const { viewSports, sportsNames, clusterCostCenterList, viewClusterCostCenter } = useContext(ClusterContext)
    const { viewContractTypes, shiftContractNames } = useContext(RosterContext)
    const { productivityReport, productivityList } = useContext(LeaveContext)

    const { user } = useContext(AppContext);

    useEffect(() => {
        viewSports()
        viewContractTypes()
        
    }, []);
    
    const costCenter = user.costCenter
    useEffect(() => {
        employeeIdData(costCenter)
        viewClusterCostCenter(costCenter)
    }, [costCenter])

    const setEmployeeCostCenterHandler = (e) => {
        let data2 = e.target.value
        setEmployeeCostCenter(data2)
        console.log("data2", data2)
    }
    const setContractTypeHandler = (e) => {
        let data3 = e.target.value
        setContractType(data3)
        console.log("contract type", data3)

    }
    const setGetMHandler = (e) => {
        let data4 = e.target.value
        setGetM(data4)
        console.log("month data", data4)
    }
    const setClusterHandler = (e) => {
        setCluster(e.target.value)
        console.log("cluster Id",e.target.value)
    }
    const setSportsHandler = (e) => {
        setSports(e.target.value)
        console.log("sports Id",e.target.value)
    }
    const submitData = (e) => {
        e.preventDefault();

         const clusterId = cluster;
       const contractType = contractTypeData;
        const employeeId = employeeCostCenter; 
        const month = moment(getM, ["YYYY-MM"]).format("M");
        const sportId = sports;
        const storeId = costCenter;
        const year = moment(getM, ["MMM Do YY"]).format('YYYY');
        console.log("productivity data", month, storeId, year )
        productivityReport(clusterId, contractType, employeeId, month ,sportId,storeId, year )

        setReportType('')
        setEmployeeCostCenter('')
        setSports('')
        setCluster('')
        setContractType('')
        setGetM('2020-09')

    }
    return (
        <Fragment>
            <Breadcrumb title="Report" parent="Productivity Manager Report" />
            <Container>
                <Form onSubmit={submitData}>
                    <Row>
                        <div className="col-sm-4">
                            <Form.Group>
                                <Form.Label>Cost Center Id</Form.Label>
                                <Form.Control type="text" disabled value='IN1055' />
                            </Form.Group>
                        </div>
                        <div className="col-sm-4">
                            <Form.Group>
                                <Form.Label>Type of report</Form.Label>
                                <Form.Control as="select" onChange={(e) => setReportType(e.target.value)}
                                    value={reportType} >
                                    <option value="">Select Report Type</option>
                                    {reportTypeList.map((item, i) => {
                                        return (
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
                                <Form.Label>Employee Id</Form.Label>
                                <Form.Control as="select" value={employeeCostCenter}
                                    onChange={(e) => setEmployeeCostCenterHandler(e)}>
                                    <option value="">Select Employee</option>

                                    {employeeIdList.length > 0 && employeeIdList.map((item, i) => {
                                        return (
                                            <option key={item.employeeId} value={item.employeeId}>
                                                {item.firstName}-{item.employeeId}</option>
                                        )
                                    })
                                    }
                                </Form.Control>
                            </Form.Group>
                        </div>
                        <div className="col-sm-4">
                            <Form.Group>
                            <Form.Label>Select Sports</Form.Label>
                                <Form.Control as="select" onChange={(e) => setSports(e.target.value)}
                                    value={sports} >
                                    <option value="">Select Sports Type</option>
                                    {sportsNames.map((item, i) => {
                                        return (
                                            <option key={item.sportId} value={item.sportId}>{item.sportName}</option>
                                        )
                                    })}
                                </Form.Control>

                            </Form.Group>
                        </div>
                    </Row>
                    <Row>
                        <div className="col-sm-4">
                            <Form.Group>
                                <Form.Label>Select Cluster</Form.Label>
                                <Form.Control as="select" onChange={(e) => setClusterHandler(e)}
                                    value={cluster} >
                                    <option value="">Select Cluster Type</option>
                                    {clusterCostCenterList.map((item, i) => {
                                        return (
                                            <option key={item.clusterId} value={item.clusterId}>{item.clusterName}</option>
                                        )
                                    })}
                                </Form.Control>
                            </Form.Group>
                        </div>
                        <div className="col-sm-4">
                            <Form.Group>
                                <Form.Label>Select Type of Contract</Form.Label>
                                <Form.Control as="select" onChange={(e) => setContractTypeHandler(e)}
                                    value={contractTypeData} >
                                    <option value="">Select Contract Type</option>
                                    {shiftContractNames.map((item, i) => {
                                        return (
                                            <option key={item.typeId} value={item.contractType}>{item.contractType}</option>
                                        )
                                    })}
                                </Form.Control>
                            </Form.Group>
                        </div>
                    </Row>
                    {reportType === 'Monthly' &&
                    <Row>
                        <div className="col-sm-4">
                            <Form.Group>
                                <Form.Label>Select Month</Form.Label>
                                <input type="month" style={{ fontSize: "0.8rem" }} className="form-control digit" min="2020-08"
                                    placeholder="Number Of Days"
                                    required onChange={(e) => setGetMHandler(e)} value={getM} />
                            </Form.Group>
                        </div>
                    </Row>
                    }
                    {/* {reportType === 'Yearly' &&
                    <Row>
                        <div className="col-sm-4">
                            <Form.Label>Select Year</Form.Label>
                            <div>
                                <DatePicker selected={startYear} onChange={date => setStartYear(date)}
                                    showYearPicker
                                    maxDate={new Date()}
                                     minDate={subYears(new Date(), 2)}
                                    className="input_date" dateFormat="yyyy" yearItemNumber={5}
                                    placeholderText="Select Year" />
                            </div>
                        </div>
                    </Row>
                    } */}
                    <Button type="submit">Submit</Button>
                </Form>
                <ProductivityReportManagerView productivityList={productivityList} />
            </Container>
        </Fragment>
    );
};

export default ProductivityReportManager;