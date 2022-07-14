import React, { useContext,useState,Fragment } from "react";
import { Eye, Download } from "react-feather";
import { DocumentManagementContext } from "../../context/DocumentManagementState";
import { PermissionContext } from "../../context/PermissionState";
import {
  Button,
  Container,
  Modal,
  Row,
  Col,
  Form,
  Table,
} from "react-bootstrap";

const DocsListTableBody = ({ doc, index,EmployeeId }) => {
  const { downloadModuleDoc ,moduleDocsList} = useContext(DocumentManagementContext);
  const { rolePermission ,ImageView,imageViewData} = useContext(PermissionContext);

  const [docShow, setDocShow] = useState(false);

  const downloadDoc = (e) => {
    e.preventDefault()
    const docName = e.target.getAttribute("data-doc");
    downloadModuleDoc(EmployeeId,doc);
  };

  const handleDocShow = () => {
    setDocShow(true);
  };

  const handleDocClose = () => {
    setDocShow(false);
  };

  return (
    <Fragment>
    <Modal show={docShow} onHide={handleDocClose} size="md">
    <Modal.Header closeButton className="modal-line"></Modal.Header>
    <Modal.Body>
      {imageViewData !== undefined &&
       Object.keys(imageViewData).length !== 0 && imageViewData.data!=="File does not exist" ? (
        <div>
            <iframe
            src={
              imageViewData.data ? imageViewData.data +
              "#toolbar=0& navpanes=0":""
            }
            style={{ width: "100%", height: "900px" }}
            frameborder="0"
          ></iframe>
        </div>
      ) : (
        "File does not exist"
      )}
    </Modal.Body>
  </Modal>
    <tr>
      <td>{index}</td>
      <td>{doc}</td>
      <td>
        {/* <a href={process.env.REACT_APP_S3_URL + doc} target="_blank">
          <Eye  />
        </a> */}
        {/* <a href={imageViewData.data ? imageViewData.data:""} target="_blank"> */}
          <Eye onClick={()=>{ImageView(doc,EmployeeId);handleDocShow()}} />
        {/* </a> */}
      </td>
      <td>
        <Download
          data-doc={doc}
          onClick={downloadDoc}
          style={{ color: "#007bff", cursor: "pointer" }}
        />
      </td>
    </tr>
    </Fragment>
  );
};

export default DocsListTableBody;
