import React, { Fragment, useState, useContext } from "react";
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
import EditEmployeeForm from "./editEmployeeForm";
import EditWorkInformation from "./editWorkInformation";
import EditRemunerationInformation from "./editremunerationInformation";
import GenerateOfferLetter from "./generateOfferLetter";
import { OfferContext } from "../../context/OfferState";
import { BonusContext } from "../../context/BonusState";
const EditOfferRelease = () => {
  const {
    remunerationSave,
    candidateData,
    createCandidateResponse,
    viewCandidateId,
    remunerationView,
    remunerationViewData,
    workInformationData,
    workInfoViewData,
    workInfoView,
    remunerationData,
  } = useContext(OfferContext);
  const { viewBonusByContarctType, getBonusByContractType } =
    useContext(BonusContext);
  const remunarationClick = (e) => {
    console.log("inside remunarationClick");
    if (candidateData !== null && candidateData != undefined) {
      workInfoView(candidateData.candidateInformation.candidateId);
      remunerationView(candidateData.candidateInformation.candidateId);
    }
  };
  const generateOfferClick = (e) => {
    console.log("inside generateOfferClick");
    if (
      candidateData !== null &&
      candidateData !== undefined &&
      candidateData.candidateInformation !== null &&
      candidateData.candidateInformation !== undefined &&
      Object.keys(candidateData.candidateInformation).length !== 0
    ) {
      viewCandidateId(candidateData.candidateInformation.candidateId);
    }
    generatebonusClick(e);
  };

  const generatebonusClick = (e) => {
    console.log("inside generateOfferClick");
    if (
      candidateData !== null &&
      candidateData !== undefined &&
      candidateData.workInformation !== null &&
      candidateData.workInformation !== undefined &&
      Object.keys(candidateData.workInformation).length !== 0
    ) {
      viewBonusByContarctType(
        candidateData.workInformation.contractType,
        candidateData.workInformation.department,
        candidateData.workInformation.position
      );
    }
  };
  // const workInformationClick = (e) => {
  //   console.log("inside remunarationClick");
  //   if (
  //     candidateData !== null &&
  //     candidateData != undefined &&
  //     candidateData.candidateInformation !== null &&
  //     candidateData.candidateInformation !== undefined
  //   ) {
  //     viewCandidateId(candidateData.candidateInformation.candidateId);
  //   }
  // };

  return (
    <Fragment>
      <Container fluid className="container-accordion">
        <h5 style={{ marginTop: "1rem", fontWeight: "700" }}>
          Edit Offer Initation
        </h5>

        <Accordion preExpanded={["a"]}>
          <AccordionItem uuid="a">
            <AccordionItemHeading>
              <AccordionItemButton>
                Step 1: Candidate Information
              </AccordionItemButton>
            </AccordionItemHeading>
            <AccordionItemPanel>
              <EditEmployeeForm />
            </AccordionItemPanel>
          </AccordionItem>

          <AccordionItem>
            <AccordionItemHeading>
              <AccordionItemButton>
                Step 2: Work Information
              </AccordionItemButton>
            </AccordionItemHeading>
            <AccordionItemPanel>
              <EditWorkInformation />
            </AccordionItemPanel>
          </AccordionItem>

          <AccordionItem onClick={remunarationClick}>
            <AccordionItemHeading>
              <AccordionItemButton>
                Step 3: Remuneration Information
              </AccordionItemButton>
            </AccordionItemHeading>
            <AccordionItemPanel>
              <EditRemunerationInformation
                remunarationClick={remunarationClick}
              />
            </AccordionItemPanel>
          </AccordionItem>

          <AccordionItem onClick={generateOfferClick}>
            <AccordionItemHeading>
              <AccordionItemButton>
                Step 4: Generate Offer Letter
              </AccordionItemButton>
            </AccordionItemHeading>
            <AccordionItemPanel>
              <GenerateOfferLetter />
            </AccordionItemPanel>
          </AccordionItem>
        </Accordion>
        {/* </Accordion> */}
      </Container>
    </Fragment>
  );
};

export default EditOfferRelease;
