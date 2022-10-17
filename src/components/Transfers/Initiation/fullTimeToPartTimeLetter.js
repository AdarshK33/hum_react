import React, { Fragment, useState, useContext, useRef } from "react";
import { Modal, Row, Col, Table } from "react-bootstrap";
import moment from "moment";
import { TransferContext } from "../../../context/TransferState";
import { E_signContext } from "../../../context/E_signState";
import { AppContext } from "../../../context/AppState";
import { useHistory } from "react-router-dom";

const FullTimeToPartTimeLetter = (props) => {
  const {
    offerLetterData,
    transferData,
    loader,
    createTransferInitiation,
    setLetterViewing,
    letterView,
  } = useContext(TransferContext);
  const { user,fetchemployeeData } = useContext(AppContext);
  const history = useHistory();
  const { CreatePdfAndUpload } = useContext(E_signContext);
  const [show, setShow] = useState(true);
  const [saveLetter, setSaveLetter] = useState(false);

  const ref = React.createRef();
  const inputRef = useRef(null);
  const handleClose = () => {
    setShow(false);
    setLetterViewing(false);
  };
  // console.log("candidateDatacandidateData", candidateData);
  const HandleSaveLetter = () => {
    // setSaveLetter(true);
    if (transferData && Object.keys(transferData).length) {
      const InfoData = {
        currentCompany: transferData.currentCompany,
        currentContractType: transferData.currentContractType,
        currentCostCentre: transferData.currentCostCentre,
        currentCountry: transferData.currentCountry,
        currentDepartment: transferData.currentDepartment,
        currentDesignation: transferData.currentDesignation,
        currentEmployeeId: transferData.currentEmployeeId,
        currentFixedGross: transferData.currentFixedGross,
        currentJoiningDate: transferData.currentJoiningDate,
        currentLocation: transferData.currentLocation,
        currentManagerId: transferData.currentManagerId,
        currentMonthlyBonus: transferData.currentMonthlyBonus,
        currentPosition: transferData.currentPosition,
        promotedCompany: transferData.currentCompany,
        promotedContractType: transferData.promotedContractType,
        salaryType: transferData.salaryType,
        promotedCostCentre: transferData.promotedCostCentre,
        promotedCountry: transferData.promotedCountry,
        // promotedDateOfReturn: moment(DateOfTransfer).format("YYYY-MM-DD"),
        promotedDepartment: transferData.promotedDepartment,
        promotedDesignation: transferData.promotedDesignation,
        promotedEmployeeId: transferData.currentEmployeeId,
        promotedFixedGross: transferData.promotedFixedGross,
        promotedJoiningDate: transferData.promotedJoiningDate,
        promotedLocation: transferData.currentLocation,
        promotedManagerId: transferData.currentManagerId,
        promotedMonthlyBonus: transferData.currentMonthlyBonus,
        promotedPosition: transferData.currentPosition,
        promotedRelocationBonus: transferData.currentMonthlyBonus,
        promotedTermOfProject: transferData.promotedTermOfProject,
        // status: 0,
        status:1,
        transferId: transferData.transferId,
        transferType: transferData.transferType,
      };
      console.log(InfoData);
      createTransferInitiation(InfoData);

      console.log("HandleSaveLetter");
      const infoData = {
        inputRef: inputRef,
        empId: transferData.promotedEmployeeId,
        candidateId: 0,
        module: "Transfer",
        empName: fetchemployeeData.firstName + " " + fetchemployeeData.lastName,
        empEmail: user.email,
        empPhNo: fetchemployeeData.phone,
        history: history,
        path: "../transfers",
        recipient2: {
          rectangle: "430,380,580,480",
          name: transferData.employeeName,
          //  transferData.firstName + " " + transferData.lastName,
          email:transferData.email,
          phoneNumber:transferData.phoneNumber,
        },
      };
      console.log(
        "getBoundingClientRect",
        inputRef.current.getBoundingClientRect()
      );
      CreatePdfAndUpload(infoData, "35,380,185,480");
      setShow(false);
      setLetterViewing(false);
    }
  };

  return (
    <Fragment>
      {offerLetterData && offerLetterData.partTimeCandidateOffer ? (
        <Modal show={letterView} onHide={handleClose} size="md">
          <Modal.Header closeButton className="modal-line"></Modal.Header>
          <Modal.Body>
            {loader ? (
              <div
                className="loader-box loader"
                style={{ width: "100% !important" }}
              >
                <div className="loader">
                  <div className="line bg-primary"></div>
                  <div className="line bg-primary"></div>
                  <div className="line bg-primary"></div>
                  <div className="line bg-primary"></div>
                </div>
              </div>
            ) : (
              <div ref={inputRef}>
                <h4 style={{ textAlign: "center" }}>
                  <b>Employment Contract</b>
                </h4>
                <h5 style={{ textAlign: "center" }}>
                  <b>Change from Full time to Part Time </b>
                </h5>
                <br />

                 <div>
                <p>To,
                  
                &nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;
                &nbsp;&nbsp; &nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;
                &nbsp;&nbsp;&nbsp;&nbsp; &nbsp;&nbsp;&nbsp;
                &nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;
                &nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;
                &nbsp;&nbsp;&nbsp; &nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;
                &nbsp;&nbsp; &nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;
                &nbsp; &nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;
                &nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp; &nbsp;
                &nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp; &nbsp;&nbsp;
                &nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;
                &nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp; &nbsp;&nbsp;&nbsp;&nbsp;
                
                  Date: {moment().format("DD-MM-YYYY")}
                   </p>
                </div>
                <br />
                <p>{offerLetterData.candidateName}</p>
                <p>{offerLetterData.employeeId}</p>
                <p>{offerLetterData.address}</p>
                <p>{offerLetterData.cityName}</p>
                <br />
                <p>
                  {" "}
                  Dear <b>{offerLetterData.candidateName},</b>{" "}
                </p>
                <p>
                  We note that you have expressed your intention & desire to
                  continue to work with {offerLetterData.companyName} on PART
                  TIME BASIS . Based on your request, mutual discussions,
                  wherein consequent to change in employment to Part Time
                  Employment, there would be consequential change in the service
                  conditions, namely, the remuneration, contributions to PF /
                  ESI, effects or alterations in the matter of payment of bonus,
                  leave benefits and all other financial & non-financial
                  benefits etc.
                </p>
                <p>
                  During the said personal discussions, after having fully
                  understood the revised / changed service conditions arising
                  out of change in the employment contract and you have
                  expressed your agreement and concurrence for the same. It is
                  clearly understood between you and{" "}
                  {offerLetterData.companyName} that your desire to work on PART
                  TIME BASIS is your own will & volition and devoid of any
                  compulsions or coercion.
                </p>
                <p>
                  Consequentially, you are hereby being offered Fresh Letter of
                  Appointment based on the following Terms & Conditions.
                </p>
                <p>
                  Please take note that the letter of appointment dated{" "}
                  <b>{offerLetterData.partTimeCandidateOffer.effectiveDate}</b>{" "}
                  shall cease with immediate effect and becomes null & void.
                </p>
                <p>
                  We are pleased to appoint you as Permanent Employee on a Part
                  Time basis, You will be designated as{" "}
                  <b>{offerLetterData.position}</b> at our{" "}
                  <b>{offerLetterData.location} </b> location effective{" "}
                  <b>{offerLetterData.partTimeCandidateOffer.effectiveDate}</b>.
                </p>
                <p>
                  Your gross fixed compensation would be INR.{" "}
                  <b>{offerLetterData.partTimeCandidateOffer.rate}</b> per
                  hour.You are also entitled for a monthly
                  statutory/non-statutory bonus which will be at a maximum{" "}<b>{offerLetterData.bonus}</b>%
                  of your gross monthly fixed compensation. You are entitled to
                  all the social security benefits like PF, ESIC (as per
                  applicability), & bonus as specified in the respective
                  statutory acts. Further, sufficient holidays keep one
                  motivated in a work environment.
                </p>
                {/* <p>
              You would be entitled to non-statutory benefits such as Health &
              Social Security Insurance. Further you would be eligible to earn
              monthly performance bonus to a maximum of{" "}
              <b>{offerLetterData.bonus}</b>% . Monthly performance bonus is
              payable subject to the successful achievement of individual and
              Company goals as specified by your manager from time to time.
            </p> */}
                <p class="pdf-pagebreak-before">
                  <b>{offerLetterData.managerName}</b> will be responsible to
                  mentor and guide you in this phase of your professional
                  journey or any such manager assigned by the later.
                </p>
                <p>
                  We at {offerLetterData.companyName} strongly believe in your
                  ability to manage yourself in the best interest of the
                  Company. Fewer the rules better the productivity as far as we
                  are concerned.
                </p>
                <p>
                  We trust you will enjoy working with{" "}
                  {offerLetterData.companyName} and take the utmost autonomy to
                  complete your
                </p>
                <p>responsibilities-</p>
                <ol>
                  <li>
                    We believe you will treat your teamates and customers with
                    utmost respect
                  </li>
                  <li>
                    We are bound by certain regulations by the Government of
                    India and our Group norms. You will be required to abide by
                    all these regulations* currently existing or any such rules
                    that might be incorporated from time to time
                  </li>
                  <li>
                    When you are happy being a part of the{" "}
                    {offerLetterData.companyName} family, we expect you will be
                    open to relocate to any location where the Company currently
                    has stores or may be established or any other Group
                    companies as deemed necessary
                  </li>
                  <li>
                    Your salary and its components are strictly confidential and
                    we prefer you not share it with other team members
                  </li>

                  <li>
                    We hold transparency in high regard. You cannot involve
                    yourself in taking or giving bribe, gambling, theft,
                    fraudulent practices or any such act that might affect{" "}
                    {offerLetterData.companyName} reputation or damage to
                    property
                  </li>
                  <li>
                    We at {offerLetterData.companyName} have a strict policy
                    against sexual harassment. We believe that you will not
                    engage in any form of sexual harassment towards any of the
                    Company employees and the Company's customers.{" "}
                    {offerLetterData.companyName} also ensures a safe
                    environment to all its employees and customers and strict
                    action will be taken against any offender, be it employee or
                    customer
                  </li>
                  <li>
                    All documents submitted by you to the Company shall be
                    subjected to scrutiny by the appropriate authorities
                  </li>
                  <li>
                    In the event you feel you cannot be a part of our culture
                    and environment, kindly communicate your desire to depart at
                    least 7 days in advance
                    {/* during probation or 1 month in advance if your
                employment is confirmed */}
                  </li>
                  <li>
                    In the event we find you have not abided by these, and other
                    regulations explained to you by your manager or if you do
                    not share the values of {offerLetterData.companyName} we
                    shall communicate the dis-continuance of employment with{" "}
                    {offerLetterData.companyName} to you at least 7 days in
                    advance
                    {/* during probation or 1 month in advance if your employment is
                confirmed */}
                  </li>
                  {/* <li>
                Service rules under the Certified Standing Orders of{" "}
                {offerLetterData.companyName}
                will be applicable to you from the date of certification of such
                orders. The information on the certification of such standing
                orders will be communicated to you electronically
              </li> */}
                  <li>
                    However, your employment will be subjected to immediate
                    termination on the following conditions prescribed in the
                    Industrial Employment/Model Standing Orders Act 1946-
                  </li>
                  <ul>
                    <li>
                      ● Wilful in subordination or disobedience, whether alone
                      or in combination with others, to any lawful and
                      reasonable order of a superior
                    </li>
                    <li>
                      ● Theft, fraud or dishonesty in connection with the
                      employers business or property
                    </li>
                    <li>
                      ● Wilful damage to or loss of employers goods or property
                    </li>
                    <li>
                      ● Taking or giving bribes or any illegal gratification
                    </li>
                    <li>
                      ● Habitual absence without leave or absence without leave
                      for more than 10 days
                    </li>
                    <li>● Habitual late attendance</li>
                    <li>
                      ● Habitual breach of any law applicable to the
                      establishment
                    </li>
                    <li>
                      ● Riotous or disorderly behaviours during working hours at
                      the establishment or any act subversive of discipline
                    </li>
                    <li>● Habitual negligence or neglect of work</li>
                    <li>
                      ● Unauthorised strike of work or inciting others to strike
                      work in contravention of the provision of any law, or rule
                      having the force of law.
                    </li>
                  </ul>
                  <li class="pdf-pagebreak-before">
                    Any image taken of you during a{" "}
                    {offerLetterData.companyName} event or during a photo-shoot
                    shall be the property of {offerLetterData.companyName} and
                    you consent to {offerLetterData.companyName}'s use of the
                    such image in communication.
                  </li>
                  <li>
                    Apart from the above mentioned rules all rules specified
                    under the certified standing orders of{" "}
                    {offerLetterData.companyName} will be applicable to you from
                    the date of your joining {offerLetterData.companyName}
                  </li>
                  <li>
                    Clause 4 of this employment contract shall continue to
                    survive even after any form of termination of this
                    employment contract.
                  </li>
                  {/* <li>
                Working for {offerLetterData.companyName} is a full time job!
                While we believe in honesty in the job responsibility, we insist
                you dedicate your working hours solely to{" "}
                {offerLetterData.companyName} and not work elsewhere, and also
                do not indulge in any trade or business owned by you or any
                third party
              </li> */}
                </ol>
                <p>
                  <b>
                    *. Notwithstanding anything mentioned above, please note
                    that the regulations would be explained to you by your
                    respective manager during your induction program{" "}
                  </b>
                </p>
                <p>
                  Should you accept the above information, then kindly sign the
                  duplicate copy of this appointment letter
                </p>
                <p>
                  <b>
                    We welcome you to the {offerLetterData.companyName} Family!
                  </b>
                </p>
                <div style={{ marginLeft: "2rem" }}>
                  {/* stylings are not accepting by html to pdf */}

                  <p>
                    For {offerLetterData.companyName}
                    &nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;
                    &nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;
                    &nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;
                    &nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;
                    &nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;
                    &nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;
                    &nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;
                   {/* &nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;
                     &nbsp;&nbsp;&nbsp;&nbsp;
                    &nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;
                    &nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;
                    &nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp; 
                    &nbsp; */}
                    Accepted By Me
                  </p>
                </div>
                <div>
                <p style={{ textAlign: "right" }} >
                    {/*  &nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;
                    &nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;
                    &nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;
                    &nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;
                    &nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;
                    &nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;
                    &nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;
                    &nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;
                    &nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;
                    &nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;
                    &nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;
                    &nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;
                    &nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;
                      // &nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;
                    &nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;
                    &nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp; 
                    &nbsp; &nbsp;*/}
                    {offerLetterData !== undefined &&
                    offerLetterData.candidateName}
                  </p>

                </div>
                <div style={{ marginLeft: "3rem" }}>
                  <p>
                    Authorised Signatory
                    &nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;
                    &nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;
                    &nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;
                    &nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;
                    &nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;
                    &nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;
                    &nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;
                    &nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;
                    {/* &nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;
                    &nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;
                    &nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp; */}
                    &nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp; Employee Signature
                  </p>
                </div>
                {/* </Modal.Body> */}
                {/* <Row>
                  <Col sm="8">
                    <p>For {offerLetterData.companyName} Pvt Ltd</p>
                  </Col>
                  <Col sm="4">
                    <p> Accepted By Me</p>
                    <p>
                      {offerLetterData !== undefined &&
                        offerLetterData.candidateName}
                    </p>
                  </Col>
                </Row>
                <Row>
                  <Col sm="8">
                    <p>Authorised Signatory</p>
                  </Col>
                  <Col sm="4">
                    <p> Employee Signature</p>
                  </Col>
                </Row> */}
              </div>
            )}
            {!loader ? (
              <Row>
                <Col sm={4}></Col>
                <Col sm={5}>
                  <br></br>
                  <br></br>
                  <button
                    className={"stepperButtons"}
                    onClick={HandleSaveLetter}
                  >
                    Save Changes
                  </button>
                </Col>
              </Row>
            ) : (
              ""
            )}
          </Modal.Body>
        </Modal>
      ) : (
        ""
      )}
    </Fragment>
  );
};
export default FullTimeToPartTimeLetter;
