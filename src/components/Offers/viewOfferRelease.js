import React, { Fragment, useState } from "react";
import { Container, Row, Col, Form } from "react-bootstrap";
import Breadcrumb from "../common/breadcrumb";
import {
  Accordion,
  AccordionItem,
  AccordionItemHeading,
  AccordionItemButton,
  AccordionItemPanel,
} from "react-accessible-accordion";
import "react-accessible-accordion/dist/fancy-example.css";
import "./offers.css";
import ViewEmployeeForm from "./viewEmployeeForm";
import ViewWorkInformation from "./viewWorkInformation";
import ViewRemunerationInformation from "./viewRemunerationInformation";
import ViewOfferLetter from "./viewOfferLetter";

const ViewOfferRelease = () => {
  return (
    <Fragment>
      <Container fluid className="container-accordion">
        <h5 style={{ marginTop: "1rem", fontWeight: "700" }}>
          View Offer Letter
        </h5>

        <Accordion preExpanded={["a"]}>
          <AccordionItem uuid="a">
            <AccordionItemHeading>
              <AccordionItemButton>
                Step 1: Candidate Information
              </AccordionItemButton>
            </AccordionItemHeading>
            <AccordionItemPanel>
              <ViewEmployeeForm />
            </AccordionItemPanel>
          </AccordionItem>

          <AccordionItem>
            <AccordionItemHeading>
              <AccordionItemButton>
                Step 2: Work Information
              </AccordionItemButton>
            </AccordionItemHeading>
            <AccordionItemPanel>
              <ViewWorkInformation />
            </AccordionItemPanel>
          </AccordionItem>

          <AccordionItem>
            <AccordionItemHeading>
              <AccordionItemButton>
                Step 3: Remuneration Information
              </AccordionItemButton>
            </AccordionItemHeading>
            <AccordionItemPanel>
              <ViewRemunerationInformation />
            </AccordionItemPanel>
          </AccordionItem>

          <AccordionItem>
            <AccordionItemHeading>
              <AccordionItemButton>Step 4: Offer Letter</AccordionItemButton>
            </AccordionItemHeading>
            <AccordionItemPanel>
              <ViewOfferLetter />
            </AccordionItemPanel>
          </AccordionItem>
        </Accordion>
        {/* </Accordion> */}
      </Container>
    </Fragment>
  );
};

export default ViewOfferRelease;
