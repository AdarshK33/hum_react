import React, { Fragment, useState, useContext, useEffect } from 'react';
import Breadcrumb from '../../common/breadcrumb';
import { Card, Row, Col, Table, Button } from 'react-bootstrap'
import { Edit2, Trash2 } from 'react-feather'
// import EditLeave from './EditLeave'
import AddTarget from './AddTarget';
import { StoreProductContext } from "../../../context/StoreProductState";

const StoreProductTarget = () => {
    const [modal, setModal] = useState(false);
    const [editModal, setEditModal] = useState(false);
    const { storeProductList,viewStoreProduct } = useContext(StoreProductContext);

    const handleClose = () => {
        viewStoreProduct();
        setModal(false);
    }
    useEffect(() => {       
        viewStoreProduct()
    }, []);

    const handleEditClose = () => setEditModal(false);
    return(
    <Fragment>
            <Breadcrumb title="Store Product Target" parent="Store Product Target" />
            <div className="container-fluid">
                
                <Row className="apply-button-row">
                    <Col className="leaveApplications">Store Product Target</Col>
                    <Col>
                        <Button className="apply-button btn btn-light" 
                        onClick={() => {setModal(true) }}>Add Target</Button>
                    </Col>
                    <AddTarget handleClose={handleClose} modal={modal} /> 
                </Row>

                <div className="table-responsive">
                    <Table id="table-to-xls" className="table table-hover">
                        <thead className="thead-light" style={{ backgroundColor: "#2f3c4e" }}>
                            <tr>
                                <th></th>
                                <th>Cos Center ID</th>
                                {/* <th>Store Name</th> */}
                                <th>State</th>
                                <th>Month</th>
                                <th>Weekday Target</th>
                                <th>Weekend Target</th>
                                <th></th>
                                <th></th>
                            </tr>
                        </thead>

                        {storeProductList.length > 0 &&
                            storeProductList.map((item, i) => {
                                return (
                                   <tbody key={i + 1}>
                                        <tr>
                                            <td>{i + 1}</td>
                                            <td>{item.costCenter}</td>
                                            {/* <td>{item.leaveTypeId === 1 ? 'General' : (item.leaveTypeId === 2 ? 'Paternity' : (item.leaveTypeId === 3 ? 'Maternity' : 
                                            (item.leaveTypeId === 0 ? 'LOP' : '')))}
                                            </td> */}
                                            <td>{item.stateName}</td>
                                            <td>{item.monthName}</td>
                                            <td>{item.weekday}</td>
                                            <td>{item.weekend}</td>
                                            <td><Edit2 
                                            // onClick={() => {
                                            //     setEditModal(true); setLeaveTypeId(item.leaveTypeId);
                                            //     setFromDate(item.fromDate); setToDate(item.toDate); setReason(item.reason)
                                            //     setltId(item.ltId)
                                            // }}
                                             />
                                            </td>
                                            <td><Trash2 
                                            // onClick={() => {
                                            //     setDeleteModal(true);  setltId(item.ltId)
                                            // }} 
                                            />
                                           
                                            </td>


                                        </tr>
                                    </tbody>
                                 )
                            })} 
                    </Table>
                    {/* <DeleteLeave handleDeleteClose={handleDeleteClose} modal={deleteModal} ltId={ltId} /> */}
                    {/* <EditLeave handleEditClose={handleEditClose}
                    //  modal={editModal}
                        // leaveTypeId={leaveTypeId === 0 || leaveTypeId === 1 ? (leaveTypeId = 1) : (leaveTypeId === 2 ? (leaveTypeId = 2) :
                        //     leaveTypeId === 3 ? (leaveTypeId = 3):'')} fromDate={fromDate} toDate={toDate}
                        // reason={reason} ltId={ltId}
                         /> */}
                </div>

            </div>
        </Fragment>
        );

}


export default StoreProductTarget;