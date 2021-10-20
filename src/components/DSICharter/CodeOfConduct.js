import React, { useState ,useContext,useEffect} from "react";
import { Modal, Button ,Col,Form,Row} from "react-bootstrap";
import { DSICharterContext } from "../../context/DSICharterState";
import {EmployeeSeparationContext} from "../../context/EmployeeSeparationState"
import Img1 from './img/img1.png'
import Img2 from './img/img2.png'
import Img3 from './img/img3.png'
import Img4 from './img/img4.png'
import Img5 from './img/img5.png'
import Img6 from './img/img6.png'
import Img7 from './img/img7.png'
import Img8 from './img/img8.png'
import Img9 from './img/img9.png'
import Img10 from './img/img10.png'
import Img11 from './img/img11.png'
import Img12 from './img/img12.png'
import Img13 from './img/img13.png'
import Img14 from './img/img14.png'
import Img15 from './img/img15.png'
import Img16 from './img/img16.png'
import Img17 from './img/img17.png'
import Img18 from './img/img18.png'
import Img19 from './img/img19.png'
import Img20 from './img/img20.png'
import Img21 from './img/img21.png'
import Img22 from './img/img22.png'
import Img23 from './img/img23.png'
import Img24 from './img/img24.png'
import Img25 from './img/img25.png'
import Img26 from './img/img26.png'
import Img27 from './img/img27.png'
import Img28 from './img/img28.png'
import Img29 from './img/img29.png'
import Img30 from './img/img30.png'

import Img31 from './img/img31.png'
import Img32 from './img/img32.png'
import Img33 from './img/img33.png'
import Img34 from './img/img34.png'
import Img35 from './img/img35.png'
import Img36 from './img/img36.png'
import Img37 from './img/img37.png'
import Img38 from './img/img38.png'
import Img39 from './img/img39.png'
import Img40 from './img/img40.png'
import Img41 from './img/img41.png'
import Img42 from './img/img42.png'
import Img43 from './img/img43.png'
import Img44 from './img/img44.png'
import Img45 from './img/img45.png'
import Img46 from './img/img46.png'
import Img47 from './img/img47.png'
import Img48 from './img/img48.png'
import Img49 from './img/img49.png'
import Img50 from './img/img50.png'
import Img51 from './img/img51.png'
import Img52 from './img/img52.png'

