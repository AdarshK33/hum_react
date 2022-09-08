import React, {
  Fragment,
  useState,
  useContext,
  useEffect,
  useMemo,
} from "react";
import { Row, Col, Form, Button } from "react-bootstrap";
import { AppContext } from "../../context/AppState";
import { PermissionContext } from "../../context/PermissionState";
import moment from "moment";
import { EmployeeProfileContext } from "../../context/EmployeeProfileState";
import { useParams, Link } from "react-router-dom";

const WorkDetails = () => {
  const { EmpProfileView, EmpProfile, currentEmpId } = useContext(
    EmployeeProfileContext
  );
  const { user } = useContext(AppContext);
  const { rolePermission, locationDetails, locationDetailsList,GrantManagerAccess } =
    useContext(PermissionContext);
  const [locationName, setLocationName] = useState("");
  const [grantValue,setGrantValue] = useState(false)
  const [grantValueError,setGrantValueError] = useState(false)
  const params = useParams();
  const empId = params["employeeid"];
console.log("paramsid",empId);

  useEffect(() => {
    locationDetails();
    if(currentEmpId !== 0 && currentEmpId !== null && currentEmpId !== undefined) {
    EmpProfileView(currentEmpId);
    }else{
      EmpProfileView(empId);
    }
  }, []);
  console.log("locationDetailsList", locationDetailsList);
  useEffect(() => {
    if (
      EmpProfile !== null &&
      EmpProfile !== undefined &&
      Object.keys(EmpProfile).length !== 0 &&
      locationDetailsList &&
      locationDetailsList !== null &&
      locationDetailsList !== undefined &&
      Object.keys(locationDetailsList).length !== 0
    ) {
      locationDetailsList.map((item, i) => {
        if (item.locationId === EmpProfile.locationId) {
          setLocationName(item.locationName);
        }
      });
    }
  }, [locationDetailsList, EmpProfile]);
  const handleGrantManagerAccess =(e)=>{
    e.preventDefault()
    console.log(grantValue,"grantValue")
    return grantValue == false?setGrantValue(true):grantValue == true?setGrantValue(false):""
  }
  console.log(grantValue,EmpProfile,"grantValue11")

  const handleSubmitAccess=(e)=>{
    e.preventDefault()
    GrantManagerAccess(EmpProfile.employeeId,grantValue)
  }
  return (
    <Fragment>
      <Form>
        <label>
          <b>Work :</b>
        </label>
        <Row
          style={{
            borderTop: "2px solid #006ebb",
            width: "98%",
            marginRight: "1rem",
            marginBottom: "1rem",
            marginLeft: "-2px",
          }}
        ></Row>
        <Row
          style={{
            marginBottom: "2rem",
          }}
        >
          <Col sm={3}>
            <label>
              <b>Email Id</b>
            </label>
            <br />
            <label className="itemResult">{EmpProfile.email}</label>
          </Col>
          <Col sm={3}>
            <label>
              <b>Fed Id</b>
            </label>
            <br />
            <label className="itemResult">{EmpProfile.fedId}</label>
          </Col>
          <Col sm={3}>
            <label>
              <b>Contract Type</b>
            </label>
            <br />
            <label className="itemResult">{EmpProfile.contractType}</label>
          </Col>
          <Col sm={3}>
            <label>
              <b>Department</b>
            </label>
            <br />
            <label className="itemResult">{EmpProfile.department}</label>
          </Col>
        </Row>
        <Row
          style={{
            marginBottom: "2rem",
          }}
        >
          <Col sm={3}>
            <label>
              <b>Position</b>
            </label>
            <br />
            <label className="itemResult">{EmpProfile.position}</label>
          </Col>
          <Col sm={3}>
            <label>
              <b>Designation</b>
            </label>
            <br />
            <label className="itemResult">{EmpProfile.designation}</label>
          </Col>
          <Col sm={3}>
            <label>
              <b>Sport</b>
            </label>
            <br />
            <label className="itemResult">{EmpProfile.sport?EmpProfile.sport:"NA"}</label>
          </Col>
          <Col sm={3}>
            <label>
              <b>Cost Center</b>
            </label>
            <br />
            <label className="itemResult">{EmpProfile.costCentre}</label>
          </Col>
        </Row>
        <Row
          style={{
            marginBottom: "2rem",
          }}
        >
          <Col sm={3}>
            <label>
              <b>Work Location</b>
            </label>
            <br />
            <label className="itemResult">{locationName}</label>
          </Col>
          <Col sm={3}>
            <label>
              <b>Company Name</b>
            </label>
            <br />
            <label className="itemResult">{EmpProfile.company}</label>
          </Col>
          <Col sm={3}>
            <label>
              <b>Date Of Transfer</b>
            </label>
            <br />
            <label className="itemResult">
              {EmpProfile.dateOfTransfer !==null ? moment(EmpProfile.dateOfTransfer).format("DD-MM-YYYY"):"NA"}
            </label>
          </Col>
          <Col sm={3}>
            <label>
              <b>Manager Id</b>
            </label>
            <br />
            <label className="itemResult">{EmpProfile.managerId}</label>
          </Col>
        </Row>
        <Row
          style={{
            marginBottom: "2rem",
          }}
        >
          <Col sm={3}>
            <label>
              <b>Manager Name</b>
            </label>
            <br />
            <label className="itemResult">{EmpProfile.managerName}</label>
          </Col>
          <Col sm={3}>
            <label>
              <b>Probation Period</b>
            </label>
            <br />
            <label className="itemResult">{EmpProfile.probationPeriod}</label>
          </Col>
          <Col sm={3}>
            <label>
              <b>System Role</b>
            </label>
            <br />
            <label className="itemResult">{EmpProfile.role==="GENERAL_USER" && EmpProfile.isManager===true? "Manager": EmpProfile.role}</label>
          </Col>
          <Col sm={3}>
            <label>
              <b>Recruitment Source</b>
            </label>
            <br />
            <label className="itemResult">{EmpProfile.recruitmentSource}</label>
          </Col>
        </Row>
        {EmpProfile.recruitmentSource==="NGO"?
        <Row
          style={{
            marginBottom: "2rem",
          }}
        >
          <Col sm={3}>
            <label>
              <b>NGO Name</b>
            </label>
            <br />
            <label className="itemResult">{EmpProfile.ngoName}</label>
          </Col>
        </Row>
        :""
}
        {(EmpProfile.isManager===false||EmpProfile.isManager===null)&& EmpProfile.contractType==="Fulltime" ?<Row  style={{
            marginBottom: "2rem",
          }}>
        <Col sm={3}>
            <label>
              <b>Grant Manager Access</b>
            </label></Col>
            <Col sm={1}>
            <div className="boxField_2 input">
                                  <input
                                    className="largerCheckbox"
                                    type="checkbox"
                                    value={grantValue}
                                     checked={grantValue}
                                    style={
                                      grantValueError ? { borderColor: "red" } : {}
                                    }
                                    // required={required}
                                     onChange={handleGrantManagerAccess}
                                  />
                                </div>
                                </Col>
                                <Col sm={3}>
                                <button
                                  // disabled={}
                                  className={
                                    "stepperButtons"
                                  }
                                  onClick={handleSubmitAccess}
                                >
                                  Submit
                                </button>
          </Col>
        </Row>:""}
      </Form>
    </Fragment>
  );
};
export default WorkDetails;
