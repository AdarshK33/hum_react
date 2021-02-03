import React, { Fragment } from 'react';
import { Container, Row, Col, Form } from 'react-bootstrap'
import Breadcrumb from '../common/breadcrumb';
import {
    Accordion,
    AccordionItem,
    AccordionItemHeading,
    AccordionItemButton,
    AccordionItemPanel,
} from 'react-accessible-accordion';
import 'react-accessible-accordion/dist/fancy-example.css';
import './offers.css'
import EmployeeForm from './employeeForm'
import WorkInformation from './workInformation'

const ManagerOfferRelease = () => {
    return (
        <Fragment>
            <Container>
                <h5>New Initation</h5>
                    <Accordion preExpanded={['a']}>
                        <AccordionItem uuid="a">
                            <AccordionItemHeading>
                                <AccordionItemButton>
                                    Step 1: Employee Information
                                </AccordionItemButton>
                            </AccordionItemHeading>
                            <AccordionItemPanel>
                                <EmployeeForm />
                            </AccordionItemPanel>
                        </AccordionItem>

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
                            <AccordionItemPanel>
                                
                            </AccordionItemPanel>
                        </AccordionItem>
                    </Accordion>
            </Container>
           
        </Fragment>
    );
};

export default ManagerOfferRelease;