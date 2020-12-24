import React, {Fragment, useContext, useEffect, useState} from 'react';
import Breadcrumb from '../common/breadcrumb';
import { Container, Row, Col, Table, Button } from 'react-bootstrap'
import { GroupContext} from '../../context/GroupState'
import { Edit2 } from 'react-feather'
import CreateGroup from './CreateGroup'
import UpdateGroup from './UpdateGroup';

const ViewGroup = () => {
    const [modal, setModal] = useState(false);
    const [editModal, setEditModal] = useState(false)
    const [groupName, setGroupName] = useState()
    const [status, setStatus] = useState()
    const [empIds, setEmpIds] = useState()
    const [groupId, setGroupId] = useState()
    const [emps, setEmps] = useState()

    const {serviceGroupView, serviceGroupList, loader} = useContext(GroupContext)

    const handleClose = () => setModal(false)
    const handleEditClose = () => setEditModal(false)
       
    const handleShow = () => setModal(true)

    useEffect(() => {
        serviceGroupView()
    },[])
    return (
        <Fragment>
            <Breadcrumb title="View Group" parent="View Group" />
            <Container fluid>
                <Row>
                    <Col sm={12}>
                        <div className="card" style={{ overflowX: "auto" }}>
                            <div className="title_bar" >
                                    {/* <div className="job-filter">
                                        <div className="faq-form mr-2">
                                            <input className="form-control searchButton" type="text" placeholder="Search.." onChange={(e) => searchHandler(e)} />
                                            <Search className="search-icon" style={{ color: "#313131" }} onClick={searchDataHandler} />
                                        </div>
                                    </div> */}
                                <Button className="apply-button btn btn-light mr-2"
                                onClick={handleShow}>Create</Button>
                            </div>
                            <CreateGroup handleClose={handleClose} modal={modal} />
                            <div className="table-responsive">
                                <Table id="table-to-xls" className="table table-hover">
                                    <thead className="thead-light" style={{ backgroundColor: "#2f3c4e" }}>
                                        <tr>
                                            <th>S.No</th>
                                            <th>Service Group Name</th>
                                            <th>No. of Employees</th>
                                            <th>Status</th>
                                            <th></th>
                                        </tr>
                                    </thead>
                                   {loader === true && serviceGroupList !== null && 
                                   serviceGroupList !== undefined ?
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
                               </tbody>:
                                    serviceGroupList !== null && serviceGroupList !== undefined &&
                                    serviceGroupList.length > 0 ?
                                   serviceGroupList.map((item,i)=> {
                                       return (
                                           <tbody key={i}>
                                               <tr>
                                                   <td>{i+1}</td>
                                                   <td>{item.groupName}</td>
                                                   <td>{item.teamCount}</td>
                                                   <td>{item.status === 0 ? 'Active' : 'Inactive'}</td>
                                                   
                                                   <td><Edit2 onClick={() => {
                                                       setEditModal(true); setGroupName(item.groupName);
                                                       setStatus(item.status); setEmpIds(item.employeeIds)
                                                       setGroupId(item.groupId)
                                                       setEmps(item.employees)
                                                   }} /></td>
                                               </tr>
                                           </tbody>
                                       )
                                   }): <tbody>
                                   <tr>
                                       <td colSpan='10'>No Record Found</td>
                                   </tr>
                               </tbody>}
                                </Table>
                            </div>
                        </div>
                        <UpdateGroup  handleEditClose={handleEditClose} modal={editModal}
                        status={status} groupName={groupName} empIds={empIds}
                        groupId={groupId} emps={emps} />
                    </Col>
                </Row>
            </Container>
        </Fragment>
    );
};

export default ViewGroup;