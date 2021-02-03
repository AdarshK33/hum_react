import React, { Fragment, useState, useContext, useEffect } from 'react';
import Breadcrumb from '../common/breadcrumb';
import { Row, Col, Table } from 'react-bootstrap'
import { PermissionContext } from '../../context/PermissionState'
//import { AppContext } from "../../context/AppState";
import Switch from 'react-switch'

const Permissions = () => {

    const [yesFlag, setYesFLag] = useState(false);
    const [noFlag, setNoFlag] = useState(true);
    const [leaveStatus, setLeaveStatus] = useState();
    const [yesRosterFlag, setYesRosterFLag] = useState(false);
    const [noRosterFlag, setNoRosterFlag] = useState(true);
    const [rosterStatus, setRosterStatus] = useState();
    const [yesSupportFlag, setYesSupportFLag] = useState(false);
    const [noSupportFlag, setNoSupportFlag] = useState(true);
    const [supportStatus, setSupportStatus] = useState();
    const [checked, setChecked] = useState(false)


    const { editPermission, viewPermission, permissionList, 
        viewServiceGroup, groupList, createServiceGroup } = useContext(PermissionContext)

    useEffect(() => {
        viewPermission()
        viewServiceGroup()
    }, [])
    useEffect(() => {
        if (permissionList !== null) {
            if (permissionList.leaveStatus === 1) {
                setYesFLag(true)
                setNoFlag(false)

            } else {
                setYesFLag(false)
                setNoFlag(true)
            }
            if (permissionList.rosterStatus === 1) {
                setYesRosterFLag(true)
                setNoRosterFlag(false)
            } else {
                setYesRosterFLag(false)
                setNoRosterFlag(true)
            }
            setLeaveStatus(permissionList.leaveStatus);
            setRosterStatus(permissionList.rosterStatus);

        }
    }, [permissionList])

    useEffect(() => {
        if (groupList !== null) {
            if (groupList.groupStatus === 1) {
                setYesSupportFLag(true)
                setNoSupportFlag(false)

            } else {
                setYesSupportFLag(false)
                setNoSupportFlag(true)
            }
            setSupportStatus(groupList.groupStatus);
            console.log("groupList inside", groupList)
        }
        console.log("groupList outside", groupList)
    }, [groupList])

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
    const checkSupportYesHandler = () => {
        setYesSupportFLag(!yesSupportFlag)
        setNoSupportFlag(yesSupportFlag)
        setSupportStatus(1)

        const Values = {
            groupId: groupList === null ? 0 : groupList.groupId,
            groupStatus: 1
        }
        console.log("yes values",Values)
        createServiceGroup(Values);
    }

    const checkSupportNoHandler = () => {
        setYesSupportFLag(noSupportFlag)
        setNoSupportFlag(!noSupportFlag)
        setSupportStatus(0)

        const Values = {
            groupId: groupList === null ? 0 : groupList.groupId ,
            groupStatus: 0
        }
        console.log("no values",Values)
        createServiceGroup(Values);
    }

    return (
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
                                <td style={{ textAlign: "left", fontWeight: "bold" }}>Allow Email Notifications to be triggered for Leave</td>
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
                                <td style={{ textAlign: "left", fontWeight: "bold" }}>Allow Email Notifications to be triggered for Roster</td>
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
                            <tr>
                                <td style={{ textAlign: "left", fontWeight: "bold" }}>Allow Support Module to be Disabled</td>
                                <td>
                                    <input
                                        type="checkbox"
                                        checked={yesSupportFlag}
                                        onChange={checkSupportYesHandler}
                                        name="selectCheckbox"
                                    />
                                </td>
                                <td>
                                    <input
                                        type="checkbox"
                                        checked={noSupportFlag}
                                        onChange={checkSupportNoHandler}
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