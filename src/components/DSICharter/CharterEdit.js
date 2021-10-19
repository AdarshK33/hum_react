import React, { Fragment, useState, useContext, useEffect } from "react";
import { Row, Col, Form, Button, Container, Modal } from "react-bootstrap";
import { Search, PlusCircle, MinusCircle } from "react-feather";
import Breadcrumb from "../common/breadcrumb";
import { DSICharterContext } from "../../context/DSICharterState";
import {EmployeeSeparationContext} from "../../context/EmployeeSeparationState"
import { toast } from "react-toastify";
import { useHistory } from "react-router-dom";
import "react-datepicker/dist/react-datepicker.css";

const CharterEdit = () => {
  const [status,setStatus] = useState("")

  const [acknowledgementError,setAnknowledgementError] = useState("")

  const {  dsiCharterEnable,charterEnable} = useContext(DSICharterContext);
  const {ViewEmployeeProfile,employeeProfileData} = useContext(EmployeeSeparationContext)

  const handleCheckBox =(e)=>{
    console.log(e.target.value)
    if(e.target.value == "yes"){
      setStatus(true)
    }else if(e.target.value == "no"){
      setStatus(false)
    }
  }
  console.log(status,"status")
  const handleSave=(e)=>{
    e.preventDefault()
    if(status !== null && status !== undefined && status !== ""){
      setAnknowledgementError("")
      dsiCharterEnable(status)
    }else{
      setAnknowledgementError("Please select the checkbox")
    }
  }
  return (
    <Fragment>
      {/* {true?<Modal
          show={true}
          // onHide={handleTermination}
          size="md"
          centered
        >
          <Modal.Header closeButton className="modal-line"></Modal.Header>
          <Modal.Body className="mx-auto">
            <label className="text-center">
              Disciplinary action has to be taken before termination.
              <br />            
            </label>
            <div className="text-center mb-2">
              <Button onClick={""}>Close</Button>
              <Button onClick={""} style={{ marginLeft: "1rem" }}>
              Next
            </Button>

            </div>
          </Modal.Body>
        </Modal>:""} */}

      <Breadcrumb title="DSI Charter" parent="DSI Charter" />
      <div className="container-fluid">
        <div className="row">
          <div className="col-sm-12">
            <div className="card" style={{ borderRadius: "1rem" }}>
              <div>
                <div className="OnBoardHeading">
                  <b>DSI Charter </b>
                </div>
                <Form>
                 <Row
                    style={{
                      marginRight: "2rem",
                    }}
                  >
                    <Col>
                     {/*   <Row
                        style={{
                          marginLeft: "2rem",
                          marginTop: "2rem",
                          marginBottom: "1rem",
                        }}
                      >
                        <div className="boxField input">
                  <input
                    className="largerCheckbox"
                    type="checkbox"
                    value={acknowledgement}
                    checked={acknowledgement}
                    // required={required}
                    onChange={(e) => handleCheckBox(e)}
                  />
                </div>
                        <Col sm={5}>
                          <div>
                            <label>Enable charter acknowledgement for all Employees:</label>
                          </div>
                        </Col>
                      
                  </Row> */}
                  <Row
                          style={{
                            marginLeft: "2rem",
                            marginTop: "1rem",
                            marginBottom: "3rem",
                          }}
                        >
                          <Col sm={5}>
                            <label>
                            Enable charter acknowledgement for all Employees:
                            </label><br/>
                            {acknowledgementError ? (
                            <p style={{ color: "red" }}>{acknowledgementError}</p>
                          ) : (
                            ""
                          )}
                          </Col>
                          <Col sm={2} style={{ marginTop: "0.25rem" }}>
                              <div className="boxField_2 input">
                                <input
                                  className="largerCheckbox"
                                  type="checkbox"
                                  value="yes"
                                  checked={status}
                                  style={
                                    acknowledgementError
                                      ? { borderColor: "red" }
                                      : { borderColor: "blue" }
                                  }
                                  // required={required}
                                  onChange={handleCheckBox}
                                />
                                <label className="itemResult">Yes</label>
                              </div>
                          </Col>
                          <Col sm={1} style={{ marginTop: "0.25rem" }}>
                              <div className="boxField_2 input">
                                <input
                                  className="largerCheckbox"
                                  type="checkbox"
                                  value="no"
                                  checked={!status}
                                  style={
                                    acknowledgementError
                                      ? { borderColor: "red" }
                                      : { borderColor: "blue" }
                                  }
                                  // required={required}
                                  onChange={handleCheckBox}
                                />
                                <label className="itemResult">No</label>
                              </div>
                          </Col><br/>
                        
                        </Row>

                      <Row>
                        <Col
                          style={{
                            marginTop: "2rem",
                            marginBottom: "2rem",
                            textAlign: "center",
                          }}
                        >
                          <button
                            className={
                               "stepperButtons"
                            }
                            onClick={handleSave}
                          >
                            Submit
                          </button>
                          
                        </Col>
                      </Row>
                    </Col>
                  </Row>
                </Form>
              </div>
            </div>
          </div>
        </div>
      </div>
    </Fragment>
  );
};

export default CharterEdit;
