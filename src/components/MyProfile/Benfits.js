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
import HolidayWorkingBonus from "./HolidayWorkingBonus";
import { AppContext } from "../../context/AppState";
import { PermissionContext } from "../../context/PermissionState";

import moment from "moment";

const Benfits = () => {
  const { rolePermission } = useContext(PermissionContext);
  const { user } = useContext(AppContext);
  const [activeStep, setActiveStep] = useState(false);
  useEffect(() => {
    if (
      user !== null &&
      user !== undefined &&
      Object.keys(user).length !== 0 &&
      rolePermission !== "" &&
      rolePermission !== null &&
      rolePermission !== undefined &&
      (rolePermission === "costCenterManager" ||
        rolePermission === "superCostCenterManager" ||
        rolePermission === "admin")
    ) {
      if (user.department.toLowerCase() === "retail") {
        setActiveStep(false);
      } else {
        setActiveStep(true);
      }
    }
  }, [user]);
  return (
    <Fragment>
      <label>
        <b>Benefits :</b>
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
                <AccordionItemButton
                  style={activeStep ? {} : { background: "#aaa" }}
                >
                  Holiday Working Bonus
                </AccordionItemButton>
              </AccordionItemHeading>
              <AccordionItemPanel>
                {activeStep ? <HolidayWorkingBonus /> : ""}
              </AccordionItemPanel>
            </AccordionItem>
          </Accordion>
        </Container>
      </Row>
    </Fragment>
  );
};
export default Benfits;
