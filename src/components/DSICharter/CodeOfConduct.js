import React, { useState, useContext, useEffect, useRef } from "react";
import { Modal, Button, Col, Form, Row } from "react-bootstrap";
import { DSICharterContext } from "../../context/DSICharterState";
import { degrees, PDFDocument, rgb, StandardFonts } from 'pdf-lib';
import codeBase64 from "./CharterFile/codeofconduct";
// import {EmployeeSeparationContext} from "../../context/EmployeeSeparationState"
import Img1 from "./img/img1.png";
import Img2 from "./img/img2.png";
import Img3 from "./img/img3.png";
import Img4 from "./img/img4.png";
import Img5 from "./img/img5.png";
import Img6 from "./img/img6.png";
import Img7 from "./img/img7.png";
import Img8 from "./img/img8.png";
import Img9 from "./img/img9.png";
import Img10 from "./img/img10.png";
import Img11 from "./img/img11.png";
import Img12 from "./img/img12.png";
import Img13 from "./img/img13.png";
import Img14 from "./img/img14.png";
import Img15 from "./img/img15.png";
import Img16 from "./img/img16.png";
import Img17 from "./img/img17.png";
import Img18 from "./img/img18.png";
import Img19 from "./img/img19.png";
import Img20 from "./img/img20.png";
import Img21 from "./img/img21.png";
import Img22 from "./img/img22.png";
import Img23 from "./img/img23.png";
import Img24 from "./img/img24.png";
import Img25 from "./img/img25.png";
import Img26 from "./img/img26.png";
import Img27 from "./img/img27.png";
import Img28 from "./img/img28.png";
import Img29 from "./img/img29.png";
import Img30 from "./img/img30.png";

import Img31 from "./img/img31.png";
import Img32 from "./img/img32.png";
import Img33 from "./img/img33.png";
import Img34 from "./img/img34.png";
import Img35 from "./img/img35.png";
import Img36 from "./img/img36.png";
import Img37 from "./img/img37.png";
import Img38 from "./img/img38.png";
import Img39 from "./img/img39.png";
import Img40 from "./img/img40.png";
import Img41 from "./img/img41.png";
import Img42 from "./img/img42.png";
import Img43 from "./img/img43.png";
import Img44 from "./img/img44.png";
import Img45 from "./img/img45.png";
import Img46 from "./img/img46.png";
import Img47 from "./img/img47.png";
import Img48 from "./img/img48.png";
import Img49 from "./img/img49.png";
import Img50 from "./img/img50.png";
import Img51 from "./img/img51.png";
import Img52 from "./img/img52.png";

import "./charter.css";

