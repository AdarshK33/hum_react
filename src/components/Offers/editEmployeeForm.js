import React, { Fragment, useState, useContext, useEffect } from "react";
import { Row, Col, Form, Button } from "react-bootstrap";
import { Search, PlusCircle, MinusCircle } from "react-feather";
import "./offers.css";
import { OfferContext } from "../../context/OfferState";
import { useHistory } from "react-router-dom";
import { toast } from "react-toastify";

const EditEmployeeForm = () => {
  const [firstName, setFirstName] = useState();
  const [lastName, setLastName] = useState();
  const [email, setEmail] = useState();
  const [yesChecked, setYesChecked] = useState(false);
  const [noChecked, setNoChecked] = useState(false);
  const [secondRef, setSecondRef] = useState(false);
  const [searchValue, setSearchValue] = useState("");
  const [editButton, setEditButton] = useState(false);
  const [disabled, setDisabled] = useState(false);
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
    searchEmpData1,
    searchForEmp2,
    searchEmpData2,
  } = useContext(OfferContext);

  useEffect(() => {
    /* setRefEmail1(searchEmpData1 !== null ? 
      (searchEmpData1.email !== undefined &&  searchEmpData1.email !== null ? searchEmpData1.email : ''):''); */
    setRefEmail1(
      searchEmpData1 !== null
        ? searchEmpData1.email !== undefined && searchEmpData1.email !== null
          ? searchEmpData1.email
          : ""
        : ""
    );
    setDesignation1(
      searchEmpData1 !== null
        ? searchEmpData1.position !== undefined &&
          searchEmpData1.position !== null
          ? searchEmpData1.position
          : ""
        : ""
    );
  }, [searchEmpData1]);

  useEffect(() => {
    setRefEmail2(
      searchEmpData2 !== null
        ? searchEmpData2.email !== undefined && searchEmpData2.email !== null
          ? searchEmpData2.email
          : ""
        : ""
    );
    setDesignation2(
      searchEmpData2 !== null
        ? searchEmpData2.position !== undefined &&
          searchEmpData2.position !== null
          ? searchEmpData2.position
          : ""
        : ""
    );
  }, [searchEmpData2]);

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
  /*  console.log("data1", data1);
  console.log("data2", data2); */
  useEffect(() => {
    console.log("check", candidateRefData, data1);
    if (
      candidateData !== null &&
      candidateData !== undefined &&
      candidateData.candidateInformation !== null &&
      candidateData.candidateInformation !== undefined &&
      candidateData.candidateInformation.referred === false
    ) {
      setYesChecked(false);
      setNoChecked(true);
    }
  }, [candidateData.candidateInformation]);
  useEffect(() => {
    console.log("check", candidateRefData, data1);
    // if (
    //   candidateRefData !== null &&
    //   candidateRefData !== undefined &&
    //   candidateRefData.referred === false &&
    //   data1 !== undefined &&
    //   data1 !== null
    // ) {
    //   setYesChecked(false);
    //   setNoChecked(true);
    // }

    if (
      candidateRefData !== null &&
      candidateRefData !== undefined &&
      candidateRefData.referred === false &&
      data2 !== undefined &&
      data2 !== null
    ) {
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
      console.log(
        " candidateRefData.candidateReferences",
        candidateRefData.candidateReferences
      );

      /*  if(candidateRefData.candidateReferences !== null &&
      candidateRefData.candidateReferences !== undefined &&
      candidateRefData.candidateReferences[0].employeeName === ''){
        
            setYesChecked(false);
            setNoChecked(true);
          }
        else{ 
            setYesChecked(true);
            setNoChecked(false);
          } */
      if (candidateRefData.referred == false) {
        setYesChecked(false);
        setNoChecked(true);
      } else {
        setYesChecked(true);
        setNoChecked(false);
      }
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

  const firstNameChangeHandler = (e) => {
    setFirstName(e.target.value);
  };
  const lastNameChangeHandler = (e) => {
    setLastName(e.target.value);
  };
  const emailChangeHandler = (e) => {
    setEmail(e.target.value);
  };
  const empName1Handler = (e) => {
    setEmpName1(e.target.value);
  };
  const empName2Handler = (e) => {
    setEmpName2(e.target.value);
  };
  const empName1Search = () => {
    if (empName1 !== "") {
      searchForEmp1(empName1);
    }
  };
  const empName2Search = () => {
    if (empName2 !== "") {
      searchForEmp2(empName2);
    }
  };
  const showOneMoreRefer = () => {
    setSecondRef(true);
  };
  const hideOneMoreRefer = () => {
    setSecondRef(false);
    setEmpName2("");
    setRefEmail2("");
    setDesignation2("");
  };

  const checkedYesHandler = () => {
    setYesChecked(true);
    setNoChecked(false);
  };
  const checkedNoHandler = () => {
    setNoChecked(true);
    setYesChecked(false);
    setSecondRef(false);
  };

  const submitHandler = (e) => {
    e.preventDefault();
    let firstNameError;
    let lastNameError;

    if (firstName !== "" && !/^[a-zA-Z]*$/g.test(firstName)) {
      firstNameError = true;
    } else {
      firstNameError = false;
    }

    if (lastName !== "" && !/^[a-zA-Z]*$/g.test(lastName)) {
      lastNameError = true;
    } else {
      lastNameError = false;
    }

    const updateData = {
      aadhaarDoc: null,
      aadhaarName: null,
      aadhaarNumber: candidateData.candidateInformation.aadhaarNumber,
      bloodGroup: null,
      candidateId: candidateData.candidateInformation.candidateId,
      candidateReferences: [
        {
          designation: desgination1 !== null ? desgination1 : null,
          email: refEmail1 !== null ? refEmail1 : null,
          employeeName: empName1 !== null ? empName1 : null,
          referenceId: data1.referenceId,
        },
        {
          designation: desgination2 !== null ? desgination2 : null,
          email: refEmail2 !== null ? refEmail2 : null,
          employeeName: empName2 !== null ? empName2 : null,
          referenceId: data2.referenceId,
        },
      ],
      createdDate: candidateData.candidateInformation.createdDate,
      dateOfBirth: null,
      disability: null,
      disabilityDoc: null,
      fatherName: null,
      firstName: firstName,
      gender: null,
      lastName: lastName,
      lgbt: null,
      maritalStatus: null,
      nationality: null,
      panDoc: null,
      panNumber: null,
      personalEmail: email,
      photo: null,
      referred: candidateData.candidateInformation.referred,
      status: candidateData.candidateInformation.status,
      statusDesc: candidateData.candidateInformation.statusDesc,
      verificationStatus: candidateData.candidateInformation.verificationStatus,
      verificationStatusDesc:
        candidateData.candidateInformation.verificationStatusDesc,
    };
    let refValue =
      updateData.candidateReferences[0].email === null ||
      !updateData.candidateReferences[0].email
        ? false
        : true;

    if (
      firstNameError === false &&
      lastNameError === false &&
      refValue === true
    ) {
      editCandidate(updateData);
      setDisabled(true);
      setEditButton(true);
    } else {
      toast.info("Please Enter Valid Input");
    }
  };
  const editHandler = () => {
    setDisabled(false);
  };
  return (
    <Fragment>
      <Form onSubmit={submitHandler}>
        {/*  <Row style={{ marginBottom: '1rem' }}>
                    <Col sm={4}>
                        <Form.Group>
                            <Form.Label>Search by Account Number/Aadhar Number</Form.Label>
                            <div className="faq-form">
                                <input className="form-control searchButton" type="text" readOnly
                                value={ candidateData.candidateInformation.adharNumber || ''} />
                            </div>
                        </Form.Group>
                    </Col>
                </Row> */}
        <Row>
          <Col sm={4}>
            <Form.Group>
              <Form.Label>First Name</Form.Label>
              <Form.Control
                className="form-input"
                type="text"
                name="firstName"
                value={firstName}
                onChange={firstNameChangeHandler}
                required
                placeholder="First Name"
                disabled={disabled}
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
                onChange={lastNameChangeHandler}
                required
                placeholder="Last Name"
                disabled={disabled}
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
                onChange={emailChangeHandler}
                required
                placeholder="Personal Email ID"
                disabled={disabled}
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
            <input
              type="checkbox"
              name="refrence"
              checked={yesChecked}
              onChange={checkedYesHandler}
            />
            &nbsp; &nbsp;&nbsp; &nbsp; No &nbsp;{" "}
            <input
              type="checkbox"
              name="refrence"
              checked={noChecked}
              onChange={checkedNoHandler}
            />
          </Col>
        </Row>
        {yesChecked === true ? (
          <Fragment>
            <p>
              State two reference(max two are allowed)
              <span style={{ color: "red" }}>*</span>
            </p>
            {/* {data1 !== null && data1 !== undefined && data1.employeeName !== '' ? ( */}
            <Row>
              <Col sm={4}>
                <Form.Group>
                  <Form.Label>
                    Emp Name/Emp ID <span style={{ color: "red" }}>*</span>
                  </Form.Label>
                  <div className="faq-form">
                    <input
                      className="form-control searchButton"
                      type="text"
                      disabled={disabled}
                      value={empName1}
                      placeholder="Search by Emp Name/Emp Id"
                      onChange={(e) => empName1Handler(e)}
                      required
                    />
                    <Search
                      className="search-icon"
                      style={{ color: "#313131" }}
                      onClick={empName1Search}
                    />
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
              <Col sm={3}>
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
              <PlusCircle
                style={{ color: "#376ebb" }}
                onClick={showOneMoreRefer}
                style={{ marginTop: "2rem", color: "#006EBB" }}
              />
            </Row>
          </Fragment>
        ) : (
          ""
        )}
        {/*   {data2 !== null && data2 !== undefined && data2.employeeName !== '' ? ( */}
        {secondRef === true && yesChecked === true ? (
          <Row>
            <Col sm={4}>
              <Form.Group>
                <Form.Label>
                  Emp Name/Emp ID <span style={{ color: "red" }}>*</span>
                </Form.Label>
                <div className="faq-form">
                  <input
                    className="form-control searchButton"
                    type="text"
                    disabled={disabled}
                    value={empName2}
                    placeholder="Search by Emp Name/Emp Id"
                    onChange={(e) => empName2Handler(e)}
                    required
                  />
                  <Search
                    className="search-icon"
                    style={{ color: "#313131" }}
                    onClick={empName2Search}
                  />
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
            <Col sm={3}>
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
            <MinusCircle
              style={{ color: "#376ebb" }}
              onClick={hideOneMoreRefer}
              style={{ marginTop: "2rem", color: "#006EBB" }}
            />
          </Row>
        ) : (
          ""
        )}
        <Row>
          <Col sm={4}></Col>
          <Col sm={2}>
            <Button type="submit">Save</Button>
          </Col>
          {editButton === true ? (
            <Col sm={2}>
              <Button onClick={editHandler}>Edit</Button>
            </Col>
          ) : (
            ""
          )}
        </Row>
      </Form>
    </Fragment>
  );
};

export default EditEmployeeForm;
