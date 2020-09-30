import React, { useState, useContext, useEffect } from 'react';
import { Container, Row, Col, Button, Form, Modal } from 'react-bootstrap';
import DatePicker from 'react-datepicker'
import "react-datepicker/dist/react-datepicker.css";
import { useHistory } from "react-router-dom";
import { ToastContainer, toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import { DashboardContext } from "../../../context/DashboardState";
import { ClusterProductContext } from "../../../context/ClusterProductState";
import moment from 'moment';


const AddTarget = (props) => {

    let history = useHistory();

    const [StoreType, setStoreType] = useState('');
    const [getM, setGetM] = useState();
    const [cluster, setCluster] = useState("");
    const [target, setTarget] = useState();
    // const [WeekdaysTarget, setWeekdaysTarget] = useState();
    // const [WeekendsTarget, setWeekendsTarget] = useState();
    const [TodayDate, setTodayDate] = useState();
    const [month, setMonth] = useState();
    const [Year, setYear] = useState();
    const [costCenterID, setCostCenterID] = useState("");


    const { cosCentreList,viewCostCentre } = useContext(DashboardContext);
    const { clusterList,clusterProductList, viewClusterList,addTarget} = useContext(ClusterProductContext);


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
        viewCostCentre()
        viewClusterList()
    }, []);

    //  useEffect(() => {
    //    viewCostCentre()
    //    viewClusterList()
    // }, []);


    const fromStoreHandler = (e) => {
        setStoreType(e);
        viewClusterList(e)
    }


    const fromClusterHandler = (e) => {
      setCluster(e);
    }


    const fromTargetHandler = (e) => {
        setTarget(e);
    }

    // const fromWeekdaysHandler = (e) => {
    //     setWeekdaysTarget(e);
    // }

    // const fromWeekendHandler = (e) => {
    //     setWeekendsTarget(e);
    // }


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
            clusterId: cluster,
            clusterName: "",
            month: MonthData,
            monthName: "",
            productTarget: target,
            storeName: costCenterID,
            targetId: 0,           
            year: year
            }
            if(validate){
                addTarget(Values);
            }
        

        const setModal = props.handleClose;

        setModal();
        setStoreType("");
        setGetM();
        setTarget('');
        // setWeekdaysTarget('');
        // setWeekendsTarget('');
      }

      const validation = () => {
        let flag = true
        if (StoreType === '') {
            toast.info("Select StoreType Type")
            flag = false;
            return;
        }

        if (cluster === '') {
            toast.info("Select Cluster Type")
            flag = false;
            return;
        }

        if (target === '') {
            toast.info("Productivity Target is mandatory")
            flag = false;
            return;
        }
        
        return flag;
    }


      const onCloseModal = () => {
        const setModal = props.handleClose;
        setModal();
        }



    return (
        <React.Fragment>
            <ToastContainer />
                <Modal show={props.modal} onHide={props.handleClose} centered>
                    <Container style={{ paddingBottom: '1rem' }}>
                        <Modal.Header >
                            <Modal.Title >
                                <h4>Cluster Product Target</h4>
                            </Modal.Title>
                            <button
                             type="button"
                             className="close"
                             data-dismiss="modal"
                             aria-label="Close"
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
                                            <Form.Label>Select Cluster :</Form.Label>
                                            <Form.Control as="select"
                                                onChange={(e)=>fromClusterHandler(e.target.value)}
                                                >
                                                <option value="">Select</option>

                                                <option value="">Select</option>
                                                { clusterList !== undefined ? clusterList.map((e, i) => {
                                                    console.log(e);
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
                                                onChange={(e) => setGetM(e.target.value)}
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
                                                >

                                            </Form.Control>
                                        </Form.Group>
                                    </Col>
                                    <Col>
                                        <Form.Group>
                                            <Form.Label>Product Target for Weekends :</Form.Label>
                                            <Form.Control size="lg" type="text"
                                                onChange={(e) => fromWeekendHandler(e.target.value)}
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
                                            >
                                           
                                        </Form.Control>
                                    </Form.Group>
                                </div>
                            </Row>
                                <Button type="submit">Submit</Button>
                            </Form>

                        </Modal.Body>
                    </Container>
                </Modal>

        </React.Fragment>
    );
};

export default AddTarget;
