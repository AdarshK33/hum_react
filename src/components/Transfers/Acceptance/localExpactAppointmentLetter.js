import React, { Fragment, useState, useContext, useRef } from "react";
import { Modal, Row, Col, Table } from "react-bootstrap";
import moment from "moment";
import { TransferContext } from "../../../context/TransferState";
import { E_signContext } from "../../../context/E_signState";
import { AppContext } from "../../../context/AppState";
import { useHistory } from "react-router-dom";
import { PermissionContext } from "../../../context/PermissionState";

const LocalExpactAppointmentLetter = (props) => {
  const {
    offerLetterData,
    transferData,
    loader,
    setLetterViewing,
    letterView,
    createTransferInitiation,
  } = useContext(TransferContext);
  const { rolePermission } = useContext(PermissionContext);
  const { user, fetchemployeeData } = useContext(AppContext);
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
        currentLocation:
          transferData.currentLocation !== null &&
          transferData.currentLocation !== undefined
            ? transferData.currentLocation
            : 0,
        currentManagerId: transferData.currentManagerId,
        currentMonthlyBonus: transferData.currentMonthlyBonus,
        currentPosition: transferData.currentPosition,
        promotedCompany: transferData.promotedCompany,
        promotedContractType: transferData.promotedContractType,
        promotedCostCentre: transferData.promotedCostCentre,
        promotedCountry: transferData.promotedCountry,
        promotedDateOfReturn: transferData.promotedDateOfReturn,
        promotedDepartment: transferData.promotedDepartment,
        promotedDesignation: transferData.promotedDesignation,
        promotedEmployeeId: transferData.promotedEmployeeId,
        promotedFixedGross: transferData.promotedFixedGross,
        promotedJoiningDate: transferData.promotedJoiningDate,
        promotedLocation: transferData.promotedLocation,
        promotedManagerId: transferData.promotedManagerId,
        promotedMonthlyBonus: transferData.promotedMonthlyBonus,
        promotedPosition: transferData.promotedPosition,
        promotedRelocationBonus: transferData.promotedRelocationBonus,
        promotedTermOfProject: transferData.promotedTermOfProject,
        remark: transferData.remark,
        status: 1,
        transferId: transferData.transferId,
        transferLetter: null,
        transferType: transferData.transferType,
        initiatedRole:rolePermission, 
      };
      console.log(InfoData);
      createTransferInitiation(InfoData);

      console.log("HandleSaveLetter");
      const infoData = {
        inputRef: inputRef,
        empId: transferData.promotedEmployeeId,
        candidateId: 0,
        module: "Entity Transfer",
        empName: fetchemployeeData.firstName + " " + fetchemployeeData.lastName,
        empEmail: user.email,
        empPhNo: fetchemployeeData.phone,
        history: history,
        path: "../transfers",
        recipient2: {
          rectangle: "430,160,580,260",
          name: transferData.employeeName,
          email: transferData.email,
          phoneNumber: transferData.phoneNumber,
        },
      };
      console.log(
        "getBoundingClientRect",
        inputRef.current.getBoundingClientRect()
      );
      CreatePdfAndUpload(infoData, "35,160,185,260");
      setLetterViewing(false);
      setShow(false);
    }
  };

  return (
    <Fragment>
      {offerLetterData && offerLetterData.permanentCandidateOffer ? (
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
                <h4 style={{ textAlign: "center" }}>Employment Contract</h4>
                <h5 style={{ textAlign: "center" }}>
                  {" "}
                  Emp ID: {offerLetterData.employeeId}
                </h5>
                <br />
                <p>To,</p>
                <p>Date: {moment().format("DD-MM-YYYY")}</p>

                <p>{offerLetterData.candidateName}</p>
                <p>{offerLetterData.address}</p>
                <p>{offerLetterData.cityName}</p>
                <br />

                <p>
                  {" "}
                  Dear <b>{offerLetterData.candidateName},</b>{" "}
                </p>
                <p>
                  Thank for your interest in choosing{" "}
                  {offerLetterData.companyName}. As we believe your passion for
                  sport and your values match those of our Company, we, at{" "}
                  <b>
                    {offerLetterData.companyName === "Decathlon Sports India Pvt Ltd"
                      ? "Decathlon"
                      : offerLetterData.companyName}
                  </b>
                  , are pleased to appoint you as a{" "}
                  <b>
                    {offerLetterData.companyName === "Decathlon Sports India Pvt Ltd"
                      ? "Decathlon"
                      : offerLetterData.companyName}
                  </b>{" "}
                  Permanent Employee on a Full Time basis, and your
                  responsibilities would be those of a{" "}
                  <b>{offerLetterData.position}</b> at our{" "}
                  <b>{offerLetterData.location} </b>
                  location effective{" "}
                  <b>
                    {moment(
                      offerLetterData.permanentCandidateOffer.effectiveDate
                    ).format("DD-MM-YYYY")}
                  </b>{" "}
                  and you will be on probation up to{" "}
                  <b>{offerLetterData.probationPeriod}</b> month(s) or such
                  extended period as specified by your Manager. Thereafter, your
                  employment confirmation would be informed to you in writing.
                </p>
                <p>
                  Your gross fixed compensation would be INR.{" "}
                  <b>{offerLetterData.permanentCandidateOffer.grossSalary}</b>.{" "}
                  You are also entitled for a monthly statutory/non-statutory
                  bonus which will be at a maximum{" "}
                  <b>{offerLetterData.bonus}</b> % of your gross monthly fixed
                  compensation. You are entitled to all the social security
                  benefits like PF, ESIC (as per applicability), Gratuity, and
                  Employee Compensation as specified in the respective statutory
                  acts. Please find the detailed breakup of salary in Annexure1
                  enclosed below. Further, sufficient holidays keep one
                  motivated in a work environment. Therefore you shall have{" "}
                  <b>
                    {offerLetterData.permanentCandidateOffer.eligibleLeaves}
                  </b>{" "}
                  days of annual leaves
                </p>
                <p>
                  <b>{offerLetterData.managerName}</b> will be responsible to
                  mentor and guide you in this phase of your professional
                  journey or any such manager assigned by the later.
                </p>
                <p>
                  We at{" "}
                  <b>
                    {offerLetterData.companyName === "Decathlon Sports India Pvt Ltd"
                      ? "Decathlon"
                      : offerLetterData.companyName}
                  </b>{" "}
                  strongly believe in your ability to manage yourself in the
                  best interest of the Company. Fewer the rules better the
                  productivity as far as we are concerned.
                </p>
                <p>
                  We trust you will enjoy working with{" "}
                  <b>
                    {offerLetterData.companyName === "Decathlon Sports India Pvt Ltd"
                      ? "Decathlon"
                      : offerLetterData.companyName}
                  </b>{" "}
                  and take the utmost autonomy to complete your
                  responsibilities-
                </p>
                <ol>
                  <li>
                    We believe you will treat your team mates and customers with
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
                    <b>
                      {offerLetterData.companyName === "Decathlon Sports India Pvt Ltd"
                        ? "DSIPL"
                        : offerLetterData.companyName}
                    </b>{" "}
                    family, we expect you will be open to relocate to any
                    location where the Company currently has stores or may be
                    established or any other Group companies as deemed necessary
                  </li>
                  <li>
                    Your salary and its components are strictly confidential and
                    we prefer you not share it with other team members
                  </li>
                  <li>
                    Working for{" "}
                    <b>
                      {offerLetterData.companyName === "Decathlon Sports India Pvt Ltd"
                        ? "Decathlon"
                        : offerLetterData.companyName}
                    </b>{" "}
                    is a full time job! While we believe in honesty in the job
                    responsibility, we insist you dedicate your working hours
                    solely to{" "}
                    <b>
                      {offerLetterData.companyName === "Decathlon Sports India Pvt Ltd"
                        ? "Decathlon"
                        : offerLetterData.companyName}
                    </b>{" "}
                    and not work elsewhere, and also do not indulge in any trade
                    or business owned by you or any third party
                  </li>
                  <li>
                    We hold transparency in high regard. You cannot involve
                    yourself in taking or giving bribe, gambling, theft,
                    fraudulent practices or any such act that might affect{" "}
                    <b>
                      {offerLetterData.companyName === "Decathlon Sports India Pvt Ltd"
                        ? "Decathlon"
                        : offerLetterData.companyName}
                    </b>{" "}
                    reputation or damage to property
                  </li>
                  <li>
                    We at{" "}
                    <b>
                      {offerLetterData.companyName === "Decathlon Sports India Pvt Ltd"
                        ? "Decathlon"
                        : offerLetterData.companyName}
                    </b>{" "}
                    have a strict policy against sexual harassment. We believe
                    that you will not engage in any form of sexual harassment
                    towards any of the Company employees and the Company's
                    customers.{" "}
                    <b>
                      {offerLetterData.companyName === "Decathlon Sports India Pvt Ltd"
                        ? "DSIPL"
                        : offerLetterData.companyName}
                    </b>{" "}
                    also ensures a safe environment to all its employees and
                    customers and strict action will be taken against any
                    offender, be it employee or customer
                  </li>
                  <li>
                    All documents submitted by you to the Company shall be
                    subjected to scrutiny by the appropriate authorities
                  </li>
                  <li>
                    In the event you feel you cannot be a part of our culture
                    and environment, kindly communicate your desire to depart at
                    least 7 days in advance during probation or 1 month in
                    advance if your employment is confirmed
                  </li>
                  <li>
                    In the event we find you have not abided by these, and other
                    regulations explained to you by your manager or if you do
                    not share the values of{" "}
                    <b>
                      {offerLetterData.companyName === "Decathlon Sports India Pvt Ltd"
                        ? "Decathlon"
                        : offerLetterData.companyName}
                    </b>{" "}
                    we shall communicate the dis-continuance of employment with
                    Decathlon to you at least 7 days in advance during probation
                    or 1 month in advance if your employment is confirmed
                  </li>
                  <li>
                    Service rules under the Certified Standing Orders of{" "}
                    <b>
                      {offerLetterData.companyName === "Decathlon Sports India Pvt Ltd"
                        ? "Decathlon"
                        : offerLetterData.companyName}
                    </b>{" "}
                    will be applicable to you from the date of certification of
                    such orders. The information on the certification of such
                    standing orders will be communicated to you electronically
                  </li>
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
                  <li>
                    Any image taken of you during a{" "}
                    <b>
                      {offerLetterData.companyName === "Decathlon Sports India Pvt Ltd"
                        ? "Decathlon"
                        : offerLetterData.companyName}
                    </b>{" "}
                    event or during a photo-shoot shall be the property of{" "}
                    <b>
                      {offerLetterData.companyName === "Decathlon Sports India Pvt Ltd"
                        ? "Decathlon"
                        : offerLetterData.companyName}
                    </b>{" "}
                    and you consent to{" "}
                    <b>
                      {offerLetterData.companyName === "Decathlon Sports India Pvt Ltd"
                        ? "Decathlon"
                        : offerLetterData.companyName}
                    </b>
                    's use of the such image in communication.
                  </li>
                  <li>
                    Apart from the above mentioned rules all rules specified
                    under the certified standing orders of Decathlon will be
                    applicable to you from the date of your joining{" "}
                    <b>
                      {offerLetterData.companyName === "Decathlon Sports India Pvt Ltd"
                        ? "Decathlon"
                        : offerLetterData.companyName}
                    </b>
                  </li>
                  <li>
                    Clause 4 of this employment contract shall continue to
                    survive even after any form of termination of this
                    employment contract.
                  </li>
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
                  <b>We welcome you to the Decathlon Family!</b>
                </p>
                <p style={{ textAlign: "center" }} class="pdf-pagebreak-before">
                  <b>Annexure-1</b>
                </p>

                <Table
                  bordered
                  size="sm"
                  data-pdfmake="{'widths':[250,'*','auto']}"
                >
                  <thead>
                    <tr>
                      <th>Salary Structure</th>
                      <th>Monthly</th>
                      <th>Annually</th>
                    </tr>
                  </thead>
                  <tbody>
                    <tr>
                      <td>
                        <b>Gross</b>{" "}
                      </td>
                      <td>
                        <b>{Math.round(offerLetterData.fixedGross)}</b>
                      </td>
                      <td>
                        <b>{Math.round(offerLetterData.fixedGross )* 12}</b>
                      </td>
                    </tr>
                    <tr>
                      <td>Basic </td>
                      <td>
                        {Math.round(
                          offerLetterData.permanentCandidateOffer.basic
                        )}
                      </td>
                      <td>
                        {Math.round(
                          offerLetterData.permanentCandidateOffer.basic 
                        )* 12}
                      </td>
                    </tr>
                    <tr>
                      <td>House Rent Allowance </td>

                      <td>
                        {Math.round(
                          offerLetterData.permanentCandidateOffer.hra
                        )}
                      </td>
                      <td>
                        {Math.round(
                          offerLetterData.permanentCandidateOffer.hra 
                        )* 12}
                      </td>
                    </tr>

                    <tr>
                      <td>Leave Travel Allowance</td>
                      <td>
                        {Math.round(
                          offerLetterData.permanentCandidateOffer.lta
                        )}
                      </td>
                      <td>
                        {Math.round(
                          offerLetterData.permanentCandidateOffer.lta 
                        )* 12}
                      </td>
                    </tr>

                    <tr>
                      <td>Special Allowance </td>
                      <td>
                        {Math.round(
                          offerLetterData.permanentCandidateOffer
                            .specialAllowance
                        )}
                      </td>
                      <td>
                        {Math.round(
                          offerLetterData.permanentCandidateOffer
                            .specialAllowance 
                        )* 12}
                      </td>
                    </tr>
                    <tr>
                      <td>Monthly Bonus/ Statutory Bonus*+ </td>
                      <td>{Math.round(offerLetterData.bonusAmt)}</td>
                      <td>{Math.round(offerLetterData.bonusAmt )* 12}</td>
                    </tr>
                    <tr>
                      <td>
                        <b>Gross Salary</b>{" "}
                      </td>
                      <td>
                        <b>
                          {Math.round(
                            offerLetterData.permanentCandidateOffer
                              .grossSalary + offerLetterData.bonusAmt
                          )}
                        </b>
                      </td>
                      <td>
                        <b>
                          {Math.round(
                            (offerLetterData.permanentCandidateOffer
                              .grossSalary +
                              offerLetterData.bonusAmt)
                          ) *
                          12}
                        </b>
                      </td>
                    </tr>
                    <tr>
                      <td>Employer PF </td>
                      <td>
                        {Math.round(
                          offerLetterData.permanentCandidateOffer.employerPF
                        )}
                      </td>
                      <td>
                        {Math.round(
                          offerLetterData.permanentCandidateOffer.employerPF
                        ) *
                        12}
                      </td>
                    </tr>
                    <tr>
                      <td>Gratuity </td>
                      <td>
                        {Math.round(
                          offerLetterData.permanentCandidateOffer.gratuity.toFixed(1)
                        )}
                      </td>
                      <td>
                        {Math.round(
                          offerLetterData.permanentCandidateOffer.gratuity.toFixed(1) 
                        )* 12}
                      </td>
                    </tr>

                    <tr>
                      <td>Employer ESIC</td>
                      <td>
                        <b>
                          {Math.round(
                            offerLetterData.permanentCandidateOffer.employerESIC
                          )}
                        </b>
                      </td>
                      <td>
                        <b>
                          {Math.round(
                            offerLetterData.permanentCandidateOffer.employerESIC
                          ) * 12}
                        </b>
                      </td>
                    </tr>
                    <tr>
                      <td>
                        <b>CTC </b>
                      </td>
                      <td>
                        <b>
                          {Math.round(
                            offerLetterData.permanentCandidateOffer.ctc +
                              offerLetterData.bonusAmt
                          )}
                        </b>
                      </td>
                      <td>
                        <b>
                          {Math.round(
                            offerLetterData.permanentCandidateOffer.ctc +
                              offerLetterData.bonusAmt
                          ) * 12}
                        </b>
                      </td>
                    </tr>
                    <tr>
                      <td colspan="3">
                        <p>
                          <span style={{ color: "red" }}>*</span> The teammates
                          from countries with whom India does not have a Social
                          Security Agreement (the countries not mentioned in the
                          list on
                          https://www.epfindia.gov.in/site_en/International_workers.php
                          are counties with whom India does not have a Social
                          Security Agreement) can withdraw their Provident Fund
                          amount only after attaining the age of 58 years
                          (retirement age as fixed by the Government of India).
                        </p>
                        <p>
                          * Please note that if you are drawing a monthly gross
                          salary upto 21000 then you would get a minimum of INR.
                          583/per month for the number of months that you have
                          worked in any Financial year or a maximum upto 0.0 %
                          of your Monthly fixed gross basis the criterion
                          mentioned by your manager from time to time
                        </p>
                        <p>
                          + Please note that if you are drawing monthly gross
                          more than 21000 then you can earn maximum upto 0.0 %
                          of your Monthly fixed gross basis the criterion
                          mentioned by your manager from time to time
                        </p>
                      </td>
                    </tr>
                  </tbody>
                </Table>

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
                    &nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;
                    {/* &nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;
                    &nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;
                    &nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp; */}
                    &nbsp; Accepted By Me
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
export default LocalExpactAppointmentLetter;
