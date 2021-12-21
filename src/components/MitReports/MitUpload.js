import React, { useState, useEffect, useContext, useMemo } from "react";
import { Container, Row, Col, Button, Form } from "react-bootstrap";
import Breadcrumb from "../common/breadcrumb";
import moment from "moment";
import DatePicker from "react-datepicker";
import "react-datepicker/dist/react-datepicker.css";
import "./MitReport.css";
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
import { MitReportContext } from "../../context/MitReportState";

const MitUpload = () => {
  const { getMitReport } = useContext(MitReportContext);
  const [company, setCompany] = useState("");
  const [year, setYear] = useState(new Date());
  const [month, setMonth] = useState(new Date());
  const [fileUpload, setFileUpload] = useState();

  const submitHandler = (e) => {
    e.preventDefault();
    console.log(
      "MitUpload",
      company,
      parseInt(moment(month).format("MM")),
      parseInt(moment(year).format("YYYY"))
    );

    getMitReport(
      company,
      parseInt(moment(month).format("MM")),
      parseInt(moment(year).format("YYYY"))
    );
  };
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
  const handleUpload = (event) => {
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
          // FinanceClearanceUploadSettlement(
          //   fileUpload,
          //   searchValue,
          //   pageCount,
          //   costCenter
          // );
        } else {
          toast.error("Please select a file to upload");
        }
      } else {
        toast.error("File size should not exceed 500kb ");
      }
    } else {
      toast.error("Please select a valid file to upload");
    }
  };
  return (
    <div className="module-reports">
      <ToastContainer />
      <Breadcrumb title="ALL UPLOAD" parent="ALL UPLOAD" />
      <Container fluid>
        <div className="card" style={{ borderRadius: "1rem" }}>
          <div className="OnBoardHeading">
            <b className="align-middle">All Upload</b>
          </div>
          <div className="module-reports-form mx-5 my-5">
            <Form>
            <Form.Group
                as={Row}
                className="mb-3"
                controlId="reportModuleName"
              >
                <Form.Label column sm="3">
                    Select Company Name:
                </Form.Label>
                <Col sm="8">
                  <Form.Control
                    as="select"
                    className="text-primary"
                    value={company}
                    placeholder="Select Template"
                    name="company"
                    required
                    onChange={(e) => setCompany(e.target.value)}
                  >
                    <option value="">Select Company</option>
                    <option value="Sports Title">Sports Title</option>
                    <option value="User Sports">User Sports</option>
                    <option value="Actual DOJ">Actual DOJ</option>
                 
              
                  </Form.Control>
                </Col>
              </Form.Group>
              <Form.Group
                as={Row}
                className="mb-3"
                controlId="reportModuleName"
              >
                <Form.Label column sm="3">
                    Upload template name:
                </Form.Label>
                <Col sm="8">
                  <Form.Control
                    as="select"
                    className="text-primary"
                    value={company}
                    placeholder="Select Template"
                    name="company"
                    required
                    onChange={(e) => setCompany(e.target.value)}
                  >
                    <option value="">Select Template</option>
                    <option value="Sports Title">Sports Title</option>
                    <option value="User Sports">User Sports</option>
                    <option value="Actual DOJ">Actual DOJ</option>
                    <option value="Bank">Bank</option>
                    <option value="Bonus Upload Financial">Bonus Upload Financial</option>
                    <option value="Bonus Upload Admin">Bonus Upload Admin</option>
                    <option value="Employee Nomination">Employee Nomination</option>
                    <option value="Expats Id Creation">Expats Id Creation</option>
                    <option value="Holiday Bonus">Holiday Bonus</option>
                    <option value="Manager Mapping">Manager Mapping</option>
                    <option value="New Cost Center">New Cost Center</option>
                    <option value="New Joiner">New Joiner</option>
                    <option value="Salary">Salary</option>
                    <option value="Update User Cost Center">Update User Cost Center</option>
                    <option value="Work Location">Work Location</option>
              
                  </Form.Control>
                </Col>
              </Form.Group>
               <Form.Group 
                as={Row}
                className="mb-3"
                controlId="reportModuleName">    
                                <Col sm="11">      
                    <div className="parentInput">
                  <label className="fileInputField">
                    &nbsp;&nbsp;
                    { true!== ""
                      ? false
                      : "Select File Here"}
                    <input
                      type="file"
                      accept=".xlsx, .xls"
                      style={{ display: "none" }}
                      onChange={(e) => {
                        changeHandler(e);
                      }}
                      readOnly
                    />
                  </label>

                  <label className="custom-file-upload">
                    <input
                      type="button"
                      className="custom_file_Upload_button"
                      name="photoId"
                      onClick={(e) => {
                        handleUpload(e);
                      }}
                    />
                    Upload File{" "}
                    <i
                      id="custom_file_upload_icon"
                      className="fa fa-upload"
                      aria-hidden="true"
                    ></i>
                  </label>
                </div>
                </Col>
              </Form.Group>
              <Row className="mt-5">
                <Col className="text-center">
                  <Button
                    variant="primary"
                    type="button"
                    onClick={submitHandler}
                  >
                    Submit
                  </Button>
                </Col>
              </Row>
            </Form>
          </div>
        </div>
      </Container>
    </div>
  );
};

export default MitUpload;
