import React, { Fragment, useState, useContext, useEffect ,useRef} from "react";
import { OnBoardContext } from "../../context/OnBoardState";
import { Modal, Row, Col, Form, Button } from "react-bootstrap";
import calendarImage from "../../assets/images/calendar-image.png";
import { DocsVerifyContext } from "../../context/DocverificationState";
import moment from "moment";

  
const InsuranceNominationFormLetter = (props) => {
const {CandidatePersonalInfo,candidatePersonalInfoData} = useContext(OnBoardContext);

  const { imageData, downloadFileOnboard,candidateProfileData } = useContext(DocsVerifyContext);
  const [show, setShow] = useState(true);
  const [saveLetter, setSaveLetter] = useState(false);
  useEffect(() => {
    // console.log("personal information view candidate", candidateProfileData);
    if (candidateProfileData) {
      CandidatePersonalInfo(candidateProfileData.candidateId);
      console.log(candidatePersonalInfoData,"candidatePersonalInfoData")
    }
  }, [candidateProfileData]);
  const HandleSaveLetter = () => {
    // if (imageData !== "" && imageData !== null && imageData !== undefined) {
      downloadFileOnboard(candidatePersonalInfoData.aadhaarName);
      console.log(imageData,"imageData-->",candidatePersonalInfoData);
    // }
    setShow(false);
    setSaveLetter(true);
  };
console.log(props.data,"props")
  return (
    <Fragment >
      {typeof(props) !== undefined ? (
     
    <Fragment >
    <p className="">
      {" "}
      Date: <b>{moment().format("DD-MM-YYYY")}</b>
    </p>
    <br></br>

    <p>To ,</p>
    <p><b>
        Human Resource
        </b>
        </p>
        <p><b>
        {`(${props.data.companyName})`}
        </b>
        </p>
          <p>
                <b>Subject : </b>Nominee nomination in case of death for Group 
                Personal Accidental & Group Term Life Policy
                </p>
            <div className=" ">
             <p className="mt-5 ">
                {" "}
                Dear{" "}
                <b>
                  {props.data!== undefined &&
                  props.data.gender.toLowerCase() == "male"?
                  `Mr.${props.data.employeeName}`
                  :(props.data.gender.toLowerCase() == "female" && 
                  props.data.maritalStatus.toLowerCase() == "single")?
                  `Miss. ${props.data.employeeName}`
                  :`Mrs.${props.data.employeeName}`}
                  
                </b>{" "}
              </p>
      <br></br>

      <p>
      I would hereby authorize the nominee to receive the Insurance benefits in 
      case of my death towards the Group Personal Accident and Group Term 
      Life Policy.
        <br />
        <br />
      </p>
      <p>  
    {" "}
      <b> Nominee Name:</b>&nbsp;&nbsp;{props.data.nomineeName}
         </p>
           <p>
           <b>Nominee Date of Birth:</b>&nbsp;&nbsp;
           {moment(props.data.nomineeDateOfBirth).format("DD/MM/YYYY")}
           </p>
           <p>
           <b>Relationship with Nominee:</b>&nbsp;&nbsp;
           {props.data.nomineeRelationship}
           </p>
      <p>
         <b> Thanks,</b>
            </p>		
            <br/>
            <p>  
    {" "}
       Employee Name:&nbsp;&nbsp;{props.data.employeeName}
         </p>
           <p>
           Employee Signature:&nbsp;&nbsp;{}
           </p>
           <p>
           Employee Aadhar Number:&nbsp;&nbsp;{props.data.employeeAadharNumber}
           </p>
      <div className="float-right "></div>
    </div>
    {/* {!saveLetter ? ( */}
              <Row>
                <Col sm={4}></Col>
                <Col sm={5}>
                  <br></br>
                  <br></br>
                  <button
                    className={"stepperButtons"}
                    onClick={HandleSaveLetter}
                  >
                    Download
                  </button>
                </Col>
              </Row>
            {/* ) : (
              ""
            )} */}
  </Fragment>  
      ) : (
        ""
      )}
    </Fragment>
  );
};

export default InsuranceNominationFormLetter;

