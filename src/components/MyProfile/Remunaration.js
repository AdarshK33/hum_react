import React, {
  Fragment,
  useState,
  useContext,
  useEffect,
  useMemo,
} from "react";
import { Container, Row, Col, Form, Button } from "react-bootstrap";
import DatePicker from "react-datepicker";
import "react-datepicker/dist/react-datepicker.css";
import Select from "react-select";
// import { toast } from "react-toastify";
import { useHistory } from "react-router-dom";
import { Search, PlusCircle, MinusCircle } from "react-feather";
import { ToastContainer, toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import {
  Accordion,
  AccordionItem,
  AccordionItemHeading,
  AccordionItemButton,
  AccordionItemPanel,
} from "react-accessible-accordion";
import "react-accessible-accordion/dist/fancy-example.css";
import { OnBoardContext } from "../../context/OnBoardState";
import Address from "./Address";
import EmergencyContact from "./EmergencyContact";
import BankDetails from "./BankDetails";
import moment from "moment";

const Remuneration = () => {
  return (
    <Fragment>
      <ToastContainer />

      <Row style={{ marginBottom: "2rem" }}>
        <Container fluid className="container-accordion">
          <Accordion preExpanded={["a"]}>
            <AccordionItem uuid="a">
              <AccordionItemHeading>
                <AccordionItemButton>Salary</AccordionItemButton>
              </AccordionItemHeading>
              <AccordionItemPanel>
                <Form>
                  {/* <label>
                    <b>Personal :</b>
                  </label>
                  <Row
                    style={{
                      borderTop: "2px solid #006ebb",
                      width: "98%",
                      marginRight: "1rem",
                      marginBottom: "1rem",
                      marginLeft: "-2px",
                    }}
                  ></Row> */}
                  <Row
                    style={{
                      marginBottom: "2rem",
                    }}
                  >
                    <Col sm={3}>
                      <label>
                        <b>Salary Type</b>
                      </label>
                      <br />
                      <label className="itemResult">IDDDDD</label>
                    </Col>
                    <Col sm={3}>
                      <label>
                        <b>Monthly Fixed Gross</b>
                      </label>
                      <br />
                      <label className="itemResult">IDDDDD</label>
                    </Col>
                    <Col sm={3}>
                      <label>
                        <b>Max Eligible Monthly Bonus % </b>
                      </label>
                      <br />
                      <label className="itemResult">IDDDDD</label>
                    </Col>
                    <Col sm={3}>
                      <label>
                        <b>Any Other Bonus</b>
                      </label>
                      <br />
                      <label className="itemResult">IDDDDD</label>
                    </Col>
                  </Row>
                </Form>
              </AccordionItemPanel>
            </AccordionItem>
          </Accordion>
        </Container>
      </Row>
    </Fragment>
  );
};
export default Remuneration;
