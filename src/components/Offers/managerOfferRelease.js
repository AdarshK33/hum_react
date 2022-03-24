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
import { BonusContext } from "../../context/BonusState";
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
    setNoticePeriodNull
  } = useContext(OfferContext);
  const { viewBonusByContarctType, getBonusByContractType } =
    useContext(BonusContext);
  const [isChecked, setIsChecked] = useState(false);
  const checkedHandler = (e) => {
    setIsChecked(true);
  };
  useEffect(() => {
    console.log(createCandidateResponse);
    console.log("manager......offer");
    setNoticePeriodNull()
  }, []);
  useEffect(() => {
    if (
      createCandidateResponse !== null &&
      createCandidateResponse !== undefined &&
      Object.keys(createCandidateResponse).length !== 0 &&
      createCandidateResponse.candidateId !== undefined
    ) {
      console.log("work info.........");
      // viewCandidateId(createCandidateResponse.candidateId);

      workInfoView(createCandidateResponse.candidateId);
    }
  }, [createCandidateResponse]);
  const remunarationClick = (e) => {
    console.log("inside remunarationClick");
    if (
      createCandidateResponse !== null &&
      createCandidateResponse !== undefined &&
      Object.keys(createCandidateResponse).length !== 0 &&
      createCandidateResponse.candidateId !== undefined
    ) {
      workInfoView(createCandidateResponse.candidateId);
    }
  };

  const generateOfferClick = (e) => {
    console.log("inside generateOfferClick");
    if (
      candidateData !== null &&
      candidateData !== undefined &&
      candidateData.candidateInformation !== null &&
      candidateData.candidateInformation !== undefined &&
      candidateData.candidateInformation !== "" &&
      candidateData.candidateInformation.candidateId !== null &&
      candidateData.candidateInformation.candidateId !== undefined &&
      candidateData.candidateInformation.candidateId !== "" &&
      candidateData.candidateInformation.candidateId !== 0
    ) {
      console.log("api is calling");
      viewCandidateId(candidateData.candidateInformation.candidateId);
    }
    generatebonusClick(e);
  };

  const generatebonusClick = (e) => {
    console.log("inside bonus click");
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

  // const generatebonusClick = (e) => {
  //   console.log("inside generateOfferClick");
  //   if (
  //     candidateData !== null &&
  //     candidateData !== undefined &&
  //     candidateData.workInformation !== null &&
  //     candidateData.workInformation !== undefined &&
  //     Object.keys(candidateData.workInformation).length !== 0
  //   ) {
  //     viewBonusByContarctType(
  //       candidateData.workInformation.contractType,
  //       candidateData.workInformation.department,
  //       candidateData.workInformation.position
  //     );
  //   }
  // };
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
                <WorkInformation />
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
        </Container>
      </Fragment>
    )
  );
};

export default ManagerOfferRelease;
