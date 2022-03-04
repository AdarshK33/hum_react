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
import EmployeeContractDetails from "./EmployeeContractDetails";
import SalaryHistory from "./SalaryHistory";
import BonusHistory from "./BonusHistory"
import CostCenterHistory from "./CostCenterHistory";
import BankDetailsHistory from "./BankDetailsHistory"
import AadhaarHistory from "./AadhaarHistory"
import AccessAndRightHistory from "./AccessAndRightHistory"
import ManagerHistory from "./ManagerHistory"
import UserDocuments from "./UserDocuments"
import OtherTaxableIncomeHistory from "./OtherTaxableIncomeHistory"
import UserExitHistory from "./UserExitHistory"
import PayslipsHistory from "./PayslipsHistory"
import ItStatementHistory from "./ItStatementHistory"
import DISP from "./DISP"
import InsuranceNominationHistory from "./InsuranceNominationHistory"
import SportHistory from "./SportHistory"
import { PermissionContext } from "../../context/PermissionState";

const MasterHistory = (props) => {

  const [stepCount, setStepNumber] = useState(0);
  const [selectData, setSelectData] = useState(null);

  const [currentRecords,setCurrentRecords] = useState([])
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
    viewEmployeeContractDetailsById,
    viewBonusDataById,
    viewSalaryDataById,
    viewBankDataById,
    viewAadhaarDataById,
    viewCostCenterDataById,
    viewManagerDataById,
    viewAccessDataById,
    viewTaxDataById,
    viewExitDataById,
    viewInsuranceDataById,
    viewSportDataById,
    employeeContractDetailsByIdData,
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

  if(stepCount == 0){
    viewEmployeeContractDetailsById(props.match.params.employeeid)
  }else if(stepCount == 1){
    viewSalaryDataById(props.match.params.employeeid)
  }else if(stepCount == 2){
    viewBonusDataById(props.match.params.employeeid)
  }else if(stepCount == 3){
    viewCostCenterDataById(props.match.params.employeeid)
  }else if(stepCount == 4){
    viewBankDataById(props.match.params.employeeid)
  }else if(stepCount == 5){
    viewAadhaarDataById(props.match.params.employeeid)
  }else if(stepCount == 6){
    viewAccessDataById(props.match.params.employeeid)
  }else if(stepCount == 7){
    viewManagerDataById(props.match.params.employeeid)
  }else if(stepCount == 9){
    viewTaxDataById(props.match.params.employeeid)
  }else if(stepCount == 10){
    viewExitDataById(props.match.params.employeeid)
  }else if(stepCount == 14){
    viewInsuranceDataById(props.match.params.employeeid)
  }else if(stepCount == 15){
    viewSportDataById(props.match.params.employeeid)
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
          <Col sm={3}  >
          <Button name="Employee Contract Details" 
          value={0} variant="outline-primary" 
          className="componentButton" 
          onClick={(e)=>setStepNumber(parseInt(e.target.value))}>
          Employee Contract Details
          </Button>
          </Col>
          <Col sm={3}  >
          <Button name="Employee Contract Details" 
          value={1} variant="outline-primary" 
          className="componentButton" 
          onClick={(e)=>setStepNumber(parseInt(e.target.value))}>
               Salary History
          </Button>
          </Col>
          <Col sm={3}  >
          <Button name="Employee Contract Details" 
          value={2} variant="outline-primary" 
          className="componentButton" 
          onClick={(e)=>setStepNumber(parseInt(e.target.value))}>
            Bonus History
          </Button>
          </Col>
          <Col sm={3}  >
          <Button name="Employee Contract Details" 
          value={3} variant="outline-primary" 
          className="componentButton" 
          onClick={(e)=>setStepNumber(parseInt(e.target.value))}>
          Cost Center History
          </Button>
          </Col>
          </Row><br/>
          <Row>
          <Col sm={3}  >
          <Button name="Employee Contract Details" 
          value={4} variant="outline-primary" 
          className="componentButton" 
          onClick={(e)=>setStepNumber(parseInt(e.target.value))}>
          Bank Details History
          </Button>
          </Col>
          <Col sm={3}  >
          <Button name="Employee Contract Details" 
          value={5} variant="outline-primary" 
          className="componentButton" 
          onClick={(e)=>setStepNumber(parseInt(e.target.value))}>
               Aadhaar History
          </Button>
          </Col>
          <Col sm={3}  >
          <Button name="Employee Contract Details" 
          value={6} variant="outline-primary" 
          className="componentButton" 
          onClick={(e)=>setStepNumber(parseInt(e.target.value))}>
            Access And Rights History
          </Button>
          </Col>
          <Col sm={3}  >
          <Button name="Employee Contract Details" 
          value={7} variant="outline-primary" 
          className="componentButton" 
          onClick={(e)=>setStepNumber(parseInt(e.target.value))}>
          Manager History
          </Button>
          </Col>
          </Row><br/>
          <Row>
          <Col sm={3}  >
          <Button name="Employee Contract Details" 
          value={8} variant="outline-primary" 
          className="componentButton" 
          onClick={(e)=>setStepNumber(parseInt(e.target.value))}>
          User Documents
          </Button>
          </Col>
          <Col sm={3}  >
          <Button name="Employee Contract Details" 
          value={9} variant="outline-primary" 
          className="componentButton" 
          onClick={(e)=>setStepNumber(parseInt(e.target.value))}>
               Other Taxable Income History
          </Button>
          </Col>
          <Col sm={3}  >
          <Button name="Employee Contract Details" 
          value={10} variant="outline-primary" 
          className="componentButton" 
          onClick={(e)=>setStepNumber(parseInt(e.target.value))}>
            User Exit History
          </Button>
          </Col>
          <Col sm={3}  >
          <Button name="Employee Contract Details" 
          value={11} variant="outline-primary" 
          className="componentButton" 
          onClick={(e)=>setStepNumber(parseInt(e.target.value))}>
          Payslips History
          </Button>
          </Col>
          </Row><br/>
          <Row>
          <Col sm={3}  >
          <Button name="Employee Contract Details" 
          value={12} variant="outline-primary" 
          className="componentButton" 
          onClick={(e)=>setStepNumber(parseInt(e.target.value))}>
          ItStatement History
          </Button>
          </Col>
          <Col sm={3}  >
          <Button name="Employee Contract Details" 
          value={13} variant="outline-primary" 
          className="componentButton" 
          onClick={(e)=>setStepNumber(parseInt(e.target.value))}>
               DISP
          </Button>
          </Col>
          <Col sm={3}  >
          <Button name="Employee Contract Details" 
          value={14} variant="outline-primary" 
          className="componentButton" 
          onClick={(e)=>setStepNumber(parseInt(e.target.value))}>
            Insurance Nomination History
          </Button>
          </Col>
          <Col sm={3}  >
          <Button name="Employee Contract Details" 
          value={15} variant="outline-primary" 
          className="componentButton" 
          onClick={(e)=>setStepNumber(parseInt(e.target.value))}>
          Sport History
          </Button>
          </Col>
          </Row><br/>
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
                                <EmployeeContractDetails EmployeeContractDetailList={props.match.params.employeeid}
                                />
                              );
                            case 1:
                              return (
                                <SalaryHistory SalaryHistoryList={props.match.params.employeeid}
                                />
                              );
                              case 2:
                                return (
                                  <BonusHistory BonusHistoryList={props.match.params.employeeid}
                                  />
                                );
                                case 3:
                                  return (
                                    <CostCenterHistory CostCenterHistoryList={props.match.params.employeeid}
                                    />
                                  );
                                  case 4:
                                    return (
                                      <BankDetailsHistory BankDetailsHistoryList={props.match.params.employeeid}
                                      />
                                    );
                                    case 5:
                                      return (
                                        <AadhaarHistory AadhaarHistoryList={props.match.params.employeeid}
                                        />
                                      );
                                      case 6:
                                        return (
                                          <AccessAndRightHistory AccessAndRightHistoryList={props.match.params.employeeid}
                                          />
                                        );
                                        case 7:
                                          return (
                                            <ManagerHistory ManagerHistoryList={props.match.params.employeeid}
                                            />
                                          );
                                          case 8:
                                            return (
                                              <UserDocuments BankDetailsHistoryList={props.match.params.employeeid}
                                              />
                                            );
                                            case 9:
                                              return (
                                                <OtherTaxableIncomeHistory OtherTaxableIncomeHistoryList={props.match.params.employeeid}
                                                />
                                              );
                                              case 10:
                                                return (
                                                  <UserExitHistory UserExitHistoryList={props.match.params.employeeid}
                                                  />
                                                );
                                                case 11:
                                                  return (
                                                    <PayslipsHistory PayslipsHistoryList={props.match.params.employeeid}
                                                    />
                                                  );
                                                  case 12:
                                                    return (
                                                      <ItStatementHistory UserExitHistoryList={props.match.params.employeeid}
                                                      />
                                                    );
                                                    case 13:
                                                      return (
                                                        <DISP DISPList={props.match.params.employeeid}
                                                        />
                                                      );
                                                      case 14:
                                                      return (
                                                        <InsuranceNominationHistory InsuranceNominationHistoryList={props.match.params.employeeid}
                                                        />
                                                      );
                                                      case 15:
                                                      return (
                                                        <SportHistory SportHistoryList={props.match.params.employeeid}
                                                        />
                                                      );
                              default:return (
                                <EmployeeContractDetails EmployeeContractDetailList={props.match.params.employeeid}
                                />
                              )
                           
                          }
                        })()}
    </Fragment>
  );
};

export default MasterHistory;
