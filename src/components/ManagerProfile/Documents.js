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
import EducationAndWorkDoc from "./EducationAndWorkDoc";
import PersonalDoc from "./PersonalDoc";
import OtherDocuments from "./OtherDocuments";
import { EmployeeProfileContext } from "../../context/EmployeeProfileState";
import { PermissionContext } from "../../context/PermissionState";

import moment from "moment";

const Documents = () => {
  const { rolePermission } = useContext(PermissionContext);
  const { DocumentView, documentsList, currentEmpId } = useContext(
    EmployeeProfileContext
  );
  useEffect(() => {
    DocumentView(currentEmpId);
  }, []);

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
            {rolePermission === "admin" ? (
              <AccordionItem uuid="a">
                <AccordionItemHeading>
                  <AccordionItemButton>Personal</AccordionItemButton>
                </AccordionItemHeading>
                <AccordionItemPanel>
                  <PersonalDoc />
                </AccordionItemPanel>
              </AccordionItem>
            ) : (
              ""
            )}
            {rolePermission === "admin" ? (
              <AccordionItem>
                <AccordionItemHeading>
                  <AccordionItemButton>Education and Work</AccordionItemButton>
                </AccordionItemHeading>
                <AccordionItemPanel>
                  <EducationAndWorkDoc />
                </AccordionItemPanel>
              </AccordionItem>
            ) : (
              ""
            )}

            <AccordionItem uuid={rolePermission !== "admin" ? "a" : ""}>
              <AccordionItemHeading>
                <AccordionItemButton>Other Documents</AccordionItemButton>
              </AccordionItemHeading>
              <AccordionItemPanel>
                <OtherDocuments />
              </AccordionItemPanel>
            </AccordionItem>
          </Accordion>
        </Container>
      </Row>
    </Fragment>
  );
};
export default Documents;
