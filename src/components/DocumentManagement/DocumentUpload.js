import React, { useState, useEffect, useContext, useMemo } from "react";
import { Container, Row, Col, Button, Form ,Table} from "react-bootstrap";
import Breadcrumb from "../common/breadcrumb";
import moment from "moment";
import DatePicker from "react-datepicker";
import "react-datepicker/dist/react-datepicker.css";
import "./DocumentManagement.css";
import { ToastContainer, toast } from "react-toastify";

import MultiSelect from "react-multi-select-component";
import {
  format,
  startOfMonth,
  subMonths,
  addMonths,
  subYears,
  addYears,
  getDaysInMonth,
  getDay,
  endOfMonth,
  setDate,
  getDate,
  isEqual,
  subWeeks,
  addWeeks,
  subDays,
  addDays,
} from "date-fns";
import {DocumentUploadContext} from "../../context/DocumentUploadState"

const DocumentUpload = () => {
  const { getDocumentUpload,documentUploadData,loader } = useContext(DocumentUploadContext);
  const [document, setDocument] = useState("");
  const [fileUpload, setFileUpload] = useState();
  const [currentRecords, setCurrentRecords] = useState([]);

  
  const changeHandler = (event) => {
    let fileObj = event.target.files[0];

    console.log("clicked", fileObj);
    if (
      fileObj !== undefined &&
      fileObj !== null &&
      fileObj !== "" &&
      fileObj.name !== undefined &&
      fileObj.name !== null &&
      fileObj.name !== "" &&
      (fileObj.name.includes(".xlsx") || fileObj.name.includes(".xls"))
    ) {
      setFileUpload(fileObj);
    } else {
      toast.error("Please select a valid file to upload");
    }
  };
  const validateEmpDetails = () => {
    if (
      document !== "" &&
      document !== null &&
      document !== undefined
    ) {
      return true;
    } else {
      toast.error("Please select the Document");
      return false;
    }
  };
  const checkValidations = () => {
    console.log("on validation");
    if (
      (validateEmpDetails() === true) &
      (validateFileUpload() === true)
    ) {
      console.log("on true");
      return true;
    } else {
      console.log("on falsae");
      return false;
    }
  };
  const validateFileUpload = () =>{
    if (
      fileUpload !== undefined &&
      fileUpload !== null &&
      fileUpload !== "" &&
      fileUpload.name !== undefined &&
      fileUpload.name !== null &&
      fileUpload.name !== "" &&
      (fileUpload.name.includes(".xlsx") || fileUpload.name.includes(".xls"))
    ) {
      if (
        fileUpload !== undefined &&
        fileUpload !== null &&
        fileUpload !== "" &&
        fileUpload.size !== undefined &&
        fileUpload.size !== null &&
        fileUpload.size !== "" &&
        (fileUpload.size / 1024 < 500 || fileUpload.size / 1024 == 500)
      ) {
        if (fileUpload !== undefined && fileUpload !== null) {
          return true
        } else {
          toast.error("Please select a file to upload");
        }
      } else {
        toast.error("File size should not exceed 500kb ");
      }
    } else {
      toast.error("Please select a valid file to upload");
    }
  }
  const handleUpload = (e) => {
    e.preventDefault();
    const value = checkValidations();
    if(value === true){
      getDocumentUpload(document,fileUpload);
    }
  
  };
console.log(document,fileUpload)
  return (
    <div className="module-reports">
      <ToastContainer />
      <Breadcrumb title="DOCUMENTS UPLOAD" parent="DOCUMENTS UPLOAD" />
      <Container fluid>
        <div className="card" style={{ borderRadius: "1rem" }}>
          <div className="OnBoardHeading">
            <b className="align-middle">Documents Upload</b>
          </div>
          <div className="module-reports-form mx-5 my-5">
            <Form>
              <Form.Group
                as={Row}
                className="mb-3"
                controlId="reportModuleName"
              >
                <Form.Label column sm="2">
                  Document Name:
                </Form.Label>
                <Col sm="8">
                  <Form.Control
                    as="select"
                    className="text-primary"
                    value={document}
                    placeholder="Select Template"
                    name="document"
                    required
                    onChange={(e) => setDocument(e.target.value)}
                  >
                    <option value="">Select Template</option>
                    <option value="0">Sports Title</option>
                    <option value="1">User Sports</option>
                    <option value="2">Actual DOJ</option>
                    <option value="3">Bank</option>
                    <option value="4">Bonus Upload Financial</option>
                    <option value="5">Bonus Upload Admin</option>
                    <option value="6">Employee Nomination</option>
                    <option value="7">Expats Id Creation</option>
                    <option value="8">Holiday Bonus</option>
                    <option value="9">Manager Mapping</option>
                    <option value="10">New Cost Center</option>
                    <option value="11">New Joiner</option>
                    <option value="12">Salary</option>
                    <option value="13">Update User Cost Center</option>
                    <option value="14">Work Location</option>
              
                  </Form.Control>
                </Col>
              </Form.Group>
               <Form.Group 
                as={Row}
                className="mb-3"
                controlId="reportModuleName">    
                   <Form.Label column sm="2">
                    Select Document:
                </Form.Label>
                                <Col sm="8">      
                    <div className="fileInput">
                  <label 
                  className="fileInputField">
                    &nbsp;&nbsp;
                    Select Document Here
                    <input
                      type="file"
                      placeholder="Select Document"
                      accept=".xlsx, .xls"
                      style={{ display: "none" }}
                      onChange={(e) => {
                        changeHandler(e);
                      }}
                      readOnly
                    />
                  </label>

                  {/* <label className="custom-file-upload">
                    <input
                      type="button"
                      className="custom_file_Upload_button"
                      name="photoId"
                      onClick={(e) => {
                        handleUpload(e);
                      }}
                    />
                    Choose File{" "}
                    <i
                      id="custom_file_upload_icon"
                      className="fa fa-upload"
                      aria-hidden="true"
                    ></i>
                  </label> */}
                </div>
                </Col>
              </Form.Group>
              <Row className="mt-5">
                <Col className="text-center">
                  <Button
                    variant="primary"
                    type="button"
                    onClick={handleUpload}
                  >
                    Submit
                  </Button>
                </Col>
              </Row>
              <Row>
        <Col sm={10}>
          <div className="mt-5">
            <Table className="tableWrapper table table-borderless">
              <thead>
                <tr>
                  <th>Document Name</th>
                  <th>Uploaded Date</th>
                  <th>Action</th>
                </tr>
              </thead>
              <tbody>
                {loader ? (
                  <tr>
                    <td></td>
                    <td>
                      <div
                        className="loader-box loader"
                        style={{ width: "100% !important" }}
                      >
                        <div className="loader">
                          <div className="line bg-primary"></div>
                          <div className="line bg-primary"></div>
                          <div className="line bg-primary"></div>
                          <div className="line bg-primary"></div>
                        </div>
                      </div>
                    </td>
                    <td></td>
                  </tr>
                ) : documentUploadData && Object.keys(documentUploadData).length ? (
                  documentUploadData.map((item) => {
                    return (
                      <tr>
                        <td>{item.documentLink}</td>
                        <td>
                          {}
                        </td>
                        <td>
                        {}
                        </td>
                      </tr>
                    );
                  })
                ) : (
                  <tr>
                    <td></td>
                    <td>No Documents Found</td>
                    <td></td>
                  </tr>
                )}
              </tbody>
            </Table>
          </div>
        </Col>
      </Row>
            </Form>
          </div>
         
        </div>

      </Container>
    </div>
  );
};

export default DocumentUpload;
