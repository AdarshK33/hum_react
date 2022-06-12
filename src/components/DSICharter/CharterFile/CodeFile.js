import React, { useState, useContext,useImperativeHandle, useEffect, useRef } from "react";
import { Modal, Button, Col, Form, Row } from "react-bootstrap";
import jsPDF from 'jspdf';
import pdfMake from 'pdfmake';
import pdfFonts from 'pdfmake/build/vfs_fonts';
import htmlToPdfmake from 'html-to-pdfmake';
import "../App.css"
import Img1 from "../img/img1.png";
import Img2 from "../img/img2.png";
import Img3 from "../img/img3.png";
import Img4 from "../img/img4.png";
import Img5 from "../img/img5.png";
import Img6 from "../img/img6.png";
import Img7 from "../img/img7.png";
import Img8 from "../img/img8.png";
import Img9 from "../img/img9.png";
import Img10 from "../img/img10.png";
import Img11 from "../img/img11.png";
import Img12 from "../img/img12.png";
import Img13 from "../img/img13.png";
import Img14 from "../img/img14.png";
import Img15 from "../img/img15.png";
import Img16 from "../img/img16.png";
import Img17 from "../img/img17.png";
import Img18 from "../img/img18.png";
import Img19 from "../img/img19.png";
import Img20 from "../img/img20.png";
import Img21 from "../img/img21.png";
import Img22 from "../img/img22.png";
import Img23 from "../img/img23.png";
import Img24 from "../img/img24.png";
import Img25 from "../img/img25.png";
import Img26 from "../img/img26.png";
import Img27 from "../img/img27.png";
import Img28 from "../img/img28.png";
import Img29 from "../img/img29.png";
import Img30 from "../img/img30.png";

import Img31 from "../img/img31.png";
import Img32 from "../img/img32.png";
import Img33 from "../img/img33.png";
import Img34 from "../img/img34.png";
import Img35 from "../img/img35.png";
import Img36 from "../img/img36.png";
import Img37 from "../img/img37.png";
import Img38 from "../img/img38.png";
import Img39 from "../img/img39.png";
import Img40 from "../img/img40.png";
import Img41 from "../img/img41.png";
import Img42 from "../img/img42.png";
import Img43 from "../img/img43.png";
import Img44 from "../img/img44.png";
import Img45 from "../img/img45.png";
import Img46 from "../img/img46.png";
import Img47 from "../img/img47.png";
import Img48 from "../img/img48.png";
import Img49 from "../img/img49.png";
import Img50 from "../img/img50.png";
import Img51 from "../img/img51.png";
import Img52 from "../img/img52.png";
const html2pdf =require( "html2pdf.js")

