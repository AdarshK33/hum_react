import React, { useState, useEffect, useContext, Fragment } from 'react';
import { Row, Button, Table, Modal } from 'react-bootstrap';
import { LeaveContext } from '../../context/LeaveState';
import AdminLeaveEdit from './AdminLeaveEdit'
import AdminDeleteLeaves from './AdminDeleteLeaves'
import Breadcrumb from '../common/breadcrumb';
import './AdminLeaves.css'
import '../../assets/css/search.css'
import Pagination from 'react-js-pagination'
import { Edit2, Trash2, Search } from 'react-feather'
import AdminLeaveAdd from './AdminLeaveAdd';
import { SearchContext } from '../../context/SearchState';

const AdminLeavesList = (props) => {
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
    const { searchByEmpId, empIdSearchList } = useContext(SearchContext);

    const { viewList, leaveList } = useContext(LeaveContext)

    /*-----------------Pagination------------------*/
    const [currentPage, setCurrentPage] = useState(1);
    const recordPerPage = 10;
    const totalRecords = searchLeaveList !== undefined && searchLeaveList !== null && searchLeaveList.length;
    const pageRange = 10;

    const indexOfLastRecord = currentPage * recordPerPage;
    const indexOfFirstRecord = indexOfLastRecord - recordPerPage;
    const currentRecords = searchLeaveList !== undefined && searchLeaveList !== null ? searchLeaveList.slice(indexOfFirstRecord, indexOfLastRecord) : [];

    const handlePageChange = pageNumber => {
        setCurrentPage(pageNumber);
    }
    /*-----------------Pagination------------------*/

    const handleClose = () => setModal(false)
    const handleShow = () => setModal(true)

    const handleEditClose = () => setEditModal(false)
    const handleDeleteClose = () => setDeleteModal(false)

    useEffect(() => {
        viewList()
    }, [])

    useEffect(() => {
        if (leaveList !== undefined && leaveList !== null && leaveList.length > 0) {
            setLeaveList(leaveList);
        }

    }, [leaveList])


    const searchHandler = (e) => {
        setSearchValue(e.target.value)

    }

    const searchDataHandler = () => {
        if (searchValue !== "") {
            searchByEmpId(searchValue);
        } else {
            viewList()
        }

    }

    useEffect(() => {
        if (empIdSearchList !== undefined && empIdSearchList !== null && empIdSearchList.length > 0) {
            setLeaveList(empIdSearchList);
        }
    }, [empIdSearchList])

    return (
        <Fragment>
            <Breadcrumb title="Admin " parent="Admin Leave" />
            <div className="container-fluid">
                <Row className="heading-row">
                    <h4 className="main-heading">Admin Leaves</h4>
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
                            <AdminLeaveAdd handleClose={handleClose} modal={modal} />
                            <div className="table-responsive">
                                <Table id="table-to-xls" className="table table-hover">
                                    <thead className="thead-light" style={{ backgroundColor: "#2f3c4e" }}>
                                        <tr>
                                            <th>S. No</th>
                                            <th>Emp Id</th>
                                            <th>Leave Type</th>
                                            <th>Total No. of Days</th>
                                            <th>Start Date</th>
                                            <th>End Date</th>
                                            <th></th>
                                            <th></th>
                                        </tr>
                                    </thead>

                                    {currentRecords !== undefined && currentRecords !== null &&
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
                                                        <td>{item.leaveTypeId === 3 ? 
                                                            <Edit2 disabled style={{color:'lightgray'}} />
                                                            : <Edit2 onClick={() => {
                                                            setEditModal(true); setLeaveTypeId(item.leaveTypeId);
                                                            setFromDate(item.fromDate); setToDate(item.toDate); setReason(item.reason)
                                                            setltId(item.ltId); setEmpId(item.empId)

                                                            }} /> }
                                                        </td>
                                                        <td>{item.leaveTypeId === 3 ?
                                                            <Trash2 disabled style={{color:'lightgray'}} />
                                                            : <Trash2 onClick={() => {
                                                            setDeleteModal(true); setltId(item.ltId)
                                                            }} /> }
                                                        </td>
                                                    </tr>
                                                </tbody>
                                            )
                                        }):  <tbody>
                                        <tr>
                                            <td colspan='6'>No Record Found</td>
                                        </tr>
                                    </tbody>}
                                </Table>
                               {/*  {(leaveList === null ) ? 
                                <p style={{ textAlign: "center" }}>No Record Found</p> : null} */} 
                            </div>
                        </div>
                    </div>
                    <AdminDeleteLeaves handleDeleteClose={handleDeleteClose} modal={deleteModal} ltId={ltId} />
                    <AdminLeaveEdit handleEditClose={handleEditClose} modal={editModal}
                        leaveTypeId={leaveTypeId === 0 || leaveTypeId === 1 ? (leaveTypeId = 1) : (leaveTypeId === 2 ? (leaveTypeId = 2) :
                            leaveTypeId === 3 ? (leaveTypeId = 3) : '')} fromDate={fromDate} toDate={toDate}
                        reason={reason} ltId={ltId} empId={empId} />
                </Row>
            </div>
            {searchLeaveList !== undefined && searchLeaveList !== null && searchLeaveList.length > 10 &&
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

export default AdminLeavesList;