import React, { Fragment, useState, useEffect, useContext } from 'react';
import { Button, Table } from 'react-bootstrap'
import Breadcrumb from '../common/breadcrumb';
import { AdminContext } from '../../context/AdminState';
import { useHistory } from "react-router-dom";
import '../Leaves/Leaves.css'
import './AdminLeaves.css'
import Pagination from 'react-js-pagination'
import AdminDeleteApproval from './AdminDeleteApproval'
import '../../assets/css/search.css'

const AdminLeaveApproval = () => {
    const [deleteModal, setDeleteModal] = useState(false)
    const [ltId, setltId] = useState()
    const [displayLoader, setDisplayLoader] = useState(false)
    let history = useHistory();


    const { ApprovalView, ApprovalLeaveList, approvedUpdate, loader } = useContext(AdminContext)

    /*-----------------Pagination------------------*/
    const [currentPage, setCurrentPage] = useState(1);
    const recordPerPage = 10;
    const totalRecords = ApprovalLeaveList !== null && ApprovalLeaveList.length;
    const pageRange = 10;

    const indexOfLastRecord = currentPage * recordPerPage;
    const indexOfFirstRecord = indexOfLastRecord - recordPerPage;
    const currentRecords = ApprovalLeaveList !== null ? ApprovalLeaveList.slice(indexOfFirstRecord, indexOfLastRecord) : [];

    const handlePageChange = pageNumber => {
        setCurrentPage(pageNumber);
    }
    /*-----------------Pagination------------------*/

    const handleDeleteClose = () => setDeleteModal(false)

    useEffect(() => {
        ApprovalView()
    }, [])


    const approvedButton = (empId, startDate, endDate, leaveCategory,
        leaveTypeId, ltId, numberOfDays, reason, status, year) => {

        const approvalData = {
            empId: empId,
            fromDate: startDate,
            leaveCategory: leaveCategory,
            leaveTypeId: leaveTypeId,
            ltId: ltId,
            numberOfDays: numberOfDays,
            reason: reason,
            status: status,
            toDate: endDate,
            viewLeavePopup: 1,
            year: year
        }
        console.log("approval data=====", approvalData)
        approvedUpdate(approvalData)
        history.push("/leaveapproval");

    }


    return (
        <Fragment>
            <Breadcrumb title="Admin" parent=" Leave Approval" />
            <div className="container-fluid">
                <div className="row">
                    <Table className="adminTable table table-hover">
                        <thead style={{ background: '#006EBB', color: 'white' }}>
                            <tr>
                                <th>Sr.</th>
                                <th>Employee Id</th>
                                <th>Leave Type</th>
                                <th>Total No. of Days</th>
                                <th>Start Date</th>
                                <th>End Date</th>
                                <th>Status</th>
                                <th></th>
                                <th></th>

                            </tr>
                        </thead>
                        {loader === true && currentRecords !== null && currentRecords !== undefined  ?
                            <tbody>
                                <tr>
                                    <td colspan='7'>
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
                            currentRecords !== null && currentRecords !== undefined &&
                                currentRecords.length > 0 ?
                                currentRecords.map((item, i) => {
                                    return (
                                        <tbody key={i}>
                                            <tr>
                                                <td>{i + 1 + indexOfFirstRecord}</td>
                                                <td>{item.empId}</td>
                                                <td>{item.leaveCategory}</td>
                                                <td>{item.numberOfDays}</td>
                                                <td>{item.fromDate}</td>
                                                <td>{item.toDate}</td>
                                                <td>{item.isApproved === 0 ? "Approved" : (item.isApproved === 1 ? 'Pending' :
                                                    (item.isApproved === 2 ? 'Rejected' : ''))}</td>

                                                <td>
                                                    {item.isApproved === 0 || item.isApproved === 2 ?
                                                        <Button size="sm" className="disable-button" disabled>
                                                            Approved
                                                    </Button>
                                                        :
                                                        <>

                                                            <div>
                                                                {
                                                                    displayLoader === true ?
                                                                        <div className="loader-box loader" style={{ width: "50% !important" }}>
                                                                            <div className="loader">
                                                                                <div className="line bg-primary"></div>
                                                                                <div className="line bg-primary"></div>
                                                                                <div className="line bg-primary"></div>
                                                                                <div className="line bg-primary"></div>
                                                                            </div>
                                                                        </div>
                                                                        :
                                                                        <Button
                                                                            size="sm"
                                                                            style={{ backgroundColor: '#006EBB' }}
                                                                            className="submitButton"
                                                                            onClick={(e) => {
                                                                                setDisplayLoader(true)
                                                                                approvedButton(item.empId, item.fromDate,
                                                                                    item.toDate, item.leaveCategory, item.leaveTypeId,
                                                                                    item.ltId, item.numberOfDays, item.reason, item.status,
                                                                                    item.year)
                                                                            }}
                                                                        >Approve
                                                       </Button>
                                                                }
                                                            </div>
                                                        </>
                                                    }
                                                </td>
                                                <td>{item.isApproved === 2 || item.isApproved === 0 ?
                                                    <Button size="sm" className="disable-button" disabled>
                                                        Cancel</Button> :
                                                    <Button variant="danger" size="sm" onClick={() => {
                                                        setDeleteModal(true); setltId(item.ltId)
                                                    }}>Cancel</Button>}</td>

                                            </tr>

                                        </tbody>
                                    )
                                }) : <tbody>
                                    <tr>
                                        <td colspan='7'>No Record Found</td>
                                    </tr>
                                </tbody>}
                    </Table>
                    {/* {(ApprovalLeaveList === null ) ? 
                                <p style={{ textAlign: "center" }}>No Record Found</p> : null} */}
                </div>
            </div>
            <AdminDeleteApproval handleDeleteClose={handleDeleteClose} modal={deleteModal} ltId={ltId} />
            {ApprovalLeaveList !== null && ApprovalLeaveList.length > 10 &&
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

export default AdminLeaveApproval;