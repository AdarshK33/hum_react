import React, { Fragment, useState, useContext, useEffect } from "react";
import { Row, Col, Form, Button } from "react-bootstrap";
import "./offers.css";
import DatePicker from "react-datepicker";
import "react-datepicker/dist/react-datepicker.css";
import { ClusterContext } from "../../context/ClusterState";
import { AdminContext } from "../../context/AdminState";
import { OfferContext } from "../../context/OfferState";
import { RosterContext } from "../../context/RosterState";
import { AppContext } from "../../context/AppState";
import moment from "moment";
import { MasterFilesContext } from "../../context/MasterFilesState";
import { BonusContext } from "../../context/BonusState";
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
  const { viewCountries, countryList } = useContext(MasterFilesContext);
  const { viewBonusByContarctType, getBonusByContractType } =
    useContext(BonusContext);
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
    viewCandidateId,
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
  const [cityId, setCityId] = useState();
  const [dateOfLeavingError, setDateOfLeavingError] = useState(false);
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
    if (
      candidateData.candidateInformation !== undefined &&
      candidateData.candidateInformation !== null
    ) {
      viewCandidateId(candidateData.candidateInformation.candidateId);
    }
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
        nationality: workData.nationality,
        expatUser: workData.expatUser,
        passportNumber: workData.passportNumber,
        adminCompany: workData.companyName,
      });
      setDateOFJoining(new Date(workData.dateOfJoin));
      setDateOFLeaving(new Date(workData.dateOfLeaving));
      setCostCenter(workData.costCentre);
      locationView(workData.costCentre);
      setCollege(workData.collegeName);
      viewBonusByContarctType(
        state.employmentType,
        state.department,
        state.position
      );
    }
  }, [candidateData]);

  // useEffect(() => {
  //   console.log("inside candidateData", candidateData);
  //   if (
  //     candidateData !== null &&
  //     candidateData !== undefined &&
  //     candidateData.candidateInformation !== null &&
  //     candidateData.candidateInformation !== undefined &&
  //     candidateData.candidateInformation.candidateReferences[-1]
  //       .employeeName !== "" &&
  //     candidateData.workInformation !== null &&
  //     candidateData.workInformation !== undefined &&
  //     candidateData.workInformation.recruitmentSource !== "Employee Referral"
  //   ) {
  //     console.log(" 1st condition");
  //     setState({
  //       recuritment: candidateData.workInformation.recruitmentSource,
  //     });
  //   } else if (
  //     candidateData !== null &&
  //     candidateData !== undefined &&
  //     candidateData.candidateInformation !== null &&
  //     candidateData.candidateInformation !== undefined &&
  //     candidateData.candidateInformation.candidateReferences[-1]
  //       .employeeName !== "" &&
  //     candidateData.workInformation !== null &&
  //     candidateData.workInformation !== undefined &&
  //     candidateData.workInformation.recruitmentSource === "Employee Referral"
  //   ) {
  //     console.log(" 2nd condition");
  //     setState({ recuritment: "Employee Referral" });
  //   } else if (
  //     candidateData !== null &&
  //     candidateData !== undefined &&
  //     candidateData.candidateInformation !== null &&
  //     candidateData.candidateInformation !== undefined &&
  //     candidateData.candidateInformation.candidateReferences[-1]
  //       .employeeName !== "" &&
  //     (candidateData.workInformation === null ||
  //       candidateData.workInformation === undefined)
  //   ) {
  //     console.log(" 3rd condition");
  //     setState({ recuritment: "Employee Referral" });
  //   } else if (
  //     candidateData !== null &&
  //     candidateData !== undefined &&
  //     candidateData.candidateInformation !== null &&
  //     candidateData.candidateInformation !== undefined &&
  //     candidateData.candidateInformation.candidateReferences[-1]
  //       .employeeName === "" &&
  //     (candidateData.workInformation === null ||
  //       candidateData.workInformation === undefined)
  //   ) {
  //     console.log(" 4th condition");
  //     setState({ recuritment: "" });
  //   }
  // }, [candidateData]);

  useEffect(() => {
    if (locationName !== undefined && locationName !== null) {
      setStateValue(locationName.stateId);
      setCity(locationName.locationId);
      cityData(locationName.stateId);
      setCityId(locationName.cityId);
    }

    console.log(
      "candidateData.candidateInformation",
      candidateData.candidateInformation
    );
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
    if (locationName !== null && locationName !== undefined) {
      setStateValue(locationName.stateId);
      setCity(locationName.locationId);
      setCityId(locationName.cityId);
    }

    console.log("locationView", e.target.value);
  };

  const dateOfJoiningHandler = (date) => {
    setDateOFJoining(date);
  };
  const dateOfLeavingHandler = (date) => {
    setDateOFLeaving(date);
    let monthCount = monthDiff(new Date(dateOfJoining), new Date(date));

    if (monthCount > 6) {
      setDateOfLeavingError(true);
    } else {
      setDateOfLeavingError(false);
    }
    setState({
      ...state,
      internship: monthCount,
    });
  };

  const monthDiff = (dateFrom, dateTo) => {
    return (
      dateTo.getMonth() -
      dateFrom.getMonth() +
      12 * (dateTo.getFullYear() - dateFrom.getFullYear())
    );
  };

  const submitHandler = (e) => {
    e.preventDefault();
    let expatValue;
    console.log(state, "state");
    if (
      (state.employmentType === "Permanent" ||
        state.employmentType === "permanent") &&
      state.expatUser
    ) {
      expatValue = state.expatUser;
    } else {
      expatValue = 0;
    }
    console.log("candidateData work info", candidateData);
    const updateData = {
      candidateId: candidateData.candidateInformation.candidateId,
      cityId: cityId,
      collegeName: college,
      companyName:
        user.role === "ADMIN" || user.additionalRole == 1
          ? state.adminCompany
          : user.company,
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
      locationId: city,
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
      sportId: state.sports,
      expatUser: expatValue,
      nationality: state.nationality,
      passportNumber: state.passportNumber,
    };
    console.log("update data", updateData);
    if (dateOfLeavingError === false) {
      updateCandidateWork(updateData);
      viewCandidateId(candidateData.candidateInformation.candidateId);
      setDisabled(true);
      setEditButton(true);
      viewBonusByContarctType(
        state.employmentType,
        state.department,
        state.position
      );
    }
  };
  const editHandler = () => {
    setDisabled(false);
    console.log("state", state);
  };
  return (
    console.log(state),
    console.log(designationName),
    console.log(managerList),
    (
      <Fragment>
        <Form onSubmit={submitHandler}>
          <Row>
            <Col sm={3}>
              <Form.Group>
                <Form.Label>Company Name</Form.Label>
                {user.role === "ADMIN" || user.additionalRole == 1 ? (
                  <Form.Control
                    as="select"
                    value={state.adminCompany}
                    className="form-input"
                    name="adminCompany"
                    onChange={changeHandler}
                    disabled={disabled}
                    required
                  >
                    <option value="">Select Company</option>
                    <option value="Decathlon Sports India">DSI</option>
                    <option value="Indeca">Indeca</option>
                    <option value="Prodin">Prodin</option>
                  </Form.Control>
                ) : (
                  <Form.Control
                    type="text"
                    value={user.company}
                    className="form-input"
                    name="company"
                    readOnly
                  />
                )}
              </Form.Group>
            </Col>
            {state.employmentType !== "" &&
            candidateData !== null &&
            candidateData !== undefined &&
            candidateData.workInformation !== "" &&
            candidateData.workInformation !== null &&
            candidateData.workInformation !== undefined ? (
              <Col sm={3}>
                <Form.Group>
                  <Form.Label>Type of Employment</Form.Label>
                  <Form.Control
                    type="text"
                    value={state.employmentType}
                    className="form-control form-input"
                    readOnly
                  />
                </Form.Group>
              </Col>
            ) : (
              <Col sm={3}>
                <Form.Group className="reactDate">
                  <Form.Label>Type of Employment</Form.Label>
                  <Form.Control
                    as="select"
                    value={state.employmentType}
                    className="form-input "
                    name="employmentType"
                    onChange={changeHandler}
                    disabled={disabled}
                  >
                    <option value="">Select Employment Type</option>
                    {shiftContractNames !== null &&
                      shiftContractNames !== undefined &&
                      shiftContractNames.length > 0 &&
                      shiftContractNames.map((item) => {
                        return (
                          <option key={item.typeId}>{item.contractType}</option>
                        );
                      })}
                  </Form.Control>
                </Form.Group>
              </Col>
            )}
            <Col sm={3}>
              <Form.Group>
                <Form.Label>Designation</Form.Label>
                {state.employmentType === "Internship" ? (
                  <Form.Control
                    type="text"
                    value="Intern"
                    className="form-input"
                    readOnly
                  />
                ) : (
                  <Form.Control
                    as="select"
                    value={state.designation}
                    className="form-input"
                    name="designation"
                    onChange={changeHandler}
                    disabled={disabled}
                    required
                  >
                    <option value="">Select Designation</option>
                    {designationName !== null &&
                      designationName !== undefined &&
                      designationName.length > 0 &&
                      designationName.map((item) => {
                        return (
                          <option key={item.designationId}>
                            {item.designation}
                          </option>
                        );
                      })}
                  </Form.Control>
                )}
              </Form.Group>
            </Col>
            <Col sm={3}>
              <Form.Group>
                <Form.Label>Department</Form.Label>
                <Form.Control
                  as="select"
                  value={state.department}
                  className="form-input"
                  name="department"
                  onChange={changeHandler}
                  disabled={disabled}
                  required
                >
                  <option value="">Select Department</option>
                  {departmentName !== null &&
                    departmentName !== undefined &&
                    departmentName.length > 0 &&
                    departmentName.map((item) => {
                      return (
                        <option key={item.deptId}>{item.departmentName}</option>
                      );
                    })}
                </Form.Control>
              </Form.Group>
            </Col>
          </Row>
          <Row>
            <Col sm={3}>
              {state.employmentType === "Internship" ? (
                <Form.Group className="reactDate">
                  <Form.Label>College Name</Form.Label>
                  <Form.Control
                    type="text"
                    value={college}
                    onChange={(e) => setCollege(e.target.value)}
                    placeholder="Enter College Name"
                    className="form-input"
                    disabled={disabled}
                    required
                  />
                </Form.Group>
              ) : (
                <Form.Group>
                  <Form.Label>Position</Form.Label>
                  <Form.Control
                    as="select"
                    value={state.position}
                    className="form-input"
                    name="position"
                    onChange={changeHandler}
                    disabled={disabled}
                    required
                  >
                    <option value="">Select Position</option>
                    {designationName !== null &&
                      designationName !== undefined &&
                      designationName.length > 0 &&
                      designationName.map((item) => {
                        return (
                          <option key={item.designationId}>
                            {item.designation}
                          </option>
                        );
                      })}
                  </Form.Control>
                </Form.Group>
              )}
            </Col>
            <Col sm={3}>
              <Form.Group>
                <Form.Label>Cost Center</Form.Label>
                <Form.Control
                  as="select"
                  value={costCenter}
                  className="form-input"
                  name="costCenter"
                  onChange={costCenterChangeHandler}
                  disabled={disabled}
                  required
                >
                  <option value="">Select Cost Center</option>
                  {costCenterList !== null &&
                    costCenterList !== undefined &&
                    costCenterList.length > 0 &&
                    costCenterList.map((item) => {
                      return (
                        <option key={item.costCenterId}>
                          {item.costCentreName}
                        </option>
                      );
                    })}
                </Form.Control>
              </Form.Group>
            </Col>
            <Col sm={3}>
              <Form.Group className="reactDate">
                <Form.Label>Manager Name/Id</Form.Label>
                {managerList === null ? (
                  <Form.Control
                    type="text"
                    value={user.employeeId}
                    className="form-input"
                    readOnly
                  />
                ) : (
                  <Form.Control
                    as="select"
                    value={state.managerId}
                    className="form-input"
                    name="managerId"
                    onChange={changeHandler}
                    disabled={disabled}
                    required
                  >
                    <option value="">Select ManagerId</option>
                    {managerList.map((item, i) => {
                      return (
                        <option key={i} value={item.employeeId}>
                          {item.firstName}-{item.employeeId}
                        </option>
                      );
                    })}
                  </Form.Control>
                )}
              </Form.Group>
            </Col>
            <Col sm={3}>
              <Form.Group>
                <Form.Label>Sports</Form.Label>
                {state.employmentType === "Internship" ? (
                  <Form.Control
                    type="text"
                    value="N/A"
                    readOnly
                    className="form-input"
                  />
                ) : (
                  <Form.Control
                    as="select"
                    value={state.sports}
                    className="form-input"
                    name="sports"
                    onChange={changeHandler}
                    disabled={disabled}
                    required
                  >
                    <option value="">Select Sports</option>
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
                )}
              </Form.Group>
            </Col>
          </Row>
          <Row>
            <Col sm={3}>
              <Form.Group>
                <Form.Label>Work Location state</Form.Label>
                <Form.Control
                  as="select"
                  value={stateValue}
                  className="form-input"
                  onChange={stateHandler}
                  disabled={disabled}
                  required
                >
                  <option value="">Select State</option>
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
                <Form.Label>Work Location City</Form.Label>
                <Form.Control
                  as="select"
                  value={city}
                  className="form-input"
                  onChange={cityHandler}
                  disabled={disabled}
                  required
                >
                  <option value="">Select City</option>
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
                <DatePicker
                  className="form-control form-input"
                  selected={dateOfJoining}
                  required
                  onChange={(e) => dateOfJoiningHandler(e)}
                  minDate={dateOfJoining}
                  dateFormat="yyyy-MM-dd"
                  placeholderText="Date of Joining"
                  disabled={disabled}
                />
              </Form.Group>
            </Col>
            <Col sm={3}>
              {state.employmentType === "Internship" ? (
                <Form.Group className="reactDate">
                  <Form.Label>Date of Leaving</Form.Label>
                  <DatePicker
                    className="form-control form-input"
                    selected={dateOfLeaving}
                    required
                    onChange={(e) => dateOfLeavingHandler(e)}
                    dateFormat="yyyy-MM-dd"
                    placeholderText="Date of Leaving"
                    disabled={disabled}
                  />
                  {dateOfLeavingError ? (
                    <p style={{ color: "red" }}>
                      Internship should not exceed 6 months
                    </p>
                  ) : (
                    ""
                  )}
                </Form.Group>
              ) : (
                <Form.Group>
                  <Form.Label>Recuritment Source</Form.Label>
                  <Form.Control
                    as="select"
                    value={state.recuritment}
                    className="form-input"
                    name="recuritment"
                    onChange={changeHandler}
                    disabled={disabled}
                    required
                  >
                    <option value="">Select Recuritment Source</option>
                    <option>Employee Referral</option>
                    <option>LinkedIn</option>
                    <option>Monster</option>
                    <option>Naukri</option>
                    <option>Others</option>
                    <option>Recruitment Agency</option>
                    <option>NGO</option>
                  </Form.Control>
                </Form.Group>
              )}
            </Col>
          </Row>
          <Row>
            <Col sm={3}>
              {state.employmentType === "Internship" ? (
                ""
              ) : (
                // <Form.Group>
                //   <Form.Label>Internship Duration</Form.Label>
                //   <Form.Control
                //     as="select"
                //     value={state.internship}
                //     className="form-input"
                //     name="internship"
                //     onChange={changeHandler}
                //     disabled={disabled}
                //     required
                //   >
                //     <option value="">Select Internship Duration</option>
                //     <option value="1">1 Month</option>
                //     <option value="2">2 Month</option>
                //     <option value="3">3 Month</option>
                //     <option value="4">4 Month</option>
                //     <option value="5">5 Month</option>
                //     <option value="6">6 Month</option>
                //   </Form.Control>
                // </Form.Group>
                <Form.Group>
                  <Form.Label>Notice Period</Form.Label>
                  <Form.Control
                    as="select"
                    value={state.noticePeriod}
                    className="form-input"
                    name="noticePeriod"
                    onChange={changeHandler}
                    disabled={disabled}
                    required
                  >
                    <option value="">Select Notice Period</option>
                    <option value="1">1 Month</option>
                    <option value="2">2 Month</option>
                    <option value="3">3 Month</option>
                  </Form.Control>
                </Form.Group>
              )}
            </Col>
            {state.employmentType === "Internship" ? (
              ""
            ) : (
              <Col sm={3}>
                <Form.Group>
                  <Form.Label>Probation Period</Form.Label>
                  <Form.Control
                    as="select"
                    value={state.probation}
                    className="form-input"
                    name="probation"
                    onChange={changeHandler}
                    disabled={disabled}
                    required
                  >
                    <option value="">Select Probabtion Period</option>
                    <option value="1">1 Month</option>
                    <option value="2">2 Month</option>
                    <option value="3">3 Month</option>
                  </Form.Control>
                </Form.Group>
              </Col>
            )}
            {(state.employmentType === "Permanent" ||
              state.employmentType === "permanent") && (
              <Col sm={3}>
                <Form.Group>
                  <Form.Label>Local Expat</Form.Label>
                  <Form.Control
                    as="select"
                    className="form-input"
                    name="expatUser"
                    value={state.expatUser}
                    onChange={changeHandler}
                    disabled={disabled}
                    required
                  >
                    <option value=" ">Seclect </option>
                    <option value="1">Yes</option>
                    <option value="0">No</option>
                  </Form.Control>
                </Form.Group>
              </Col>
            )}
            {state.expatUser == 1 && (
              <Col sm={3}>
                <Form.Group>
                  <Form.Label>Passport Number</Form.Label>
                  <Form.Control
                    type="text"
                    className="form-input"
                    value={state.passportNumber}
                    name="passportNumber"
                    onChange={changeHandler}
                    disabled={disabled}
                    required
                  />
                </Form.Group>
              </Col>
            )}
          </Row>
          <Row>
            {state.expatUser == 1 && (
              <Col sm={3}>
                <Form.Group>
                  <Form.Label>Nationality</Form.Label>
                  <Form.Control
                    as="select"
                    className="form-input"
                    value={state.nationality}
                    name="nationality"
                    onChange={changeHandler}
                    disabled={disabled}
                    required
                  >
                    <option value="">Select Nationality</option>
                    {countryList !== null &&
                      countryList !== undefined &&
                      countryList.map((item) => {
                        return (
                          <option key={item.countryId}>
                            {item.nationality}
                          </option>
                        );
                      })}
                  </Form.Control>
                </Form.Group>
              </Col>
            )}
          </Row>
          {state.recuritment === "NGO" ? (
            <Row>
              <Col sm={12}>
                <Form.Group>
                  <Form.Label>Enter NGO Detail</Form.Label>
                  <Form.Control
                    type="text"
                    value={state.ngoDetail}
                    className="form-input"
                    disabled={disabled}
                    onChange={changeHandler}
                    name="ngoDetail"
                    placeholder="Enter NGO Detail"
                    required
                  />
                </Form.Group>
              </Col>
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
    )
  );
};

export default EditWorkInformation;