const CodeFile = React.forwardRef((props,ref)=>{
    console.log("codeOfConduct",props)
 useEffect(()=>{

 },[props.refresh])
 useImperativeHandle(
    ref,
    () => ({
        showAlert() {
            return printDocument()
               }
    })
)
 const  printDocument=()=>{
        //const input = document.getElementById('divToPrint');
  
        var element = document.getElementById('codeToPrint');
        // html2pdf().from(element).save() //1.5mb
        var opt = {
          margin:1,
          filename:'myfile.pdf',
          image:{ type: 'png', quality: 0.5 },
          html2canvas:{ scale: 1 },
          jsPDF:{ unit: 'in', format: 'letter', orientation: 'portrait' }
        };
        html2pdf().from(element).set(opt).save();
     html2pdf().set(opt).from(element).toPdf().output('blob').then( (data) => {
        console.log(data,"data")
          return data
       })
          //   const doc = new jsPDF();
           
          //   //get table html
          //   const pdfTable = document.getElementById('divToPrint');
          //   //html to pdf format
          //   var html = htmlToPdfmake(pdfTable.innerHTML);
          
          //   const documentDefinition = { content: html };
          //   pdfMake.vfs = pdfFonts.pdfMake.vfs;
          //   pdfMake.createPdf(documentDefinition).open();
          
      }
    return (<div><div id="codeToPrint">
     <div class="html-charter" id="charter" >
 
            <body>
              <div class="container-charter">    
                <img style={{display: "block", height:"auto",  width: "80%",  marginLeft:" auto",  marginRight: "auto",  marginBottom: "1rem",marginTop: "1rem"}} src={Img1} alt="page1" />
                <img style={{display: "block",height: "auto",width: "80%",marginLeft: "auto",marginRight: "auto",marginBottom: "1rem" , marginTop: "1rem"}} src={Img2} alt="page2" />
                <img style={{display: "block",height: "auto",width: "80%",marginLeft: "auto",marginRight: "auto",marginBottom: "20rem",  marginTop: "1rem"}} src={Img3} alt="page3" />
                <img style={{display: "block",height: "auto",width: "80%",marginLeft: "auto",marginRight: "auto",marginBottom: "1rem" , marginTop: "1rem"}} src={Img4} alt="page4" />
                <img style={{display: "block",height: "auto",width: "80%",marginLeft: "auto",marginRight: "auto",marginBottom: "1rem" , marginTop: "1rem"}} src={Img5} alt="page5" />
                <img style={{display: "block",height: "auto",width: "80%",marginLeft: "auto",marginRight: "auto",marginBottom: "1rem" , marginTop: "1rem"}} src={Img6} alt="page6" />
                <img style={{display: "block",height: "auto",width: "80%",marginLeft: "auto",marginRight: "auto",marginBottom: "10rem" , marginTop: "1rem"}} src={Img7} alt="page7" />
                <img style={{display: "block",height: "auto",width: "80%",marginLeft: "auto",marginRight: "auto",marginBottom: "1rem"  ,marginTop: "1rem"}} src={Img8} alt="page8" />
                <a href="https://decathlon.whispli.com/alerte" target="_blank">
                  <img style={{display: "block",height: "auto",width: "80%",marginLeft: "auto",marginRight: "auto",marginBottom: "1rem" , marginTop: "1rem"}} src={Img9} alt="page9" />
                </a>
                <a href="https://decathlon.whispli.com/alerte" target="_blank">
                  <img style={{display: "block",height: "auto",width: "80%",marginLeft: "auto",marginRight: "auto",marginBottom: "1rem",marginTop: "1rem"}} src={Img10} alt="page10" />
                </a>
                <img style={{display: "block",height: "auto",width: "80%",marginLeft: "auto",marginRight: "auto",marginBottom: "20rem",marginTop: "1rem"}} src={Img11} alt="page11" />
                <img style={{display: "block",height: "auto",width: "80%",marginLeft: "auto",marginRight: "auto",marginBottom: "1rem",marginTop: "1rem"}} src={Img12} alt="page12" />
                <img style={{display: "block",height: "auto",width: "80%",marginLeft: "auto",marginRight: "auto",marginBottom: "1rem",marginTop: "1rem"}} src={Img13} alt="page13" />
                <img style={{display: "block",height: "auto",width: "80%",marginLeft: "auto",marginRight: "auto",marginBottom: "20rem",marginTop: "1rem"}} src={Img14} alt="page14" />
                <img style={{display: "block",height: "auto",width: "80%",marginLeft: "auto",marginRight: "auto",marginBottom: "1rem",marginTop: "1rem"}} src={Img15} alt="page15" />
                <img style={{display: "block",height: "auto",width: "80%",marginLeft: "auto",marginRight: "auto",marginBottom: "1rem",marginTop: "1rem"}} src={Img16} alt="page16" />
                <img style={{display: "block",height: "auto",width: "80%",marginLeft: "auto",marginRight: "auto",marginBottom: "20rem",marginTop: "1rem"}} src={Img17} alt="page17" />
                <img style={{display: "block",height: "auto",width: "80%",marginLeft: "auto",marginRight: "auto",marginBottom: "1rem",marginTop: "1rem"}} src={Img18} alt="page18" />
                <img style={{display: "block",height: "auto",width: "80%",marginLeft: "auto",marginRight: "auto",marginBottom: "1rem",marginTop: "1rem"}} src={Img19} alt="page19" />
                <img style={{display: "block",height: "auto",width: "80%",marginLeft: "auto",marginRight: "auto",marginBottom: "20rem",marginTop: "1rem"}} src={Img20} alt="page20" />
                <img style={{display: "block",height: "auto",width: "80%",marginLeft: "auto",marginRight: "auto",marginBottom: "1rem",marginTop: "1rem"}} src={Img21} alt="page21" />
                <img style={{display: "block",height: "auto",width: "80%",marginLeft: "auto",marginRight: "auto",marginBottom: "1rem",marginTop: "1rem"}} src={Img22} alt="page22" />
                <img style={{display: "block",height: "auto",width: "80%",marginLeft: "auto",marginRight: "auto",marginBottom: "20rem",marginTop: "1rem"}} src={Img23} alt="page23" />
                <img style={{display: "block",height: "auto",width: "80%",marginLeft: "auto",marginRight: "auto",marginBottom: "1rem",marginTop: "1rem"}} src={Img24} alt="page24" />
                <img style={{display: "block",height: "auto",width: "80%",marginLeft: "auto",marginRight: "auto",marginBottom: "1rem",marginTop: "1rem"}} src={Img25} alt="page25" />
                <img style={{display: "block",height: "auto",width: "80%",marginLeft: "auto",marginRight: "auto",marginBottom: "20rem",marginTop: "1rem"}} src={Img26} alt="page26" />
                <img style={{display: "block",height: "auto",width: "80%",marginLeft: "auto",marginRight: "auto",marginBottom: "1rem",marginTop: "1rem"}} src={Img27} alt="page27" />
                <img style={{display: "block",height: "auto",width: "80%",marginLeft: "auto",marginRight: "auto",marginBottom: "1rem",marginTop: "1rem"}} src={Img28} alt="page28" />
                <img style={{display: "block",height: "auto",width: "80%",marginLeft: "auto",marginRight: "auto",marginBottom: "20rem",marginTop: "1rem"}} src={Img29} alt="page29" />
                <img style={{display: "block",height: "auto",width: "80%",marginLeft: "auto",marginRight: "auto",marginBottom: "1rem",marginTop: "1rem"}} src={Img30} alt="page30" />
                <img style={{display: "block",height: "auto",width: "80%",marginLeft: "auto",marginRight: "auto",marginBottom: "1rem",marginTop: "1rem"}} src={Img31} alt="page31" />
                <img style={{display: "block",height: "auto",width: "80%",marginLeft: "auto",marginRight: "auto",marginBottom: "20rem",marginTop: "1rem"}} src={Img32} alt="page32" />
                <img style={{display: "block",height: "auto",width: "80%",marginLeft: "auto",marginRight: "auto",marginBottom: "1rem",marginTop: "1rem"}} src={Img33} alt="page33" />
                <img style={{display: "block",height: "auto",width: "80%",marginLeft: "auto",marginRight: "auto",marginBottom: "1rem",marginTop: "1rem"}} src={Img34} alt="page34" />
                <img style={{display: "block",height: "auto",width: "80%",marginLeft: "auto",marginRight: "auto",marginBottom: "20rem",marginTop: "1rem"}} src={Img35} alt="page35" />
                <img style={{display: "block",height: "auto",width: "80%",marginLeft: "auto",marginRight: "auto",marginBottom: "1rem",marginTop: "1rem"}} src={Img36} alt="page36" />
                <img style={{display: "block",height: "auto",width: "80%",marginLeft: "auto",marginRight: "auto",marginBottom: "1rem",marginTop: "1rem"}} src={Img37} alt="page37" />
                <img style={{display: "block",height: "auto",width: "80%",marginLeft: "auto",marginRight: "auto",marginBottom: "20rem",marginTop: "1rem"}} src={Img38} alt="page38" />
                <img style={{display: "block",height: "auto",width: "80%",marginLeft: "auto",marginRight: "auto",marginBottom: "1rem",marginTop: "1rem"}} src={Img39} alt="page39" />
                <img style={{display: "block",height: "auto",width: "80%",marginLeft: "auto",marginRight: "auto",marginBottom: "1rem",marginTop: "1rem"}} src={Img40} alt="page40" />
                <img style={{display: "block",height: "auto",width: "80%",marginLeft: "auto",marginRight: "auto",marginBottom: "20rem",marginTop: "1rem"}} src={Img41} alt="page41" />
                <img style={{display: "block",height: "auto",width: "80%",marginLeft: "auto",marginRight: "auto",marginBottom: "1rem",marginTop: "1rem"}} src={Img42} alt="page42" />
                <img style={{display: "block",height: "auto",width: "80%",marginLeft: "auto",marginRight: "auto",marginBottom: "1rem",marginTop: "1rem"}} src={Img43} alt="page43" />
                <img style={{display: "block",height: "auto",width: "80%",marginLeft: "auto",marginRight: "auto",marginBottom: "20rem",marginTop: "1rem"}} src={Img44} alt="page44" />
                <img style={{display: "block",height: "auto",width: "80%",marginLeft: "auto",marginRight: "auto",marginBottom: "1rem",marginTop: "1rem"}} src={Img45} alt="page45" />
                <img style={{display: "block",height: "auto",width: "80%",marginLeft: "auto",marginRight: "auto",marginBottom: "1rem",marginTop: "1rem"}} src={Img46} alt="page46" />
                <img style={{display: "block",height: "auto",width: "80%",marginLeft: "auto",marginRight: "auto",marginBottom: "20rem",marginTop: "1rem"}} src={Img47} alt="page47" />
                <img style={{display: "block",height: "auto",width: "80%",marginLeft: "auto",marginRight: "auto",marginBottom: "1rem",marginTop: "1rem"}} src={Img48} alt="page48" />
                <img style={{display: "block",height: "auto",width: "80%",marginLeft: "auto",marginRight: "auto",marginBottom: "1rem",marginTop: "1rem"}} src={Img49} alt="page49" />
                <img style={{display: "block",height: "auto",width: "80%",marginLeft: "auto",marginRight: "auto",marginBottom: "20rem",marginTop: "1rem"}} src={Img50} alt="page50" />
                <img style={{display: "block",height: "auto",width: "80%",marginLeft: "auto",marginRight: "auto",marginBottom: "1rem",marginTop: "1rem"}} src={Img51} alt="page51" />
                <img style={{display: "block",height: "auto",width: "80%",marginLeft: "auto",marginRight: "auto",marginBottom: "1rem",marginTop: "1rem"}} src={Img52} alt="page52" />
                <div class="flex-container">
     <b >Name :</b><b style={{  padding: "20px"}}>User</b><br/>
                     <b>Employee ID :</b><b style={{  padding: "20px"}}>DSI004238</b><br/>
                     <b>Date :</b><b style={{  padding: "20px"}}>20/11/21</b></div>
              </div>
            </body>
                    
          </div>{" "}   
         
</div>
<Button onClick={printDocument} style={{backgroundColor: "rgb(74 27 49)",
  padding: "15px 32px",
  textAlign: "center",
  display: "inline-block",
  fontSize: "16px",
  margin: "4px 2px",
  cursor: "pointer",
          color: "white",border: "2px solid #4CAF50"
}}>Export To PDF</Button>{' '}  
  </div>)
})
export default CodeFile