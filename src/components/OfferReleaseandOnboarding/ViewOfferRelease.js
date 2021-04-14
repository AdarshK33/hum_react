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
import "../Offers/offers.css";
import ViewEmployeeForm from "./viewEmployeeForm";
import ViewWorkInformation from "./viewWorkInformationForm";
import ViewRemunerationInformation from "./viewRemunerationInformation";
import CandidateOfferLetter from "./candidateOfferLetter";
import VerifyCandidateDocs from "./verifyCandidateDocs";
import CandidateOnboarding from "./candidateOnboarding";
const ViewOfferRelease = () => {
  return (
    <Fragment>
      <Container fluid className="container-accordion">
        <div className="mb-5">
          <div className="OnBoardHeading">
            <b>ONBOARDING </b>
          </div>
        </div>
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
                Step 2: Candidate Work Information
              </AccordionItemButton>
            </AccordionItemHeading>
            <AccordionItemPanel>
              <ViewWorkInformation />
            </AccordionItemPanel>
          </AccordionItem>

          <AccordionItem>
            <AccordionItemHeading>
              <AccordionItemButton>
                Step 3:Candidate Remuneration Information
              </AccordionItemButton>
            </AccordionItemHeading>
            <AccordionItemPanel>
              <ViewRemunerationInformation />
            </AccordionItemPanel>
          </AccordionItem>

          <AccordionItem>
            <AccordionItemHeading>
              <AccordionItemButton>
                Step 4: Generate Candidate Offer Letter
              </AccordionItemButton>
            </AccordionItemHeading>
            <AccordionItemPanel>
              <CandidateOfferLetter />
            </AccordionItemPanel>
          </AccordionItem>

          <AccordionItem>
            <AccordionItemHeading>
              <AccordionItemButton>
                Step 5: Verify Candidate Documents
              </AccordionItemButton>
            </AccordionItemHeading>
            <AccordionItemPanel>
              <VerifyCandidateDocs />
            </AccordionItemPanel>
          </AccordionItem>
          <AccordionItem>
            <AccordionItemHeading>
              <AccordionItemButton>
                Step 6: Candidate Onboarding
              </AccordionItemButton>
            </AccordionItemHeading>
            <AccordionItemPanel>
              <CandidateOnboarding />
            </AccordionItemPanel>
          </AccordionItem>
        </Accordion>
        {/* </Accordion> */}
      </Container>
    </Fragment>
  );
};

export default ViewOfferRelease;
