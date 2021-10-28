import React, { useState ,useContext,useEffect} from "react";
import { Modal, Button ,Col,Form,Row} from "react-bootstrap";
import { DSICharterContext } from "../../context/DSICharterState";
// import { EmployeeSeparationContext } from "../../context/EmployeeSeparationState";

const ITCharter =(props)=>{
    const {  dsiCharterUpdate,dsiCharterUpdateData,
        ViewEmployeeProfile,employeeProfileData,charterIdValue
        ,viewCharterAll,charterDataAll} = useContext(DSICharterContext);
    // const {ViewEmployeeProfile,employeeProfileData} = useContext(EmployeeSeparationContext)
  const [showModal, setShow] = useState(true);
    const [dsiItCharter,setDsiItCharter] = useState(false)
    const [dsiItCharterError,setDsiItCharterError] = useState("")
    const [charterId ,setCharterId] = useState("")
    const [charterAcknowledgementId,setCharterAcknowledgementId] = useState("")

    const handleClose = () => {
        setShow(false);
        props.history.push("/dashboard/storedashboard")
      } 
      
    const handleShow = () => setShow(true);
    const handleCheckBox =(e)=>{
        if(dsiItCharter == false){
          setDsiItCharter(true)
        }else{
          setDsiItCharter(false)
        }
        console.log(dsiItCharter)
      }
      useEffect(() => {
        ViewEmployeeProfile()
        viewCharterAll()
      },[charterIdValue,props])

    useEffect(() => {
        if(employeeProfileData !== undefined && employeeProfileData !== null 
         && employeeProfileData !== "" ){
        setCharterId(employeeProfileData.charterId)
         if(employeeProfileData.isCodeOfConduct === true &&
             employeeProfileData.isDsiItCharter !==true){
                setShow(true)
              }else if(employeeProfileData.isCodeOfConduct === true && 
                employeeProfileData.isDsiItCharter === true){
                props.history.push("/dashboard/storedashboard")
                setShow(false)
              }
     }
     }, [employeeProfileData,props])
     console.log(employeeProfileData,charterIdValue,"employeeProfileData it0000")
    const handleSave =(e)=>{
        e.preventDefault()
        console.log(props,dsiItCharter,employeeProfileData,charterDataAll,"charter it")
        if (dsiItCharter == "" || dsiItCharter == null || dsiItCharter == undefined) {
            setDsiItCharterError("Please accept the acknowledgement");
          } else {
            setDsiItCharterError("");
          }
          if(dsiItCharter == true){
    //   const infoData = {
    //     "charterId": charterId,
    //     "acknowledge":true,
    //     "dsiCharterAcknowledgement": [
    //         {
    //           "charterAcknowledgementId": charterId,
    //           "charterId": charterId,
    //         }
    //       ],
    //     "employeeId":employeeProfileData.employeeId,
    //     "isCodeOfConduct": employeeProfileData.isCodeOfConduct,
    //     "isDsiItCharter": true 
    //     }
    charterDataAll.map((item)=>{
          if(item.employeeId === employeeProfileData.employeeId){
            const infoData = {
                "acknowledge":true,
                "charterId": item.charterId,
                "dsiCharterAcknowledgement": [
                  {
                    "charterAcknowledgementId":0,
                    "charterId": item.charterId,
                  }
                ],     
                "employeeId":employeeProfileData.employeeId,
                "isCodeOfConduct":item.isCodeOfConduct === null?false:true,
                "isDsiItCharter":true
                }
    
            dsiCharterUpdate(infoData)
            props.history.push("/dashboard/storedashboard")
            setShow(false)       
           }
        })
        
    }
      }
    


      useEffect(() => {
        if(employeeProfileData !== undefined && employeeProfileData !== null && employeeProfileData !== ""){
                if(employeeProfileData.isDsiItCharter == true){
                    setDsiItCharter(true)
                }else{
                    setDsiItCharter(false)
                }
        }
      }, [props])

  return (
    <>
      <Modal show={showModal} onHide={handleClose} >
        <Modal.Body>
        <div class="html-charter">
        <body>
    <div class="container-charter">
        <h1 class="h1-charter">DSI IT CHARTER</h1>
        <p>Decathlon Sports India Pvt. Ltd. along with its group companies (hereinafter referred as DSI)
            issues this IT Charter (“​ <strong>Charter</strong>​ ”) which will be ITCharterlicable to all its employees in relation to all
            DSI’s tangible and intangible assets in any form or media including but not limited to IT assets,
            Intellectual Property Rights (IPR), confidential information, customer data, trade secrets, codes,
            products & service offerings, organization, decision processes, technical infrastructure, working
            processes and delegation of responsibilities, project management and planning methods,
            reports, plans sketches, models, drawings, specifications, procurement requirements,
            inventions, discoveries, know-how, technical manuals, competitive sensitive material,
            specifications, product features, customer list, specializations, documents, sales data, financial
            statements and business/development plans (“​ <strong>DSI Assets​</strong> ”). This Charter will be effective and
            applicable from 1st December, 2020.
        </p>
        <p>All DSI employees must adhere to the Charter for during their course of employment with DSI.
            This Charter also extends to third party suppliers using or in possession of DSI Assets. DSI
            employees and any third Party shall be referred to as (“​ <strong>User​</strong> ”)
        </p>
        <table class="table-charter">
            <thead>
                <tr>
                    <th class="th-charter">Document Classification:</th>
                    <th class="th-charter"colspan="2">Internal Use Only</th>
                </tr>
                <tr>
                    <th class="th-charter">Reviewed on:</th>
                    <th class="th-charter">Review Frequency:</th>
                    <th class="th-charter">Next Review Date</th>
                </tr>
            </thead>
            <tbody>
                <tr>
                    <td class="td-charter">17th Nov, 2020</td>
                    <td class="td-charter">Yearly</td>
                    <td class="td-charter">1st Dec, 2021</td>
                </tr>
            </tbody>
            <thead>
                <tr>
                    <th class="th-charter">Prepared by:</th>
                    <th class="th-charter">Reviewed by:</th>
                    <th class="th-charter">Approved by:</th>
                </tr>
            </thead>
            <tbody>
                <tr>
                    <td class="td-charter">Sanjeev Nadgir - Country IT Security Leader</td>
                    <td class="td-charter">Sreejith Mohanchandran - IS Team Manager
                        Erikaa Kathuria - Legal Advisor 
                        Ravi Sinha - Human Resource Manager</td>
                    <td class="td-charter">Joy Tiwary - Chief Information Officer</td>
                </tr>
            </tbody>
            <thead>
                <tr>
                    <th class="th-charter">Owned by:</th>
                    <th class="th-charter">Effective Date:</th>
                    <th class="th-charter">Scope:</th>
                </tr>
            </thead>
            <tbody>
                <tr>
                    <td class="td-charter">Information Security team</td>
                    <td class="td-charter"><strong>1st December, 2020</strong></td>
                    <td class="td-charter">India, Sri Lanka, Bangladesh</td>
                </tr>
            </tbody>
        </table>

        <h2 class="h2-charter">Charter for All Teammates</h2>

        <h3 class="h3-charter">RIGHTS AND RESPONSIBILITIES OF USERS</h3>
        <ol class="ol-charter">
            <li class="list-item-main-charter">Each User has the right to access DSI Assets necessary for their job:
                <ol class="ol-charter">
                    <li class="li-charter">This right is strictly professional.</li>
                    <li class="li-charter">It may be revoked by DSI at any time if the User is in non-compliance with the
                        authorization granted.</li>
                    <li class="li-charter">It ceases when the professional activity that requires it comes to an end.</li>
                </ol>
            </li>
            <li class="list-item-main-charter">Each User is responsible for the DSI Assets made available to them:
                <ol>
                    <li class="list-alpha-charter">DSI Assets must be used professionally and honestly and only for the
                        purpose of the job, in a legal way.</li>
                </ol>
            </li>
            <li class="list-item-main-charter">Each User is responsible, at their level, for the protection of DSI Assets:
                <ol>
                    <li class="li-charter">Users are responsible for the confidentiality and backup of their data. Users must
                        save all professional data to the intended directories periodic backup. Users
                        must keep confidential files secured using encryption and/or password devices
                        or by assigning proper access rights.</li>
                    <li class="li-charter">Users must only access their own information, and information that is published
                        or shared with any workgroups or team drives they belong to. Users undertake
                        not to read, edit, copy or destroy any data not belonging to them without clear
                        agreement from the data owner, even if the data owner has not sufficiently
                        protected the data. In the event a user accidentally gains access to information
                        they are not authorised, they must immediately quit the access and inform the IT
                        department or the owner of such information. This rule also applies to private
                        conversations and correspondences such as email where the User is not the
                        intended recipient or copied to the message.</li>
                    <li class="li-charter">Users are responsible for the accesses and rights they grant to other Users, and
                        for any use made by the grantee.</li>
                    <li class="li-charter">Users undertake not to intentionally disturb the smooth running of the Decathlon
                        Group’s information systems by inappropriate use or introducing malware or
                        viruses.</li>
                    <li class="li-charter">Users must inform their IT department of any abnormal operations they notice, or
                        any attempted hacking of their account.</li>
                    <li class="li-charter">Printed documents must be collected from printers, faxes and photocopiers
                        promptly, and stored securely according to their confidentiality. After use,
                        documents must be archived or destroyed in accordance with their
                        confidentiality.</li>
                    <li class="li-charter">Portable devices such as storage devices must never be left in full view of others
                        (lying on the desk, left in a car, in a public place).</li>
                    <li class="li-charter">Storage devices that are no longer in use must be sanitized, with the assistance
                        of IT services if necessary, before disposal.</li>
                </ol>
            </li>
            <li class="list-item-main-charter">Every User must observe internal and external regulations applicable in the following areas:
                <ol>
                    <li class="list-alpha-charter">Access, profiles and passwords:
                        <ol class="ol-charter">
                            <li class="li-charter">Access to different IT resources requires a profile and password. Users
                                must change the password at initial log on.</li>
                            <li class="li-charter">The password must be changed every 120 days, or immediately if it is
                                compromised or revealed.</li>
                            <li class="li-charter">Users must never communicate or write down their password.</li>
                            <li class="li-charter">Users must never use any profile not belonging to them, or share their
                                profile with others.</li>
                            <li class="li-charter">Every User must have an individual profile, and must logout of their profile
                                and email when using a shared IT resource after their usage of the shared
                                asset is completed for the job/task.</li>
                            <li class="li-charter">Users should use a good password that contains at least 8 characters
                                with upper and lowercase characters, numbers and special characters.
                                Avoid using names, dictionary words, or common series of numbers and
                                letters.</li>
                            <li class="li-charter">Each entity may be asked to reinforce physical or logical access through
                                the use of a specific system for its organisation (access badge, chip card,
                                biometric systems, secure access filter etc.).</li>
                        </ol>
                    </li>
                    <li class="list-alpha-charter roman-charter">Workstations and access to information:
                        <ol >
                            <li>Users may only log on to the network using the DSI assets provided to them by
                                the IT department.</li>
                            <li>Users may not change the settings or configuration of their DSI assets , or
                                install non-catalogued software. Every software should be either procured via IT
                                procurement team, or could be an open source licence software.</li>
                            <li>Users may not bypass the use restrictions in place for software provided by
                                DSI.</li>
                            <li>Users must lock their workstation when they leave their desk even
                                momentarily.</li>
                            <li>User must inform the IT department of any problems that may affect the
                                security of workstation or information. (Unusual behaviour, suspicious software
                                etc.)</li>
                        </ol>
                    </li>
                    <li class="list-alpha-charter roman-charter">DSI Assets : Laptop computers, PDAs, telephones, USB devices etc:
                        <ol>
                            <li>Mobile devices are allocated in accordance with the objective criteria linked to
                                the individual's job. (Number of trips off-site, organisation of meetings, specific
                                temporary requirements etc.)</li>
                            <li>Users using email on their mobile, need to accept the permissions sought for
                                managing the device. DSI only monitors the data pertaining to DSI and not your
                                personal data.</li>
                            <li>Portable devices/DSI Assets and the stored data should be taken care by the
                                User:
                            <ul>
                                <li>Do not lend it to others;</li>
                                <li>Do not leave it unattended or unsecured especially while travelling or away from
                                    their office desk for a considerable amount of time;</li>
                                <li>Do not affix stickers that identify the Group on the laptop;</li>
                            </ul>
                            </li>
                            <li>In the event of loss or theft, the user makes a report to the local police
                                department and informs their manager and the DSI’s IT department as soon as
                                possible. In the event of evident negligence, the user may be held personally responsible for the theft and the cost of the stolen hardware may be billed to
                                them.</li>
                        </ol>
                    </li>
                    <li class="list-alpha-charter roman-charter">Use of communication and exchange tools:
                        <ol>
                            <li>DSI provides staff with various messaging tools that meet their needs for
                                internal and external professional communication (email, IM, telephones and
                                standard mail).</li>
                            <li>Users must not use the messaging tools to communicate offensive, racist,
                                pornographic, defamatory, illegal, sexually or morally inappropriate content
                                otherwise the author may be held criminally responsible.</li>
                            <li>Users are responsible for the use made by a third party if they should reveal
                                their password or leave their email account accessible during their absence.</li>
                            <li>The email address given by DSI to its Users should only be communicated for
                                professional business directly linked with DSIs activities.</li>
                            <li>No information regarding the DSI Group's internal organisation, or that of its
                                companies, its activities, its tools, or economic performance, may be
                                communicated by phone to a third party who has not been formally identified.</li>
                            <li>No confidential information may be sent via unsecured email to an address
                                outside DSI.</li>
                            <li>An automatic filter is installed that will block potentially dangerous messages
                                such as spam, messages with certain attachments, messages containing clearly
                                non-professional material (identified with a keyword filter), or messages of an
                                inappropriate size.</li>
                            <li>Email system administrators are only authorised to consult the content of
                                individual email accounts when requested to do so by the IT Security team, as
                                part of investigations into technical issues or infringement of the rules set out in
                                this charter.</li>
                        </ol>
                    </li>
                    <li class="list-alpha-charter roman-charter">Use of internet services:
                        <ol>
                            <li>Internet access is allocated to Users whose jobs require it. This access can be
                                revoked at any time if it is in the DSIs interests.</li>
                            <li>When browsing the internet, Users must remember that their profile contains
                                the DSI’s name, and that their actions may directly affect the DSI’s brand image.</li>
                            <li>Additionally, all User's online activity (sites visited, messages exchanged, data
                                entered into forms, data collected without the user's knowledge etc.) may be
                                captured by unknown third parties, and analysed to identify interests for
                                marketing or other use.</li>
                            <li>Users must take every necessary precaution in this respect.</li>
                            <li>Users:
                                <ul>
                                    <li>Must not consult illegal websites or offensive sites (incitement to violence,
                                        pornography, paedophilia, revisionism, xenophobia, incitement to racial hatred),
                                        or that denigrate individuals, protection of children, or that are defamatory or
                                        offensive.</li>
                                </ul>
                            </li>
                            <li>Must not download, stream, store or communicate information:
                                <ul>
                                    <li>That may damage company resources (non-catalogued software) or DSI’s
                                        public image or that of its entities;</li>
                                    <li>Subject to copyright (music, images, films, software).</li>
                                    <li>Must not use company tools for the purposes of harassment, threatening or
                                        abusive behaviour.</li>
                                </ul>
                            </li>
                            <li>Tools may be used by the IT department to monitor the usage of IT resources
                                by users, in accordance with rules and policies. This monitoring will be within the
                                limits of law and such recorded evidence and artefacts may be provided as proof
                                in the event of an audit. Such logs may be retained for a period governed by
                                legislation or IT policies and procedures.</li>
                        </ol>
                    </li>
                    <li class="list-alpha-charter roman-charter">Forums, blogs, wikis, collaborative workspaces:
                        <ol>
                            <li>Participation of forums, blogs, wikis and collaborative workspaces using
                                company IT infrastructure(network IP address and workstation) is authorised
                                for professional use only.</li>
                            <li>Users must observe the following use guidelines at all time:
                                <ul>
                                    <li>Do not to damage DSIs public image;</li>
                                    <li>Do not give any information on how our information systems operate, or divulge
                                        any confidential information;</li>
                                    <li>Do not speak on behalf of DSI’s on matters that do not fall under their
                                        professional responsibility.</li>
                                    <li>Do not get into a debate or discussion with anyone's comments on social media
                                        or blogs about DSI or DSI’s Assets, unless you are authorised to do so.</li>
                                </ul>
                            </li>
                            <li>Internal discussion groups accessible on intranet must be moderated. User
                                has the rights and responsibility to delete messages that are not directly related
                                to the subject in question, or that do not observe the rules above.</li>
                            <li>DSI retains the right to seek compensation and disciplinary measures on users
                                who infringe the rules and result in any forms of damage to DSI .</li>
                        </ol>
                    </li>
                </ol>
            </li>
        </ol>

        <h3 class="h3-charter">DSI’s RIGHTS AND RESPONSIBILITIES</h3>
        <p>DSI is responsible for:</p>
        <ul class="ul-charter">
            <ul class="ul-charter">
                <li class="li-charter">Providing Users with secure IT resources.</li>
                <li class="li-charter">Providing key IS stakeholders with security training and up-to-date
                    information regarding security rules applicable to DSI IT resources, in
                    particular for systems administrators.</li>
            </ul>
        </ul>
        <ol class="ol-charter">
            <li class="list-item-main-charter">DSI has the rights to check:
                <ol>
                    <li>DSI reserves the right to analyse, monitor and even restrict the use of hardware
                        and software resources and any exchanges, regardless of their nature or subject,
                        via its entities' information systems.</li>
                    <li>These checks are carried out:
                        <ul>
                            <li>In order to ensure smooth technical operation and security of information
                                systems and to protect DSI interests;</li>
                            <li>In accordance with legislation, in particular laws relating to individual data
                                protection and privacy;</li>
                            <li>Exclusively under the responsibility of IT services professionals in charge of
                                information systems security and operations, who will ensure any information
                                they become aware of remains confidential.</li>
                        </ul>
                    </li>
                    <li>In the event of serious non-compliant use or use affecting the correct operation
                        of the information systems, security or DSI’s interests, DSI’s IT department may,
                        in accordance with legislation in place, deploy the necessary actions to protect,
                        preserve and/or correct, and will inform DSI management and stakeholders.</li>
                </ol>
            </li>
            <li class="list-item-main-charter">Disciplinary measures:
                <ul>
                    <li class="liststylenone-charter">Any failure to observe the rules set out here will be the personal liability of the
                        User. In the event of manifest infringement of these rules, DSI may take
                        measures appropriate to the severity of the User's actions, in accordance with
                        the terms and conditions of employment contract.</li>
                </ul>
            </li>
            <li class="list-item-main-charter">Specific to system administrators:
                <ul>
                    <li class="liststylenone-charter">System administrators/IT Teams:</li>
                </ul>
                <ol>
                    <li>Are required to observe the rules they enforce on other users.</li>
                    <li>May not be held responsible for damages resulting from any malfunctioning of
                        software or operating systems.</li>
                    <li>Must guarantee the ability to restore lost user data within the timescales laid out
                        in the service level agreement.</li>
                    <li>Are responsible for deploying the means necessary to cope with an incident in
                        their scope of responsibility.</li>
                    <li>Are authorised to access private data in order to carry out diagnoses and for
                        systems administration. However, they must observe confidentiality rules by
                        restricting access to confidential information to the strict minimum requirement,
                        and by observing strict professional secrecy regarding this data.</li>
                    <li>May produce complete and automatic monitoring procedures for tasks carried
                        out in their scope of responsibility, in order to detect operating anomalies.</li>
                    <li>Not allowed to monitor the activities of an individual User unless specifically
                        requested to do so by the IT Security and/or legal teams.</li>
                    <li>Are duty-bound to inform their line manager and the IT security team immediately
                        of any attempted intrusion into their system, or of any dangerous actions by a
                        user. If necessary, the administrator is duty-bound to take any immediate
                        technical measures necessary to safeguard systems.</li>
                    <li>Must follow the “Golden rules of deployment” and other IT and IT Security
                        policies published by the IT and IT Security teams from time to time.</li>
                    <li>Must ensure that there is a legal contract validated by the legal team point of
                        contact for every third party engagement.</li>
                </ol>
            </li>
        </ol>
    </div>
    
</body>
</div>        </Modal.Body>
        {/* <Modal.Footer> */}
            <Row>
            <Col sm={1} style={{paddingLeft:"45px"}}>
                <div className="boxField input">
                  <input
                    className="largerCheckbox"
                    type="checkbox"
                    value={dsiItCharter}
                    checked={dsiItCharter}
                    // required={required}
                    onChange={(e) => handleCheckBox(e)}
                  />
                </div>
            </Col>
            <Col sm={11}>
            <label>I have read through the charter and agree to abide by it.</label>
                                  &nbsp;&nbsp; 
     <p style={{color:"red"}}>{dsiItCharterError}</p>{" "}
                                  &nbsp;&nbsp; 
            </Col>
            </Row>
           
        {/* </Modal.Footer> */}
        <div style={{textAlign:"center"}}>
  <Button variant="primary" onClick={handleSave}>
            Save & Next
          </Button>
          </div><br/>
      </Modal>
    </>
  );
}

export default ITCharter;
