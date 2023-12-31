import React, { useState, useEffect, useContext, Fragment } from 'react';
import { Row, Button, Table } from 'react-bootstrap';
import { LeaveContext } from '../../context/LeaveState';
import ManagerLeaveEdit from './ManagerLeaveEdit'
import Breadcrumb from '../common/breadcrumb';
import '../AdminLeave/AdminLeaves.css'
import '../../assets/css/search.css'
import Pagination from 'react-js-pagination'
import { Edit2, Trash2, Search } from 'react-feather'
import ManagerLeaveAdd from './ManagerLeaveAdd'
import ManagerDeleteLeaves from './ManagerDeleteLeaves';
import { SearchContext } from '../../context/SearchState';
import moment from "moment";

const ManagerLeaveList = (props) => {
    const [modal, setModal] = useState(false);
    const [editModal, setEditModal] = useState(false)
    const [deleteModal, setDeleteModal] = useState(false)
    let [leaveTypeId, setLeaveTypeId] = useState()
    const [fromDate, setFromDate] = useState(new Date())
    const [toDate, setToDate] = useState(new Date())
    const [ltId, setltId] = useState()
    const [empId, setEmpId] = useState()
    const [reason, setReason] = useState()
    const [searchValue, setSearchValue] = useState(false);
    const [searchLeaveList, setLeaveList] = useState();
    const [pageCount, setPageCount] = useState(0)

   
    const { viewManagerList, leaveManagerList, loader, managerTotal, viewManagerListSearch } = useContext(LeaveContext)

    const [currentRecords, setCurrentRecords] = useState([])
    console.log("managerTotal----", managerTotal)
    /*-----------------Pagination------------------*/
    const [currentPage, setCurrentPage] = useState(1);
    const recordPerPage = 10;
    const totalRecords = managerTotal
    const pageRange = 10;

    const indexOfLastRecord = currentPage * recordPerPage;
    const indexOfFirstRecord = indexOfLastRecord - recordPerPage;
    /* const currentRecords = searchLeaveList !== undefined && searchLeaveList !== null ? searchLeaveList.slice(indexOfFirstRecord, indexOfLastRecord) : []; */

    const handlePageChange = pageNumber => {
        setPageCount(pageNumber-1)
        setCurrentPage(pageNumber);
        if (searchValue !== "") {
            viewManagerListSearch(searchValue);
        } else {
            viewManagerList(pageNumber-1)
        }
    }
    /*-----------------Pagination------------------*/

    const handleClose = () => {
        setModal(false)
        setCurrentPage(1)
    }
    const handleShow = () => setModal(true)

    const handleEditClose = () => setEditModal(false)
    const handleDeleteClose = () => setDeleteModal(false)

    useEffect(() => {
        viewManagerList(pageCount)
    }, [pageCount])

    useEffect(() => {
        if (leaveManagerList !== undefined && leaveManagerList !== null && leaveManagerList.length > 0) {
            setLeaveList(leaveManagerList);
            setCurrentRecords(leaveManagerList)
        }
    }, [leaveManagerList])

    const searchHandler = (e) => {
        setSearchValue(e.target.value)
      

    }

    const searchDataHandler = () => {
        if (searchValue !== "") {
            viewManagerListSearch(searchValue);
        } else {
            viewManagerList(pageCount)
        }

    }

   /*  useEffect(() => {
        if (empIdManagerSearchList !== undefined && empIdManagerSearchList !== null && empIdManagerSearchList.length > 0) {
            setLeaveList(empIdManagerSearchList);
        }
    }, [empIdManagerSearchList]) */


    return (
        <Fragment>
            <Breadcrumb title="Manager" parent="Manager Leave" />
            <div className="container-fluid">
                <Row className="heading-row">
                    <h5 className="main-heading">Manager Leaves</h5>
                </Row>
                <Row>
                    <div className="col-sm-12">
                        <div className="card" style={{ overflowX: "auto" }}>
                            <div className="title_bar" >
                                <div className="job-filter">
                                    <div className="faq-form mr-2">
                                        <input className="form-control searchButton" type="text" placeholder="Search.." onChange={(e) => searchHandler(e)} />
                                        <Search className="search-icon" style={{ color: "#313131" }} onClick={searchDataHandler} />
                                    </div>
                                </div>
                                <Button className="apply-button btn btn-light mr-2" onClick={handleShow}>Apply</Button>
                            </div>
                            <ManagerLeaveAdd handleClose={handleClose} modal={modal} pageNumber={pageCount} />
                            <div className="table-responsive">
                                <Table id="table-to-xls" className="table table-hover">
                                    <thead className="thead-light" style={{ backgroundColor: "#2f3c4e" }}>
                                        <tr>
                                            <th>S. No</th>
                                            <th>Employee Id</th>
                                            <th>Leave Type</th>
                                            <th>Total No. of Days</th>
                                            <th>Start Date</th>
                                            <th>End Date</th>
                                            <th></th>
                                            <th></th>
                                        </tr>
                                    </thead>

                                    {loader === true && currentRecords !== null && currentRecords !== undefined ?
                                        <tbody>
                                            <tr>
                                                <td colspan='10'>
                                                    <div className="loader-box loader" style={{ width: "100% !important"}}>
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
                                        currentRecords !== undefined && currentRecords !== null &&
                                            currentRecords.length > 0 ?
                                            currentRecords.map((item, i) => {
                                                return (
                                                    <tbody key={i + 1}>
                                                        <tr>
                                                            <td>{i + 1 + indexOfFirstRecord}</td>
                                                            <td>{item.empId}</td>
                                                            <td>{item.leaveTypeId === 1 ? 'General' : (item.leaveTypeId === 2 ? 'Paternity' : (item.leaveTypeId === 3 ? 'Maternity' :
                                                                (item.leaveTypeId === 0 ? 'LOP' : '')))}
                                                            </td>
                                                            <td>{item.numberOfDays}</td>
                                                            <td>{item.fromDate}</td>
                                                            <td>{item.toDate}</td>
                                                            <td>{item.leaveTypeId === 3|| moment(item.fromDate).format("YYYY-MM-DD") <= moment(moment(), "YYYY-MM-DD").subtract("30", "d").format("YYYY-MM-DD")?
                                                                <Edit2 disabled style={{ color: 'lightgray' }} />
                                                                : <Edit2 onClick={() => {
                                                                    setEditModal(true); setLeaveTypeId(item.leaveTypeId);
                                                                    setFromDate(item.fromDate); setToDate(item.toDate); setReason(item.reason)
                                                                    setltId(item.ltId); setEmpId(item.empId)

                                                                }} />}
                                                            </td>
                                                            <td>{item.leaveTypeId === 3 || moment(item.fromDate).format("YYYY-MM-DD") <= moment(moment(), "YYYY-MM-DD").subtract("30", "d").format("YYYY-MM-DD") ?
                                                                <Trash2 disabled style={{ color: 'lightgray' }} />
                                                                : <Trash2 onClick={() => {
                                                                    setDeleteModal(true); setltId(item.ltId)
                                                                }} />}
                                                            </td>
                                                        </tr>
                                                    </tbody>
                                                )
                                            }) :
                                            <tbody>
                                                <tr>
                                                    <td colspan='10'>No Record Found</td>
                                                </tr>
                                            </tbody>}
                                </Table>
                                {/* {(leaveManagerList === null) ? 
                                <p style={{ textAlign: "center" }}>No Record Found</p> : null} */}
                            </div>
                        </div>
                    </div>
                    <ManagerDeleteLeaves handleDeleteClose={handleDeleteClose} modal={deleteModal} ltId={ltId} 
                    pageNumber={pageCount} />
                    <ManagerLeaveEdit handleEditClose={handleEditClose} modal={editModal}
                        leaveTypeId={leaveTypeId === 0 || leaveTypeId === 1 ? (leaveTypeId = 1) : (leaveTypeId === 2 ? (leaveTypeId = 2) :
                            leaveTypeId === 3 ? (leaveTypeId = 3) : '')} fromDate={fromDate} toDate={toDate}
                        reason={reason} ltId={ltId} empId={empId} pageNumber={pageCount} />
                </Row>
            </div>
            {leaveManagerList !== null && leaveManagerList !== undefined && 
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

export default ManagerLeaveList;