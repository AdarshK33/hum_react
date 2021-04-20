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
                <i
                  style={{
                    color: "green",
                    backgroundColor: "white",
                    borderRadius: "50%",
                    fontSize: "19px",
                  }}
                  className="fa fa-check-circle"
                  aria-hidden="true"
                ></i>
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
                <i
                  style={{
                    color: "green",
                    backgroundColor: "white",
                    borderRadius: "50%",
                    fontSize: "19px",
                  }}
                  className="fa fa-check-circle"
                  aria-hidden="true"
                ></i>
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
                <i
                  style={{
                    color: "green",
                    backgroundColor: "white",
                    borderRadius: "50%",
                    fontSize: "19px",
                  }}
                  className="fa fa-check-circle"
                  aria-hidden="true"
                ></i>
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
                <i
                  style={{
                    color: "green",
                    backgroundColor: "white",
                    borderRadius: "50%",
                    fontSize: "19px",
                  }}
                  className="fa fa-check-circle"
                  aria-hidden="true"
                ></i>
                Step 4: Generate Candidate Offer Letter
              </AccordionItemButton>
            </AccordionItemHeading>
            <AccordionItemPanel>
              <CandidateOfferLetter />
            </AccordionItemPanel>
          </AccordionItem>

          <AccordionItem>
            <AccordionItemHeading>
              <AccordionItemButton style={{ background: "#aaa" }}>
                Step 5: Verify Candidate Documents
              </AccordionItemButton>
            </AccordionItemHeading>
            <AccordionItemPanel>
              <VerifyCandidateDocs />
            </AccordionItemPanel>
          </AccordionItem>
          <AccordionItem>
            <AccordionItemHeading>
              <AccordionItemButton style={{ background: "#aaa" }}>
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
