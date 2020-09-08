import React, { Fragment, useState, useContext, useEffect, useReducer } from 'react';
import Breadcrumb from '../common/breadcrumb';
import { Card, Row, Col, Table, Button, Modal } from 'react-bootstrap'
// import GrantLeaveAdd from './GrandLeaveAdd';
import { AdminContext } from "../../context/AdminState";
const GrantLeaveView = () => {

    const initial_state = {}
    const { state, viewGrantLeave, grantLeaveView } = useContext(AdminContext);

    const [modal, setModal] = useState(false);
    // const { state } = useContext(ClusterContext);
    const handleClose = () => setModal(false)
    const handleShow = () => setModal(true)
    // useEffect(() => {
    console.log(state)
    // }, [state]);

    // useEffect(() => {
    //     viewGrantLeave()
    // }, [])
    // alert(grantLeaveView)

    return (
        <Fragment>
            <Breadcrumb title="Grant Leave " parent=" Grant Leave " />
            <div className="container-fluid">
                <div className="row">
                    <div className="col-sm-12 main-heading-row">
                        <h4 className="main-heading"> Grant Leaves</h4>
                    </div>
                </div>

                <Row className="apply-button-row">
                    <Col className="leaveApplications">Leave Applications</Col>
                    <Col>
                        <Button className="apply-button" onClick={handleShow}>Apply</Button>
                    </Col>
                    {/* <GrantLeaveAdd handleClose={handleClose} modal={modal} /> */}
                </Row>


                <Row className="table">
                    <Table>
                        <thead>
                            <tr>
                                <th>Sr No.</th>
                                <th>Employee Id</th>
                                <th>Grant Leave Id</th>
                                <th>No of Days</th>
                                <th>Year</th>
                            </tr>

                        </thead>
                        {/* {grantLeaveView.length > 0 &&
                            grantLeaveView.map((e, i) => {
                                return (
                                    <tbody key={i + 1}>
                                        <tr>
                                            <td>{i + 1}</td>
                                            <td>
                                                {e.empId}
                                            </td>

                                           
                                        </tr>

                                    </tbody>
                                );
                            })} */}
                    </Table>
                </Row>
            </div>
        </Fragment>
    )
}

export default GrantLeaveView;
