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
import EmployeeForm from "./employeeForm";
import WorkInformation from "./workInformation";

const ManagerOfferRelease = () => {
  const [isChecked, setIsChecked] = useState(false);
  const checkedHandler = (e) => {
    setIsChecked(true);
  };
  return (
    <Fragment>
      <Container fluid className='container-accordion'>
        <h5 style={{ marginTop: "1rem", fontWeight: "700" }}>
          New Offer Initation
        </h5>

        <Accordion preExpanded={["a"]}>
          <AccordionItem uuid="a">
            <AccordionItemHeading>
              <AccordionItemButton>
                <input
                  type="checkbox"
                  checked={isChecked}
                  onChange={checkedHandler}
                />
                &nbsp; Step 1: Candidate Information
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

          <AccordionItem>
            <AccordionItemHeading>
              <AccordionItemButton>
                Step 3: Remuneration Information
              </AccordionItemButton>
            </AccordionItemHeading>
            <AccordionItemPanel></AccordionItemPanel>
          </AccordionItem>
        </Accordion>
      </Container>
    </Fragment>
  );
};

export default ManagerOfferRelease;