import "./charter.css"
const CodeOfConduct =(props)=> {
  const { dsiCharterCreate ,dsiCharterData,viewCharterAll,loader,charterDataAll} = useContext(DSICharterContext);
  const {ViewEmployeeProfile,employeeProfileData} = useContext(EmployeeSeparationContext)

    const [showModal, setShow] = useState(false);
  const [codeOfConduct,setCodeOfConduct] = useState(false)
  const [codeOfConductError,setCodeOfConductError] = useState("")
  const [charterId ,setCharterId] = useState("")

  const handleClose = () => {
    setShow(false);
    props.history.push("/dashboard/storedashboard")
  }
  const handleShow = () => setShow(true);

  const handleCheckBox =(e)=>{
    if(codeOfConduct == false){
      setCodeOfConduct(true)
    }else{
      setCodeOfConduct(false)
    }
    console.log(codeOfConduct)
  }
  useEffect(() => {
    ViewEmployeeProfile()
    viewCharterAll()
  }, [props])
  // useEffect(()=>{
  //   console.log(props,"props code")
  // },[props])
  useEffect(() => {
     if(employeeProfileData !== undefined && employeeProfileData !== null 
      && employeeProfileData !== "" 
      // && charterDataAll !== undefined && 
      // charterDataAll !== null && charterDataAll !== ""
      ){
     // charterDataAll.map((item)=>{
       // console.log(item,"item code")
      //   if(item.employeeId == employeeProfileData.employeeId){
      //     // if(item.codeOfConduct == true && item.ethicsCharter !==true && item.dsiItCharter !==true){
      //     //     props.history.push("/ethiccharter")
      //     //     setShow(false)
      //     // }else 
      //     if(item.codeOfConduct == true && item.dsiItCharter !==true){
      //       props.history.push("/itcharter")
      //       setShow(false)
      //     }else if(item.codeOfConduct == true && item.dsiItCharter==true){
      //       props.history.push("/dashboard/storedashboard")
      //       setShow(false)
      //     }
      //   }else{
      //     handleShow()
      //   }
      // })
      if((employeeProfileData.isCodeOfConduct !== true && 
        employeeProfileData.isDsiItCharter !== true)||(employeeProfileData.isCodeOfConduct === null && 
        employeeProfileData.isDsiItCharter === null)){
          handleShow()
          setCharterId(employeeProfileData.charterId)
      }else if(employeeProfileData.isCodeOfConduct === true &&
         employeeProfileData.isDsiItCharter !== true){
        props.history.push("/itcharter")
            setShow(false)
          }else if(employeeProfileData.isCodeOfConduct === true && 
            employeeProfileData.isDsiItCharter === true){
            props.history.push("/dashboard/storedashboard")
            setShow(false)
          }
          }
  }, [employeeProfileData])
  console.log(props,charterDataAll,employeeProfileData,"charter")
  const handleSave = (e) =>{
    e.preventDefault()
    console.log(props,codeOfConduct,employeeProfileData,charterDataAll,"charter")
    if (codeOfConduct == "" || codeOfConduct == null || codeOfConduct == undefined) {
      setCodeOfConductError("Please accept the acknowledgement ");
    } else {
      setCodeOfConductError("");
    }
    if(codeOfConduct == true){
  const infoData = {
        "charterId": charterId,
        "employeeId":employeeProfileData.employeeId,
        "isCodeOfConduct": true,
        "isDsiItCharter": false 
        }
        console.log(infoData)
        dsiCharterCreate(infoData)
        props.history.push("/itcharter")
        setShow(false)
      }
  }
  

  useEffect(() => {
    if(employeeProfileData !== undefined && employeeProfileData !== null && employeeProfileData !== "" &&
      charterDataAll !== undefined && charterDataAll !== null && charterDataAll !== ""){
      charterDataAll.map((item)=>{
        if(item.employeeId == employeeProfileData.employeeId){
          if(item.codeOfConduct == true){
            setCodeOfConduct(true)
          }else{
            setCodeOfConduct(false)
          }
        }
      })
    }
  }, [props])
 
  return (<>
      {loader==true?"":<Modal show={showModal} onHide={handleClose}>
        <Modal.Body>
        <div>
    <body>
<div class="container">
<img class='img-insert' src={Img1} alt="page1"/>
    <img class='img-insert' src={Img2} alt="page2"/>
    <img class='img-insert' src={Img3} alt="page3"/>
    <img class='img-insert' src={Img4} alt="page4"/>
    <img class='img-insert' src={Img5} alt="page5"/>
    <img class='img-insert' src={Img6} alt="page6"/>
    <img class='img-insert' src={Img7} alt="page7"/>
    <img class='img-insert' src={Img8} alt="page8"/>
    <a href="https://decathlon.whispli.com/alerte" target="_blank"><img class='img-insert' src={Img9} alt="page9"/></a>
    <a href="https://decathlon.whispli.com/alerte" target="_blank"><img class='img-insert' src={Img10} alt="page10"/></a>
    <img class='img-insert' src={Img11} alt="page11"/>
    <img class='img-insert' src={Img12} alt="page12"/>
    <img class='img-insert' src={Img13} alt="page13"/>
    <img class='img-insert' src={Img14} alt="page14"/>
    <img class='img-insert' src={Img15} alt="page15"/>
    <img class='img-insert' src={Img16} alt="page16"/>
    <img class='img-insert' src={Img17} alt="page17"/>
    <img class='img-insert' src={Img18} alt="page18"/>
    <img class='img-insert' src={Img19} alt="page19"/>
    <img class='img-insert' src={Img20} alt="page20"/>
    <img class='img-insert' src={Img21} alt="page21"/>
    <img class='img-insert' src={Img22} alt="page22"/>
    <img class='img-insert' src={Img23} alt="page23"/>
    <img class='img-insert' src={Img24} alt="page24"/>
    <img class='img-insert' src={Img25} alt="page25"/>
    <img class='img-insert' src={Img26} alt="page26"/>
    <img class='img-insert' src={Img27} alt="page27"/>
    <img class='img-insert' src={Img28} alt="page28"/>
    <img class='img-insert' src={Img29} alt="page29"/>
    <img class='img-insert' src={Img30} alt="page30"/>
    <img class='img-insert' src={Img31} alt="page31"/>
    <img class='img-insert' src={Img32} alt="page32"/>
    <img class='img-insert' src={Img33} alt="page33"/>
    <img class='img-insert' src={Img34} alt="page34"/>
    <img class='img-insert' src={Img35} alt="page35"/>
    <img class='img-insert' src={Img36} alt="page36"/>
    <img class='img-insert' src={Img37} alt="page37"/>
    <img class='img-insert' src={Img38} alt="page38"/>
    <img class='img-insert' src={Img39} alt="page39"/>
    <img class='img-insert' src={Img40} alt="page40"/>
    <img class='img-insert' src={Img41} alt="page41"/>
    <img class='img-insert' src={Img42} alt="page42"/>
    <img class='img-insert' src={Img43} alt="page43"/>
    <img class='img-insert' src={Img44} alt="page44"/>
    <img class='img-insert' src={Img45} alt="page45"/>
    <img class='img-insert' src={Img46} alt="page46"/>
    <img class='img-insert' src={Img47} alt="page47"/>
    <img class='img-insert' src={Img48} alt="page48"/>
    <img class='img-insert' src={Img49} alt="page49"/>
    <img class='img-insert' src={Img50} alt="page50"/>
    <img class='img-insert' src={Img51} alt="page51"/>
    <img class='img-insert' src={Img52} alt="page52"/>
</div>

</body>
</div>      </Modal.Body>
        {/* <Modal.Footer> */}
          <Row>
          <Col sm={1} style={{paddingLeft:"45px"}}>
                <div className="boxField input">
                  <input
                    className="largerCheckbox"
                    type="checkbox"
                    value={codeOfConduct}
                     checked={codeOfConduct}
                    //  required={required}
                    onChange={(e) => handleCheckBox(e)}
                  />
                </div>
            </Col>
        <Col sm={11}>

        <label>I have read through the charter and agree to abide by it.</label> 
                                  &nbsp;&nbsp; 
        <p style={{color:"red"}}>{codeOfConductError}</p>{" "}
                                  &nbsp;&nbsp; 
                                  </Col>
</Row>

        {/* </Modal.Footer> */}
     <div style={{textAlign:"center"}}>
  <Button variant="primary" onClick={handleSave}>
            Save & Next
          </Button>
          </div><br/>
                </Modal>}
    </>  );
}

export default CodeOfConduct;