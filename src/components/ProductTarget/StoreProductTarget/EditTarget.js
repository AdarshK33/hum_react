import React, { useState, useContext, useEffect } from 'react';
import { Container, Row, Col, Button, Form, Modal } from 'react-bootstrap'

import "react-datepicker/dist/react-datepicker.css";
import { ToastContainer } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import DatePicker from 'react-datepicker';
import { DashboardContext } from "../../../context/DashboardState";
import { StoreProductContext } from "../../../context/StoreProductState";
import moment from 'moment'

const EditTarget = (props) => {


    const [StoreType, setStoreType] = useState('');
    const [getM, setGetM] = useState(new Date());
    const [WeekdaysTarget, setWeekdaysTarget] = useState();
    const [WeekendsTarget, setWeekendsTarget] = useState();
    const [Percentage, setGrowthPercentage] = useState();
    const [TodayDate, setTodayDate] = useState();
    const [month, setMonth] = useState();
    const [Year, setYear] = useState();

    const { cosCentreList, viewCostCentre } = useContext(DashboardContext);
    const { StateData, getStateData, UpdateTarget } = useContext(StoreProductContext);


    useEffect(() => {
        setStoreType(props.editData.costCenter);
        getStateData(props.editData.costCenter);
        let date = new Date();
        var dd = String(date.getDate()).padStart(2, '0');
        var mm = String(date.getMonth() + 1).padStart(2, '0')
        if (dd > 20) {
            mm++;
        }


        var yyyy = date.getFullYear();
        setTodayDate(dd);
        setMonth(mm);
        setYear(yyyy);
        viewCostCentre()
    }, [props.editData.costCenter]);

    useEffect(() => {
        setGetM(props.editData.year + "-" + monthsNumber[props.editData.month]);

    }, [props.editData.month, props.editData.year]);

    useEffect(() => {
        setWeekdaysTarget(props.editData.weekday);
    }, [props.editData.weekday]);

    useEffect(() => {
        setWeekendsTarget(props.editData.weekend);
    }, [props.editData.weekend]);

    useEffect(() => {
        setGrowthPercentage(props.editData.growth);
    }, [props.editData.growth]);



    const fromStoreHandler = (e) => {
        setStoreType(e.value);
        getStateData(e.value);


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

    // const setGetMHandler = (date) =>{
    //     console.log(date)
    //     const month = moment(date, ["YYYY-MM"]).format("M");
    //     console.log(month)
    //     const year = moment(date, ["MMM Do YY"]).format('YYYY');
    //     console.log(year)
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
    monthsNumber["May"] = '05';
    monthsNumber["Jun"] = '06';
    monthsNumber["Jul"] = '07';
    monthsNumber["Aug"] = '08';
    monthsNumber["Sep"] = '09';
    monthsNumber["Oct"] = '10';
    monthsNumber["Nov"] = '11';
    monthsNumber["Dec"] = '12';

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
            targetId: props.editData.targetId,
            weekday: WeekdaysTarget,
            weekend: WeekendsTarget,
            year: year
        }
        //    console.log(Values);
        UpdateTarget(Values);

        const setModal = props.handleEditClose;
        setModal();


    }



    const onCloseModal = () => {
        const setModal = props.handleEditClose;
        setModal();
        setStoreType(props.editData.costCenter);
        setGetM(props.editData.year + "-" + monthsNumber[props.editData.month]);
        setWeekdaysTarget(props.editData.weekday);
        setWeekendsTarget(props.editData.weekend);
        setGrowthPercentage(props.editData.growth);
        getStateData(props.editData.costCenter);
    }
    console.log(props);


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
                                        <Form.Control as="input" required value={StoreType} readOnly />
                                        {/* <Select                                       
                                                name="filters"
                                                placeholder={StoreType} 
                                                value={StoreType} 
                                                style={{fontSize:"0.8rem"}}
                                                selected={StoreType}
                                                options={cosCentreList !== null && cosCentreList !== undefined ?
                                                    cosCentreList.map(e => ({label: e.costCentreName, value: e.costCentreName})):[]}
                                                onChange={fromStoreHandler}
                                                required isSearchable />  */}
                                        {/* <Form.Control as="select" 
                                            onChange={(e)=>fromStoreHandler(e.target.value)} required
                                            >
                                            <option value={StoreType}>{StoreType}</option>

                                            <option value="">Select</option>
                                            { cosCentreList !== null && cosCentreList !== undefined && 
                                                cosCentreList.map((e, i) => {
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
                                        <Form.Label>State :</Form.Label>
                                        <Form.Control as="input" required defaultValue={StateData.stateName} readOnly />
                                    </Form.Group>
                                </div>
                            </Row>
                            <Row>
                                <div className="col-sm-12">
                                    <Form.Group>
                                        <div className="date-picker">
                                            <Form.Label>Select Month and Year :</Form.Label>
                                            <br />
                                            <DatePicker
                                                onChange={(date) => {
                                                    // console.log(date)
                                                    const month = moment(date, ["YYYY-MM"]).format("M");
                                                    // console.log(month)
                                                    const year = moment(date, ["MMM Do YY"]).format('YYYY');
                                                    // console.log(year)
                                                    setGetM(year + "-" + month)

                                                }}
                                                className="form-control"
                                                dateFormat="MM/yyyy"
                                                showMonthYearPicker
                                                placeholderText={getM} />


                                        </div>
                                        {/* <Form.Control type="month" className="digit" min={Year + "-" + month} required                                           
                                            defaultValue = {getM}
                                            onChange={(e) => setGetM(e.target.value)}
                                            >
                                        </Form.Control> */}
                                    </Form.Group>
                                </div>
                            </Row>

                            <Row>
                                <Col>

                                    <Form.Group>
                                        <Form.Label>Product Target for Weekdays :</Form.Label>
                                        <Form.Control size="lg" type="text" required
                                            onChange={(e) => fromWeekdaysHandler(e.target.value)} defaultValue={WeekdaysTarget}
                                        >

                                        </Form.Control>
                                    </Form.Group>

                                </Col>
                                <Col>

                                    <Form.Group>
                                        <Form.Label>Product Target for Weekends :</Form.Label>
                                        <Form.Control size="lg" type="text" required
                                            onChange={(e) => fromWeekendHandler(e.target.value)}
                                            defaultValue={WeekendsTarget}
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
                                            defaultValue={Percentage}
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

export default EditTarget;