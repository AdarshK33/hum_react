import React, { Fragment, useState, useContext, useEffect } from 'react';
import Breadcrumb from '../common/breadcrumb';
import { Row, Col, Table, Button } from 'react-bootstrap'
import { Edit2 } from 'react-feather'
import EditRole from './EditRole';
import AddRole from './AddRole';
import { RoleManagementContext } from '../../context/RoleManagementState';

const RoleManagementList = () => {
   
    const [editModal, setEditModal] = useState(false);
    const [modal, setModal] = useState(false);
    const { viewMenu, EditMenuList,viewRoleListData, RoleListData, GetRoleData, GetRolePermission} = useContext(RoleManagementContext);
    useEffect(() => {
        viewRoleListData()
        viewMenu()
      }, [])

      const handleClose = () => {
        // viewStoreProduct();
        setModal(false);
    }
    const roleEditHandler = (role) => {
        GetRoleData(role);
        // console.log("MenuList");
        // console.log(EditMenuList);
    }

    const handleEditClose = () => {
        // EmptyMenuList();
        setEditModal(false);
    }
    return(
    <Fragment>
            <Breadcrumb title="Role Management" parent="Role Management" />
            <div className="container-fluid">
                
                <Row className="apply-button-row">
                    <Col className="leaveApplications">Role Management</Col>
                    <Col>
                        <Button className="apply-button btn btn-light" 
                        onClick={() => {setModal(true) }}>New Role</Button>
                    </Col>
                    <AddRole handleClose={handleClose} modal={modal} /> 
                </Row>

                <div className="table-responsive">
                    <Table id="table-to-xls" className="table table-hover">
                        <thead className="thead-light" style={{ backgroundColor: "#2f3c4e" }}>
                            <tr>
                                <th>S.No.</th>
                                <th>Role Name</th>
                                
                                {/* <th>User</th> */}
                                <th>Permissions</th>
                                <th></th>                                
                                {/* <th></th> */}
                                
                            </tr>
                        </thead>

                        {RoleListData !== null && RoleListData !== undefined && RoleListData.length > 0 &&
                            RoleListData.map((item, i) => {
                                return (
                                   <tbody key={i + 1}>
                                        <tr>
                                            <td>{i + 1}</td>
                                            <td>{item.roleName}</td>
                                            <td>{item.permissionCount}</td>
                                            
                                            <td><Edit2 
                                            onClick={() => {
                                                setEditModal(true);
                                                roleEditHandler(item.role) 
                                             }}
                                            
                                             />
                                            </td> 
                                            {/* <td><Trash2/></td>                                             */}
                                            


                                        </tr>
                                    </tbody>
                                 )
                            })} 
                            
                    </Table>
                   
                     {GetRolePermission !== null && GetRolePermission !== undefined &&
                        GetRolePermission.length !== 0 ?  
                    <EditRole handleEditClose={handleEditClose}
                     modal={editModal}
                     MenuList={EditMenuList}
                    editData = {GetRolePermission}
                         /> 
                          : ""}                          
                </div>

            </div>
        </Fragment>
        );

}


export default RoleManagementList;