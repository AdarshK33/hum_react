import React, { Fragment, useState, useContext, useEffect } from 'react';
import Breadcrumb from '../common/breadcrumb';
import { Row, Col, Table, Button } from 'react-bootstrap'
import { Edit2 } from 'react-feather'
import {PermissionContext} from '../../context/PermissionState'
import { AppContext } from "../../context/AppState";

const Permissions = () => {
   
    const [yesFlag , setYesFLag] = useState(false);
    const [noFlag, setNoFlag] = useState(true);
    const [leaveStatus, setLeaveStatus] = useState(0);
    const [yesRosterFlag , setYesRosterFLag] = useState(false);
    const [noRosterFlag, setNoRosterFlag] = useState(true);
    const [rosterStatus, setRosterStatus] = useState(0);

    
    const {editPermission} = useContext(PermissionContext)
    const { user } = useContext(AppContext);

    const checkYesHandler = () => {
        setYesFLag(!yesFlag)
        setNoFlag(yesFlag)
        setLeaveStatus(1)

        const Values = {
            emailId: user.personalEmail,
            leaveStatus: 1,
            rosterStatus: rosterStatus
            }
            // console.log(Values);
            editPermission(Values);
    }
   
    const checkNoHandler = () => {
        setYesFLag(noFlag)
        setNoFlag(!noFlag)
        setLeaveStatus(0)

        const Values = {
            emailId: user.personalEmail,
            leaveStatus: 0,
            rosterStatus: rosterStatus
            }
            // console.log(Values);
            editPermission(Values);
    }

    const checkRosterYesHandler = () => {
        setYesRosterFLag(!yesRosterFlag)
        setNoRosterFlag(yesRosterFlag)
        setRosterStatus(1)

        const Values = {
            emailId: user.personalEmail,
            leaveStatus: leaveStatus,
            rosterStatus: 1
            }
            // console.log(Values);
            editPermission(Values);
    }
   
    const checkRosterNoHandler = () => {
        setYesRosterFLag(noRosterFlag)
        setNoRosterFlag(!noRosterFlag)
        setRosterStatus(0)

        const Values = {
            emailId: user.personalEmail,
            leaveStatus: leaveStatus,
            rosterStatus: 0
            }
            // console.log(Values);
            editPermission(Values);
    }
    return(
    <Fragment>
            <Breadcrumb title="Permissions" parent="Permissions" />
            <div className="container-fluid">
                
                <Row className="apply-button-row">
                    <Col className="leaveApplications">Allow Notifications</Col>
                    
                </Row>

                <div className="table-responsive">
                <Table id="table-to-xls1" className="table table-hover">
                            <thead className="thead-light" style={{ backgroundColor: "#2f3c4e" }}>
                                <tr>
                                    <th></th>
                                    <th>Yes</th>
                                    <th> No</th>
                                    

                                </tr>
                            </thead>
                                 <tbody >
                                        <tr>
                                            <td style = {{textAlign: "left" , fontWeight : "bold"}}>Allow Email Notifications to be triggered for Leave</td>
                                            <td>
                                
                                                <input
                                                    type="checkbox"
                                                    checked={yesFlag}
                                                    onChange={() => checkYesHandler()}
                                                    name="selectCheckbox"
                                                />
                                                
                                            </td>
                                            <td>
                                
                                                <input
                                                    type="checkbox"
                                                    checked={noFlag}
                                                    onChange={() => checkNoHandler()}
                                                    name="selectCheckbox"
                                                />
                                                
                                            </td>

                                            
                                        </tr>
                                        <tr>
                                            <td style = {{textAlign: "left" , fontWeight : "bold"}}>Allow Email Notifications to be triggered for Roster</td>
                                            <td>
                                
                                                <input
                                                    type="checkbox"
                                                    checked={yesRosterFlag}
                                                    onChange={() => checkRosterYesHandler()}
                                                    name="selectCheckbox"
                                                />
                                                
                                            </td>
                                            <td>
                                
                                                <input
                                                    type="checkbox"
                                                    checked={noRosterFlag}
                                                    onChange={() => checkRosterNoHandler()}
                                                    name="selectCheckbox"
                                                />
                                                
                                            </td>

                                            
                                        </tr>

                                    </tbody>
                                    </Table>  
                                            
                </div>
                

            </div>
        </Fragment>
        );

}


export default Permissions;