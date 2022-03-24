import React, { Fragment, useState, useContext, useEffect } from "react";
import { Row, Col, Form, Button } from "react-bootstrap";
import { Search, PlusCircle, MinusCircle } from "react-feather";
import "../Offers/offers.css";
import { OfferContext } from "../../context/OfferState";
import { useHistory } from "react-router-dom";
import { toast } from "react-toastify";
import "./offerReleaseandOnboarding.css";
import moment from "moment";

const ViewEmployeeForm = () => {
  const [firstName, setFirstName] = useState();
  const [lastName, setLastName] = useState();
  const [email, setEmail] = useState();
  const [yesChecked, setYesChecked] = useState(true);
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
    if (
      candidateRefData !== null &&
      candidateRefData !== undefined &&
      data1 !== undefined &&
      data1 !== null &&
      data1.employeeName === ""
    ) {
      setYesChecked(false);
      setNoChecked(true);
    }

    if (
      candidateRefData !== null &&
      candidateRefData !== undefined &&
      data2 !== undefined &&
      data2 !== null &&
      data2.employeeName === ""
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
    if (candidateRefData !== null && candidateRefData !== undefined) {
      setFirstName(candidateRefData.firstName);
      setLastName(candidateRefData.lastName);
      setEmail(candidateRefData.personalEmail);

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
    setYesChecked(!yesChecked);
    setNoChecked(yesChecked);
  };
  const checkedNoHandler = () => {
    setNoChecked(!noChecked);
    setYesChecked(noChecked);
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
    if (firstNameError === false && lastNameError === false) {
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
        <Row>
          <Col sm={3}>
            <Form.Group>
              <Form.Label>First Name</Form.Label>
              <br></br>
              <Form.Label className="headingColor">{firstName}</Form.Label>
            </Form.Group>
          </Col>
          <Col sm={3}>
            <Form.Group>
              <Form.Label>Last Name</Form.Label>
              <br></br>
              <Form.Label className="headingColor">{lastName}</Form.Label>
            </Form.Group>
          </Col>
          <Col sm={3}>
            <Form.Group>
              <Form.Label>Date of joining</Form.Label>
              <br></br>
              <Form.Label className="headingColor">
                {candidateData !== undefined &&
                candidateData.workInformation !== undefined
                  ? moment(candidateData.workInformation.dateOfJoin).format(
                      "YYYY-MM-DD"
                    )
                  : ""}
              </Form.Label>
            </Form.Group>
          </Col>
          <Col sm={3}>
            <Form.Group>
              <Form.Label>Personal Email ID</Form.Label>
              <br></br>
              <Form.Label className="headingColor">{email}</Form.Label>
            </Form.Group>
          </Col>
        </Row>
        <Row className="mt-4 mb-4">
          <Col sm={4}>
            <Form.Label>Were you referred for this position?</Form.Label>
          </Col>
          <Col sm={4}>
            {yesChecked === true ? (
              <Form.Label className="headingColor"> Yes</Form.Label>
            ) : (
              <Form.Label className="headingColor">No</Form.Label>
            )}
          </Col>
        </Row>
        {yesChecked === true ? (
          <Fragment>
            <Form.Label>
              State two reference(max two are allowed){" "}
              <span style={{ color: "red" }}>*</span>
            </Form.Label>
            {/* <span style={{ color: "red" }}>*</span> */}
            {/* {data1 !== null && data1 !== undefined && data1.employeeName !== '' ? ( */}
            <Row className="mt-4">
              <Col sm={4}>
                <Form.Group>
                  <Form.Label>Emp Name/Emp ID</Form.Label>
                  <br></br>
                  <Form.Label className="headingColor">{empName1}</Form.Label>
                </Form.Group>
              </Col>
              <Col sm={3}>
                <Form.Group>
                  <Form.Label>Designation</Form.Label>
                  <br></br>
                  <Form.Label className="headingColor">
                    {desgination1}
                  </Form.Label>
                </Form.Group>
              </Col>
              <Col sm={4}>
                <Form.Group>
                  <Form.Label>Email</Form.Label>
                  <br></br>
                  <Form.Label className="headingColor">{refEmail1}</Form.Label>
                </Form.Group>
              </Col>
            </Row>
          </Fragment>
        ) : (
          ""
        )}
        {/*   {data2 !== null && data2 !== undefined && data2.employeeName !== '' ? ( */}
        {secondRef === true && yesChecked === true ? (
          <Row className="mt-4">
            <Col sm={4}>
              <Form.Group>
                <Form.Label>Emp Name/Emp ID</Form.Label>
                <br></br>
                <Form.Label className="headingColor">{empName2}</Form.Label>
              </Form.Group>
            </Col>

            <Col sm={3}>
              <Form.Group>
                <Form.Label>Designation</Form.Label>
                <br></br>
                <Form.Label className="headingColor">
                  {empName2 === "" ? "" : desgination2}
                </Form.Label>
              </Form.Group>
            </Col>
            <Col sm={4}>
              <Form.Group>
                <Form.Label>Email</Form.Label>
                <br></br>
                <Form.Label className="headingColor">
                  {empName2 === "" ? "" : refEmail2}
                </Form.Label>
              </Form.Group>
            </Col>
          </Row>
        ) : (
          ""
        )}
      </Form>
    </Fragment>
  );
};

export default ViewEmployeeForm;
