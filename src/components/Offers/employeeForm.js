import React, { Fragment, useState, useContext, useEffect } from "react";
import { Row, Col, Form, Button } from "react-bootstrap";
import { Search, PlusCircle, MinusCircle } from "react-feather";
import "./offers.css";
import { OfferContext } from "../../context/OfferState";
import { useHistory } from "react-router-dom";
import RehiredModal from "./RehiredModal";

const EmployeeForm = (props) => {
  const [state, setState] = useState({
    firstName: "",
    lastName: "",
    email: "",
  });

  const [yesChecked, setYesChecked] = useState(true);
  const [noChecked, setNoChecked] = useState(false);
  const [secondRef, setSecondRef] = useState(false);
  const [searchValue, setSearchValue] = useState("");
  const [editButton, setEditButton] = useState(false);
  const [disabled, setDisabled] = useState(false);
  const [empName1, setEmpName1] = useState("");
  const [empName2, setEmpName2] = useState("");
  const [refEmail1, setRefEmail1] = useState("");
  const [refEmail2, setRefEmail2] = useState("");
  const [desgination1, setDesignation1] = useState("");
  const [desgination2, setDesignation2] = useState("");
  const [modal, setModal] = useState(false);
  const [saveclick, setSaveclick] = useState(false);
  let history = useHistory();

  const {
    searchByAadhar,
    searchData,
    createCandidate,
    searchForEmp1,
    searchEmpData1,
    searchForEmp2,
    searchEmpData2,
    createCandidateResponse,
    editCandidate,
    viewCandidateId,
  } = useContext(OfferContext);

  const handleClose = () => setModal(false);
  const handleShow = () => setModal(true);

   useEffect(() => {
   
      setRefEmail1(searchEmpData1 !== null ? 
        (searchEmpData1.email !== undefined &&  searchEmpData1.email !== null ? searchEmpData1.email : ''):'');
    setDesignation1(searchEmpData1 !== null ? 
      (searchEmpData1.position !== undefined && searchEmpData1.position !== null ? searchEmpData1.position : ''):'');
  }, [searchEmpData1]);
 /*  useEffect(() => {
    setRefEmail1(searchEmpData1.email);
    setDesignation1(searchEmpData1.position);
  }, [searchEmpData1]);
  useEffect(() => {
    setRefEmail2(searchEmpData2.email);
    setDesignation2(searchEmpData2.position);
  }, [searchEmpData2]); */
  
  useEffect(() => {
    setRefEmail2(searchEmpData2 !== null ? 
      (searchEmpData2.email !== undefined && searchEmpData2.email !== null ? searchEmpData2.email : ''):'');
    setDesignation2(searchEmpData2 !== null ?
      (searchEmpData2.position !== undefined && searchEmpData2.position !== null ? searchEmpData2.position : ''):'' );
  }, [searchEmpData2]);

  useEffect(() => {
    if (empName1 === "") {
      setRefEmail1("");
      setDesignation1("");
    }
    if (empName2 === "") {
      setRefEmail2("");
      setDesignation2("");
    }
  }, []);

  useEffect(() => {
    if (searchData !== null && Object.keys(searchData).length > 0) {
      setModal(true);
      console.log("searchData in if", searchData);
    }
    console.log("searchData out if", searchData);
  }, [searchData]);
  const searchHandler = (e) => {
    setSearchValue(e.target.value);
  };

  const searchDataHandler = () => {
    if (searchValue !== null) {
      searchByAadhar(searchValue);
    }
  };
  /* const callback = (yesValue) => {
    console.log("yesValue", yesValue);
    setState({
      firstName: searchData.firstName,
      lastName: searchData.lastName,
      email: searchData.personalEmail,
    });
    searchData.candidateReferences !== null &&
      searchData.candidateReferences !== undefined &&
      searchData.candidateReferences.map((item) => {
        return (
          setEmpName1(item[0].employeeName),
          setEmpName2(item[1].employeeName),
          setRefEmail1(item[0].email),
          setRefEmail2(item[1].email),
          setDesignation1(item[0].designation),
          setDesignation2(item[1].designation)
        );
      });
  }; */

  const showOneMoreRefer = () => {
    setSecondRef(true);
  };
  const hideOneMoreRefer = () => {
    setSecondRef(false);
    setEmpName2("");
    setRefEmail2('')
    setDesignation2('')
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
  const changeHandler = (e) => {
    setState({
      ...state,
      [e.target.name]: e.target.value,
    });
  };
  const empName1Handler = (e) => {
    setEmpName1(e.target.value);
    if (e.target.value === "") {
      setRefEmail1("");
      setDesignation1("");
    }
  };
  const empName2Handler = (e) => {
    setEmpName2(e.target.value);
    if (e.target.value === "") {
      setRefEmail2("");
      setDesignation2("");
    }
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

  const submitHandler = (e) => {
    e.preventDefault();
    let CandidateInfo;
    console.log(
      "employee form id1",
      typeof createCandidateResponse,
      createCandidateResponse
    );
    if (saveclick === false) {
      console.log("first click");
      if (
        // typeof createCandidateResponse !== "undefined" ||
        typeof createCandidateResponse !== "object"
        // || typeof createCandidateResponse.candidateId !== "null" ||
        // createCandidateResponse.candidateId < 0
      ) {
        console.log("employee form id", createCandidateResponse.candidateId);
        console.log("user not created");
        setSaveclick(true);
      }
      CandidateInfo = {
        aadhaarDoc: null,
        aadhaarName: null,
        aadhaarNumber: searchValue,
        bloodGroup: null,
        candidateId: 0,
        candidateReferences: [
          {
            designation: desgination1 !== null ? desgination1 : null,
            email: refEmail1 !== null ? refEmail1 : null,
            employeeName: empName1 !== null ? empName1 : null,
            referenceId: 0,
          },
          {
            designation: desgination2 !== null ? desgination2 : null,
            email: refEmail2 !== null ? refEmail2 : null,
            employeeName: empName2 !== null ? empName2 : null,
            referenceId: 0,
          },
        ],
        createdDate: null,
        dateOfBirth: null,
        disability: null,
        disabilityDoc: null,
        fatherName: null,
        firstName: state.firstName,
        gender: null,
        lastName: state.lastName,
        lgbt: null,
        maritalStatus: null,
        nationality: null,
        panDoc: null,
        panNumber: null,
        personalEmail: state.email,
        photo: null,
        refered: true,
        status: 1,
        verificationStatus: 0,
      };
    } else if (createCandidateResponse && saveclick === true) {
      CandidateInfo = {
        aadhaarDoc: null,
        aadhaarName: null,
        aadhaarNumber: searchValue,
        bloodGroup: null,
        candidateId: createCandidateResponse.candidateId,
        candidateReferences: [
          {
            designation: desgination1 !== null ? desgination1 : null,
            email: refEmail1 !== null ? refEmail1 : null,
            employeeName: empName1 !== null ? empName1 : null,
            referenceId: 0,
          },
          {
            designation: desgination2 !== null ? desgination2 : null,
            email: refEmail2 !== null ? refEmail2 : null,
            employeeName: empName2 !== null ? empName2 : null,
            referenceId: 0,
          },
        ],
        createdDate: null,
        dateOfBirth: null,
        disability: null,
        disabilityDoc: null,
        fatherName: null,
        firstName: state.firstName,
        gender: null,
        lastName: state.lastName,
        lgbt: null,
        maritalStatus: null,
        nationality: null,
        panDoc: null,
        panNumber: null,
        personalEmail: state.email,
        photo: null,
        refered: true,
        status: 1,
        verificationStatus: 0,
      };
    }

    console.log("CandidateInfo info", CandidateInfo);

    if (
      saveclick === true &&
      createCandidateResponse &&
      createCandidateResponse.candidateId
    ) {
      editCandidate(CandidateInfo);
    } else {
      createCandidate(CandidateInfo);
    }
    setDisabled(true);
    if (createCandidateResponse && createCandidateResponse.candidateId) {
      viewCandidateId(createCandidateResponse.candidateId);
    }
    setEditButton(true);
    const checkedInput = props.checkedHandler;
    checkedInput();
  };

  const editHandler = () => {
    setDisabled(false);
    console.log("state", state);
  };
  return (
    <Fragment>
      <Form onSubmit={submitHandler}>
        <Row style={{ marginBottom: "1rem" }}>
          <Col sm={4}>
            <Form.Group>
              <Form.Label>Search by Account Number/Aadhar Number</Form.Label>
              <div className="faq-form">
                <input
                  className="form-control searchButton"
                  type="text"
                  disabled={disabled}
                  placeholder="Search.."
                  onChange={(e) => searchHandler(e)}
                />
                <Search
                  className="search-icon"
                  style={{ color: "#313131" }}
                  onClick={searchDataHandler}
                />
              </div>
            </Form.Group>
          </Col>
          <RehiredModal
            modal={modal}
            handleClose={handleClose}
            /*  callback={callback} */
          />
        </Row>
        <Row>
          <Col sm={4}>
            <Form.Group>
              <Form.Label>First Name</Form.Label>
              <Form.Control
                className="form-input"
                type="text"
                name="firstName"
                value={state.firstName}
                onChange={changeHandler}
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
                value={state.lastName}
                onChange={changeHandler}
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
                value={state.email}
                onChange={changeHandler}
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
                    value={empName1 === "" ? "" : refEmail1}
                    /*  value={refEmail1} */
                    onChange={(e) => setRefEmail1(e.target.value)}
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
                    value={empName1 === "" ? "" : desgination1}
                    /*  value={desgination1} */
                    onChange={(e) => setDesignation1(e.target.value)}
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
                  /*  value={refEmail2} */
                  onChange={(e) => setRefEmail2(e.target.value)}
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
                  /* value={desgination2} */
                  onChange={(e) => setDesignation2(e.target.value)}
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

export default EmployeeForm;
