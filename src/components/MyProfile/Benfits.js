import React, {
  Fragment,
  useState,
  useContext,
  useEffect,
  useMemo,
} from "react";
import { Container, Row, Col, Form, Button } from "react-bootstrap";

import "react-datepicker/dist/react-datepicker.css";
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
import Insurance from "./Insurance";
import PersonalDoc from "./PersonalDoc";

import moment from "moment";

const Benfits = () => {
  return (
    <Fragment>
      <label>
        <b>Documents :</b>
      </label>
      <Row
        style={{
          borderTop: "2px solid #006ebb",
          width: "98%",
          marginRight: "1rem",
          marginBottom: "1rem",
          marginLeft: "-2px",
        }}
      ></Row>
      <Row style={{ marginBottom: "2rem" }}>
        <Container fluid className="container-accordion">
          <Accordion preExpanded={["a"]}>
            <AccordionItem uuid="a">
              <AccordionItemHeading>
                <AccordionItemButton>Insurance</AccordionItemButton>
              </AccordionItemHeading>
              <AccordionItemPanel>
                <Insurance />
              </AccordionItemPanel>
            </AccordionItem>

            <AccordionItem>
              <AccordionItemHeading>
                <AccordionItemButton>Holiday Working Bonus</AccordionItemButton>
              </AccordionItemHeading>
              <AccordionItemPanel>
                <h1>Holiday Working Bonus</h1>
              </AccordionItemPanel>
            </AccordionItem>
          </Accordion>
        </Container>
      </Row>
    </Fragment>
  );
};
export default Benfits;
