import React, { Fragment, useState, useContext, useEffect } from "react";
import { Container, Row, Col, Form, Button } from "react-bootstrap";
import "react-toastify/dist/ReactToastify.css";

import { OnBoardContext } from "../../context/OnBoardState";
import { AppContext } from "../../context/AppState";

const PersonalDoc = (props) => {
  const { user } = useContext(AppContext);

  return (
    <Fragment>
      <Form>
        <Row>
          <Col sm={3}>
            <label>
              <b>Photograph :</b>
            </label>
            <br />
            <label className="itemResult">fileeeeeee.jpg</label>
          </Col>
          <Col sm={2}>
            <div
              style={{
                marginTop: "1rem",
                marginBottom: "1rem",
                textAlign: "right",
              }}
            >
              {/* onClick={submitHandler} */}
              <button className="stepperButtons">View</button>
            </div>
          </Col>
          <Col sm={2}>
            <div
              style={{
                marginTop: "1rem",
                marginBottom: "1rem",
                textAlign: "right",
              }}
            >
              <button className="stepperButtons">Download</button>
            </div>
          </Col>
          <Col sm={5} style={{ marginTop: "0.5rem" }}>
            <Form.Group>
              <div className="parentInput">
                <label className="fileInputField">
                  &nbsp;&nbsp;
                  {/* {stateOfName.photoId !== ""
                      ? stateOfName.photoId
                      : "Select File Here"} */}
                  <input
                    type="file"
                    accept="image/*,.pdf"
                    name="photoId"
                    style={{ display: "none" }}
                    //   onChange={(e) => {
                    //     changeHandler(e);
                    //   }}

                    readOnly
                  />
                </label>

                <label className="custom-file-upload">
                  <input
                    type="button"
                    className="custom_file_Upload_button"
                    name="photoId"

                    //   onClick={(e) => {
                    //     handleUpload(e);
                    //   }}
                  />
                  Upload File{" "}
                  <i
                    id="custom_file_upload_icon"
                    className="fa fa-upload"
                    aria-hidden="true"
                  ></i>
                </label>
              </div>
              {/* {photoIdError ? (
                  <p style={{ color: "red" }}>
                    {" "}
                    &nbsp;&nbsp;&nbsp;&nbsp;*Please select & upload the photo id
                  </p>
                ) : (
                  <p></p>
                )} */}
            </Form.Group>
          </Col>
        </Row>
        <Row>
          <Col sm={3}>
            <label>
              <b>Cancelled Cheque :</b>
            </label>
            <br />
            <label className="itemResult">fileeeeeee.jpg</label>
          </Col>
          <Col sm={2}>
            <div
              style={{
                marginTop: "1rem",
                marginBottom: "1rem",
                textAlign: "right",
              }}
            >
              {/* onClick={submitHandler} */}
              <button className="stepperButtons">View</button>
            </div>
          </Col>
          <Col sm={2}>
            <div
              style={{
                marginTop: "1rem",
                marginBottom: "1rem",
                textAlign: "right",
              }}
            >
              <button className="stepperButtons">Download</button>
            </div>
          </Col>
          <Col sm={5} style={{ marginTop: "0.5rem" }}>
            <Form.Group>
              <div className="parentInput">
                <label className="fileInputField">
                  &nbsp;&nbsp;
                  {/* {stateOfName.cancelledCheque !== ""
                      ? stateOfName.cancelledCheque
                      : "Select File Here"} */}
                  <input
                    type="file"
                    accept="image/*,.pdf"
                    name="cancelledCheque"
                    style={{ display: "none" }}
                    //   onChange={(e) => {
                    //     changeHandler(e);
                    //   }}
                    readOnly
                  />
                </label>

                <label className="custom-file-upload">
                  <input
                    type="button"
                    name="cancelledCheque"
                    className="custom_file_Upload_button"
                    //   onClick={(e) => {
                    //     handleUpload(e);
                    //   }}
                  />
                  {/* <i className="fa fa-cloud-upload" />  */}
                  Upload File{" "}
                  <i
                    id="custom_file_upload_icon"
                    className="fa fa-upload"
                    aria-hidden="true"
                  ></i>
                </label>
              </div>

              {/* {cancelledChequeError ? (
                  <p style={{ color: "red" }}>
                    {" "}
                    &nbsp;&nbsp;&nbsp;&nbsp;*Please select & upload the
                    cancelled cheque
                  </p>
                ) : (
                  <p></p>
                )} */}
            </Form.Group>
          </Col>
        </Row>
        <Row>
          <Col sm={3}>
            <label>
              <b>PAN :</b>
            </label>
            <br />
            <label className="itemResult">fileeeeeee.jpg</label>
          </Col>
          <Col sm={2}>
            <div
              style={{
                marginTop: "1rem",
                marginBottom: "1rem",
                textAlign: "right",
              }}
            >
              {/* onClick={submitHandler} */}
              <button className="stepperButtons">View</button>
            </div>
          </Col>
          <Col sm={2}>
            <div
              style={{
                marginTop: "1rem",
                marginBottom: "1rem",
                textAlign: "right",
              }}
            >
              <button className="stepperButtons">Download</button>
            </div>
          </Col>
          <Col sm={5} style={{ marginTop: "0.5rem" }}>
            <Form.Group>
              <div className="parentInput">
                <label className="fileInputField">
                  &nbsp;&nbsp;
                  {/* {stateOfName.panId !== ""
                      ? stateOfName.panId
                      : "Select File Here"} */}
                  <input
                    type="file"
                    accept="image/*,.pdf"
                    name="panId"
                    style={{ display: "none" }}
                    //   onChange={(e) => {
                    //     changeHandler(e);
                    //   }}

                    readOnly
                  />
                </label>

                <label className="custom-file-upload">
                  <input
                    type="button"
                    name="panId"
                    className="custom_file_Upload_button"
                    //   onClick={(e) => {
                    //     handleUpload(e);
                    //   }}
                  />
                  {/* <i className="fa fa-cloud-upload" />  */}
                  Upload File{" "}
                  <i
                    id="custom_file_upload_icon"
                    className="fa fa-upload"
                    aria-hidden="true"
                  ></i>
                </label>
              </div>
              {/* {panIdError ? (
                  <p style={{ color: "red" }}>
                    {" "}
                    &nbsp;&nbsp;&nbsp;&nbsp;*Please select & upload the PAN id
                  </p>
                ) : (
                  <p></p>
                )} */}
            </Form.Group>
          </Col>
        </Row>
        <Row>
          <Col sm={3}>
            <label>
              <b>Address Proof :</b>
            </label>
            <br />
            <label className="itemResult">fileeeeeee.jpg</label>
          </Col>
          <Col sm={2}>
            <div
              style={{
                marginTop: "1rem",
                marginBottom: "1rem",
                textAlign: "right",
              }}
            >
              {/* onClick={submitHandler} */}
              <button className="stepperButtons">View</button>
            </div>
          </Col>
          <Col sm={2}>
            <div
              style={{
                marginTop: "1rem",
                marginBottom: "1rem",
                textAlign: "right",
              }}
            >
              <button className="stepperButtons">Download</button>
            </div>
          </Col>
          <Col sm={5} style={{ marginTop: "0.5rem" }}>
            <Form.Group>
              <div className="parentInput">
                <label className="fileInputField">
                  &nbsp;&nbsp;
                  {/* {stateOfName.addressProof !== ""
                      ? stateOfName.addressProof
                      : "Select File Here"} */}
                  <input
                    type="file"
                    accept="image/*,.pdf"
                    name="addressProof"
                    style={{ display: "none" }}
                    //   onChange={(e) => {
                    //     changeHandler(e);
                    //   }}
                    readOnly
                  />
                </label>

                <label className="custom-file-upload">
                  <input
                    type="button"
                    name="addressProof"
                    className="custom_file_Upload_button"
                    //   onClick={(e) => {
                    //     handleUpload(e);
                    //   }}
                  />
                  {/* <i className="fa fa-cloud-upload" />  */}
                  Upload File{" "}
                  <i
                    id="custom_file_upload_icon"
                    className="fa fa-upload"
                    aria-hidden="true"
                  ></i>
                </label>
              </div>
              {/* {addressProofError ? (
                  <p style={{ color: "red" }}>
                    {" "}
                    &nbsp;&nbsp;&nbsp;&nbsp;*Please select & upload the address
                    Proof
                  </p>
                ) : (
                  <p></p>
                )} */}
            </Form.Group>
          </Col>
        </Row>
        <Row>
          <Col sm={3}>
            <label>
              <b>Passport :</b>
            </label>
            <br />
            <label className="itemResult">fileeeeeee.jpg</label>
          </Col>
          <Col sm={2}>
            <div
              style={{
                marginTop: "1rem",
                marginBottom: "1rem",
                textAlign: "right",
              }}
            >
              {/* onClick={submitHandler} */}
              <button className="stepperButtons">View</button>
            </div>
          </Col>
          <Col sm={2}>
            <div
              style={{
                marginTop: "1rem",
                marginBottom: "1rem",
                textAlign: "right",
              }}
            >
              <button className="stepperButtons">Download</button>
            </div>
          </Col>
          <Col sm={5} style={{ marginTop: "0.5rem" }}>
            <Form.Group>
              <div className="parentInput">
                <label className="fileInputField">
                  &nbsp;&nbsp;
                  {/* {stateOfName.passport !== ""
                      ? stateOfName.passport
                      : "Select File Here"} */}
                  <input
                    type="file"
                    accept="image/*,.pdf"
                    name="passport"
                    style={{ display: "none" }}
                    //   onChange={(e) => {
                    //     changeHandler(e);
                    //   }}
                    readOnly
                  />
                </label>

                <label className="custom-file-upload">
                  <input
                    type="button"
                    name="passport"
                    className="custom_file_Upload_button"
                    //   onClick={(e) => {
                    //     handleUpload(e);
                    //   }}
                  />
                  {/* <i className="fa fa-cloud-upload" />  */}
                  Upload File{" "}
                  <i
                    id="custom_file_upload_icon"
                    className="fa fa-upload"
                    aria-hidden="true"
                  ></i>
                </label>
              </div>
              {/* {passportError ? (
                  <p style={{ color: "red" }}>
                    {" "}
                    &nbsp;&nbsp;&nbsp;&nbsp;*Please select & upload the passport
                  </p>
                ) : (
                  <p></p>
                )} */}
            </Form.Group>
          </Col>
        </Row>
        <Row>
          <Col sm={3}>
            <label>
              <b>Adhar Card :</b>
            </label>
            <br />
            <label className="itemResult">fileeeeeee.jpg</label>
          </Col>
          <Col sm={2}>
            <div
              style={{
                marginTop: "1rem",
                marginBottom: "1rem",
                textAlign: "right",
              }}
            >
              {/* onClick={submitHandler} */}
              <button className="stepperButtons">View</button>
            </div>
          </Col>
          <Col sm={2}>
            <div
              style={{
                marginTop: "1rem",
                marginBottom: "1rem",
                textAlign: "right",
              }}
            >
              <button className="stepperButtons">Download</button>
            </div>
          </Col>
          <Col sm={5} style={{ marginTop: "0.5rem" }}>
            <Form.Group>
              <div className="parentInput">
                <label className="fileInputField">
                  &nbsp;&nbsp;
                  {/* {stateOfName.aadharId !== ""
                      ? stateOfName.aadharId
                      : "Select File Here"} */}
                  <input
                    type="file"
                    accept="image/*,.pdf"
                    name="aadharId"
                    style={{ display: "none" }}
                    //   onChange={(e) => {
                    //     changeHandler(e);
                    //   }}
                    readOnly
                  />
                </label>

                <label className="custom-file-upload">
                  <input
                    type="button"
                    name="aadharId"
                    className="custom_file_Upload_button"

                    //   onClick={(e) => {
                    //     handleUpload(e);
                    //   }}
                  />
                  {/* <i className="fa fa-cloud-upload" />  */}
                  Upload File{" "}
                  <i
                    id="custom_file_upload_icon"
                    className="fa fa-upload"
                    aria-hidden="true"
                  ></i>
                </label>
              </div>
              {/* {aadharIdError ? (
                  <p style={{ color: "red" }}>
                    {" "}
                    &nbsp;&nbsp;&nbsp;&nbsp;*Please select & upload the aadhaar
                    id
                  </p>
                ) : (
                  <p></p>
                )} */}
            </Form.Group>
          </Col>
        </Row>
        <Row>
          <Col sm={3}>
            <label>
              <b>EPF Passbook (first page):</b>
            </label>
            <br />
            <label className="itemResult">fileeeeeee.jpg</label>
          </Col>
          <Col sm={2}>
            <div
              style={{
                marginTop: "1rem",
                marginBottom: "1rem",
                textAlign: "right",
              }}
            >
              {/* onClick={submitHandler} */}
              <button className="stepperButtons">View</button>
            </div>
          </Col>
          <Col sm={2}>
            <div
              style={{
                marginTop: "1rem",
                marginBottom: "1rem",
                textAlign: "right",
              }}
            >
              <button className="stepperButtons">Download</button>
            </div>
          </Col>
          <Col sm={5} style={{ marginTop: "0.5rem" }}>
            <Form.Group>
              <div className="parentInput">
                <label className="fileInputField">
                  &nbsp;&nbsp;
                  {/* {stateOfName.epfPassBook !== ""
                      ? stateOfName.epfPassBook
                      : "Select File Here"} */}
                  <input
                    type="file"
                    accept="image/*,.pdf"
                    name="epfPassBook"
                    style={{ display: "none" }}
                    //   onChange={(e) => {
                    //     changeHandler(e);
                    //   }}
                    readOnly
                  />
                </label>

                <label className="custom-file-upload">
                  <input
                    type="button"
                    name="epfPassBook"
                    className="custom_file_Upload_button"
                    //   onClick={(e) => {
                    //     handleUpload(e);
                    //   }}
                  />
                  Upload File{" "}
                  <i
                    id="custom_file_upload_icon"
                    className="fa fa-upload"
                    aria-hidden="true"
                  ></i>
                </label>
              </div>
              {/* {EPFError ? (
                  <p style={{ color: "red" }}>
                    {" "}
                    &nbsp;&nbsp;&nbsp;&nbsp;*Please select & upload the EPF Pass
                    book
                  </p>
                ) : (
                  <p></p>
                )} */}
            </Form.Group>
          </Col>
        </Row>
      </Form>
    </Fragment>
  );
};
export default PersonalDoc;
