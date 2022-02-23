import React, { Fragment, useEffect, useContext, useState } from "react";
import { Form, Row,Col, Button } from "react-bootstrap";
import Breadcrumb from "../common/breadcrumb";
import "react-datepicker/dist/react-datepicker.css";
import moment from "moment";
import { AppContext } from "../../context/AppState";
import "../Leaves/Leaves.css";
import MultiSelect from "react-multi-select-component";
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

const MasterHistory = () => {

  const [stepCount, setStepNumber] = useState(null);
  const [currentRecords,setCurrentRecords] = useState()
  const [dropDownData,setDropDownData] = useState([{
    name:"EMPLOYEE_CONTRACT_DETAILS",value:0
  },{name:"SALARY_HISTORY",value:1},
  {name:"BONUS_HISTORY",value:2},
  {name:"COST_CENTER_HISTORY",value:3},
  {name:"BANK_DETAILS_HISTORY",value:4},
  {name:"AADHAAR_HISTORY",value:5},
  {name:"ACCESS_AND_RIGHTS_HISTORY",value:6},
  {name:"MANAGER_HISTORY",value:7},
  {name:"USER_DOCUMENTS",value:8},
  {name:"OTHER_TAXABLE_INCOME_HISTORY",value:9},
  {name:"User Exit History",value:10},
  {name:"Payslips History",value:11},
  {name:"ItStatement History",value:12},
  {name:"DISP",value:13},
  {name:"Insurance Nomination History",value:14},
  {name:"Sport History",value:15},

])

  const { user } = useContext(AppContext);
  const { rolePermission } = useContext(PermissionContext);
  
  useEffect(() => {
  
  }, []);

 
  const setDropDownSelectHandler = (options) => {
    setStepNumber(options[0].value)
    console.log("options", options);
  };



  const submitData = (e) => {
    // e.preventDefault();

  };
  console.log(dropDownData,"dropDownData")
  return (
    <Fragment>
      <Breadcrumb title="Master History" parent="Master History" />
      <div className="container-fluid">
        <Form onSubmit={submitData}>
          <Row>
            <Col sm={4}>
              <Form.Group>
                <Form.Label>Employee Id</Form.Label>{" "}
                <span style={{ color: "red" }}>*</span>
                 <Select
                                name="filters"
                                placeholder="Select Employee Id"
                                value={stepCount} 
                                style={{fontSize:"0.8rem"}}
                                options={dropDownData !== null  ?
                                 dropDownData.map(e => ({label: e.name, value: e.value})):[]}
                                onChange={setDropDownSelectHandler}
                                isMulti required isSearchable />
                {/* <MultiSelect
                 options={dropDownData.map((e) => ({
                        label: e.name,
                        value: e.value,
                      }))
                }
                  value={stepCount}
                  onChange={setDropDownSelectHandler}
                  labelledBy={"Select Employee Id"}
                  hasSelectAll={true}
                  disableSearch={false}
                /> */}
              </Form.Group>
            </Col>
            <Col sm={4} style={{paddingTop:"28px",paddingLeft:"50px"}} >
          <Button type="submit" class="btn btn-primary" >
            Search
          </Button>
          </Col>
          </Row>
        </Form>
      </div>

        {(() => {
                          switch (stepCount) {
                            case 0:
                              return (
                                <EmployeeContractDetails EmployeeContractDetailList={currentRecords}
                                />
                              );
                            case 1:
                              return (
                                <SalaryHistory SalaryHistoryList={currentRecords}
                                />
                              );
                              case 2:
                                return (
                                  <BonusHistory BonusHistoryList={currentRecords}
                                  />
                                );
                                case 3:
                                  return (
                                    <CostCenterHistory CostCenterHistoryList={currentRecords}
                                    />
                                  );
                                  case 4:
                                    return (
                                      <BankDetailsHistory BankDetailsHistoryList={currentRecords}
                                      />
                                    );
                                    case 5:
                                      return (
                                        <AadhaarHistory AadhaarHistoryList={currentRecords}
                                        />
                                      );
                                      case 6:
                                        return (
                                          <AccessAndRightHistory AccessAndRightHistoryList={currentRecords}
                                          />
                                        );
                                        case 7:
                                          return (
                                            <ManagerHistory ManagerHistoryList={currentRecords}
                                            />
                                          );
                                          case 8:
                                            return (
                                              <UserDocuments BankDetailsHistoryList={currentRecords}
                                              />
                                            );
                                            case 9:
                                              return (
                                                <OtherTaxableIncomeHistory OtherTaxableIncomeHistoryList={currentRecords}
                                                />
                                              );
                                              case 10:
                                                return (
                                                  <UserExitHistory UserExitHistoryList={currentRecords}
                                                  />
                                                );
                                                case 11:
                                                  return (
                                                    <PayslipsHistory PayslipsHistoryList={currentRecords}
                                                    />
                                                  );
                                                  case 12:
                                                    return (
                                                      <ItStatementHistory UserExitHistoryList={currentRecords}
                                                      />
                                                    );
                                                    case 13:
                                                      return (
                                                        <DISP DISPList={currentRecords}
                                                        />
                                                      );
                                                      case 14:
                                                      return (
                                                        <InsuranceNominationHistory InsuranceNominationHistoryList={currentRecords}
                                                        />
                                                      );
                                                      case 15:
                                                      return (
                                                        <SportHistory SportHistoryList={currentRecords}
                                                        />
                                                      );
                              default:return (
                                <BankDetailsHistory BankDetailsHistoryList={currentRecords}
                                />
                              )
                           
                          }
                        })()}
    </Fragment>
  );
};

export default MasterHistory;
