import React, { useState ,useContext,useEffect} from "react";
import { Modal, Button ,Col,Form,Row} from "react-bootstrap";
import CodeOfConduct from "./CodeOfConduct";
import { AppContext } from "../../context/AppState";
// import EthicsCharter from "./EthicCharter";
import ITCharter from "./ITCharter";
import { DSICharterContext } from "../../context/DSICharterState";
import {EmployeeSeparationContext} from "../../context/EmployeeSeparationState"
import "./charter.css"
const Charter=(props)=> {
  const { dsiCharterCreate ,dsiCharterData,viewCharterAll,charterDataAll} = useContext(DSICharterContext);
  const {ViewEmployeeProfile,employeeProfileData} = useContext(EmployeeSeparationContext)
  const { getUserInfo,fetchEmployeeProfile,fetchemployeeData, user } = useContext(AppContext);    
  const [showModal, setShow] = useState(true);
   
  const [codeOfConduct,setCodeOfConduct] = useState(false)
  // const [ethicsCharter,setEthicsCharter] = useState()
  const [dsiItCharter,setDsiItCharter] = useState(false)
  const [employeeId,setEmployeeId] = useState('')

  useEffect(() => {
    ViewEmployeeProfile()
    fetchEmployeeProfile()
    viewCharterAll("all",0)
  }, [])

  useEffect(() => {
    if(fetchemployeeData !== undefined && fetchemployeeData !== null && fetchemployeeData !== "" &&
      charterDataAll !== undefined && charterDataAll !== null && charterDataAll !== ""){
      charterDataAll.map((item)=>{
        if(item.employeeId == fetchemployeeData.employeeId){
          setCodeOfConduct(item.codeOfConduct)
          // setEthicsCharter(item.ethicsCharter)
          setDsiItCharter(item.dsiItCharter)
          setEmployeeId(item.employeeId)
        }
      })
    }
  }, [])
  return (<>
      <div
        className="d-flex align-items-center justify-content-center"
        style={{ height: "100vh" }}
      >
        { (codeOfConduct !== true &&
           dsiItCharter !== true)?<CodeOfConduct data={props}/>:
          //  (codeOfConduct == true && ethicsCharter !== true &&
          //   dsiItCharter !== true)?<EthicsCharter data={props}/>:
            (codeOfConduct == true  &&
              dsiItCharter !== true)?<ITCharter data={props}/>:(codeOfConduct == true &&
           dsiItCharter == true)?
          //  props.history.push("dashboard/storedashboard")31/05/2022
           props.history.push("/employee360")
           :""}
           {/* <CodeOfConduct data={props}/>
           <EthicsCharter data={props}/>
           <ITCharter data={props}/> */}
      </div>
    </>  );
}

export default Charter;