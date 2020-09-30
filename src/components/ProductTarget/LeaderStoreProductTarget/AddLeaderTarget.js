import React, { useState, useContext, useEffect } from 'react';
import { Container, Row, Col, Button, Form, Modal } from 'react-bootstrap'

import "react-datepicker/dist/react-datepicker.css";
import { useHistory } from "react-router-dom";
import { ToastContainer, toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";

import { DashboardContext } from "../../../context/DashboardState";
import { StoreProductContext } from "../../../context/StoreProductState";
import moment from 'moment'

const AddLeaderTarget = (props) => {
    let history = useHistory();
   
    const [StoreType, setStoreType] = useState('');
    const [getM, setGetM] = useState();
    const [WeekdaysTarget, setWeekdaysTarget] = useState();
    const [WeekendsTarget, setWeekendsTarget] = useState();
    const [Percentage, setGrowthPercentage] = useState();
    const [TodayDate, setTodayDate] = useState();
    const [month, setMonth] = useState();
    const [Year, setYear] = useState();
    
    const { cosCentreList,viewCostCentre } = useContext(DashboardContext);
    const { StateData,getStateData,addTarget,NewTarget } = useContext(StoreProductContext);

  
    
     useEffect(() => {
        let date = new Date(); 
        var dd = String(date.getDate()).padStart(2, '0');
        var mm = String(date.getMonth() + 1).padStart(2, '0')
        if(dd > 20){
             mm++;
        }
        
        
        var yyyy = date.getFullYear();
        setTodayDate(dd);
        setMonth(mm);
        setYear(yyyy);
        setStoreType('IN1055');
        getStateData('IN1055') ;
        
    }, []);

    const fromStoreHandler = (e) => {
        setStoreType(e);
        getStateData(e) ; 
                 

    }
    const fromWeekdaysHandler = (e) => {
        setWeekdaysTarget(e);
             

    }
    const fromWeekendHandler = (e) => {
        setWeekendsTarget(e);
           

    }
    const fromGrowthHandler = (e) => {
        setGrowthPercentage(e);
       
    }
    var months = new Array();
    months[1] = "Jan";
    months[2] = "Feb";
    months[3] = "Mar";
    months[4] = "Apr";
    months[5] = "May";
    months[6] = "Jun";
    months[7] = "Jul";
    months[8] = "Aug";
    months[9] = "Sep";
    months[10] = "Oct";
    months[11] = "Nov";
    months[12] = "Dec";

    var monthsNumber = new Array();
    monthsNumber["Jan"] = "01";
    monthsNumber["Feb"] = '02';
    monthsNumber["Mar"] = '03';
    monthsNumber["Apr"] = '04';
    monthsNumber["May"] = '05' ;
    monthsNumber["Jun"] = '06' ;
    monthsNumber["Jul"] = '07' ;
    monthsNumber["Aug"] = '08' ;
    monthsNumber["Sep"] = '09' ;
    monthsNumber["Oct"] = '10' ;
    monthsNumber["Nov"] = '11' ;
    monthsNumber["Dec"] = '12' ;
    const onSubmit = e => {
        e.preventDefault();
        const month = moment(getM, ["YYYY-MM"]).format("M");
        var MonthData = months[month];
        const year = moment(getM, ["MMM Do YY"]).format('YYYY');
        const validate = validation();
        const Values = {
            costCenter: StoreType,
            growth: Percentage,
            month: MonthData,
            monthName: "",
            stateName: "",
            targetId: 0,
            weekday: WeekdaysTarget,
            weekend: WeekendsTarget,
            year: year
           }
        if(validate){
            addTarget(Values);
        }
      
        const setModal = props.handleClose;
        setModal();
        setStoreType("");
        setGetM();
        setWeekdaysTarget('');
        setWeekendsTarget('');
        setGrowthPercentage('');
        StateData.stateName = ""
        
      }
      const validation = () => {
        let flag = true
        if (StoreType === '') {
            toast.info("Select StoreType Type")
            flag = false;
            return;
        }

        if (WeekdaysTarget === '') {
            toast.info("WeekdaysTarget is mandatory")
            flag = false;
            return;
        }
        if (Percentage === '') {
            toast.info("Growth Percentage is mandatory")
            flag = false;
            return;
        }
        if (WeekendsTarget === '') {
            toast.info("WeekendsTarget is mandatory")
            flag = false;
            return;
        }
        return flag;
    }
      
      const onCloseModal = () => {
        const setModal = props.handleClose;
        setModal();
        setGetM();
        setWeekdaysTarget('');
        setWeekendsTarget('');
        setGrowthPercentage('');
        
        }
   
   
   
    return (
        <React.Fragment>
            <ToastContainer />
            <Modal show={props.modal} onHide={props.handleClose} centered>
                <Container style={{ paddingBottom: '1rem' }}>
                    <Modal.Header >
                        <Modal.Title >
                            <h4>Store Product Target</h4>
                        </Modal.Title>
                        <button type="button" className="close" data-dismiss="modal" aria-label="Close" 
                        onClick={onCloseModal}
                        >
                            <span aria-hidden="true">&times;</span>
                        </button>
                    </Modal.Header>
                    <Modal.Body>
                        <Form onSubmit={onSubmit}>
                            <Row>
                                <div className="col-sm-12">
                                    <Form.Group>
                                        <Form.Label>Store : </Form.Label>
                                        <Form.Control as="input" required value = "IN1055" readOnly />
                                    </Form.Group>
                                </div>
                            </Row>
                           
                            <Row>
                                <div className="col-sm-12">
                                    <Form.Group>
                                        <Form.Label>State :</Form.Label>
                                        <Form.Control as="input" readOnly required value = {StateData.stateName}/>                                           
                                    </Form.Group>
                                </div>
                            </Row>
                            <Row>
                                <div className="col-sm-12">
                                    <Form.Group>
                                        <Form.Label>Select Month and Year :</Form.Label>
                                        
                                        <Form.Control type="month" className="digit" min={Year + "-" + month}
                                            onChange={(e) => setGetM(e.target.value)} required
                                            >
                                        </Form.Control> 
                                       
                                    </Form.Group>
                                </div>
                            </Row>
                            
                            <Row>
                                <Col>
                               
                                    <Form.Group>
                                        <Form.Label>Product Target for Weekdays :</Form.Label>
                                        <Form.Control size="lg" type="text" required
                                            onChange={(e) => fromWeekdaysHandler(e.target.value)}
                                            >
                                            
                                        </Form.Control>
                                    </Form.Group>
                               
                                </Col>
                                <Col>
                           
                                    <Form.Group>
                                        <Form.Label>Product Target for Weekends :</Form.Label>
                                        <Form.Control size="lg" type="text" required
                                            onChange={(e) => fromWeekendHandler(e.target.value)}
                                            >
                                            
                                        </Form.Control>
                                    </Form.Group>
                               
                                </Col>
                            </Row>
                            <Row>
                                <div className="col-sm-12">
                                    <Form.Group>
                                        <Form.Label>Growth Percentage :</Form.Label>
                                        <Form.Control size="lg" type="text" required
                                            onChange={(e) => fromGrowthHandler(e.target.value)}
                                            >
                                           
                                        </Form.Control>
                                    </Form.Group>
                                </div>
                            </Row>
                            
                           

                           

                            <Button type="submit" >Submit</Button>
                        </Form>

                    </Modal.Body>
                </Container>
            </Modal>

        </React.Fragment>
    );
};

export default AddLeaderTarget;