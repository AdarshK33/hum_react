import React, { Fragment, useState, useContext, useEffect } from 'react';
import Breadcrumb from '../common/breadcrumb';
import { Row, Col, Table, Button } from 'react-bootstrap'
import { Edit2 } from 'react-feather'
import {PermissionContext} from '../../context/PermissionState'
import { AppContext } from "../../context/AppState";

const Permissions = () => {
   
    const [yesFlag , setYesFLag] = useState(false);
    const [noFlag, setNoFlag] = useState(true);
    const [leaveStatus, setLeaveStatus] = useState();
    const [yesRosterFlag , setYesRosterFLag] = useState(false);
    const [noRosterFlag, setNoRosterFlag] = useState(true);
    const [rosterStatus, setRosterStatus] = useState();

    
    const {editPermission, viewPermission, permissionList} = useContext(PermissionContext)
    const { user } = useContext(AppContext);

    useEffect(()=>{
        viewPermission()
    }, [])
    useEffect(()=>{
        if(permissionList !== null){
            if(permissionList.leaveStatus === 1){
                setYesFLag(true)
                setNoFlag(false)
                
            }else{
                setYesFLag(false)
                setNoFlag(true)
            }
            if(permissionList.rosterStatus === 1){
                setYesRosterFLag(true)
                setNoRosterFlag(false)
            }else{
                setYesRosterFLag(false)
                setNoRosterFlag(true)
            }
            setLeaveStatus(permissionList.leaveStatus);
            setRosterStatus(permissionList.rosterStatus);

        }
    }, [permissionList])

    const checkYesHandler = () => {
        setYesFLag(!yesFlag)
        setNoFlag(yesFlag)
        setLeaveStatus(1)

        const Values = {
            emailId: permissionList.emailId,
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
            emailId: permissionList.emailId,
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
            emailId: permissionList.emailId,
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
            emailId: permissionList.emailId,
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
                                            {/* {permissionList!==undefined && permissionList.leaveStatus==="1"? */}
                                                <input
                                                    type="checkbox"
                                                    checked={yesFlag}
                                                    onChange={() => checkYesHandler()}
                                                    name="selectCheckbox"
                                                />
                                                {/* :
                                                <input
                                                    type="checkbox"
                                                    checked={yesFlag}
                                                    onChange={() => checkYesHandler()}
                                                    name="selectCheckbox"
                                                />} */}
                                                
                                            </td>
                                            <td>   
                                                {/* {permissionList!==undefined && permissionList.leaveStatus==="1"? */}
                                                    <input
                                                        type="checkbox"
                                                        checked={noFlag}
                                                        onChange={() => checkNoHandler()}
                                                        name="selectCheckbox"
                                                    />
                                                    {/* :
                                                    <input
                                                        type="checkbox"
                                                        checked={noFlag}
                                                        onChange={() => checkNoHandler()}
                                                        name="selectCheckbox"
                                                    />}                                                */}
                                                
                                            </td>

                                            
                                        </tr>
                                        <tr>
                                            <td style = {{textAlign: "left" , fontWeight : "bold"}}>Allow Email Notifications to be triggered for Roster</td>
                                            <td>
                                                {/* {permissionList!==undefined && permissionList.rosterStatus=="1"? */}
                                                    <input
                                                    type="checkbox"
                                                    checked={yesRosterFlag}
                                                    onChange={() => checkRosterYesHandler()}
                                                    name="selectCheckbox"
                                                />
                                                {/* :

                                                <input
                                                    type="checkbox"
                                                    checked={noRosterFlag}
                                                    onChange={() => checkRosterYesHandler()}
                                                    name="selectCheckbox"
                                                />
                                                }                                */}
                                                
                                                
                                            </td>
                                            <td>
                                                {/* {permissionList!==undefined && permissionList.rosterStatus=="1"? */}
                                                        <input
                                                        type="checkbox"
                                                        checked={noRosterFlag}
                                                        onChange={() => checkRosterNoHandler()}
                                                        name="selectCheckbox"
                                                    />
                                                    {/* :

                                                    <input
                                                        type="checkbox"
                                                        checked={yesRosterFlag}
                                                        onChange={() => checkRosterNoHandler()}
                                                        name="selectCheckbox"
                                                />
                                                    }    */}
                                
                                                
                                                
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