const CodeOfConduct = (props) => {
  const {
    dsiCharterCreate,
    dsiCharterUpdate,
    dsiCharterData,
    ViewEmployeeProfile,
    employeeProfileData,
    viewCharterAll,
    loader,
    charterIdValue,
    charterDataAll,
    ITCHARTER,
    charterAllResponse,
    uploadAllCharter,downloadFile
  } = useContext(DSICharterContext);

  const [showModal, setShow] = useState(false);
  const [codeOfConduct, setCodeOfConduct] = useState(false);
  const [codeOfConductError, setCodeOfConductError] = useState("");
  const [charterId, setCharterId] = useState("");

  const ref = React.createRef();
  const inputRef = useRef(null);

  const handleClose = () => {
    setShow(false);
    props.history.push("/dashboard/storedashboard");
  };
  const handleShow = () => setShow(true);

  const handleCheckBox = (e) => {
    if (codeOfConduct == false) {
      setCodeOfConduct(true);
    } else {
      setCodeOfConduct(false);
    }
    console.log(codeOfConduct);
  };
  useEffect(() => {
    ViewEmployeeProfile();
    viewCharterAll();
  }, []);

  useEffect(() => {
    if (
      employeeProfileData !== undefined &&
      employeeProfileData !== null &&
      employeeProfileData !== "" &&
      Object.keys(employeeProfileData).length !== 0
    ) {
      if (
        employeeProfileData.isCodeOfConduct === true &&
        employeeProfileData.isDsiItCharter !== true
      ) {
        props.history.push("/itcharter");
        // props.history.push("/codeofconduct")
        setShow(false);
      } else if (
        employeeProfileData.isCodeOfConduct === true &&
        employeeProfileData.isDsiItCharter === true
      ) {
        props.history.push("/dashboard/storedashboard");
        setShow(false);
      } else if (
        (employeeProfileData.isCodeOfConduct !== true &&
          employeeProfileData.isDsiItCharter !== true) ||
        (employeeProfileData.isCodeOfConduct === null &&
          employeeProfileData.isDsiItCharter === null)
      ) {
        setCharterId(employeeProfileData.charterId);

        console.log(employeeProfileData, "employeeProfileData");
        handleShow();
      }
    }
  }, [employeeProfileData, props]);
  // console.log(inputRef,props,charterDataAll,employeeProfileData,"charter code")
  function base64ToArrayBuffer(imageValue) {
    var bString = window.atob(imageValue);
    var bLength = bString.length;
    var bytes = new Uint8Array(bLength);
    for (var i = 0; i < bLength; i++) {
      var ascii = bString.charCodeAt(i);
      bytes[i] = ascii;
    }
    return bytes;
  }
  
  const handleSave = (e) => {
    e.preventDefault();
    if (
      codeOfConduct == "" ||
      codeOfConduct == null ||
      codeOfConduct == undefined
    ) {
      setCodeOfConductError("Please accept the acknowledgement ");
    } else {
      setCodeOfConductError("");
    }
    console.log(charterId, employeeProfileData, "employeeProfileData");
    if (codeOfConduct === true) {
      if (charterId === 0) {
        let history = props.history;
        const infoData = {
          charterId: charterIdValue,
          employeeId: employeeProfileData.employeeId,
          isCodeOfConduct: true,
          isDsiItCharter: false,
        };
        var imageValue = codeBase64;
        var bufferArray = base64ToArrayBuffer(imageValue);
        var blobStore = new Blob([bufferArray], { type: "application/pdf" });
        blobStore.name = "codeofconduct.pdf";
        const data = {
          dsiType: "Code of Conduct",
          employeeId: employeeProfileData.employeeId,
          fileType: 25,
        };

        dsiCharterCreate(infoData, history, data, blobStore);
        // ExportPDFCharter(inputRef.current,0,19,employeeProfileData.employeeId);
        props.history.push("/itcharter");
        // setShow(false)
      } else {
        charterDataAll.map((item) => {
          if (item.employeeId === employeeProfileData.employeeId) {
            const infoData = {
              charterId: item.charterId,
              employeeId: employeeProfileData.employeeId,
              dsiCharterAcknowledgement: [
                {
                  charterAcknowledgementId: 0,
                  charterId: item.charterId,
                },
              ],
              acknowledge: true,
              isCodeOfConduct: true,
              isDsiItCharter: employeeProfileData.isDsiItCharter,
              itCharterLetter: ITCHARTER,
            };
        
            var imageValue = codeBase64 ;
            var bufferArray = base64ToArrayBuffer(imageValue);
            var blobStore = new Blob([bufferArray], {
              type: "application/pdf",
            });
            blobStore.name = "codeofconduct.pdf";
            //var blob = window.URL.createObjectURL(blobStore);
            const data = {
              dsiType: "Code of Conduct",
              employeeId: employeeProfileData.employeeId,
              fileType: 25,
            };
            console.log(blobStore, "update");

           // dsiCharterUpdate(infoData, data, blobStore);
            //  ExportPDFCharter(inputRef.current,item.charterId,19,employeeProfileData.employeeId);
            props.history.push("/itcharter");
            setShow(false);
          }
        });
      }
    }
  };

  useEffect(() => {
    if (
      employeeProfileData !== undefined &&
      employeeProfileData !== null &&
      employeeProfileData !== "" &&
      charterDataAll !== undefined &&
      charterDataAll !== null &&
      charterDataAll !== ""
    ) {
      charterDataAll.map((item) => {
        if (item.employeeId == employeeProfileData.employeeId) {
          if (item.codeOfConduct == true) {
            setCodeOfConduct(true);
          } else {
            setCodeOfConduct(false);
          }
        }
      });
    }
  }, [props]);

  return (
    <>
      <Modal show={showModal} onHide={handleClose}>
        <Modal.Body>
          <div class="html-charter" id="charter" ref={inputRef}>
            <body>
              <div class="container-charter">
                <img class="img-insert-charter" src={Img1} alt="page1" />
                <img class="img-insert-charter" src={Img2} alt="page2" />
                <img class="img-insert-charter" src={Img3} alt="page3" />
                <img class="img-insert-charter" src={Img4} alt="page4" />
                <img class="img-insert-charter" src={Img5} alt="page5" />
                <img class="img-insert-charter" src={Img6} alt="page6" />
                <img class="img-insert-charter" src={Img7} alt="page7" />
                <img class="img-insert-charter" src={Img8} alt="page8" />
                <a href="https://decathlon.whispli.com/alerte" target="_blank">
                  <img class="img-insert-charter" src={Img9} alt="page9" />
                </a>
                <a href="https://decathlon.whispli.com/alerte" target="_blank">
                  <img class="img-insert-charter" src={Img10} alt="page10" />
                </a>
                <img class="img-insert-charter" src={Img11} alt="page11" />
                <img class="img-insert-charter" src={Img12} alt="page12" />
                <img class="img-insert-charter" src={Img13} alt="page13" />
                <img class="img-insert-charter" src={Img14} alt="page14" />
                <img class="img-insert-charter" src={Img15} alt="page15" />
                <img class="img-insert-charter" src={Img16} alt="page16" />
                <img class="img-insert-charter" src={Img17} alt="page17" />
                <img class="img-insert-charter" src={Img18} alt="page18" />
                <img class="img-insert-charter" src={Img19} alt="page19" />
                <img class="img-insert-charter" src={Img20} alt="page20" />
                <img class="img-insert-charter" src={Img21} alt="page21" />
                <img class="img-insert-charter" src={Img22} alt="page22" />
                <img class="img-insert-charter" src={Img23} alt="page23" />
                <img class="img-insert-charter" src={Img24} alt="page24" />
                <img class="img-insert-charter" src={Img25} alt="page25" />
                <img class="img-insert-charter" src={Img26} alt="page26" />
                <img class="img-insert-charter" src={Img27} alt="page27" />
                <img class="img-insert-charter" src={Img28} alt="page28" />
                <img class="img-insert-charter" src={Img29} alt="page29" />
                <img class="img-insert-charter" src={Img30} alt="page30" />
                <img class="img-insert-charter" src={Img31} alt="page31" />
                <img class="img-insert-charter" src={Img32} alt="page32" />
                <img class="img-insert-charter" src={Img33} alt="page33" />
                <img class="img-insert-charter" src={Img34} alt="page34" />
                <img class="img-insert-charter" src={Img35} alt="page35" />
                <img class="img-insert-charter" src={Img36} alt="page36" />
                <img class="img-insert-charter" src={Img37} alt="page37" />
                <img class="img-insert-charter" src={Img38} alt="page38" />
                <img class="img-insert-charter" src={Img39} alt="page39" />
                <img class="img-insert-charter" src={Img40} alt="page40" />
                <img class="img-insert-charter" src={Img41} alt="page41" />
                <img class="img-insert-charter" src={Img42} alt="page42" />
                <img class="img-insert-charter" src={Img43} alt="page43" />
                <img class="img-insert-charter" src={Img44} alt="page44" />
                <img class="img-insert-charter" src={Img45} alt="page45" />
                <img class="img-insert-charter" src={Img46} alt="page46" />
                <img class="img-insert-charter" src={Img47} alt="page47" />
                <img class="img-insert-charter" src={Img48} alt="page48" />
                <img class="img-insert-charter" src={Img49} alt="page49" />
                <img class="img-insert-charter" src={Img50} alt="page50" />
                <img class="img-insert-charter" src={Img51} alt="page51" />
                <img class="img-insert-charter" src={Img52} alt="page52" />
              </div>
            </body>
          </div>{" "}
        </Modal.Body>
        {/* <Modal.Footer> */}
        <Row>
          <Col sm={1} style={{ paddingLeft: "45px" }}>
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
            <label>
              I have read through the charter and agree to abide by it.
            </label>
            &nbsp;&nbsp;
            <p style={{ color: "red" }}>{codeOfConductError}</p> &nbsp;&nbsp;
          </Col>
        </Row>

        {/* </Modal.Footer> */}
        <div style={{ textAlign: "center" }}>
          <Button variant="primary" onClick={handleSave}>
            Save & Next
          </Button>
        </div>
        <br />
      </Modal>
    </>
  );
};

export default CodeOfConduct;
