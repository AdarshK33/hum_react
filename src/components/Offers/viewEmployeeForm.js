import React, { Fragment, useState, useContext, useEffect } from "react";
import { Row, Col, Form, Button } from "react-bootstrap";
import { Search, PlusCircle, MinusCircle } from "react-feather";
import "./offers.css";
import { OfferContext } from "../../context/OfferState";

const ViewEmployeeForm = () => {
  const [firstName, setFirstName] = useState();
  const [lastName, setLastName] = useState();
  const [email, setEmail] = useState();
  const [yesChecked, setYesChecked] = useState(true);
  const [noChecked, setNoChecked] = useState(false);
  const [secondRef, setSecondRef] = useState(false);
  const [empName1, setEmpName1] = useState("");
  const [empName2, setEmpName2] = useState("");
  const [refEmail1, setRefEmail1] = useState();
  const [refEmail2, setRefEmail2] = useState();
  const [desgination1, setDesignation1] = useState();
  const [desgination2, setDesignation2] = useState();

  const {
    candidateData,
    searchForEmp1,
    editCandidate,
    searchForEmp2,
  } = useContext(OfferContext);

  var candidateRefData =
    candidateData !== null &&
    candidateData !== undefined &&
    candidateData.candidateInformation;
  var data1 =
    candidateRefData !== undefined &&
    candidateRefData.candidateReferences !== null &&
    candidateRefData.candidateReferences !== undefined &&
    candidateRefData.candidateReferences[0];
  var data2 =
    candidateRefData !== undefined &&
    candidateRefData.candidateReferences !== null &&
    candidateRefData.candidateReferences !== undefined &&
    candidateRefData.candidateReferences[1];
  console.log("data1", data1);
  console.log("data2", data2);

  useEffect(() => {
    if (data1.employeeName === "") {
      setYesChecked(false);
      setNoChecked(true);
    }

    if (data2.employeeName === "") {
      setSecondRef(false);
    } else {
      setSecondRef(true);
    }
  }, [data1, data2]);

  useEffect(() => {
    let candidateRefData =
      candidateData !== null &&
      candidateData !== undefined &&
      candidateData.candidateInformation;
    console.log("candidateData outside", candidateRefData);
    if (candidateRefData !== null && candidateRefData !== undefined) {
      console.log("candidateData", candidateRefData);
      setFirstName(candidateRefData.firstName);
      setLastName(candidateRefData.lastName);
      setEmail(candidateRefData.personalEmail);

      // candidateRefData.candidateReferences !== null &&
      // candidateRefData.candidateReferences !== undefined &&
      // candidateRefData.candidateReferences.length > 0
      //   ? (() => {
      //       setYesChecked(true);
      //       setNoChecked(false);
      //     })()
      //   : (() => {
      //       setYesChecked(false);
      //       setNoChecked(true);
      //     })();

      const data1 =
        candidateRefData.candidateReferences !== null &&
        candidateRefData.candidateReferences !== undefined &&
        candidateRefData.candidateReferences[0];
      setEmpName1(
        data1 !== null &&
          data1 !== undefined &&
          data1.employeeName !== undefined &&
          (data1.employeeName !== "" ? data1.employeeName : "")
      );
      console.log("empName", data1.employeeName);
      setRefEmail1(
        data1 !== null &&
          data1 !== undefined &&
          data1.email !== undefined &&
          data1.email
      );
      setDesignation1(
        data1 !== null &&
          data1 !== undefined &&
          data1.designation !== undefined &&
          (data1.designation !== null ? data1.designation : "")
      );
      const data2 =
        candidateRefData.candidateReferences !== null &&
        candidateRefData.candidateReferences !== undefined &&
        candidateRefData.candidateReferences[1];
      setEmpName2(
        data2 !== null &&
          data2 !== undefined &&
          data2.employeeName !== undefined &&
          (data2.employeeName !== "" ? data2.employeeName : "")
      );
      setRefEmail2(
        data2 !== null &&
          data2 !== undefined &&
          data2.email !== undefined &&
          (data2.email !== "" ? data2.email : "")
      );
      setDesignation2(
        data2 !== null &&
          data2 !== undefined &&
          data2.designation !== undefined &&
          (data2.designation !== null ? data2.designation : "")
      );
    }
  }, [candidateData]);

  return (
    <Fragment>
      <Form>
        <Row>
          <Col sm={4}>
            <Form.Group>
              <Form.Label>First Name</Form.Label>
              <Form.Control
                className="form-input"
                type="text"
                name="firstName"
                value={firstName}
                placeholder="First Name"
                readOnly
              />
            </Form.Group>
          </Col>
          <Col sm={4}>
            <Form.Group>
              <Form.Label>Last Name</Form.Label>
              <Form.Control
                className="form-input"
                type="text"
                name="lastName"
                value={lastName}
                placeholder="Last Name"
                readOnly
              />
            </Form.Group>
          </Col>
          <Col sm={4}>
            <Form.Group>
              <Form.Label>Personal Email ID</Form.Label>
              <Form.Control
                type="email"
                className="form-input"
                name="email"
                value={email}
                placeholder="Personal Email ID"
                readOnly
              />
            </Form.Group>
          </Col>
        </Row>
        <Row>
          <Col sm={4}>
            <p>Were you referred for this position?</p>
          </Col>
          <Col sm={4}>
            Yes &nbsp;{" "}
            <input type="checkbox" name="refrence" checked={yesChecked} />
            &nbsp; &nbsp;&nbsp; &nbsp; No &nbsp;{" "}
            <input type="checkbox" name="refrence" checked={noChecked} />
          </Col>
        </Row>
        <Fragment>
          {yesChecked === true ? (
            <Row>
              <Col sm={4}>
                <Form.Group>
                  <Form.Label>Emp Name/Emp ID</Form.Label>
                  <div className="faq-form">
                    <input
                      className="form-control searchButton"
                      type="text"
                      value={empName1}
                      placeholder="Search by Emp Name/Emp Id"
                      readOnly
                    />
                    {/* <Search
                        className="search-icon"
                        style={{ color: "#313131" }}
                      /> */}
                  </div>
                </Form.Group>
              </Col>
              <Col sm={4}>
                <Form.Group>
                  <Form.Label>Email</Form.Label>
                  <Form.Control
                    className="form-input"
                    type="text"
                    value={refEmail1}
                    readOnly
                  />
                </Form.Group>
              </Col>
              <Col sm={4}>
                <Form.Group>
                  <Form.Label>Designation</Form.Label>
                  <Form.Control
                    className="form-input"
                    type="text"
                    value={desgination1}
                    readOnly
                  />
                </Form.Group>
              </Col>
            </Row>
          ) : (
            ""
          )}
          {secondRef === true && yesChecked === true ? (
            <Row>
              <Col sm={4}>
                <Form.Group>
                  <Form.Label>Emp Name/Emp ID</Form.Label>
                  <div className="faq-form">
                    <input
                      className="form-control searchButton"
                      type="text"
                      value={empName2}
                      placeholder="Search by Emp Name/Emp Id"
                      readOnly
                    />
                    {/* <Search
                        className="search-icon"
                        style={{ color: "#313131" }}
                      /> */}
                  </div>
                </Form.Group>
              </Col>
              <Col sm={4}>
                <Form.Group>
                  <Form.Label>Email</Form.Label>
                  <Form.Control
                    className="form-input"
                    type="text"
                    readOnly
                    value={empName2 === "" ? "" : refEmail2}
                  />
                </Form.Group>
              </Col>
              <Col sm={4}>
                <Form.Group>
                  <Form.Label>Designation</Form.Label>
                  <Form.Control
                    className="form-input"
                    type="text"
                    value={empName2 === "" ? "" : desgination2}
                    readOnly
                  />
                </Form.Group>
              </Col>
            </Row>
          ) : (
            ""
          )}
        </Fragment>
        {/* ) : (
          ""
        )} */}
      </Form>
    </Fragment>
  );
};

export default ViewEmployeeForm;
