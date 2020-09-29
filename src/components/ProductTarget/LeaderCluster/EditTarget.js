import React, { useState, useContext, useEffect } from 'react';
import { Container, Row, Button, Form, Modal, Col } from 'react-bootstrap'
import { useHistory } from "react-router-dom";
import DatePicker from 'react-datepicker'
import "react-datepicker/dist/react-datepicker.css";
import { ToastContainer,  } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import { ClusterProductContext } from "../../../context/ClusterProductState";
import { DashboardContext } from "../../../context/DashboardState";

import moment from 'moment'


const EditTarget = (props) => {

    const [costCenter, setCostCenter] = useState('')
    const [cluster, setCluster] = useState()
    const [clusterName, setClusterName] = useState()
    const [date, setDate] = useState();
    // const [targetWeekdays, setTargetWeekdays] = useState()
    // const [targetWeekend, setTargetWeekend] = useState()
    const [TodayDate, setTodayDate] = useState();
    const [month, setMonth] = useState();
    const [Year, setYear] = useState();
    const [target, setTarget] = useState()
    

    const { cosCentreList,viewCostCentre } = useContext(DashboardContext);
    const { clusterList,viewSingleClusterTarget, viewClusterList,editTarget, leaderClusterList, viewLeaderClusterList } = useContext(ClusterProductContext);


      useEffect(() => {
        setCostCenter(props.singleClusterTarget.storeName);
        setCluster(props.singleClusterTarget.clusterName);     
        viewClusterList(props.singleClusterTarget.storeName);   
        viewCostCentre()
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
    }, [props.singleClusterTarget.storeName]);


    useEffect(() => {        
        setDate(props.singleClusterTarget.year+"-"+monthsNumber[props.singleClusterTarget.month]);            
       
    }, [props.singleClusterTarget.month, props.singleClusterTarget.year]);

    useEffect(() => {
        setClusterName(props.singleClusterTarget.clusterName);
    }, [props.singleClusterTarget.clusterName]);


    useEffect(() => {
        setTarget(props.singleClusterTarget.productTarget);
    }, [props.singleClusterTarget.productTarget]);

    // useEffect(() => {
    //     setTargetWeekdays(props.singleClusterTarget.weekDayTarget);
    // }, [props.singleClusterTarget.weekDayTarget]);

    // useEffect(() => {        
    //     setTargetWeekend(props.singleClusterTarget.weekEndTarget);
    // }, [props.singleClusterTarget.weekEndTarget]);  



    const setCosCenterHandler = (e) => {
        setCostCenter(e);
        viewClusterList(e)
    }

    const fromClusterHandler = (e) => {
        setCluster(e);
      }

      const fromTargetHandler = (e) => {
        setTarget(e);
    }
  
  
    //   const fromWeekdaysHandler = (e) => {
    //       setTargetWeekdays(e);
    //   }
  
  
    //   const fromWeekendHandler = (e) => {
    //       setTargetWeekend(e);
    //   }


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
        e.preventDefault()

        const month = moment(date, ["YYYY-MM"]).format("M");
        var MonthData = months[month];
        const year = moment(date, ["MMM Do YY"]).format('YYYY');

        const Values = {
            clusterId: cluster,
            clusterName: "",
            month: MonthData,
            monthName: "",
            productTarget: target,
            storeName: costCenter,
            targetId: props.singleClusterTarget.targetId,
            year: year
          }

        editTarget(Values);
        
        const setModal = props.handleEditClose;
        setModal()
    }



    const onCloseModal = () => {
        const setModal = props.handleEditClose;
        setModal()
        setCostCenter(props.singleClusterTarget.storeName)
        setCluster(props.singleClusterTarget.clusterId)
        setDate(props.singleClusterTarget.year+"-"+monthsNumber[props.singleClusterTarget.month])
        setTarget(props.singleClusterTarget.productTarget)
        // setTargetWeekdays(props.singleClusterTarget.weekDayTarget)
        // setTargetWeekend(props.singleClusterTarget.weekEndTarget)
        viewClusterList(props.singleClusterTarget.storeName)
    }

    
    return (
        <React.Fragment>
            <ToastContainer />
            <Modal show={props.modal} onHide={props.handleEditClose} centered>
                <Container style={{ paddingBottom: '1rem' }}>
                    <Modal.Header>
                        <Modal.Title >
                            <h5 className="modal-heading">Edit Target</h5>
                        </Modal.Title>
                        <button type="button" className="close" data-dismiss="modal" aria-label="Close"
                        onClick={onCloseModal}>
                            <span aria-hidden="true">&times;</span>
                        </button>
                    </Modal.Header>
                    <Modal.Body>
                        <Form onSubmit={onSubmit}>
                            
                            <Row>
                                <div className="col-sm-12">
                                    <Form.Group>
                                        <Form.Label>Select Cost Center</Form.Label>
                                        <Form.Control value="IN1055" readOnly />
                                        {/* <Form.Control as="select"                                             
                                            onChange={(e) => setCosCenterHandler(e.target.value)}>
                                            <option value={costCenter}>{costCenter}</option>
                                             
                                        </Form.Control> */}
                                    </Form.Group>
                                </div>
                            </Row>

                            <Row>
                                    <div className="col-sm-12">
                                        <Form.Group>
                                            <Form.Label>Select Cluster :</Form.Label>
                                            <Form.Control as="select"
                                                onChange={(e)=>fromClusterHandler(e.target.value)}
                                                >                                               

                                                <option value={cluster}>{clusterName}</option>
                                                { leaderClusterList !== undefined ? leaderClusterList.map((e, i) => {
                                                    return(
                                                    <option key={i + 1} value={e.clusterId}>{e.clusterName}</option>)
                                                }): ""}
                                            </Form.Control>
                                        </Form.Group>
                                    </div>
                                </Row>

                                <Row>
                                    <div className="col-sm-12">
                                        <Form.Group>
                                            <Form.Label>Select Month and Year :</Form.Label>
                                            <Form.Control type="month" className="digit" min={Year + "-" + month}
                                                value = {date}
                                                onChange={(e) => setDate(e.target.value)}
                                                >
                                                    
                                            </Form.Control>
                                        </Form.Group>
                                    </div>
                                </Row>


                                {/* <Row>
                                    <Col>
                                        <Form.Group>
                                            <Form.Label>Product Target for Weekdays :</Form.Label>
                                            <Form.Control size="lg" type="text"
                                                onChange={(e) => fromWeekdaysHandler(e.target.value)}
                                                value= {targetWeekdays}
                                                >                                            
                                            </Form.Control>
                                        </Form.Group>
                                    </Col>
                                    <Col>
                                        <Form.Group>
                                            <Form.Label>Product Target for Weekends :</Form.Label>
                                            <Form.Control size="lg" type="text"
                                                onChange={(e) => fromWeekendHandler(e.target.value)}
                                                value= {targetWeekend}
                                                >

                                            </Form.Control>
                                        </Form.Group>
                                    </Col>
                                </Row> */}

                                <Row>
                                <div className="col-sm-12">
                                    <Form.Group>
                                        <Form.Label>Productivity Target</Form.Label>
                                        <Form.Control size="lg" type="text" 
                                            onChange={(e) => fromTargetHandler(e.target.value)}
                                            value= {target}
                                            >
                                           
                                        </Form.Control>
                                    </Form.Group>
                                </div>
                            </Row>

                            <Button type="submit" /* className="submit-button" size="sm" */>Submit</Button>

                        </Form>

                    </Modal.Body>
                </Container>
            </Modal>
        </React.Fragment>
    );
};

export default EditTarget;
