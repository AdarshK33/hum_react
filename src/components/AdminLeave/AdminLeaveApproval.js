import React, { Fragment, useState, useEffect, useContext } from 'react';
import { Button, Table } from 'react-bootstrap'
import Breadcrumb from '../common/breadcrumb';
import { AdminContext } from '../../context/AdminState';
import '../Leaves/Leaves.css'
import './AdminLeaves.css'

const AdminLeaveApproval = () => {

    const { ApprovalView, ApprovalLeaveList } = useContext(AdminContext)

    useEffect(() => {
        ApprovalView()
    }, [])

    return (
        <Fragment>
            <Breadcrumb title="Admin" parent=" Leave Approval" />
            <div className="container-fluid">
                <div className="row">
                    <Table className="adminTable">
                        <thead style={{ background: '#006EBB', color: 'white' }}>
                            <tr>
                                    <th>Sr.</th>
                                    <th>Employee Id</th>
                                    <th>Leave Type</th>
                                    <th>Total No. of Days</th>
                                    <th>Start Date</th>
                                    <th>End Date</th>
                                    <th>Approved</th>
                                    <th>Cancel</th>
                                </tr>
                                    </thead>
                            {ApprovalLeaveList.length > 0 &&
                                ApprovalLeaveList.map((item, i) => {
                                    return (
                                        <tbody key={i}>
                                            <tr>
                                                <td>{i + 1}</td>
                                                <td>{item.empId}</td>
                                                <td>{item.leaveCategory}</td>
                                                <td>{item.numberOfDays}</td>
                                                <td>{item.fromDate}</td>
                                                <td>{item.toDate}</td>
                                                <td><Button>Approved</Button></td>
                                                <td><Button>Cancel</Button></td>
                                            </tr>

                                        </tbody>
                                    )
                                })}
                                </Table>
                    </div>
                </div>
        </Fragment>
    );
};

export default AdminLeaveApproval;