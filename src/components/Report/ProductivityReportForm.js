import React, { Fragment, useEffect, useContext, useState } from 'react';
import { Form, Row, Button } from 'react-bootstrap'
import Breadcrumb from '../common/breadcrumb';
import { AdminContext } from '../../context/AdminState'
import { ClusterContext } from '../../context/ClusterState'
import { RosterContext } from '../../context/RosterState'
import { LeaveContext } from '../../context/LeaveState'
import DatePicker from 'react-datepicker'
import "react-datepicker/dist/react-datepicker.css";
import moment from 'moment'
import ProductivityReportView from './ProductivityReportView'
import { AppContext } from "../../context/AppState";
import '../Leaves/Leaves.css'
/* import Select from 'react-select'; */

const ProductivityReportForm = () => {
    const [reportType, setReportType] = useState('')
    const [costCenter, setCostCenter] = useState('')
    const [employeeCostCenter, setEmployeeCostCenter] = useState(null)
    const [sports, setSports] = useState(null)
    const [cluster, setCluster] = useState(null)
    const [contractTypeData, setContractType] = useState('')
    const [getM, setGetM] = useState(new Date())
    const [yearly, setYearly] = useState(new Date())
    const { user } = useContext(AppContext);

    const reportTypeList = [{ reportTypeData: 'Monthly', id: 1 }, { reportTypeData: 'Yearly', id: 2 }]
    const { CostCenter, costCenterList, employeeIdData, employeeIdList } = useContext(AdminContext)
    const { viewSports, sportsNames, clusterCostCenterList, viewClusterCostCenter } = useContext(ClusterContext)
    const { viewContractTypes, shiftContractNames } = useContext(RosterContext)
    const { productivityReport, productivityList } = useContext(LeaveContext)

    useEffect(() => {
        viewSports()
        viewContractTypes()
        CostCenter()
    }, []);

    var previousYear = new Date().getFullYear() - 1
    var nextYear = new Date().getFullYear() + 1

    console.log("previousYear", previousYear)
    console.log("nextYear", nextYear)


    useEffect(() => {
        if (user.loginType !== "1" && user.loginType !== "9" &&
            user.additionalRole !== '1' && user.additionalRole !== '9') {
            setCostCenter(user.costCentre)
            employeeIdData(user.costCentre)
            viewClusterCostCenter(user.costCentre)
            console.log("data1", user.costCentre)
        }
    }, [user.costCentre, user.loginType])

    const setCostCenterHandler = (e) => {
        let data1 = e.target.value
        setCostCenter(data1)
        employeeIdData(data1)
        viewClusterCostCenter(data1)
        console.log("data1", data1)
    }

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
        console.log("cluster Id", e.target.value)
    }
    const setSportsHandler = (e) => {
        setSports(e.target.value)
        console.log("sports Id", e.target.value)
    }
    const submitData = (e) => {
        e.preventDefault();

        const clusterId = cluster;
        const contractType = contractTypeData;
        const employeeId = employeeCostCenter;
        const month = moment(getM, ["YYYY-MM"]).format("M");
        const sportId = sports;
        const storeId = costCenter;
        const year = reportType === 'Monthly' ? moment(getM, ["MMM Do YY"]).format('YYYY') : yearly;
        console.log("productivity data", clusterId, contractType, employeeId, month, storeId, year)
        productivityReport(clusterId, contractType, employeeId, month, sportId, storeId, year)



        setReportType('')
        setCostCenter(costCenter)
        setEmployeeCostCenter('')
        setSports('')
        setCluster('')
        setContractType('')
        setGetM(new Date())

    }
    return (
        <Fragment>
            <Breadcrumb title="Report" parent="Productivity Report" />
            <div className="container-fluid">
                <Form onSubmit={submitData}>
                    <Row>
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
                        {user.loginType === '1' || user.loginType === '9' ||
                            user.additionalRole === '1' || user.additionalRole === '9' ?
                            <div className="col-sm-4">
                                <Form.Group>
                                    <Form.Label>Cost Center </Form.Label> <span style={{ color: 'red' }}>*</span>
                                    <Form.Control as="select" value={costCenter}
                                        onChange={(e) => setCostCenterHandler(e)} required >
                                        <option value=''>Select Cost Center</option>
                                        <option value='all'>All</option>
                                        {costCenterList.map((item, i) => {
                                            return (
                                                <option key={item.costCenterId} value={item.costCentreName}>
                                                    {item.costCentreName}</option>
                                            )
                                        })
                                        }
                                    </Form.Control>
                                </Form.Group>
                            </div> :
                            <div className="col-sm-4">
                                <Form.Group>
                                    <Form.Label>Cost Center</Form.Label>
                                    <Form.Control type="text" disabled value={costCenter}
                                        onChange={(e) => setCostCenter(e.targrt.value)} />
                                </Form.Group>
                            </div>}
                    </Row>
                    <Row>
                        <div className="col-sm-4">
                            <Form.Group>
                                <Form.Label>Employee Id</Form.Label>
                                <Form.Control as="select" value={employeeCostCenter}
                                    onChange={(e) => setEmployeeCostCenterHandler(e)}>
                                    <option value="">Select Employee</option>

                                    {employeeIdList !== undefined && employeeIdList !== null &&
                                        employeeIdList.map((item, i) => {
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
                                <Form.Control as="select" onChange={(e) => setSportsHandler(e)}
                                    value={sports} >
                                    <option value="">Select Sports Type</option>
                                    {sportsNames !== undefined && sportsNames !== null &&
                                        sportsNames.map((item, i) => {
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
                                    {clusterCostCenterList !== undefined && clusterCostCenterList !== null &&
                                        clusterCostCenterList.map((item, i) => {
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
                                    {shiftContractNames !== undefined && shiftContractNames !== null &&
                                        shiftContractNames.map((item, i) => {
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
                                    <Form.Label>Select Month </Form.Label> <span style={{ color: 'red' }}>*</span>
                                    <Form.Control type="month" style={{ fontSize: "0.8rem" }} className="form-control digit" min="2020-08"
                                        placeholder="Number Of Days"
                                        required onChange={(e) => setGetMHandler(e)} value={getM} />
                                </Form.Group>
                            </div>
                        </Row>
                    }
                    {reportType === 'Yearly' &&
                        <Row>
                            <div className="col-sm-4">
                                <Form.Group>
                                    <Form.Label>Select Year </Form.Label> <span style={{ color: 'red' }}>*</span>
                                    <Form.Control type="number" placeholder="YYYY" min={previousYear} max={nextYear}
                                    className="form-control digit"
                                    required onChange={(e) => setYearly(e.target.value)} value={yearly || ''} />
                                </Form.Group>
                            </div>
                        </Row>
                    }
                    <Button type="submit" className="submitButton">Submit</Button>
                </Form>
                <ProductivityReportView productivityList={productivityList} />
            </div>
        </Fragment>
    );
};

export default ProductivityReportForm;