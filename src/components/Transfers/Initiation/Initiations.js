import React, { useState } from "react";
import Breadcrumb from "../../common/breadcrumb";
import { Row, Col, Form, Container } from "react-bootstrap";
import { ToastContainer } from "react-toastify";
import "react-datepicker/dist/react-datepicker.css";
import RegularTransfer from "./RegularTransfer";
import EntityTransfer from "./EntityTransfer";
import InternationalTransfer from "./InternationalTransfer";

const Initiations = () => {
  const [transferType, setTransferType] = useState("");
  const [transferErrMsg, setTransferErrMsg] = useState("");

  const transferTypeHandler = (e) => {
    setTransferType(e.target.value);
    console.log(transferType);
    setTransferErrMsg("");
  };

  return (
    <div className="transfer-initiation">
      <ToastContainer />

      <Breadcrumb title="TRANSFER INITIATION" parent="TRANSFER INITIATION" />
      <div className="container-fluid">
        <div className="row">
          <div className="col-sm-12">
            <div className="card" style={{ borderRadius: "1rem" }}>
              <div className="OnBoardHeading">
                <b className="align-middle">TRANSFER INITIATION </b>
              </div>
              <Container className="ml-4 mt-4">
                <div className="transfer-initiation-form">
                  <Form>
                    <Row style={{ marginBottom: "2rem" }}>
                      <Form.Label column md={2}>
                        Transfer Type
                      </Form.Label>
                      <Col md={8}>
                        <Form.Control
                          as="select"
                          aria-label="chooseTransferType"
                          value={transferType}
                          placeholder="Select Transfer Type"
                          onChange={transferTypeHandler}
                        >
                          <option>Select Transfer Type</option>
                          <option value="Regular Transfer">
                            Regular Transfer
                          </option>
                          <option value="Entity Transfer">
                            Entity Transfer
                          </option>
                          <option value="International Transfer">
                            International Transfer
                          </option>
                          <option value="Employment Type Transfer">
                            Employment Type Transfer
                          </option>
                        </Form.Control>
                        {transferErrMsg !== "" && (
                          <span className="text-danger">{transferErrMsg}</span>
                        )}
                      </Col>
                    </Row>
                    <Row
                    // style={{ marginLeft: "4rem", marginBottom: "2rem" }}
                    >
                      <Col>
                        {transferType === "Regular Transfer" ? (
                          <RegularTransfer />
                        ) : transferType === "Entity Transfer" ? (
                          <EntityTransfer />
                        ) : transferType === "International Transfer" ? (
                          <InternationalTransfer />
                        ) : null}
                      </Col>
                    </Row>
                  </Form>
                </div>
              </Container>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Initiations;
