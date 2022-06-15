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
import Select from "react-select";
import { MasterFilesContext } from "../../context/MasterFilesState";
import { BonusContext } from "../../context/BonusState";
import { PermissionContext } from "../../context/PermissionState";

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
    managerId: null,
    expatUser: "",
    passportNumber: "",
    nationality: "",
    adminCompany: "",
  });
  const { viewCountries, countryList } = useContext(MasterFilesContext);
  const { rolePermission } = useContext(PermissionContext);
  const { viewBonusByContarctType, getBonusByContractType } =
    useContext(BonusContext);
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
    viewCandidateId,
    candidateData,
    updateCandidateWork,
    stateList,
    stateData,
    cityData,
    cityList,
    managerList,
    allManagerList,
    workInfoView,
    noticePeriodView,
    noticePeriodViewData,
    costcenterByDepartment,
    costcenterByDepartmentData,
    positionByDepartment,
    positionByDepartmentData,
    positionByDepartmentNull
  } = useContext(OfferContext);
  const { viewContractTypes, shiftContractNames } = useContext(RosterContext);
  const { user } = useContext(AppContext);
  const [stateValue, setStateValue] = useState();
  const [stateValueCity, setStateValueCity] = useState("");
  const [city, setCity] = useState();
  const [cityId, setCityId] = useState();
  const [dateOfLeavingError, setDateOfLeavingError] = useState(false);
  const [noticePeriod, setNoticePeriod] = useState("");
  const [nationalityList, setNationalityList] = useState();
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
    if (state.employmentType === "Internship") {
      let nationList = countryList.filter((item) => item.nationality !== null);
      console.log("contract list", nationList);
      setNationalityList(nationList);
    } else {
      let nationList = countryList.filter(
        (item) => item.nationality !== "Indian" && item.nationality !== null
      );
      console.log("contract list", nationList);
      setNationalityList(nationList);
    }
  }, [countryList, state.employmentType]);

  useEffect(() => {
    if (
      candidateData.candidateInformation !== undefined &&
      candidateData.candidateInformation !== null
    ) {
      // viewCandidateId(candidateData.candidateInformation.candidateId);
    }
  }, []);
  useEffect(() => {
    let workData =
      candidateData !== null &&
      candidateData !== undefined &&
      candidateData.workInformation;
    console.log(workData,"workData")
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
        managerId: workData.managerId,
        nationality: workData.nationality,
        expatUser: workData.expatUser,
        passportNumber:
          workData.passportNumber !== null ? workData.passportNumber : "",
        adminCompany: workData.companyName,
      });
      setDateOFJoining(new Date(workData.dateOfJoin));
      setDateOFLeaving(new Date(workData.dateOfLeaving));
      // setDateOfIssue(new Date(workData.passportIssuedDate));
      // setDateOfValidity(new Date(workData.passportExpiryDate));

      setStateValueCity(workData.stateId)
      setStateValue(workData.cityName);
      setCity(workData.locationId);
      cityData(workData.stateId);
          setCityId(workData.cityId);

      locationView(workData.costCentre);
      setCostCenter(workData.costCentre);
      setCollege(workData.collegeName);
      setNoticePeriod(workData.noticePeriod);
      viewBonusByContarctType(
        state.employmentType,
        state.department,
        state.position
      );
    }
  }, [candidateData]);

  useEffect(() => {
    if (
      state.employmentType !== "" &&
      state.department !== "" 
    ) {
      viewBonusByContarctType(
        state.employmentType,
        state.department,
        "position"
      );
    }
  }, [state.employmentType, state.department]);

  useEffect(() => {
    if (
      state.employmentType !== "" &&
      state.employmentType !== undefined &&
      state.employmentType !== "" &&
      state.department !== null &&
      state.department !== undefined &&
      state.department !== ""
    ) {
      noticePeriodView(state.employmentType, state.department);
    }
  }, [state.employmentType, state.department]);

  useEffect(() => {
    let superMangerFlag;
    let departmentId;
    if (
      state.department !== null &&
      state.department !== undefined &&
      state.department !== ""
    ) {
      console.log("state.department", state.department);
      if (rolePermission == "superCostCenterManager") {
        superMangerFlag = 1;
        departmentId = departmentName.filter(
          (item) => item.departmentName === state.department
        );
        console.log("departmentId",departmentId);
        costcenterByDepartment(state.department, superMangerFlag);
        positionByDepartment(departmentId[0].deptId)
      } else {
        superMangerFlag = 0;
        departmentId = departmentName.filter(
          (item) => item.departmentName === state.department
        );
        console.log("departmentId",departmentId);
        costcenterByDepartment(state.department, superMangerFlag);
        positionByDepartment(departmentId[0].deptId)
      }
    }else{
      positionByDepartmentNull()
    }
  }, [state.department]);
  useEffect(() => {
    if (
      noticePeriodViewData !== null &&
      noticePeriodViewData !== undefined &&
      noticePeriodViewData !== "" &&
      Object.keys(noticePeriodViewData).length !== 0
    ) {
      setNoticePeriod(noticePeriodViewData.noticePeriod);
    } else {
      setNoticePeriod(0);
    }
  }, [noticePeriodViewData]);

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

  // useEffect(() => {
  //   if (locationName !== undefined && locationName !== null) {
  //     setStateValue(locationName.stateId);
  //     setCity(locationName.locationId);
  //     cityData(locationName.stateId);
  //     setCityId(locationName.cityId);
  //   }

  //   console.log(
  //     "candidateData.candidateInformation",
  //     candidateData.candidateInformation
  //   );
  //   console.log("state in useEffect", locationName);
  // }, [locationName]);

  const changeHandler = (e) => {
    if(e.target.name && e.target.name ==="department" ){
      setStateValue();
      setCity("");
      setCityId("");
      setCostCenter("");
    }
    if(e.target.name ==="department" ){
      setState({
        ...state,
        [e.target.name]: e.target.value,
        ["managerId"]:""
      });
    }else{
    setState({
      ...state,
      [e.target.name]: e.target.value,
    });
  }
  };

  const stateHandler = (e) => {
    stateList.map((item, i) => {
      console.log(stateValueCity)
      if(item.cityName == e.target.value){
        setStateValueCity(item.stateId)
        setStateValue(e.target.value);
        cityData(item.stateId);
        console.log("stateName in state handler", e.target.value);
      }
    })
  };

  const cityHandler = (e) => {
    return cityList.map((item)=>{
      if(item.locationId == e.target.value){
        console.log(item,"itemCIty")
        setCity(e.target.value);
        setCityId(item.cityId)
      }
    })

    console.log("city", e.target.value);
  };
  useEffect(()=>{
    if (locationName !== null && locationName !== undefined && costCenter) {
      setStateValue(locationName.stateId);
      setCity(locationName.locationId);
      setCityId(locationName.cityId);
      cityData(locationName.stateId);
    }
  },[costCenter,locationName])
  const costCenterChangeHandler = (e) => {
    console.log(e.value,"costcenter")
    setCostCenter(e.value);
    locationView(e.value);

    console.log("locationView", e.value);
  };
  const dateOfIssueHandler = (date) => {
    setDateOfIssue(date);
  };
  const validityHandler = (date) => {
    setDateOfValidity(date);
  };
  const dateOfJoiningHandler = (date) => {
    setDateOFJoining(date);
    setDateOFLeaving();

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
    // if (
    //   (state.employmentType === "Permanent" ||
    //     state.employmentType === "permanent") &&
    //   state.expatUser
    // ) {
    //   expatValue = state.expatUser;
    // } else {
    //   expatValue = 0;
    // }
    console.log("candidateData work info", candidateData);
    const updateData = {
      candidateId: candidateData.candidateInformation.candidateId,
      cityId: cityId,
      collegeName: college,
      companyName:
        rolePermission == "admin" ? state.adminCompany : user.company,
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
      noticePeriod: state.employmentType === "Internship" ? 0 : noticePeriod,
      sportId: state.sports,
      expatUser: 0,
      nationality: state.nationality,
      passportNumber: state.passportNumber,
      passportExpiryDate: "",
      passportIssuedDate: "",
    };
    console.log("update data", updateData);
    if (dateOfLeavingError === false) {
      updateCandidateWork(updateData);
      setDisabled(true);
      setEditButton(true);
    }
  };
  const editHandler = () => {
    setDisabled(false);
    console.log("state", state);
  };
  const customStyles = {
    multiValue: (styles) => ({
                ...styles,
                borderRadius: "12.25rem",
            }),
    }
  return (
    console.log(state),
    console.log(designationName),
    console.log(allManagerList),
    (
      <Fragment>
        <Form onSubmit={submitHandler}>
          <Row>
            <Col sm={3}>
              <Form.Group>
                <Form.Label>Company Name</Form.Label>
                {rolePermission == "admin" ? (
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
                    <option value="Decathlon Sports India Pvt Ltd">DSI</option>
                    <option value="Indeca Sporting Goods Pvt Ltd">Indeca</option>
                    <option value="Prodin Sporting Pvt Ltd">Prodin</option>
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
                    {positionByDepartmentData !== null &&
                      positionByDepartmentData !== undefined &&
                      positionByDepartmentData.length > 0 &&
                      positionByDepartmentData.map((item) => {
                        return (
                          <option key={item.positionId}>
                            {item.position}
                          </option>
                        );
                      })}
                  </Form.Control>
                </Form.Group>
              )}
            </Col>
          </Row>
          <Row>
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
                    {positionByDepartmentData !== null &&
                      positionByDepartmentData !== undefined &&
                      positionByDepartmentData.length > 0 &&
                      positionByDepartmentData.map((item) => {
                        return (
                          <option key={item.positionId}>
                            {item.position}
                          </option>
                        );
                      })}
                  </Form.Control>
                )}
              </Form.Group>
            </Col>
            <Col sm={3}>
              <Form.Group>
                <Form.Label>Cost Center</Form.Label>
                {disabled?<Form.Control
                  as="select"
                  value={costCenter}
                  className="form-input"
                  name="costCenter"
                  onChange={costCenterChangeHandler}
                  disabled={disabled}
                  required
                >
                  <option value="">Select Cost Center</option>
                  {costcenterByDepartmentData !== null &&
                    costcenterByDepartmentData !== undefined &&
                    costcenterByDepartmentData.length > 0 &&
                    costcenterByDepartmentData.map((item) => {
                      return (
                        <option key={item.costCenterId}>
                          {item.costCentreName}
                        </option>
                      );
                    })}
                </Form.Control>
                :<div className="form-input" >
                               
                  <Select
                  name="costCenter"
                  as="select"
                  value={{
                    'label': costCenter,
                    'value':costCenter}}       
                   className="form-input"
                  aria-label="transferInitiationCostCentre"
                  placeholder="Select Cost Center"
                  onChange={costCenterChangeHandler}
                  styles= {customStyles}
                  options={
                    costcenterByDepartmentData !== null
                      ? costcenterByDepartmentData.map((item) => ({
                          label: item.costCentreName,
                          value: item.costCentreName,
                        }))
                      : []
                  }
                  required
                  isSearchable
                />
                </div>}
              </Form.Group>

            </Col>
            <Col sm={3}>
              <Form.Group className="reactDate">
                <Form.Label>Manager Name/Id</Form.Label>
                {allManagerList === null ? (
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
                    {allManagerList.map((item, i) => {
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
                {/* {state.employmentType === "Internship" ? (
                  <Form.Control
                    type="text"
                    value="N/A"
                    readOnly
                    className="form-input"
                  />
                ) : ( */}
                <Form.Control
                  as="select"
                  value={state.sports}
                  className="form-input"
                  name="sports"
                  onChange={changeHandler}
                  disabled={disabled}
                  required={state.department === "Retail" ? true : false}
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
              </Form.Group>
            </Col>
          </Row>
          <Row>
            <Col sm={3}>
              <Form.Group>
                <Form.Label>Work Location</Form.Label>
                <Form.Control
                  as="select"
                  defaultValue={stateValue}
                  value={stateValue}
                  className="form-input"
                  onChange={stateHandler}
                  disabled={disabled}
                  required
                >
                  <option value="">Select Location</option>
                  {stateList !== null &&
                    stateList !== undefined &&
                    stateList.map((item, i) => {
                      return (
                        <option key={i} value={item.cityName}>
                          {item.cityName}/{item.stateName}
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
                  className="form-input"
                  onChange={cityHandler}
                  disabled={disabled}
                  required
                >
                  <option value="">Select Site</option>
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
                  minDate={new Date()}
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
                    minDate={dateOfJoining}
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
              <Col sm={3}>
                <Form.Group>
                  <Form.Label>Notice Period</Form.Label>
                  <Form.Control
                    as="select"
                    value={noticePeriod}
                    className="form-input disable-arrow"
                    name="noticePeriod"
                    onChange={changeHandler}
                    disabled="true"
                    required
                  >
                    <option value="">Select Notice Period</option>
                    <option value="0">0 Month</option>
                    <option value="1">1 Month</option>
                    <option value="2">2 Month</option>
                    <option value="3">3 Month</option>
                  </Form.Control>
                </Form.Group>
              </Col>
            )}

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
                    <option value="4">4 Month</option>
                    <option value="5">5 Month</option>
                    <option value="6">6 Month</option>
                  </Form.Control>
                </Form.Group>
              </Col>
            )}
            {/* {(state.employmentType === "Permanent" ||
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
            )} */}
            {/* {state.employmentType === "Local Expat" && (
              <Col sm={3}>
                <Form.Group>
                  <Form.Label>Passport Number</Form.Label>
                  <Form.Control
                    type="text"
                    className="form-input"
                    value={state.passportNumber}
                    name="passportNumber"
                    placeholder="Passport Number"
                    onChange={changeHandler}
                    disabled={disabled}
                    required
                  />
                </Form.Group>
              </Col>
            )} */}

            {(state.employmentType === "Local Expat" ||
              state.employmentType === "Internship") && (
              <React.Fragment>
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
                      {nationalityList !== null &&
                        nationalityList !== undefined &&
                        nationalityList.map((item) => {
                          return (
                            <option key={item.countryId}>
                              {item.nationality}
                            </option>
                          );
                        })}
                    </Form.Control>
                  </Form.Group>
                </Col>
                {/* <Col sm={3}>
                  <Form.Group className="reactDate">
                    <Form.Label>Date of Issue</Form.Label>
                    <DatePicker
                      className="form-control form-input"
                      selected={dateOfIssue}
                      required
                      onChange={(e) => dateOfIssueHandler(e)}
                      dateFormat="yyyy-MM-dd"
                      placeholderText="Date of Issue"
                      disabled={disabled}
                    />
                  </Form.Group>
                </Col>
                <Col sm={3}>
                  <Form.Group className="reactDate">
                    <Form.Label>Date Of Validity</Form.Label>
                    <DatePicker
                      className="form-control form-input"
                      selected={dateOfValidity}
                      required
                      onChange={(e) => validityHandler(e)}
                      minDate={dateOfIssue}
                      dateFormat="yyyy-MM-dd"
                      placeholderText="Date of Validity"
                      disabled={disabled}
                    />
                  </Form.Group>
                </Col> */}
              </React.Fragment>
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
              <Button type="submit" disabled={disabled}>
                Save
              </Button>
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
