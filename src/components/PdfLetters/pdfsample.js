import React, {
  Fragment,
  useState,
  useContext,
  useEffect,
  useRef,
} from "react";
import jsPDF from "jspdf";
import html2canvas from "html2canvas";
import { DocsVerifyContext } from "../../context/DocverificationState";

const ref = React.createRef();
const PdfExample = () => {
  const inputRef = useRef(null);

  const { uploadBase64Image } = useContext(DocsVerifyContext);
  const [image, setImage] = useState("");
  const ExportPdf = () => {
    html2canvas(inputRef.current).then((canvas) => {
      // document.body.appendChild(canvas); // if you want see your screenshot in body.
      const imgData = canvas.toDataURL("image/png");
      var imageData = imgData;
      imageData = imgData.slice(22) + imgData.slice(23);
      var data = {
        base64String: imageData,
        candidateId: 2362,
        fileType: 9,
      };
      uploadBase64Image(data);
      console.log("base64 data", imageData);
      setImage(imgData);
      //   const pdf = new jsPDF();
      //   pdf.addImage(imgData, "PNG", 0, 0);
      //   console.log(pdf);
      //   pdf.save("download.pdf");
    });
  };
  return (
    console.log("pdf letter", image),
    (
      <div>
        <br></br>
        <br></br>
        <br></br>
        <br></br>
        <br></br>
        <br></br>
        <br></br>
        <br></br>
        <button onClick={ExportPdf}>pdf</button>
        <div id="capture" ref={inputRef}>
          {" "}
          With reference to your resignation. We would like to inform you that
          your resignation has been accepted and you are relieved from the
          services of the Decathlon Sports India on the closing of working hours
          of
        </div>
        {image && <img src={image} alt="e" />}
      </div>
    )
  );
};
export default PdfExample;
