import React, { useState ,useContext,useEffect} from "react";
import { Modal, Button ,Col,Form,Row} from "react-bootstrap";
import { TrendingUp } from "react-feather";
import { DSICharterContext } from "../../context/DSICharterState";
import { EmployeeSeparationContext } from "../../context/EmployeeSeparationState";
const EthicsCharter=(props)=>{
  const { dsiCharterCreate ,dsiCharterUpdate,dsiCharterUpdateData,dsiCharterData,viewCharterAll,charterDataAll} = useContext(DSICharterContext);
  const {ViewEmployeeProfile,employeeProfileData} = useContext(EmployeeSeparationContext)
  const [showModal, setShow] = useState(true);
  const [ethicsCharter,setEthicsCharter] = useState(false)
  const [ethicsCharterError,setEthicsCharterError] = useState("")
  const [charterId ,setCharterId] = useState("")

  const handleClose = () => setShow(false);
  const handleShow = () => setShow(true);
    const handleCheckBox =(e)=>{
      if(ethicsCharter == false){
        setEthicsCharter(true)
      }else{
        setEthicsCharter(true)
      }
      console.log(ethicsCharter)
    }
useEffect(()=>{
  handleShow()
  console.log(props,"props ethic")
},[props])
    useEffect(() => {
      if(employeeProfileData !== undefined && employeeProfileData !== null 
       && employeeProfileData !== "" && charterDataAll !== undefined && 
       charterDataAll !== null && charterDataAll !== ""){
        console.log(charterDataAll,"charterDataAll ethics")
       charterDataAll.map((item)=>{
        console.log(item,"item ethic")
         if(item.employeeId == employeeProfileData.employeeId){
          setCharterId(item.charterId)
           if(item.codeOfConduct == true && item.ethicsCharter !==true && item.dsiItCharter !==true){
               setShow(true)
           }else if(item.codeOfConduct == true && item.ethicsCharter == true  && item.dsiItCharter !==true){
             props.history.push("/itcharter")
             setShow(false)
           }else if(item.codeOfConduct == true && item.ethicsCharter == true  && item.dsiItCharter==true){
             props.history.push("/dashboard/storedashboard")
             setShow(false)
           }
         }
       })
   }
   }, [employeeProfileData,props])

    const handleSave = (e)=>{
      e.preventDefault()
      console.log(props,ethicsCharter,employeeProfileData,charterDataAll,"charter ethic")
      if (ethicsCharter == "" || ethicsCharter == null || ethicsCharter == undefined) {
        setEthicsCharterError("Select accept the acknowledgement of ethics charter");
      } else {
        setEthicsCharterError("");
      }
      if(ethicsCharter == true){
      const infoData = {
        "charterId": charterId,
        "employeeId":employeeProfileData.employeeId,
        "codeOfConduct":true,
        "ethicsCharter":true,
        "dsiItCharter": false 
            }      
        dsiCharterUpdate(infoData)
        props.history.push("/itcharter")
        setShow(false)
      }
    }

    useEffect(() => {
      ViewEmployeeProfile()
      viewCharterAll()
    }, [])

    useEffect(() => {
      if(employeeProfileData !== undefined && employeeProfileData !== null && employeeProfileData !== "" &&
        charterDataAll !== undefined && charterDataAll !== null && charterDataAll !== ""){
        charterDataAll.map((item)=>{
          if(item.employeeId == employeeProfileData.employeeId){
            if(item.ethicsCharter == true){
              setEthicsCharter(true)
            }else{
              setEthicsCharter(false) 
            }
          }
        })
      }
    }, [])
  return (
    <>
      {/* <div
        className="d-flex align-items-center justify-content-center"
        style={{ height: "100vh" }}
      >
        <Button variant="primary" onClick={handleShow}>
          Launch demo modal
        </Button>
      </div> */}
      <Modal show={showModal} onHide={handleClose} >
     
        <Modal.Body>
        <div>
<body>
    <div class="container">
   <h3> ETHICS AND CODE OF CONDUCT WITH TEAM MEMBERS, EXTERNAL PARTNERS &
SUPPLIERS OF DECATHLON COMPANIES IN INDIA</h3>
<p style={{textAlign:"center"}}>--------------------------------------------</p>
<p>To be honest and responsible regarding our suppliers and team members.
To gain their respect and consideration.
To make our decisions independently and objectively.
To be trustworthy amongst ourselves, an essential condition of our daily autonomy.</p>
<p style={{textAlign:"center"}}>--------------------------------------------</p>
<p>This Ethics and Code of Conduct will be applicable to all team members of Decathlon Sports India
Pvt. Ltd., Indeca Sporting Goods Pvt. Ltd. and Prodin Sporting Pvt. Ltd. (hereinafter referred to as
Decathlon).</p>
<b>1. Gift, Hospitality and Entertainment</b><br/>
<b>1.1 Gifts</b><br/>
<p>Employees or members of their immediate families (spouse, mother, father, son, daughter,
brother, sister or any of these step- or in-law relationships, whether established by blood or
marriage including common law marriage) should not provide, solicit or accept cash or its
equivalent, entertainment, favors, gifts or anything of substance to or from competitors, vendors,
suppliers, customers, government representatives or others that do business or are trying to do
business with Decathlon unless otherwise mentioned in the policy given below.
Giving or receiving gifts or hospitality is acceptable under this Policy if all the following
requirements are met:</p>
<p>● It is not made with the intention of influencing a Third Party to obtain/ retain business or a
business advantage or to reward the provision or retention of business or a business
advantage or in explicit or implicit exchange for favors/ benefits or for any other corrupt
purpose.</p>
<p>● It complies with local laws and customs.</p>
<p>● It does not include cash or a cash equivalence (such as gift certificates or vouchers).</p>
<p>● It is appropriate in the circumstances. For example, it is customary to exchange sweets during
festivals</p>
<p>● Taking into account the reason for the gift or hospitality, it is of an appropriate type and value
and given at an appropriate time/occasion.</p>
<p>● Gifts of the same value and type are given to all third parties.</p>
<p>● It is given openly, not secretly and in a manner that avoids the appearance of corruption.</p>


<b>1.1.2 Accepting Gifts</b>
<p>No employee may accept gifts unless the following mandatory conditions are satisfied:</p>

<p>● The value of the gift must not exceed INR 1000.</p>
<p>● If the gifts accepted are in the form of edible items, they must be informed to the respectibe
Manager and shall be recorded.</p>
<b>1.1.3 Offering Gifts</b>
<p>No employee may offer gifts unless the following mandatory conditions are satisfied:</p>

<p>● The value of the gift must not exceed INR 2000.The number of gifts offered must not exceed 4
times per financial year per person.</p>
<p>● Prior to giving any gifts to government official, employees shall ensure that such gifting is
permissible under applicable local laws and Decathlon policies.</p>
<b>1.2 Hospitality and Entertainment</b>
<p>● Normal, regular working meals in course of day to day business meetings and the meals
provided by Decathlon during normal business meeting/team outing which are normally
provided to team members are considered as acceptable form of Hospitality and
Entertainment.</p>
<p>● Working meals or business meals organized with a view of creating or promoting goodwill to
maintain business relationships are acceptable.</p>
<p>Entertainment including but not limited to Decathlon?s events, promotional events, sporting
events, seminars, conferences or any other events that are organized by Decathlon are
acceptable. Travel, boarding and lodging, meals etc. provided at such events shall also be
considered as Hospitality and Entertainment. Such expenses incurred should fall within the
validated budget of Decathlon.</p>
<p>All invitations to nights out, shows and ?cultural? activities made by service providers or vendors
to any team members should be declined.</p>

<b>2. Political Contribution</b><br/>
<p>Decathlon shall not support, either directly or indirectly, any political organizations, political parties
or candidates for public office or any political campaigns.
Decathlon shall not make any contributions in cash or in kind to any political organizations, political
parties or candidates for public office or any political campaigns.
While the team members may voluntarily participate in political activities as individual citizens, they
must use their own personal funds and resources. In making political contributions, consideration
should not be given to the possibility that such contributions will be helpful to the interest of
Decathlon, nor should they be made for that purpose. No such participation or any kind of political
activity shall be carried out during normal office hours.</p>
<b>3. Charitable Contribution</b><br/>
<b>3.1 General Guidelines</b><br/>
<p>● Decathlon may make legitimate charitable contributions to legitimate charitable organizations
including only those registered with the competent authorities specified by the Government
(domestic and foreign) and have been granted tax exemption status by the Government.</p>
<p>● Before making a charitable contribution, the credentials of the recipient must be verified and it
must be ensured that such contributions are permissible under applicable local laws and prior
approval is received from appropriate authority. Also it should not be in connection with a third
party instruction or to win or retain a deal or contract.</p>
<p>The contributions may be made in either in form of monetary benefits or non-monetary benefits
(for example donating goods like clothes, blankets, edible items, equipment etc.) or in a
combination of both.</p>
<p>All charitable contributions shall be made in compliance with Decathlon Corporate Social
Responsibility rules.</p>

<b>4. Contracts:</b><br/>
<b>4.1 Negotiation</b><br/>

<p>● If a team member has a direct or indirect vested interest in dealing with a service provider or a
vendor, he/she must inform his/her manager in writing about such interests. In this event, the
team member must not deal directly with the service provider.</p>
<p>● Similarly, team members must not use their influence to impose the use of services from a
particular service provider with whom they have a direct or indirect vested interest.
Direct/indirect vested interest means any financial involvement with a service provider/vendor
or any family or friendly relationship that could restrict the objectivity and independence of a
negotiation.</p>
<p>● All negotiations to must be carried out by atleast 2 team members</p>
<p>● All external partners must be approved by the direct functional manager using objective
criteria: references, solvability, capital (business register), staff, payment conditions, moral
fortitude, etc.</p>
<b>4.2 Signature process:</b><br/>

<p>● The contract must be drawn up in English.</p>
<p>● All contracts must be signed only by the team member authorised to sign contracts on behalf
of Decathlon</p>
<b>5. Service Providers and Agents</b><br/>

<p>● If an agent is working for a service provider, the service provider is responsible for his/her
remuneration.</p>
<p>● If a service provider is working on our behalf, this must be subject to:</p>
<p>● quotation should be obtained from a minimum of 2 service providersatleast 2 team members
should be involved in choosing such service providerthe team members must be able to
explain why a particular service provider was selected or not at any given moment. It is
forbidden to divulge one service provider?s conditions to another.A team member who is
about to leave Decathlon or change a project must have a formalised meeting with his/her
direct manager outlining the current state of ongoing negotiations.</p>
<b>6.Confidentiality</b><br/>
<p>● You shall keep confidential all Company information that is known to you by virtue of you
being an employee of the Company.</p>
{/* Date :07-12-2020
Employee Id :DSI008132
Signed &Accepted by Employee : Madhu D */}


    </div>
    
</body>
</div>        </Modal.Body>
        {/* <Modal.Footer> */}
        <Row>
                                  <Col sm={1}>
                <div className="boxField input">
                  <input
                    className="largerCheckbox"
                    type="checkbox"
                    value={ethicsCharter}
                    checked={ethicsCharter}
                    // required={required}
                    onChange={(e) => handleCheckBox(e)}
                  />
                </div>
            </Col>
            <Col sm={11}>
            <label>I have read through the charter and agree to abide by it.</label>
                                  &nbsp;&nbsp; 
           <p style={{color:"red"}}>{ethicsCharterError}</p>{" "}
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

export default EthicsCharter;
