import React, { Fragment, useState, useContext, useEffect } from 'react';
import Breadcrumb from '../common/breadcrumb';
import { Card, Row, Col, Table, Button } from 'react-bootstrap'
import { Edit2, Slash, Trash2 } from 'react-feather'
import EditRole from './EditRole';

const RoleManagementList = () => {
   
    const [editModal, setEditModal] = useState(false);
    

    const handleEditClose = () => setEditModal(false);
    return(
    <Fragment>
            <Breadcrumb title="Role Management" parent="Role Management" />
            <div className="container-fluid">
                
                <Row className="apply-button-row">
                    <Col className="leaveApplications">Role Management</Col>
                    <Col>
                        
                    </Col>
                    
                </Row>

                <div className="table-responsive">
                    <Table id="table-to-xls" className="table table-hover">
                        <thead className="thead-light" style={{ backgroundColor: "#2f3c4e" }}>
                            <tr>
                                <th>S.No.</th>
                                <th>Role Name</th>
                                
                                <th>User</th>
                                <th>Permissions</th>
                                <th></th>                                
                                <th></th>
                                
                            </tr>
                        </thead>

                        {/* {storeProductList.length > 0 &&
                            storeProductList.map((item, i) => {
                                return (
                                   <tbody key={i + 1}>
                                        <tr>
                                            <td>{i + 1}</td>
                                            <td>{item.costCenter}</td>
                                            <td>{item.stateName}</td>
                                            <td>{item.monthName}</td>
                                            <td>{item.year}</td>
                                            <td>{item.weekday}</td>
                                            <td>{item.weekend}</td>
                                            <td>{item.growth}</td>
                                            {Year > item.year  ?<td><Edit2 disabled style={{color:'lightgrey'}} /></td> : Year == item.year && monthsNumber[item.month] <= month  ?<td><Edit2 disabled style={{color:'lightgrey'}} /></td> :Year == item.year && monthsNumber[item.month] <= month && TodayDate > 20 ? <td><Edit2 disabled style={{color:'lightgrey'}} /></td> : 
                                            <td><Edit2 
                                            onClick={() => {
                                                setEditModal(true);
                                            targetEditHandler(item.targetId) 
                                             }}
                                            
                                             />
                                            </td> }
                                            
                                            


                                        </tr>
                                    </tbody>
                                 )
                            })}  */}
                            <tbody >
                                        <tr>
                                            <td> 1</td>
                                            <td>General User</td>
                                            <td>50</td>
                                            <td>1</td>
                                            
                                            <td><Edit2/></td> 
                                            <td><Trash2/></td>
                                            
                                            


                                        </tr>
                                        <tr>
                                            <td> 2</td>
                                            <td>Manager</td>
                                            <td>15</td>
                                            <td>2</td>
                                            
                                            <td><Edit2
                                             onClick={() => {
                                                setEditModal(true);
                                            // targetEditHandler(item.targetId) 
                                             }}/></td> 
                                            <td><Trash2/></td>
                                            
                                            


                                        </tr>
                                    </tbody>
                    </Table>
                   
                    {/* {editTarget.length !== 0 ?  */}
                    <EditRole handleEditClose={handleEditClose}
                     modal={editModal}
                    //  editData = {editTarget}
                         /> 
                         {/* : ""} */}
                         
                </div>

            </div>
        </Fragment>
        );

}


export default RoleManagementList;