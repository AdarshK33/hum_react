import React, { Fragment, useState, useContext, useEffect } from "react";
import { Row, Col, Form, Button } from "react-bootstrap";
import "../Offers/offers.css";
import DatePicker from "react-datepicker";
import "react-datepicker/dist/react-datepicker.css";
import { ClusterContext } from "../../context/ClusterState";
import { AdminContext } from "../../context/AdminState";
import { OfferContext } from "../../context/OfferState";
import { RosterContext } from "../../context/RosterState";
import { AppContext } from "../../context/AppState";
import moment from "moment";
import "./offerReleaseandOnboarding.css";
const EditWorkInformation = () => {
  const [state, setState] = useState({
    employmentType: "",
    department: "",
    position: "",
    designation: "",
    sports: "",
    probation: "",
    recuritment: "",
    ngoDetail: "",
    internship: "",
    noticePeriod: "",
    managerId: null,
  });
  const [dateOfJoining, setDateOFJoining] = useState();
  const [dateOfLeaving, setDateOFLeaving] = useState();
  const [costCenter, setCostCenter] = useState("");
  const [editButton, setEditButton] = useState(false);
  const [disabled, setDisabled] = useState(false);
  const [college, setCollege] = useState("");

  const { viewSports, sportsNames } = useContext(ClusterContext);
  const { CostCenter, costCenterList } = useContext(AdminContext);
  const {
    departmentView,
    departmentName,
    designationView,
    designationName,
    locationView,
    locationName,
    createCandidateWork,
    candidateData,
    updateCandidateWork,
    stateList,
    stateData,
    cityData,
    cityList,
    managerList,
  } = useContext(OfferContext);
  const { viewContractTypes, shiftContractNames } = useContext(RosterContext);
  const { user } = useContext(AppContext);
  const [stateValue, setStateValue] = useState();
  const [city, setCity] = useState();

  useEffect(() => {
    viewSports();
    CostCenter();
    departmentView();
    viewContractTypes();
    designationView();
    stateData();
  }, []);

  useEffect(() => {
    let workData =
      candidateData !== null &&
      candidateData !== undefined &&
      candidateData.workInformation;

    if (workData !== null && workData !== undefined) {
      setState({
        employmentType: workData.contractType,
        department: workData.department,
        position: workData.position,
        designation: workData.designation,
        sports: workData.sportId !== null ? workData.sportId : "",
        probation: workData.probationPeriod,
        recuritment: workData.recruitmentSource,
        ngoDetail: workData.ngoDetails !== null ? workData.ngoDetails : "",
        internship: workData.internshipPeriod,
        noticePeriod: workData.noticePeriod,
        managerId: workData.managerId,
      });
      setDateOFJoining(new Date(workData.dateOfJoin));
      setDateOFLeaving(new Date(workData.dateOfLeaving));
      setCostCenter(workData.costCentre);
      locationView(workData.costCentre);
      setCollege(workData.collegeName);
    }
  }, [candidateData]);

  useEffect(() => {
    setStateValue(locationName.stateId);
    setCity(locationName.cityId);
    cityData(locationName.stateId);
    console.log("state in useEffect", locationName);
  }, [locationName]);

  const changeHandler = (e) => {
    setState({
      ...state,
      [e.target.name]: e.target.value,
    });
  };

  const stateHandler = (e) => {
    setStateValue(e.target.value);
    cityData(e.target.value);
    console.log("stateName in state handler", e.target.value);
  };

  const cityHandler = (e) => {
    setCity(e.target.value);
    console.log("city", e.target.value);
  };
  const costCenterChangeHandler = (e) => {
    setCostCenter(e.target.value);
    locationView(e.target.value);
    setStateValue(locationName.stateId);
    setCity(locationName.cityId);
    console.log("locationView", e.target.value);
  };

  const dateOfJoiningHandler = (date) => {
    // return date;
    return new Date(date);
    // setDateOFJoining(date);
  };
  const dateOfLeavingHandler = (date) => {
    setDateOFLeaving(date);
  };

  const submitHandler = (e) => {
    e.preventDefault();
    console.log(state, "state");
    console.log("candidateData work info", candidateData);
    const updateData = {
      candidateId: candidateData.candidateInformation.candidateId,
      cityId: city,
      collegeName: college,
      companyName: user.company,
      contractType: state.employmentType,
      costCentre: costCenter,
      dateOfJoin: moment(dateOfJoining).format("YYYY-MM-DD"),
      /* dateOfJoin: dateOfJoining, */
      dateOfLeaving:
        state.employmentType === "Internship"
          ? moment(dateOfLeaving).format("YYYY-MM-DD")
          : null,
      department: state.department,
      designation:
        state.employmentType === "Internship" ? "Intern" : state.designation,
      educationCertificate: null,
      internshipPeriod:
        state.employmentType === "Internship" ? state.internship : 0,
      locationId: locationName.locationId,
      managerId: managerList !== null ? state.managerId : user.employeeId,
      paySlip: null,
      position: state.employmentType === "Internship" ? null : state.position,
      probationPeriod:
        state.employmentType === "Internship" ? 0 : state.probation,
      recruitmentSource:
        state.employmentType === "Internship" ? null : state.recuritment,
      relievingLetter: null,
      workId: candidateData.workInformation
        ? candidateData.workInformation.workId
        : 0,
      ngoDetails: state.ngoDetail,
      noticePeriod:
        state.employmentType === "Internship" ? 0 : state.noticePeriod,
    };
    console.log("update data", updateData);
    updateCandidateWork(updateData);
    setDisabled(true);
    setEditButton(true);
  };
  const editHandler = () => {
    setDisabled(false);
    console.log("state", state);
  };
  var filterArray = stateList.filter(
    (word) => word.stateId === stateValue && word.cityId === city
  );

  return (
    console.log(state.sports),
    (
      <Fragment>
        <Form onSubmit={submitHandler}>
          <Row>
            <Col sm={3}>
              <Form.Group>
                <h5>Company Name</h5>
                <h5 className="headingColor">{user.company}</h5>
              </Form.Group>
            </Col>
            <Col sm={3}>
              <Form.Group className="reactDate">
                <h5>Type of Employment</h5>
                {candidateData.workInformation !== null && (
                  <h5 className="headingColor">{state.employmentType}</h5>
                )}
              </Form.Group>
            </Col>
            <Col sm={3}>
              <Form.Group>
                <h5>Designation</h5>
                {state.employmentType === "Internship" ? (
                  <h5 className="headingColor">Intern</h5>
                ) : (
                  <h6>{state.designation}</h6>
                )}
              </Form.Group>
            </Col>
            <Col sm={3}>
              <Form.Group>
                <h5>Department</h5>
                <h5 className="headingColor">{state.department}</h5>
              </Form.Group>
            </Col>
          </Row>
          <Row className="mt-4">
            <Col sm={3}>
              {state.employmentType === "Internship" ? (
                <Form.Group className="reactDate">
                  <h5>College Name</h5>
                  <h5 className="headingColor">{college}</h5>
                </Form.Group>
              ) : (
                <Form.Group>
                  <h5>Position</h5>
                  <h5 className="headingColor">{state.position}</h5>
                </Form.Group>
              )}
            </Col>
            <Col sm={3}>
              <Form.Group>
                <h5>Cost Center</h5>
                <h5 className="headingColor">{costCenter}</h5>
              </Form.Group>
            </Col>
            <Col sm={3}>
              <Form.Group className="reactDate">
                <h5>Manager Name/Id</h5>
                {managerList === null ? (
                  <h6>{user.employeeId}</h6>
                ) : (
                  <h5 className="headingColor">{state.managerId}</h5>
                )}
              </Form.Group>
            </Col>
            <Col sm={3}>
              <Form.Group>
                <h5>Sports</h5>
                {state.employmentType === "Internship" ? (
                  <h5 className="headingColor">N/A</h5>
                ) : (
                  <h5 className="headingColor">{state.sports}</h5>
                )}
              </Form.Group>
            </Col>
          </Row>
          <Row className="mt-4">
            <Col sm={3}>
              <Form.Group>
                <h5>Work Location state</h5>
                <h5 className="headingColor">
                  {filterArray !== undefined && filterArray[0] !== undefined
                    ? filterArray[0].stateName
                    : ""}
                </h5>
              </Form.Group>
            </Col>
            <Col sm={3}>
              <Form.Group>
                <h5>Work Location City</h5>
                <h5 className="headingColor">
                  {filterArray !== undefined && filterArray[0] !== undefined
                    ? filterArray[0].cityName
                    : ""}
                </h5>
              </Form.Group>
            </Col>

            <Col sm={3}>
              <Form.Group className="reactDate">
                <h5>Date of Joining</h5>
                <h5 className="headingColor">
                  {moment(dateOfJoining).format("YYYY-MM-DD")}
                </h5>
              </Form.Group>
            </Col>
            <Col sm={3}>
              {state.employmentType === "Internship" ? (
                <Form.Group className="reactDate">
                  <h5>Date of Leaving</h5>
                  <h5 className="headingColor">
                    {moment(dateOfLeaving).format("YYYY-MM-DD")}
                  </h5>
                </Form.Group>
              ) : (
                <Form.Group>
                  <h5>Recuritment Source</h5>
                  <h5 className="headingColor">{state.recuritment}</h5>
                </Form.Group>
              )}
            </Col>
          </Row>
          <Row className="mt-4">
            <Col sm={3}>
              {state.employmentType === "Internship" ? (
                <Form.Group>
                  <h5>Internship Duration</h5>
                  <h5 className="headingColor">{state.internship} Month</h5>
                </Form.Group>
              ) : (
                <Form.Group>
                  <h5>Notice Period</h5>
                  <h5 className="headingColor">{state.noticePeriod} Month</h5>
                </Form.Group>
              )}
            </Col>
            {state.employmentType === "Internship" ? (
              ""
            ) : (
              <Col sm={3}>
                <Form.Group>
                  <h5>Probation Period</h5>
                  <h5 className="headingColor">{state.probation} Month</h5>
                </Form.Group>
              </Col>
            )}
          </Row>
          {state.recuritment === "NGO" ? (
            <Row className="mt-4">
              <Col sm={12}>
                <Form.Group>
                  <h5>Enter NGO Detail</h5>
                  <h5 className="headingColor">{state.ngoDetail}</h5>
                </Form.Group>
              </Col>
            </Row>
          ) : (
            ""
          )}
        </Form>
      </Fragment>
    )
  );
};

export default EditWorkInformation;
