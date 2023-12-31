import React, { Fragment, useState, useContext, useEffect } from 'react';
import Breadcrumb from '../common/breadcrumb';
import { Card, Row, Col, Table, Button } from 'react-bootstrap'
import { Edit2, Trash2 } from 'react-feather'
import calendarImage from '../../assets/images/calendar-image.png'
import LeaveAdd from './LeaveAdd'
import EditLeave from './EditLeave'
import DeleteLeave from './DeleteLeave'
import '../AdminLeave/AdminLeaves.css'
import Pagination from 'react-js-pagination'
import 'react-confirm-alert/src/react-confirm-alert.css';
import { LeaveContext } from '../../context/LeaveState'
import './Leaves.css'
import { AppContext } from "../../context/AppState";
import moment from "moment";
import { ToastContainer, toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";

const LeaveView = () => {

    const [modal, setModal] = useState(false);
    const [editModal, setEditModal] = useState(false)
    const [deleteModal, setDeleteModal] = useState(false)
    let [leaveTypeId, setLeaveTypeId] = useState()
    const [fromDate, setFromDate] = useState(new Date())
    const [toDate, setToDate] = useState(new Date())
    const [ltId, setltId] = useState()
    const [reason, setReason] = useState()
    const [empId, setEmpID] = useState('')
    const [numberOfDays, setNumberOfDays] = useState()
    const[currentYear,setCurrentYear]=useState(new Date().getFullYear()== "2022"? false :true )
    const[checkTheYear,setCheckTheYear]=useState(new Date().getFullYear()== "2022"? false : true )
    let [pageCount, setPageCount] = useState(0)
    
    const { leaveDataList, viewLeaveData, viewEmpLeaveData, leaveEmpList, loader, total }
        = useContext(LeaveContext);

    const [currentRecords, setCurrentRecords] = useState([])
    const [selectyear, setSelectyear] = useState(new Date().getFullYear())
    const { user,fetchemployeeData } = useContext(AppContext);

    useEffect(() => {
        if(leaveEmpList !== null && leaveEmpList !== undefined){
            setCurrentRecords(leaveEmpList)
            console.log("leaveEmpList",leaveEmpList)
            console.log("currentRecords-------------",currentRecords)
        }
        
    },[leaveEmpList,currentRecords])

    /*-----------------Pagination------------------*/
    const [currentPage, setCurrentPage] = useState(1);
    const recordPerPage = 10 ;
    /* const totalRecords = leaveEmpList !== null && leaveEmpList !== undefined && leaveEmpList.length; */
    const totalRecords = total;
    const pageRange = 10;

    const indexOfLastRecord = currentPage * recordPerPage;
    const indexOfFirstRecord = indexOfLastRecord - recordPerPage;
     /* currentRecords = leaveEmpList !== null && leaveEmpList !== undefined ? leaveEmpList.slice(indexOfFirstRecord, indexOfLastRecord) : []; */

// const currentYear= new Date().getFullYear()
    const handlePageChange = pageNumber => {
        setPageCount(pageNumber-1)
        setCurrentPage(pageNumber);
        viewEmpLeaveData(fetchemployeeData.employeeId,pageNumber - 1)
        setCurrentRecords(leaveEmpList)
    }
    /*-----------------Pagination------------------*/

    const handleClose = () => {
        setModal(false)
        setCurrentPage(1)
    }

    const handleEditClose = () => setEditModal(false)

    const handleDeleteClose = () => setDeleteModal(false)

    useEffect(() => {
        console.log("currentYear",currentYear);
        viewLeaveData(fetchemployeeData.employeeId,new Date().getFullYear())
    }, [fetchemployeeData.employeeId,deleteModal])

    
    useEffect(() => {
        viewEmpLeaveData(fetchemployeeData.employeeId, pageCount)
       
    }, [fetchemployeeData.employeeId, pageCount])

    const handlechange = (year) => {
        console.log("currentYear",currentYear,year);
        viewLeaveData(fetchemployeeData.employeeId,year)  
    }
    
    return (
        <Fragment>
            <ToastContainer />
            <Breadcrumb title="Leave View" parent="Leave View" />
            <div className="container-fluid">
            {checkTheYear?
            <div className="row">
                    <div className="col-sm-12 main-heading-row">
                    <input style={{width:"30px"}} type="radio" checked={currentYear} name="year" onClick={()=>{setCurrentYear(true);handlechange("2021");}} /><label style={{marginTop:"-5px"}}>2021</label> 
                    <input style={{width:"30px"}} type="radio" checked={!currentYear} name="year" onClick={()=>{setCurrentYear(false);handlechange("2022");}}/><label style={{marginTop:"-5px"}} >2022</label> 
                    </div>
                </div>
                :""}
                {currentYear?
                <Fragment>     
                <div className="row">
                    <div className="col-sm-12 main-heading-row">
                        <h5 className="main-heading">Leaves ( 2021 )</h5>
                    </div>
                </div>
                <Row className="row">
                    <Col className="col-12 col-md-2"></Col>
                    <Col className="col-12 col-md-3" style={{ marginBottom: '3rem' }}>
                        <Card className="h-100">
                            <Card.Body>
                                <Row className="text-center">
                                    <h6 style={{ fontWeight: 'bold' }}>General Leaves</h6>
                                </Row>
                                <Row className="text-center" style={{ margin: '15px 0 30px 0' }}>
                                    <img src={calendarImage} alt="calendar" width='50px' />
                                </Row>
                                <Row>
                                    <Col>
                                        <Row className="text-center">
                                            <p>Available:{leaveDataList !== undefined && leaveDataList.eligibleLeave ?
                                                (leaveDataList.leaveApplied.General == null ? leaveDataList.eligibleLeave.General :
                                                    ((leaveDataList.eligibleLeave.General - leaveDataList.leaveApplied.General) <= 0 ? '0' :
                                                        (leaveDataList.eligibleLeave.General - leaveDataList.leaveApplied.General))) :
                                                ''}</p>
                                        </Row>
                                        <Row className="text-center">
                                            <p>Taken:{leaveDataList !== undefined && leaveDataList.leaveApplied ? (leaveDataList.leaveApplied.General == null ? '0' : leaveDataList.leaveApplied.General) :
                                                0}</p>
                                        </Row>
                                    </Col>
                                </Row>
                            </Card.Body>
                        </Card>
                    </Col>
                    <Col className="col-12 col-md-3" style={{ marginBottom: '3rem' }}>
                        <Card className="h-100">
                            <Card.Body>
                                <Row className="text-center">
                                    <h6 style={{ fontWeight: 'bold', color: 'red' }}>LOP</h6>
                                </Row>
                                <Row className="text-center" style={{ margin: '15px 0 30px 0' }}>
                                    <img src={calendarImage} alt="" width='50px' />
                                </Row>
                                <Row>
                                    <Col>
                                        <Row className="text-center">
                                            <p>Taken:{leaveDataList !== undefined && leaveDataList.leaveApplied ? (leaveDataList.leaveApplied.LOP == null ? '0' : leaveDataList.leaveApplied.LOP) :
                                                ''}</p>
                                        </Row>
                                    </Col>
                                </Row>
                            </Card.Body>
                        </Card>
                    </Col>
                    <Col className="col-12 col-md-3" style={{ marginBottom: '3rem' }}>
                        <Card className="h-100">
                            <Card.Body>
                                <Row className="text-center">
                                    <h6 style={{ fontWeight: 'bold', color: 'green' }}>Other Leaves</h6>
                                </Row>
                                <Row className="text-center" style={{ margin: '15px 0 30px 0' }}>
                                    <img src={calendarImage} alt="" width='50px' />
                                </Row>
                                <Row>
                                    <Col>
                                        <Row className="text-center">
                                            <p>Available:{leaveDataList !== undefined && leaveDataList.eligibleLeave ?
                                                (leaveDataList.leaveApplied.GrantLeave == null ? leaveDataList.eligibleLeave.GrantLeave :
                                                    (leaveDataList.eligibleLeave.GrantLeave - leaveDataList.leaveApplied.GrantLeave)) :
                                                ''}</p>
                                        </Row>
                                        <Row className="text-center">
                                            <p>Taken: {leaveDataList !== undefined && leaveDataList.leaveApplied ? (leaveDataList.leaveApplied.GrantLeave == null ? '0' : leaveDataList.leaveApplied.GrantLeave) :
                                                ''}</p>
                                        </Row>
                                    </Col>
                                </Row>
                            </Card.Body>
                        </Card>
                    </Col>
                    <Col className="col-12 col-md-1"></Col>
                </Row>
                </Fragment>
:""}
               {!currentYear ? 
               <Fragment>
               <div className="row">
                    <div className="col-sm-12 main-heading-row">
                        <h5 className="main-heading">Leaves ( 2022 )</h5>
                    </div>
                </div>
                <Row className="row">
                    <Col className="col-12 col-md-2"></Col>
                    <Col className="col-12 col-md-3" style={{ marginBottom: '3rem' }}>
                        <Card className="h-100">
                            <Card.Body>
                                <Row className="text-center">
                                    <h6 style={{ fontWeight: 'bold' }}>General Leaves</h6>
                                </Row>
                                <Row className="text-center" style={{ margin: '15px 0 30px 0' }}>
                                    <img src={calendarImage} alt="calendar" width='50px' />
                                </Row>
                                <Row>
                                    <Col>
                                        <Row className="text-center">
                                            <p>Available:{leaveDataList !== undefined && leaveDataList.eligibleLeave ?
                                                (leaveDataList.leaveApplied.General == null ? leaveDataList.eligibleLeave.General :
                                                    ((leaveDataList.eligibleLeave.General - leaveDataList.leaveApplied.General) <= 0 ? '0' :
                                                        (leaveDataList.eligibleLeave.General - leaveDataList.leaveApplied.General))) :
                                                ''}</p>
                                        </Row>
                                        <Row className="text-center">
                                            <p>Taken:{leaveDataList !== undefined && leaveDataList.leaveApplied ? (leaveDataList.leaveApplied.General == null ? '0' : leaveDataList.leaveApplied.General) :
                                                0}</p>
                                        </Row>
                                    </Col>
                                </Row>
                            </Card.Body>
                        </Card>
                    </Col>
                    <Col className="col-12 col-md-3" style={{ marginBottom: '3rem' }}>
                        <Card className="h-100">
                            <Card.Body>
                                <Row className="text-center">
                                    <h6 style={{ fontWeight: 'bold', color: 'red' }}>LOP</h6>
                                </Row>
                                <Row className="text-center" style={{ margin: '15px 0 30px 0' }}>
                                    <img src={calendarImage} alt="" width='50px' />
                                </Row>
                                <Row>
                                    <Col>
                                        <Row className="text-center">
                                            <p>Taken:{leaveDataList !== undefined && leaveDataList.leaveApplied ? (leaveDataList.leaveApplied.LOP == null ? '0' : leaveDataList.leaveApplied.LOP) :
                                                ''}</p>
                                        </Row>
                                    </Col>
                                </Row>
                            </Card.Body>
                        </Card>
                    </Col>
                    <Col className="col-12 col-md-3" style={{ marginBottom: '3rem' }}>
                        <Card className="h-100">
                            <Card.Body>
                                <Row className="text-center">
                                    <h6 style={{ fontWeight: 'bold', color: 'green' }}>Other Leaves</h6>
                                </Row>
                                <Row className="text-center" style={{ margin: '15px 0 30px 0' }}>
                                    <img src={calendarImage} alt="" width='50px' />
                                </Row>
                                <Row>
                                    <Col>
                                        <Row className="text-center">
                                            <p>Available:{leaveDataList !== undefined && leaveDataList.eligibleLeave ?
                                                (leaveDataList.leaveApplied.GrantLeave == null ? leaveDataList.eligibleLeave.GrantLeave :
                                                    (leaveDataList.eligibleLeave.GrantLeave - leaveDataList.leaveApplied.GrantLeave)) :
                                                ''}</p>
                                        </Row>
                                        <Row className="text-center">
                                            <p>Taken: {leaveDataList !== undefined && leaveDataList.leaveApplied ? (leaveDataList.leaveApplied.GrantLeave == null ? '0' : leaveDataList.leaveApplied.GrantLeave) :
                                                ''}</p>
                                        </Row>
                                    </Col>
                                </Row>
                            </Card.Body>
                        </Card>
                    </Col>
                    <Col className="col-12 col-md-1"></Col>
                </Row>
                </Fragment>
:""}
                <Row className="apply-button-row">
                    <Col className="leaveApplications">Leave Applications</Col>
                    <Col>
                        <Button className="apply-button btn btn-light"
                            onClick={() => { setModal(true); setEmpID(fetchemployeeData.employeeId) }}>Apply</Button>
                    </Col>
                    {fetchemployeeData.employeeId !== undefined ?
                        <LeaveAdd handleClose={handleClose} modal={modal} empid={empId} pageNumber={pageCount}  /> : ""}

                </Row>

                <div className="table-responsive">
                    <Table id="table-to-xls" className="table table-hover" >

                        <thead className="thead-light" style={{ backgroundColor: "#2f3c4e" }}>
                            <tr>
                                <th>S. No</th>
                                <th>Leave Type</th>
                                <th>Total No. of Days</th>
                                <th>Start Date</th>
                                <th>End Date</th>
                                <th></th>
                                <th></th>
                            </tr>
                        </thead>

                        {loader === true && leaveEmpList !== null && leaveEmpList !== undefined ?
                            <tbody>
                                <tr>
                                    <td colSpan='10'>
                                        <div className="loader-box loader" style={{ width: "100% !important" }}>
                                            <div className="loader">
                                                <div className="line bg-primary"></div>
                                                <div className="line bg-primary"></div>
                                                <div className="line bg-primary"></div>
                                                <div className="line bg-primary"></div>
                                            </div>
                                        </div>
                                    </td>
                                </tr>
                            </tbody>
                            :
                            leaveEmpList !== null && leaveEmpList !== undefined &&
                            leaveEmpList.length > 0 ?
                            leaveEmpList.map((item, i) => {
                                    return (
                                        <tbody key={i + 1}>
                                            <tr>
                                                <td>{i + 1 + indexOfFirstRecord}</td>
                                                {/* <td>{item.leaveCategory}</td> */}
                                                <td>{item.leaveTypeId === 1 ? 'General' : (item.leaveTypeId === 2 ? 'Paternity' : (item.leaveTypeId === 3 ? 'Maternity' :
                                                    (item.leaveTypeId === 0 ? 'LOP' : '')))}
                                                </td>
                                                <td>{item.numberOfDays}</td>
                                                <td>{item.fromDate}</td>
                                                <td>{item.toDate}</td>
                                                <td>{moment(item.fromDate).format("YYYY-MM-DD") <= moment(moment(), "YYYY-MM-DD").subtract("30", "d").format("YYYY-MM-DD")?<Edit2 disabled
                                  style={{ color: "lightgray" }}/>:<Edit2 onClick={() => {
                                                    setEditModal(true); setLeaveTypeId(item.leaveTypeId);
                                                    setFromDate(item.fromDate); setToDate(item.toDate); setReason(item.reason)
                                                    setltId(item.ltId); setNumberOfDays(item.numberOfDays)
                                                }} />}
                                                </td>
                                                <td>{moment(item.fromDate).format("YYYY-MM-DD") <= moment(moment(), "YYYY-MM-DD").subtract("30", "d").format("YYYY-MM-DD")?<Trash2 disabled
                                  style={{ color: "lightgray" }}/>:<Trash2 onClick={() => {
                                                    setDeleteModal(true); setltId(item.ltId)
                                                }} />}

                                                </td>


                                            </tr>
                                        </tbody>
                                    )
                                }) :
                                <tbody>
                                    <tr>
                                        <td colSpan='10'>No Record Found</td>
                                    </tr>
                                </tbody>}

                    </Table>
                    {/* {(leaveEmpList !== null && leaveEmpList.length <= 0) ? 
                                <p style={{ textAlign: "center" }}>No Record Found</p> : null} */}

                    <DeleteLeave handleDeleteClose={handleDeleteClose} modal={deleteModal} ltId={ltId} 
                    empid={fetchemployeeData.employeeId} pageNumber={pageCount} />
                    {fetchemployeeData.employeeId !== undefined ?
                        <EditLeave handleEditClose={handleEditClose} modal={editModal} empid={fetchemployeeData.employeeId} numberOfDays={numberOfDays}
                            leaveTypeId={leaveTypeId === 0 || leaveTypeId === 1 ? (leaveTypeId = 1) : (leaveTypeId === 2 ? (leaveTypeId = 2) :
                                leaveTypeId === 3 ? (leaveTypeId = 3) : '')} fromDate={fromDate} toDate={toDate}
                            reason={reason} ltId={ltId} pageNumber={pageCount} /> : ""}
                </div>

            </div>
            {leaveEmpList !== null && leaveEmpList !== undefined && 
                <Pagination
                    itemClass="page-item"
                    linkClass="page-link"
                    activePage={currentPage}
                    itemsCountPerPage={recordPerPage}
                    totalItemsCount={totalRecords}
                    pageRangeDisplayed={pageRange}
                    onChange={handlePageChange}
                    firstPageText="First"
                    lastPageText="Last"
                />
            }
        </Fragment>
    );
};

export default LeaveView;
