import React, { useState, useContext, useEffect } from 'react';
import { Container, Row, Col, Button, Form, Modal } from 'react-bootstrap'
// import { useHistory } from "react-router-dom";
import DatePicker from 'react-datepicker'
import "react-datepicker/dist/react-datepicker.css";
import { useHistory } from "react-router-dom";
import { ToastContainer, toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";

import { DashboardContext } from "../../../context/DashboardState";
import { StoreProductContext } from "../../../context/StoreProductState";
import moment from 'moment'

const AddTarget = (props) => {
    let history = useHistory();
    // const [startDate, setStartDate] = useState();
    const [StoreType, setStoreType] = useState('');
    const [getM, setGetM] = useState();
    const [WeekdaysTarget, setWeekdaysTarget] = useState();
    const [WeekendsTarget, setWeekendsTarget] = useState();
    const [Percentage, setGrowthPercentage] = useState();
    // const [State, SetStateDate] = useState();
   
    
    // let history = useHistory();
    const { cosCentreList,viewCostCentre } = useContext(DashboardContext);
    const { StateData,getStateData,addTarget,NewTarget } = useContext(StoreProductContext);

    // const { addLeave, addPopup, leavesData, getLeave, leaveType, viewLeaveData, viewEmpData }
    //     = useContext(LeaveContext);
    
    
     useEffect(() => {
        
        viewCostCentre()
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
    const onSubmit = e => {
        e.preventDefault();
        const month = moment(getM, ["YYYY-MM"]).format("M");
        var MonthData = months[month];
        const year = moment(getM, ["MMM Do YY"]).format('YYYY');
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
        
        addTarget(Values);
        history.push("/productTarget/adminStoreTarget");
        const setModal = props.handleClose;
        setModal();
        setStoreType("");
        setGetM();
        setWeekdaysTarget('');
        setWeekendsTarget('');
        setGrowthPercentage('');
        StateData.stateName = ""
        
      }
      
      const onCloseModal = () => {
        const setModal = props.handleClose;
        setModal();
        setGetM();
        setWeekdaysTarget('');
        setWeekendsTarget('');
        setGrowthPercentage('');
        StateData.stateName = ""
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
                                        <Form.Label>Select Cost Center :</Form.Label>
                                        <Form.Control as="select" 
                                            onChange={(e)=>fromStoreHandler(e.target.value)}
                                            >
                                            <option value="">Select</option>

                                            <option value="">Select</option>
                                            { cosCentreList.map((e, i) => {
                                                    return(
                                                    <option key={i + 1} value={e.costCentreName}>{e.costCentreName}</option>)
                                                })}
                                        </Form.Control>
                                    </Form.Group>
                                </div>
                            </Row>
                           
                            <Row>
                                <div className="col-sm-12">
                                    <Form.Group>
                                        <Form.Label>State :</Form.Label>
                                        <Form.Control as="input" value = {StateData.stateName}/>                                           
                                    </Form.Group>
                                </div>
                            </Row>
                            <Row>
                                <div className="col-sm-12">
                                    <Form.Group>
                                        <Form.Label>Select Month and Year :</Form.Label>
                                        <Form.Control type="month" className="digit" min="2020-08"
                                            onChange={(e) => setGetM(e.target.value)}
                                            >
                                        </Form.Control>
                                    </Form.Group>
                                </div>
                            </Row>
                            
                            <Row>
                                <Col>
                                {/* <div className="col-sm-12"> */}
                                    <Form.Group>
                                        <Form.Label>Product Target for Weekdays :</Form.Label>
                                        <Form.Control size="lg" type="text" 
                                            onChange={(e) => fromWeekdaysHandler(e.target.value)}
                                            >
                                            
                                        </Form.Control>
                                    </Form.Group>
                                {/* </div> */}
                                </Col>
                                <Col>
                            {/* </Row>
                            <Row> */}
                                {/* <div className="col-sm-12"> */}
                                    <Form.Group>
                                        <Form.Label>Product Target for Weekends :</Form.Label>
                                        <Form.Control size="lg" type="text" 
                                            onChange={(e) => fromWeekendHandler(e.target.value)}
                                            >
                                            
                                        </Form.Control>
                                    </Form.Group>
                                {/* </div> */}
                                </Col>
                            </Row>
                            <Row>
                                <div className="col-sm-12">
                                    <Form.Group>
                                        <Form.Label>Growth Percentage :</Form.Label>
                                        <Form.Control size="lg" type="text" 
                                            onChange={(e) => fromGrowthHandler(e.target.value)}
                                            >
                                           
                                        </Form.Control>
                                    </Form.Group>
                                </div>
                            </Row>
                            
                           

                            {/* <Row>
                                <div className="col-sm-12">
                                    <Form.Group>
                                    <Form.Label>Reason:</Form.Label>
                                    <Form.Control as="textarea" rows="3" name="reason" value={reason}
                                        onChange={(event) => setReason(event.target.value)} required />
                                    </Form.Group>
                                </div>
                            </Row> */}

                            <Button type="submit" /* className="submit-button" size="sm" */>Submit</Button>
                        </Form>

                    </Modal.Body>
                </Container>
            </Modal>

        </React.Fragment>
    );
};

export default AddTarget;