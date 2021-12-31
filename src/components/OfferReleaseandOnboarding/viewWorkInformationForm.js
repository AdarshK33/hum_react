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
import { MasterFilesContext } from "../../context/MasterFilesState";
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
    expatUser: "",
    passportNumber: "",
    nationality: "",
    adminCompany: "",
  });
  const [dateOfJoining, setDateOFJoining] = useState();
  const [dateOfLeaving, setDateOFLeaving] = useState();
  const [costCenter, setCostCenter] = useState("");
  const [editButton, setEditButton] = useState(false);
  const [disabled, setDisabled] = useState(false);
  const [college, setCollege] = useState("");
  const [dateOfIssue, setDateOfIssue] = useState();
  const [dateOfValidity, setDateOfValidity] = useState();

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
    allManagerList,
  } = useContext(OfferContext);
  const { viewContractTypes, shiftContractNames } = useContext(RosterContext);
  const { user } = useContext(AppContext);
  const [stateValue, setStateValue] = useState();
  const [city, setCity] = useState();
  const { viewCountries, countryList } = useContext(MasterFilesContext);
  useEffect(() => {
    viewSports();
    CostCenter();
    departmentView();
    viewContractTypes();
    designationView();
    stateData();
    viewCountries();
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
        expatUser: workData.expatUser,
        passportNumber: workData.passportNumber,
        nationality: workData.nationality,
        adminCompany: workData.companyName,
      });
      setDateOFJoining(new Date(workData.dateOfJoin));
      setDateOFLeaving(new Date(workData.dateOfLeaving));
      setDateOfIssue(new Date(workData.passportIssuedDate));
      setDateOfValidity(new Date(workData.passportExpiryDate));
      setCostCenter(workData.costCentre);
      locationView(workData.costCentre);
      setCollege(workData.collegeName);
    }
  }, [candidateData]);

  useEffect(() => {
    setStateValue(locationName.stateId);
    setCity(locationName.locationId);
    cityData(locationName.stateId);
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
  };

  const cityHandler = (e) => {
    setCity(e.target.value);
  };
  const costCenterChangeHandler = (e) => {
    setCostCenter(e.target.value);
    locationView(e.target.value);
    setStateValue(locationName.stateId);
    setCity(locationName.cityId);
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
      managerId: allManagerList !== null ? state.managerId : user.employeeId,
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
    updateCandidateWork(updateData);
    setDisabled(true);
    setEditButton(true);
  };
  const editHandler = () => {
    setDisabled(false);
  };
  var filterArray = stateList.filter(
    (word) => word.stateId === stateValue && word.cityId === city
  );

  return (
    console.log(candidateData.workInformation),
    (
      <Fragment>
        <Form onSubmit={submitHandler}>
          <Row>
            <Col sm={3}>
              <Form.Group>
                <Form.Label>Company Name</Form.Label>
                <br></br>
                <Form.Label className="headingColor">{user.company}</Form.Label>
              </Form.Group>
            </Col>
            <Col sm={3}>
              <Form.Group className="reactDate">
                <Form.Label>Type of Employment</Form.Label>
                <br></br>
                {candidateData.workInformation !== null && (
                  <Form.Label className="headingColor">
                    {state.employmentType}
                  </Form.Label>
                )}
              </Form.Group>
            </Col>

            <Col sm={3}>
              <Form.Group>
                <Form.Label>Department</Form.Label>
                <br></br>
                <Form.Label className="headingColor">
                  {state.department}
                </Form.Label>
              </Form.Group>
            </Col>
            <Col sm={3}>
              {state.employmentType === "Internship" ? (
                <Form.Group className="reactDate">
                  <Form.Label>College Name</Form.Label>
                  <br></br>
                  <Form.Label className="headingColor">{college}</Form.Label>
                </Form.Group>
              ) : (
                <Form.Group>
                  <Form.Label>Position</Form.Label>
                  <br></br>
                  <Form.Label className="headingColor">
                    {state.position}
                  </Form.Label>
                </Form.Group>
              )}
            </Col>
          </Row>
          <Row className="mt-4">
            <Col sm={3}>
              <Form.Group>
                <Form.Label>Designation</Form.Label>
                <br></br>
                {state.employmentType === "Internship" ? (
                  <Form.Label className="headingColor">Intern</Form.Label>
                ) : (
                  <Form.Label className="headingColor">
                    {state.designation}
                  </Form.Label>
                )}
              </Form.Group>
            </Col>
            <Col sm={3}>
              <Form.Group>
                <Form.Label>Cost Center</Form.Label>
                <br></br>
                <Form.Label className="headingColor">{costCenter}</Form.Label>
              </Form.Group>
            </Col>
            <Col sm={3}>
              <Form.Group className="reactDate">
                <Form.Label>Manager Name/Id</Form.Label>
                <br></br>
                {allManagerList === null ? (
                  <Form.Label>{user.employeeId}</Form.Label>
                ) : (
                  <Form.Label className="headingColor">
                    {state.managerId}
                  </Form.Label>
                )}
              </Form.Group>
            </Col>
            <Col sm={3}>
              <Form.Group>
                <Form.Label>Sports</Form.Label>
                {/* {state.employmentType === "Internship" ? (
                  <Form.Label>N/A</Form.Label>
                ) : ( */}
                <Form.Control
                  as="select"
                  value={state.sports}
                  name="sports"
                  disabled="true"
                  className=" disable-arrow"
                  style={{
                    border: "0px",
                    color: "#0020a5",
                    backgroundColor: "#fafafa",
                  }}
                >
                  {sportsNames !== null &&
                    sportsNames !== undefined &&
                    sportsNames.length > 0 &&
                    sportsNames.map((item) => {
                      return (
                        <option key={item.sportId} value={item.sportId}>
                          {item.sportName}
                        </option>
                      );
                    })}
                </Form.Control>
              </Form.Group>
            </Col>
          </Row>
          <Row className="mt-4">
            <Col sm={3}>
              <Form.Group>
                <Form.Label>Work Location</Form.Label>
                <Form.Control
                  as="select"
                  value={stateValue}
                  disabled="true"
                  className=" disable-arrow"
                  style={{
                    border: "0px",
                    color: "#0020a5",
                    backgroundColor: "#fafafa",
                  }}
                >
                  {stateList !== null &&
                    stateList !== undefined &&
                    stateList.map((item, i) => {
                      return (
                        <option key={i} value={item.stateId}>
                          {item.stateName}
                        </option>
                      );
                    })}
                </Form.Control>
              </Form.Group>
            </Col>
            <Col sm={3}>
              <Form.Group>
                <Form.Label>Site</Form.Label>
                <Form.Control
                  as="select"
                  value={city}
                  disabled="true"
                  className=" disable-arrow"
                  style={{
                    border: "0px",
                    color: "#0020a5",
                    backgroundColor: "#fafafa",
                  }}
                >
                  {cityList !== null &&
                    cityList !== undefined &&
                    cityList.map((item, i) => {
                      return (
                        <option key={i} value={item.locationId}>
                          {item.locationName}/{item.cityName}
                        </option>
                      );
                    })}
                </Form.Control>
              </Form.Group>
            </Col>

            <Col sm={3}>
              <Form.Group className="reactDate">
                <Form.Label>Date of Joining</Form.Label>
                <br></br>
                <Form.Label className="headingColor">
                  {moment(dateOfJoining).format("YYYY-MM-DD")}
                </Form.Label>
              </Form.Group>
            </Col>
            <Col sm={3}>
              {state.employmentType === "Internship" ? (
                <Form.Group className="reactDate">
                  <Form.Label>Date of Leaving</Form.Label>
                  <br></br>
                  <Form.Label className="headingColor">
                    {moment(dateOfLeaving).format("YYYY-MM-DD")}
                  </Form.Label>
                </Form.Group>
              ) : (
                <Form.Group>
                  <Form.Label>Recuritment Source</Form.Label>
                  <br></br>
                  <Form.Label className="headingColor">
                    {state.recuritment}
                  </Form.Label>
                </Form.Group>
              )}
            </Col>
          </Row>
          <Row className="mt-4">
            {state.employmentType === "Internship" ? (
              ""
            ) : (
              // <Form.Group>
              //   <Form.Label>Internship Duration</Form.Label>
              //   <br></br>
              //   <Form.Label className="headingColor">
              //     {state.internship} Month
              //   </Form.Label>
              // </Form.Group>
              <Col sm={3}>
                <Form.Group>
                  <Form.Label>Notice Period</Form.Label>
                  <br></br>
                  <Form.Label className="headingColor">
                    {state.noticePeriod} Month
                  </Form.Label>
                </Form.Group>
              </Col>
            )}

            {state.employmentType === "Internship" ? (
              ""
            ) : (
              <Col sm={3}>
                <Form.Group>
                  <Form.Label>Probation Period</Form.Label>
                  <br></br>
                  <Form.Label className="headingColor">
                    {state.probation} Month
                  </Form.Label>
                </Form.Group>
              </Col>
            )}

            {(state.employmentType === "Local Expat" ||
              state.employmentType === "Internship") && (
              <Col sm={3}>
                <Form.Group>
                  <Form.Label>Nationality</Form.Label>
                  <br></br>
                  <Form.Label className="headingColor">
                    {state.nationality}
                  </Form.Label>
                </Form.Group>
              </Col>
            )}
            {/* {(state.employmentType === "Internship" ||
              state.employmentType === "Permanent" ||
              state.employmentType === "permanent" ||
              state.employmentType === "Parttime") && (
              <Col sm={3}>
                <Form.Group>
                  <Form.Label>Local Expact</Form.Label>
                  <br></br>
                  <Form.Label className="headingColor">
                    {state.expatUser === 1 ? "Yes" : "No"}
                  </Form.Label>
                </Form.Group>
              </Col>
            )} */}
            {/* {state.employmentType === "Local Expat" && (
              <Col sm={3}>
                <Form.Group>
                  <Form.Label>Passport Number</Form.Label>
                  <br></br>
                  <Form.Label className="headingColor">
                    {state.passportNumber}
                  </Form.Label>
                </Form.Group>
              </Col>
            )} */}
          </Row>

          {/* {state.employmentType === "Local Expat" && (
              <React.Fragment>
                <Col sm={3}>
                  <Form.Group>
                    <Form.Label>Nationality</Form.Label>
                    <br></br>
                    <Form.Label className="headingColor">
                      {state.nationality}
                    </Form.Label>
                  </Form.Group>
                </Col> */}
          {/* <Col sm={3}>
                  <Form.Group className="reactDate">
                    <Form.Label>Date of Issue</Form.Label>
                    <br></br>
                    <Form.Label className="headingColor">
                      {moment(dateOfIssue).format("YYYY-MM-DD")}
                    </Form.Label>
                  </Form.Group>
                </Col> */}
          {/* <Col sm={3}>
                  <Form.Group className="reactDate">
                    <Form.Label>Date Of Validity</Form.Label>
                    <br></br>
                    <Form.Label className="headingColor">
                      {moment(dateOfValidity).format("YYYY-MM-DD")}
                    </Form.Label>
                  </Form.Group>
                </Col> */}
          {/* </React.Fragment>
            )} */}
          {state.recuritment === "NGO" ? (
            <Row className="mt-4">
              <Col sm={12}>
                <Form.Group>
                  <Form.Label>Enter NGO Detail</Form.Label>
                  <br></br>
                  <Form.Label className="headingColor">
                    {state.ngoDetail}
                  </Form.Label>
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
