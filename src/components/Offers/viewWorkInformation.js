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
import { MasterFilesContext } from "../../context/MasterFilesState";
import { PermissionContext } from "../../context/PermissionState";

const ViewWorkInformation = () => {
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
  const [costCenter, setCostCenter] = useState("");
  const [dateOfLeaving, setDateOFLeaving] = useState();
  const { viewSports, sportsNames } = useContext(ClusterContext);
  const { CostCenter, costCenterList } = useContext(AdminContext);
  const [college, setCollege] = useState("");
  const { viewCountries, countryList } = useContext(MasterFilesContext);
  const [dateOfIssue, setDateOfIssue] = useState();
  const [dateOfValidity, setDateOfValidity] = useState();
  const { rolePermission } = useContext(PermissionContext);
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
    costcenterByDepartment,
    costcenterByDepartmentData
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
    viewCountries();
    console.log("candidateData work info", candidateData);
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
    console.log("state in useEffect", locationName);
  }, [locationName]);
  useEffect(() => {
    let superMangerFlag;
    if (state.department !== null&&state.department !== undefined&&state.department !== "") {
      console.log("state.department",state.department);
      if(rolePermission == "superCostCenterManager"){
        superMangerFlag=1
        costcenterByDepartment( state.department,superMangerFlag);
      }else{
        superMangerFlag=0
        costcenterByDepartment( state.department,superMangerFlag);
      }
      
    }
  }, [ state.department]);
  return (
    <Fragment>
      <Form>
        <Row>
          <Col sm={3}>
            <Form.Group>
              <Form.Label>Company Name</Form.Label>
              {rolePermission == "admin" ? (
                <Form.Control
                  as="select"
                  value={state.adminCompany}
                  className="form-input disable-arrow"
                  name="adminCompany"
                  disabled="true"
                  readOnly
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
                  className="form-input disable-arrow"
                  name="designation"
                  readOnly
                  disabled="true"
                >
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
                className="form-input disable-arrow"
                name="department"
                readOnly
                disabled="true"
              >
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
                  placeholder="Enter College Name"
                  className="form-input"
                  disabled="true"
                />
              </Form.Group>
            ) : (
              <Form.Group>
                <Form.Label>Position</Form.Label>
                <Form.Control
                  as="select"
                  value={state.position}
                  className="form-input disable-arrow"
                  name="position"
                  readOnly
                  disabled="true"
                >
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
                className="form-input disable-arrow"
                name="costCenter"
                readOnly
                disabled="true"
              >
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
            </Form.Group>
          </Col>
          <Col sm={3}>
            <Form.Group className="reactDate">
              <Form.Label>Manager Name/Id</Form.Label>
              {allManagerList === null ? (
                <Form.Control
                  type="text"
                  value={user.employeeId}
                  className="form-input disable-arrow"
                  readOnly
                />
              ) : (
                <Form.Control
                  as="select"
                  value={state.managerId}
                  className="form-input disable-arrow"
                  name="managerId"
                  disabled="true"
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
                className="form-input disable-arrow"
                name="sports"
                disabled="true"
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
        <Row>
          <Col sm={3}>
            <Form.Group>
              <Form.Label>Work Location</Form.Label>
              <Form.Control
                as="select"
                value={stateValue}
                className="form-input disable-arrow"
                disabled="true"
              >
                <option value="">Select Location</option>
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
                className="form-input disable-arrow"
                disabled="true"
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
                dateFormat="yyyy-MM-dd"
                disabled="true"
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
                  dateFormat="yyyy-MM-dd"
                  placeholderText="Date of Leaving"
                  disabled="true"
                />
              </Form.Group>
            ) : (
              <Form.Group>
                <Form.Label>Recuritment Source</Form.Label>
                <Form.Control
                  as="select"
                  value={state.recuritment}
                  className="form-input disable-arrow"
                  name="recuritment"
                  readOnly
                  disabled="true"
                >
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
          <Col sm={3}>
            {state.employmentType === "Internship" ? (
              ""
            ) : (
              // <Form.Group>
              //   <Form.Label>Internship Duration</Form.Label>
              //   <Form.Control
              //     as="select"
              //     value={state.internship}
              //     className="form-input disable-arrow"
              //     name="internship"
              //     disabled="true"
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
                  className="form-input disable-arrow"
                  name="noticePeriod"
                  disabled="true"
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
                  className="form-input disable-arrow"
                  name="probation"
                  disabled="true"
                >
                  <option value="1">1 Month</option>
                  <option value="2">2 Month</option>
                  <option value="3">3 Month</option>
                </Form.Control>
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
                <Form.Control
                  as="select"
                  className="form-input disable-arrow"
                  name="expatUser"
                  value={state.expatUser}
                  disabled={true}
                >
                  <option>Seclect </option>
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
                  disabled={true}
                />
              </Form.Group>
            </Col>
          )} */}

          {state.employmentType === "Local Expat" && (
            <React.Fragment>
              <Col sm={3}>
                <Form.Group>
                  <Form.Label>Nationality</Form.Label>
                  <Form.Control
                    as="select"
                    className="form-input disable-arrow"
                    value={state.nationality}
                    name="nationality"
                    disabled={true}
                  >
                    <option>Select Nationality</option>
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
              {/* <Col sm={3}>
                <Form.Group className="reactDate">
                  <Form.Label>Date of Issue</Form.Label>
                  <DatePicker
                    className="form-control form-input"
                    selected={dateOfIssue}
                    required
                    dateFormat="yyyy-MM-dd"
                    placeholderText="Date of Issue"
                    disabled="true"
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
                    minDate={dateOfIssue}
                    dateFormat="yyyy-MM-dd"
                    placeholderText="Date of Validity"
                    disabled="true"
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
                  readOnly
                  name="ngoDetail"
                  placeholder="Enter NGO Detail"
                  disabled="true"
                />
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

export default ViewWorkInformation;
