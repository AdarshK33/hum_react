import React, { useState, useEffect, useContext, Fragment } from 'react';
import {  Row, Col, Button, Table } from 'react-bootstrap';
import { AdminContext } from '../../context/AdminState';
import Breadcrumb from '../common/breadcrumb';
import AdminLeaveAdd from './AdminLeaveAdd'
import '../Leaves/Leaves.css'
import './AdminLeaves.css'


const AdminLeaveView = (props) => {
    const { viewAdminList, leaveAdminList } = useContext(AdminContext)

    const [modal, setModal] = useState(false)

    /*-----------------Pagination------------------*/
    const [currentPage, setCurrentPage] = useState(1);
    const recordPerPage = 10;
    const totalRecords = leaveAdminList !== null && leaveAdminList.length;
    const pageRange = 10;

   const indexOfLastRecord = currentPage * recordPerPage;
   const indexOfFirstRecord = indexOfLastRecord - recordPerPage;
   const currentRecords = leaveAdminList !== null ? leaveAdminList.slice(indexOfFirstRecord, indexOfLastRecord) : [];
   
   const handlePageChange = pageNumber => {
    setCurrentPage(pageNumber);
}

   /*-----------------Pagination------------------*/

    const handleClose = () => setModal(false)
    const handleShow = () => setModal(true)

    useEffect(() => {
        viewAdminList()
    }, [])


    return (
        <Fragment>
            <Breadcrumb title="Admin" parent="Admin" />
            <div className="container-fluid">
                <Row className="heading-row">
                    <h4 className="main-heading">Employee Listing</h4>
                </Row>
                <Row className="apply-button-row">
                    <Col className="leaveApplications">Employees </Col>
                    <Col>
                        <Button className="apply-button btn btn-light" onClick={handleShow}>Apply</Button>
                    </Col>
                    <AdminLeaveAdd handleClose={handleClose} modal={modal} />
                </Row>
                <div className="table-responsive">
                    <Table id="table-to-xls" className="table table-hover">
                        <thead className="thead-light" style={{ backgroundColor: "#2f3c4e" }}>
                            <tr>
                                <th>S. No</th>
                                <th>Employee Id</th>
                                <th>Employee Name</th>
                                <th>Gender</th>
                            </tr>
                        </thead>
                        {currentRecords !== undefined && currentRecords !== null &&
                            currentRecords.map((item, i) => {
                                return (
                                    <tbody key={i + 1}>
                                        <tr>
                                            <td>{i + 1 + indexOfFirstRecord}</td>
                                            <td>{item.employeeId}</td>
                                            <td>{item.firstName} {item.lastName}</td>
                                            <td>{item.gender}</td>
                                        </tr>
                                    </tbody>
                                )
                            })}
                    </Table>
                </div>
                {leaveAdminList !== null && leaveAdminList.length > 10 &&
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
        </Fragment>
    );
};

export default AdminLeaveView;