import React, { Fragment, useState, useContext, useEffect } from "react";
import { Row, Col, Form, Button } from "react-bootstrap";
import "react-datepicker/dist/react-datepicker.css";
import Select from "react-select";
// import './OnBoard.css'
import "./Documents.css";

const Documents = (props) => {
  const [FileName, setFileName] = useState("");
  const [isChecked, changeState] = useState(false);
  const submitHandler = (e) => {
    const nextPage = props.NextStep;
    nextPage();
  };

  const PrevStep = () => {
    console.log("previous");
    const back = props.PrevStep;
    back();
  };

  const handleShifting = () => {
    changeState(!isChecked);
    console.log(!isChecked);
  };

  const onChange = (e) => {
    var files = e.target.files;
    console.log(files[0].name);
    // var filesArr = Array.prototype.slice.call(files);
    // console.log(filesArr);
    setFileName(files[0].name);
  };

  return (
    <Fragment>
      <Row>
        <Col>
          <div className="parent">
            <button
              className="buttonField1 button"
              disabled={!isChecked}
              onClick={handleShifting}
            >
              Personal Documents
            </button>
            <button
              className="buttonField2 button"
              disabled={isChecked}
              onClick={handleShifting}
            >
              Education & Work Documents
            </button>
          </div>
        </Col>
      </Row>
      {!isChecked ? (
        <Form>
          <Row style={{ marginTop: "2rem" }}>
            <Col>
              <Form.Group>
                <div className="FileInput">
                  <label>Photo ID</label>
                </div>
                <div className="parentInput">
                  <input
                    className="fileInputField"
                    placeholder="Choose File"
                    type="text"
                    value={FileName}
                  />
                  <label className="custom-file-upload">
                    <input
                      type="file"
                      className="custom_file_Upload_button"
                      onChange={onChange}
                    />
                    {/* <i className="fa fa-cloud-upload" />  */}
                    Upload File{" "}
                    <i
                      id="custom_file_upload_icon"
                      class="fa fa-upload"
                      aria-hidden="true"
                    ></i>
                  </label>
                </div>
              </Form.Group>
            </Col>
          </Row>
          <Row>
            <Col>
              <Form.Group>
                <div className="FileInput">
                  <label>
                    Aadhaar ID
                    <span style={{ color: "#47ef47", fontStyle: "italic" }}>
                      (Upload the first and last page)
                    </span>
                  </label>
                </div>
                <div className="parentInput">
                  <input
                    className="fileInputField"
                    placeholder="Choose File"
                    type="text"
                    value={FileName}
                  />
                  <label className="custom-file-upload">
                    <input
                      type="file"
                      className="custom_file_Upload_button"
                      onChange={onChange}
                    />
                    {/* <i className="fa fa-cloud-upload" />  */}
                    Upload File{" "}
                    <i
                      id="custom_file_upload_icon"
                      class="fa fa-upload"
                      aria-hidden="true"
                    ></i>
                  </label>
                </div>
              </Form.Group>
            </Col>
          </Row>
          <Row>
            <Col>
              <Form.Group>
                <div className="FileInput">
                  <label>PAN Number</label>
                </div>
                <div className="parentInput">
                  <input
                    className="fileInputField"
                    placeholder="Choose File"
                    type="text"
                    value={FileName}
                  />
                  <label className="custom-file-upload">
                    <input
                      type="file"
                      className="custom_file_Upload_button"
                      onChange={onChange}
                    />
                    {/* <i className="fa fa-cloud-upload" />  */}
                    Upload File{" "}
                    <i
                      id="custom_file_upload_icon"
                      class="fa fa-upload"
                      aria-hidden="true"
                    ></i>
                  </label>
                </div>
              </Form.Group>
            </Col>
          </Row>

          <Row>
            <Col>
              <Form.Group>
                <div className="FileInput">
                  <label>Address Proof</label>
                </div>
                <div className="parentInput">
                  <input
                    className="fileInputField"
                    placeholder="Choose File"
                    type="text"
                    value={FileName}
                  />
                  <label className="custom-file-upload">
                    <input
                      type="file"
                      className="custom_file_Upload_button"
                      onChange={onChange}
                    />
                    {/* <i className="fa fa-cloud-upload" />  */}
                    Upload File{" "}
                    <i
                      id="custom_file_upload_icon"
                      class="fa fa-upload"
                      aria-hidden="true"
                    ></i>
                  </label>
                </div>
              </Form.Group>
            </Col>
          </Row>
          <Row>
            <Col>
              <Form.Group>
                <div className="FileInputWithOutStar">
                  <label>
                    EPF Passbook
                    <span style={{ color: "#47ef47", fontStyle: "italic" }}>
                      (First page of the book)
                    </span>
                  </label>
                </div>
                <div className="parentInput">
                  <input
                    className="fileInputField"
                    placeholder="Choose File"
                    type="text"
                    value={FileName}
                  />
                  <label className="custom-file-upload">
                    <input
                      type="file"
                      className="custom_file_Upload_button"
                      onChange={onChange}
                    />
                    {/* <i className="fa fa-cloud-upload" />  */}
                    Upload File{" "}
                    <i
                      id="custom_file_upload_icon"
                      class="fa fa-upload"
                      aria-hidden="true"
                    ></i>
                  </label>
                </div>
              </Form.Group>
            </Col>
          </Row>
          <Row>
            <Col>
              <Form.Group>
                <div className="FileInputWithOutStar">
                  <label>Cancelled Cheque</label>
                </div>
                <div className="parentInput">
                  <input
                    className="fileInputField"
                    placeholder="Choose File"
                    type="text"
                    value={FileName}
                  />
                  <label className="custom-file-upload">
                    <input
                      type="file"
                      className="custom_file_Upload_button"
                      onChange={onChange}
                    />
                    {/* <i className="fa fa-cloud-upload" />  */}
                    Upload File{" "}
                    <i
                      id="custom_file_upload_icon"
                      class="fa fa-upload"
                      aria-hidden="true"
                    ></i>
                  </label>
                </div>
              </Form.Group>
            </Col>
          </Row>
        </Form>
      ) : (
        <Form>
          <Row style={{ marginTop: "2rem" }}>
            <Col>
              <Form.Group>
                <div className="FileInput">
                  <label>Highest education certification</label>
                </div>
                <div className="parentInput">
                  <input
                    className="fileInputField"
                    placeholder="Choose File"
                    type="text"
                    value={FileName}
                  />
                  <label className="custom-file-upload">
                    <input
                      type="file"
                      className="custom_file_Upload_button"
                      onChange={onChange}
                    />
                    {/* <i className="fa fa-cloud-upload" />  */}
                    Upload File{" "}
                    <i
                      id="custom_file_upload_icon"
                      class="fa fa-upload"
                      aria-hidden="true"
                    ></i>
                  </label>
                </div>
              </Form.Group>
            </Col>
          </Row>
          <Row>
            <Col>
              <Form.Group>
                <div className="FileInput">
                  <label>Relieving Letter</label>
                </div>
                <div className="parentInput">
                  <input
                    className="fileInputField"
                    placeholder="Choose File"
                    type="text"
                    value={FileName}
                  />
                  <label className="custom-file-upload">
                    <input
                      type="file"
                      className="custom_file_Upload_button"
                      onChange={onChange}
                    />
                    {/* <i className="fa fa-cloud-upload" />  */}
                    Upload File{" "}
                    <i
                      id="custom_file_upload_icon"
                      class="fa fa-upload"
                      aria-hidden="true"
                    ></i>
                  </label>
                </div>
              </Form.Group>
            </Col>
          </Row>
          <Row>
            <Col>
              <Form.Group>
                <div className="FileInput">
                  <label>Latest Payslips</label>
                </div>
                <div className="parentInput">
                  <input
                    className="fileInputField"
                    placeholder="Choose File"
                    type="text"
                    value={FileName}
                  />
                  <label className="custom-file-upload">
                    <input
                      type="file"
                      className="custom_file_Upload_button"
                      onChange={onChange}
                    />
                    {/* <i className="fa fa-cloud-upload" />  */}
                    Upload File{" "}
                    <i
                      id="custom_file_upload_icon"
                      class="fa fa-upload"
                      aria-hidden="true"
                    ></i>
                  </label>
                </div>
              </Form.Group>
            </Col>
          </Row>
        </Form>
      )}
      <div style={{ marginTop: "2rem", textAlign: "center" }}>
        <button className="stepperButtons" onClick={PrevStep}>
          Back
        </button>
        <button className="stepperButtons" onClick={submitHandler}>
          Save & Next
        </button>
      </div>
    </Fragment>
  );
};
export default Documents;
