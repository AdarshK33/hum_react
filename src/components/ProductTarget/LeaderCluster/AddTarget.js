import React, { useState, useContext, useEffect } from 'react';
import { Container, Row,  Button, Form, Modal } from 'react-bootstrap';
// import DatePicker from 'react-datepicker'
import "react-datepicker/dist/react-datepicker.css";
// import { useHistory } from "react-router-dom";
import { ToastContainer } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import { DashboardContext } from "../../../context/DashboardState";
import { ClusterProductContext } from "../../../context/ClusterProductState";
import { AppContext } from "../../../context/AppState";
import moment from 'moment';


const AddTarget = (props) => { 

    // let history = useHistory();

    const [StoreType, setStoreType] = useState("IN1055");
    const [getM, setGetM] = useState();
    const [cluster, setCluster] = useState("");
    // const [WeekdaysTarget, setWeekdaysTarget] = useState();
    // const [WeekendsTarget, setWeekendsTarget] = useState();
    const [TodayDate, setTodayDate] = useState();
    const [month, setMonth] = useState();
    const [Year, setYear] = useState();
    const [target, setTarget] = useState();
    const [costCenterID, setCostCenterID] = useState("");


    const { viewCostCentre } = useContext(DashboardContext);
    const { user } = useContext(AppContext)
    const { leaderClusterList, viewLeaderClusterList,addTarget} = useContext(ClusterProductContext);


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
       viewLeaderClusterList()
       
    }, []);


    const fromStoreHandler = (e) => {
        // setStoreType(e);
        viewLeaderClusterList()
    }


    const fromClusterHandler = (e) => {
      setCluster(e);
    }


    // const fromWeekdaysHandler = (e) => {
    //     setWeekdaysTarget(e);
    // }


    // const fromWeekendHandler = (e) => {
    //     setWeekendsTarget(e);
    // }

    const fromTargetHandler = e =>{
        setTarget(e);
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
            clusterId: cluster,
            clusterName: "",
            month: MonthData,
            monthName: "",
            productTarget: target,
            storeName: costCenterID,
            targetId: 0,
            year: year
          }
        addTarget(Values);

        const setModal = props.handleClose;

        setModal();
        setStoreType("");
        setGetM();
        setTarget('');
        // setWeekdaysTarget('');
        // setWeekendsTarget('');
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
                                            <Form.Control value={user.costCentre} readOnly />
                                            
                                            {/* <Form.Control as="select"
                                                onChange={(e)=>fromStoreHandler(e.target.value)}
                                                >

                                                <option value="">Select</option>
                                                { cosCentreList.map((e, i) => {
                                                        return(
                                                        <option key={i + 1} value={e.costCentreName}>{e.costCentreName}</option>)
                                                    })}
                                            </Form.Control> */}
                                        </Form.Group>
                                    </div>
                                </Row>

                                <Row>
                                    <div className="col-sm-12">
                                        <Form.Group>
                                            <Form.Label>Select Cluster :</Form.Label>
                                            <Form.Control as="select" required
                                                onChange={(e)=>fromClusterHandler(e.target.value)}
                                                >
                                                

                                                <option value="">Select</option>
                                                { leaderClusterList !== null ? leaderClusterList.map((e, i) => {
                                                    
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
                                                onChange={(e) => setGetM(e.target.value)} required
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
                                            required
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
