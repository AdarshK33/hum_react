import React, { Fragment, useEffect, useContext, useState } from "react";
import { Form, Row,Col, Button } from "react-bootstrap";
import Breadcrumb from "../common/breadcrumb";
import "react-datepicker/dist/react-datepicker.css";
import moment from "moment";
import { AppContext } from "../../context/AppState";
// import "../Leaves/Leaves.css";
import "./EmployeeHistory.css"
import MultiSelect from "react-multi-select-component";
import { EmployeeHistoryContext } from "../../context/EmployeeHistoryState";
import Select from "react-select";
import { toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import EmployeeContactDetails from "./EmployeeContactDetails";
import AadhaarHistory from "./AadhaarHistory"
import BankDetailsHistory from "./BankDetailsHistory"
import PanHistory from "./PanHistory";
import PFAndUANHistory from "./PFAndUANHistory"
import SalaryHistory from "./SalaryHistory";
import BonusHistory from "./BonusHistory"
import SportHistory from "./SportHistory"
import ManagerHistory from "./ManagerHistory"
import AccessAndRightHistory from "./AccessAndRightHistory"
import CostCenterHistory from "./CostCenterHistory";
import InsuranceNominationHistory from "./InsuranceNominationHistory"
import DISP from "./DISP"
import ConfirmationHistory from "./ConfirmationHistory"
import DisciplinaryHistory from "./DisciplinaryHistory";
import LeavesHistory from "./LeavesHistory"
import PromotionHistory from "./PromotionHistory";
import ProbationHistory from "./ProbationHistory";
import ContractFreezeSabbaticalHistory from "./ContractFreezeSabbaticalHistory"; //-----
import ContractTypeChangeHistory from "./ContractTypeChangeHistory"
import InternationalTransferHistory from "./InternationalTransferHistory";
import EntityHistory from "./EntityHistory";
import UserExitHistory from "./UserExitHistory"
import ExitedEmployeeHistory from "./ExitedEmployeeHistory"
import PayrollHistory from "./PayrollHistory"
import CurrentMonthExitedHistory from "./CurrentMonthExitedHistory";
import { useHistory } from "react-router-dom";
import { PermissionContext } from "../../context/PermissionState";

const MasterHistory = (props) => {
  let history = useHistory();
  const [stepCount, setStepNumber] = useState(0);
  const [selectData, setSelectData] = useState(null);

  const [currentRecords,setCurrentRecords] = useState([])
  const [managerStatus,setManagerStatus] = useState("")
  const [dropDownData,setDropDownData] = useState([{
    name:"Employee Contract Details",value:0
  },{name:"Salary History",value:1},
  {name:"Bonus History",value:2},
  {name:"Cost Center History",value:3},
  {name:"Bank Details History",value:4},
  {name:"Aadhaar History",value:5},
  {name:"Access And Rights History",value:6},
  {name:"Manager History",value:7},
  {name:"User Documents",value:8},
  {name:"Other Taxable Income History",value:9},
  {name:"User Exit History",value:10},
  {name:"Payslips History",value:11},
  {name:"ItStatement History",value:12},
  {name:"DISP",value:13},
  {name:"Insurance Nomination History",value:14},
  {name:"Sport History",value:15},

])

  const { user } = useContext(AppContext);
  const { rolePermission } = useContext(PermissionContext);
    const {
    ViewEmployeeHistoryData,
    employeeHistoryData,
    viewEmployeeContactDetailsById,
    viewBonusDataById,
    viewSalaryDataById,
    viewBankDataById,
    viewPanDataById,
    viewPFAndUANDataById,
    viewAadhaarDataById,
    viewCostCenterDataById,
    viewManagerDataById,
    viewAccessDataById,
    viewExitDataById,
    viewExitEmployeeDataById,
    viewCurrentMonthExitDataById,
    viewInsuranceDataById,
    viewSportDataById,
    viewProbationDataById,
    viewPromotionDataById,
    viewDisciplinaryDataById,
    viewLeavesDataById,
        viewcontractFreezeDataById,
        viewConfirmationDataById,
        viewContractTypeChangeDataById,
        viewInternationalTransferDataById,
        viewEntityTransferDataById,
    employeeContactDetailsByIdData,
    managerData,
    costCenterData,
    insuranceData,
    bonusData,
    accessData,
    loader,
    total,
  } = useContext(EmployeeHistoryContext);

  console.log("stepCount",stepCount);
  useEffect(() => {
    console.log(user,rolePermission,"role")
    if (
      rolePermission == "manager" ||
      rolePermission == "costCenterManager"
    ) {
       setManagerStatus(rolePermission);
      console.log("disabled costcenter", user.costCentre);
    }
  }, [ user.loginType]);
  useEffect(() => {

  if(stepCount == 0){
    viewBankDataById(props.match.params.employeeid)
  }else if(stepCount == 1){
    viewPanDataById(props.match.params.employeeid)
  }else if(stepCount == 2){
    viewPFAndUANDataById(props.match.params.employeeid)
  }else if(stepCount == 3){
    viewSalaryDataById(props.match.params.employeeid)
  }else if(stepCount == 4){
    viewBonusDataById(props.match.params.employeeid)
  }else if(stepCount == 5){
    viewSportDataById(props.match.params.employeeid)
  }else if(stepCount == 6){
    viewManagerDataById(props.match.params.employeeid)
  }else if(stepCount == 7){
    viewCostCenterDataById(props.match.params.employeeid)
  }else if(stepCount == 8){
    viewInsuranceDataById(props.match.params.employeeid)
  }else if(stepCount == 10){
    viewConfirmationDataById(props.match.params.employeeid)
  }else if(stepCount == 11){
    viewDisciplinaryDataById(props.match.params.employeeid)
  }else if(stepCount == 12){
    viewLeavesDataById(props.match.params.employeeid)
  }else if(stepCount == 13){
    viewPromotionDataById(props.match.params.employeeid)
  }else if(stepCount == 14){
    viewProbationDataById(props.match.params.employeeid)
  }else if(stepCount == 15){
    viewcontractFreezeDataById(props.match.params.employeeid)
  }else if(stepCount == 16){
    viewContractTypeChangeDataById(props.match.params.employeeid)
  }else if(stepCount == 17){
    viewInternationalTransferDataById(props.match.params.employeeid)
  }else if(stepCount == 18){
    viewEntityTransferDataById(props.match.params.employeeid)
  }else if(stepCount == 19){
    viewExitDataById(props.match.params.employeeid)
  }else if(stepCount == 21){
    viewExitEmployeeDataById(props.match.params.employeeid)
  }else if(stepCount == 22){
    viewCurrentMonthExitDataById(props.match.params.employeeid)
  }else if(stepCount == 23){
    viewEmployeeContactDetailsById(props.match.params.employeeid)
  }else if(stepCount ==24){
    viewAadhaarDataById(props.match.params.employeeid)
  }else if(stepCount == 25){
    viewAccessDataById(props.match.params.employeeid)
  }
  }, [stepCount]);


 console.log(props,"masterhistory",props.match.params.employeeid,costCenterData)
 console.log("ManagerHistory",managerData)
  const setDropDownSelectHandler = (option) => {
    // var data = option[0]
     setStepNumber(option.value)
     setSelectData(option.label)
    console.log("option", option);
  };

const handleClick = (e)=>{
  history.push('/payroll/documents_download')
  //setStepNumber(parseInt(e.target.value)
}

  const handleSumit =(e)=>{
    e.preventDefault();
    console.log(e.target.value,"handlesubmit")
    setStepNumber(e.target.value)
  };
  console.log(stepCount,"dropDownData")
  return (
    <Fragment>
      <Breadcrumb title="Master History" parent="Master History" />
      <div className="container-fluid">
        <Form >
          <Row>
         
          <Col sm={3} style={{paddingBottom:"7px"}}  >
          <Button name="Employee Contract Details" 
          value={0} variant={stepCount === 0?"primary":"outline-primary"} 
          className="componentButton" 
          onClick={(e)=>setStepNumber(parseInt(e.target.value))}>
          Bank Details 
          </Button>
          </Col>
          <Col sm={3} style={{paddingBottom:"7px",marginLeft:"-22px"}}  >
          <Button name="Employee Contract Details" 
          value={1} variant="outline-primary" 
          className="componentButton" 
          onClick={(e)=>setStepNumber(parseInt(e.target.value))}>
               PAN 
          </Button>
          </Col>
          <Col sm={3} style={{paddingBottom:"7px",marginLeft:"-22px"}}  >
          <Button name="Employee Contract Details" 
          value={2} variant="outline-primary" 
          className="componentButton" 
          onClick={(e)=>setStepNumber(parseInt(e.target.value))}>
            PF and UAN No 
          </Button>
          </Col>
          <Col sm={3} style={{paddingBottom:"7px",marginLeft:"-22px"}}  >
          <Button name="Employee Contract Details" 
          value={3} variant="outline-primary" 
          className="componentButton" 
          onClick={(e)=>setStepNumber(parseInt(e.target.value))}>
          Salary 
          </Button>
          </Col>
          </Row>

          <Row>
         
         
          <Col sm={3} style={{paddingBottom:"7px"}}  >
          <Button name="Employee Contract Details" 
          value={4} variant="outline-primary" 
          className="componentButton" 
          onClick={(e)=>setStepNumber(parseInt(e.target.value))}>
            Bonus 
          </Button>
          </Col>
          <Col sm={3} style={{paddingBottom:"7px",marginLeft:"-22px"}}  >
          <Button name="Employee Contract Details" 
          value={5} variant="outline-primary" 
          className="componentButton" 
          onClick={(e)=>setStepNumber(parseInt(e.target.value))}>
          Sports 
          </Button>
          </Col>
          <Col sm={3} style={{paddingBottom:"7px",marginLeft:"-22px"}}  >
          <Button name="Employee Contract Details" 
          value={6} variant="outline-primary" 
          className="componentButton" 
          onClick={(e)=>setStepNumber(parseInt(e.target.value))}>
            Manager 
          </Button>
          </Col>
          <Col sm={3} style={{paddingBottom:"7px",marginLeft:"-22px"}}  >
          <Button name="Employee Contract Details" 
          value={7} variant="outline-primary" 
          className="componentButton" 
          onClick={(e)=>setStepNumber(parseInt(e.target.value))}>
               Position Location and Cost Center Manager
          </Button>
          </Col>
          </Row>

          <Row>
        
          
          <Col sm={3} style={{paddingBottom:"7px"}}  >
          <Button name="Employee Contract Details" 
          value={8} variant="outline-primary" 
          className="componentButton" 
          onClick={(e)=>setStepNumber(parseInt(e.target.value))}>
            Insurance Nomination 
          </Button>
          </Col>
          <Col sm={3} style={{paddingBottom:"7px",marginLeft:"-22px"}}  >
          <Button name="Employee Contract Details" 
          value={9} variant="outline-primary" 
          className="componentButton" 
          onClick={(e)=>setStepNumber(parseInt(e.target.value))}>
          DISP
          </Button>
          </Col>
          <Col sm={3} style={{paddingBottom:"7px",marginLeft:"-22px"}}  >
          <Button name="Employee Contract Details" 
          value={10} variant="outline-primary" 
          className="componentButton" 
          onClick={(e)=>setStepNumber(parseInt(e.target.value))}>
          Confirmation 
          </Button>
          </Col>
          <Col sm={3} style={{paddingBottom:"7px",marginLeft:"-22px"}}  >
          <Button name="Employee Contract Details" 
          value={11} variant="outline-primary" 
          className="componentButton" 
          onClick={(e)=>setStepNumber(parseInt(e.target.value))}>
               Disciplinary Action 
          </Button>
          </Col>
          </Row>

          <Row>         
          
          <Col sm={3} style={{paddingBottom:"7px"}}  >
        
          <Button name="Employee Contract Details" 
          value={12} variant="outline-primary" 
          className="componentButton" 
          onClick={(e)=>setStepNumber(parseInt(e.target.value))}>
            Leaves 
          </Button>
          </Col>
          <Col sm={3} style={{paddingBottom:"7px",marginLeft:"-22px"}}  >
          <Button name="Employee Contract Details" 
          value={13} variant="outline-primary" 
          className="componentButton" 
          onClick={(e)=>setStepNumber(parseInt(e.target.value))}>
          Promotion 
          </Button>
          </Col>
          <Col sm={3} style={{paddingBottom:"7px",marginLeft:"-22px"}}  >
          <Button name="Employee Contract Details" 
          value={14} variant="outline-primary" 
          className="componentButton" 
          onClick={(e)=>setStepNumber(parseInt(e.target.value))}>
               Probation 
          </Button>
          </Col>
          <Col sm={3} style={{paddingBottom:"7px",marginLeft:"-22px"}}  >
          <Button name="Employee Contract Details" 
          value={15} variant="outline-primary" 
          className="componentButton" 
          onClick={(e)=>setStepNumber(parseInt(e.target.value))}>
            Contract Freeze 
          </Button>
          </Col>
          </Row>
          <Row>
        
          <Col sm={3} style={{paddingBottom:"7px"}}  >
         
          <Button name="Employee Contract Details" 
          value={16} variant="outline-primary" 
          className="componentButton" 
          onClick={(e)=>setStepNumber(parseInt(e.target.value))}>
               Contract Type Change 
          </Button>
          </Col>
          
          <Col sm={3} style={{paddingBottom:"7px",marginLeft:"-22px"}}  >
          <Button name="Employee Contract Details" 
          value={17} variant="outline-primary" 
          className="componentButton" 
          onClick={(e)=>setStepNumber(parseInt(e.target.value))}>
            International Transfers 
          </Button>
          </Col>
          <Col sm={3} style={{paddingBottom:"7px",marginLeft:"-22px"}}  >
          <Button name="Employee Contract Details" 
          value={18} variant="outline-primary" 
          className="componentButton" 
          onClick={(e)=>setStepNumber(parseInt(e.target.value))}>
               Entity Transfer 
          </Button>
          </Col>
          <Col sm={3} style={{paddingBottom:"7px",marginLeft:"-22px"}}  >
          <Button name="Employee Contract Details" 
          value={19} variant="outline-primary" 
          className="componentButton" 
          onClick={(e)=>setStepNumber(parseInt(e.target.value))}>
            Exit 
          </Button>
          </Col>
        </Row>
        <Row>
        
          <Col sm={3} style={{paddingBottom:"7px"}} >
        
          <Button name="Employee Contract Details" 
          value={20} variant="outline-primary" 
          className="componentButton" 
          onClick={handleClick}>
          Payroll 
          </Button>
          </Col>
          {
          (rolePermission == "admin")
      ?<><Col sm={3} style={{paddingBottom:"7px",marginLeft:"-22px"}}  >
          <Button name="Employee Contract Details" 
          value={21} variant="outline-primary" 
          className="componentButton" 
          onClick={(e)=>setStepNumber(parseInt(e.target.value))}>
          Exited Employee 
          </Button>
          </Col>
          <Col sm={3} style={{paddingBottom:"7px",marginLeft:"-22px"}}  >
          <Button name="Employee Contract Details" 
          value={22} variant="outline-primary" 
          className="componentButton" 
          onClick={(e)=>setStepNumber(parseInt(e.target.value))}>
              Current Month Exited
                   </Button>
          </Col>
          <Col sm={3} style={{paddingBottom:"7px",marginLeft:"-22px"}}  >
          <Button name="Employee Contact Details" 
          value={23} variant= {"outline-primary"} 
          className="componentButton" 
          onClick={(e)=>setStepNumber(parseInt(e.target.value))}>
          Employee Contact Details
          </Button>
          </Col></>:<></>}
            </Row>
         {(rolePermission == "admin")? <Row>
         
          <Col sm={3} style={{paddingBottom:"7px"}}  >
        
          <Button name="Employee Contract Details" 
          value={24} variant="outline-primary" 
          className="componentButton" 
          onClick={(e)=>setStepNumber(parseInt(e.target.value))}>
               Aadhaar 
          </Button>
          </Col>
          <Col sm={3} style={{paddingBottom:"7px",marginLeft:"-22px"}}  >
          <Button name="Employee Contract Details" 
          value={25} variant="outline-primary" 
          className="componentButton" 
          onClick={(e)=>setStepNumber(parseInt(e.target.value))}>
          Access And Rights 
          </Button>
          </Col>
          </Row>:<></>}
          {/* <Row>
            <Col sm={4}>
              <Form.Group>
                 <Select
                       name="filters"
                                placeholder="Select "
                                style={{fontSize:"0.8rem"}}
                               value = {stepCount==0?
                                { label: 'Employee Contract Details', value: 0 }
                                :{ label: selectData, value: stepCount }}
                                options={dropDownData !== null  ?
                                 dropDownData.map(e => ({label: e.name, value: e.value})):[]}
                                onChange={setDropDownSelectHandler}
                                required
                                isSearchable
                               />
                      
              </Form.Group>
            </Col>
          </Row> */}
        </Form>
      </div>

        {(() => {
                          switch (stepCount) {
                           
                              case 0:
                                return (
                                  <BankDetailsHistory BankDetailsHistoryList={props.match.params.employeeid}
                                  />
                                );
                                case 1:
                                return (
                                  <PanHistory PanHistoryList={props.match.params.employeeid}
                                  />
                                );
                                case 2:
                                return (
                                  <PFAndUANHistory PFAndUANHistoryList={props.match.params.employeeid}
                                  />
                                );
                            case 3:
                              return (
                                <SalaryHistory SalaryHistoryList={props.match.params.employeeid}
                                />
                              );
                              case 4:
                                return (
                                  <BonusHistory BonusHistoryList={props.match.params.employeeid}
                                  />
                                );
                               
                                  case 5:
                                    return (
                                      <SportHistory SportHistoryList={props.match.params.employeeid}
                                      />
                                    );
                                    case 6:
                                      return (
                                        <ManagerHistory ManagerHistoryList={props.match.params.employeeid}
                                        />
                                      );
                                    
                                        case 7:
                                          return (
                                            <CostCenterHistory CostCenterHistoryList={props.match.params.employeeid}
                                            />
                                          );
                                          case 8:
                                            return (
                                              <InsuranceNominationHistory InsuranceNominationHistoryList={props.match.params.employeeid}
                                              />
                                            );
                                            case 9:
                                              return (
                                                <DISP DISPList={props.match.params.employeeid}
                                                />
                                              );
                                          case 10:
                                            return (
                                              <ConfirmationHistory BankDetailsHistoryList={props.match.params.employeeid}
                                              />
                                            );
                                            case 11:
                                              return (
                                                <DisciplinaryHistory DisciplinaryHistoryList={props.match.params.employeeid}
                                                />
                                              );
                                            case 12:
                                              return (
                                                <LeavesHistory LeavesList={props.match.params.employeeid}
                                                />
                                              );
                                            
                                                      case 13:
                                                        return (
                                                          <PromotionHistory PromotionHistoryList={props.match.params.employeeid}
                                                          />
                                                        );
                                                        case 14:
                                                          return (
                                                            <ProbationHistory ProbationHistoryList={props.match.params.employeeid}
                                                            />
                                                          );
                                                          case 15:
                                                        return (
                                                          <ContractFreezeSabbaticalHistory ContractFreezeSabbaticalHistoryList={props.match.params.employeeid}
                                                          />
                                                        );
                                                        case 16:
                                                          return (
                                                            <ContractTypeChangeHistory ContractTypeChangeHistoryList={props.match.params.employeeid}
                                                            />
                                                          );
                                                        case 17:
                                                          return (
                                                            <InternationalTransferHistory InternationalTransferHistoryList={props.match.params.employeeid}
                                                            />
                                                          );
                                                          case 18:
                                                        return (
                                                          <EntityHistory EntityHistoryList={props.match.params.employeeid}
                                                          />
                                                        );
                                                       
                                                        case 19:
                                                          return (
                                                            <UserExitHistory UserExitHistoryList={props.match.params.employeeid}
                                                            />
                                                          );
                                                     
                                                        case 20:
                                                          return (
                                                            <PayrollHistory PayrollHistoryList={props.match.params.employeeid}
                                                            />
                                                          );
                                                          case 21:
                                                            return (
                                                              <ExitedEmployeeHistory ExitedEmployeeHistoryList={props.match.params.employeeid}
                                                              />
                                                            );
                                                          case 22:
                                                            return (
                                                              <CurrentMonthExitedHistory CurrentMonthExitedHistoryList={props.match.params.employeeid}
                                                              />
                                                            );
                                                            case 23:
                                                              return (
                                                                <EmployeeContactDetails EmployeeContactDetailList={props.match.params.employeeid}
                                                                />
                                                              );
                                                              case 24:
                                                                return (
                                                                  <AadhaarHistory AadhaarHistoryList={props.match.params.employeeid}
                                                                  />
                                                                );
                                                                case 25:
                                                                  return (
                                                                    <AccessAndRightHistory AccessAndRightHistoryList={props.match.params.employeeid}
                                                                    />
                                                                  );
                              default:return (
                                <BankDetailsHistory BankDetailsHistoryList={props.match.params.employeeid}
                                />
                              )
                           
                          }
                        })()}
    </Fragment>
  );
};

export default MasterHistory;
