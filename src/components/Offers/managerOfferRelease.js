import React, { Fragment, useState, useContext, useEffect } from "react";
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
import EmployeeForm from "./employeeForm";
import WorkInformation from "./workInformation";
import RemunerationInformation from "./remunerationInformation";
import GenerateOfferLetter from "./generateOfferLetter";
import { OfferContext } from "../../context/OfferState";

const ManagerOfferRelease = () => {
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

  const [isChecked, setIsChecked] = useState(false);
  const checkedHandler = (e) => {
    setIsChecked(true);
  };
  useEffect(() => {
    console.log(createCandidateResponse);
    console.log("manager......offer");
  }, []);
  useEffect(() => {
    if (
      createCandidateResponse !== null &&
      createCandidateResponse !== undefined &&
      createCandidateResponse.candidateId !== undefined
    ) {
      console.log("work info.........");
      workInfoView(createCandidateResponse.candidateId);
    }
  }, [createCandidateResponse]);
  const remunarationClick = (e) => {
    console.log("inside remunarationClick");
    if (
      createCandidateResponse !== null &&
      createCandidateResponse !== undefined &&
      createCandidateResponse.candidateId !== undefined
    ) {
      workInfoView(createCandidateResponse.candidateId);
    }
  };

  // const workInformationClick = (e) => {
  //   console.log("inside workInformationClick");
  //   if (
  //     createCandidateResponse !== null &&
  //     createCandidateResponse != undefined
  //   ) {
  //     viewCandidateId(createCandidateResponse.candidateId);
  //   }
  // };

  return (
    console.log(workInfoViewData),
    (
      <Fragment>
        <Container fluid className="container-accordion">
          <h5 style={{ marginTop: "1rem", fontWeight: "700" }}>
            New Offer Initation
          </h5>

          <Accordion preExpanded={["a"]}>
            <AccordionItem uuid="a">
              <AccordionItemHeading>
                <AccordionItemButton>
                  {/* <input
                  type="checkbox"
                  checked={isChecked}
                  onChange={checkedHandler}
                />
                &nbsp; */}{" "}
                  Step 1: Candidate Information
                </AccordionItemButton>
              </AccordionItemHeading>
              <AccordionItemPanel>
                <EmployeeForm
                  isChecked={isChecked}
                  checkedHandler={checkedHandler}
                />
              </AccordionItemPanel>
            </AccordionItem>
            {/* </Accordion>
        <Accordion preExpanded={["a"]}>
          <AccordionItem uuid="a">
            <AccordionItemHeading>
              <AccordionItemButton>
                Step 1: Employee Information
              </AccordionItemButton>
            </AccordionItemHeading>
            <AccordionItemPanel>
              <EmployeeForm />
            </AccordionItemPanel>
          </AccordionItem> */}

            <AccordionItem>
              <AccordionItemHeading>
                <AccordionItemButton>
                  Step 2: Work Information
                </AccordionItemButton>
              </AccordionItemHeading>
              <AccordionItemPanel>
                <WorkInformation workInfo={workInfoViewData} />
              </AccordionItemPanel>
            </AccordionItem>

            <AccordionItem onClick={remunarationClick}>
              <AccordionItemHeading>
                <AccordionItemButton>
                  Step 3: Remuneration Information
                </AccordionItemButton>
              </AccordionItemHeading>
              <AccordionItemPanel>
                <RemunerationInformation
                  remunarationClick={remunarationClick}
                />
              </AccordionItemPanel>
            </AccordionItem>

            <AccordionItem>
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
        </Container>
      </Fragment>
    )
  );
};

export default ManagerOfferRelease;
