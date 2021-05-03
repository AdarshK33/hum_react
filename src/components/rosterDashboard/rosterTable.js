import React, { Fragment, useState, useEffect, useContext } from 'react';
import { Container, Row, Col, Form, Spinner } from 'react-bootstrap'
import { Link } from 'react-router-dom'
import DatePicker from 'react-datepicker'
import "react-datepicker/dist/react-datepicker.css";
import { RosterContext } from "../../context/RosterState";
import { AppContext } from "../../context/AppState";
import "./rosterDashboard.css";
import moment from 'moment'
import { CircularProgressbar } from 'react-circular-progressbar';
import 'react-circular-progressbar/dist/styles.css';

const RosterTable = (storeID) => {
    const [startDate, setStartDate] = useState(moment())
    const [endDate, setEndDate] = useState(moment().add('30', 'd'));
    const [currentDate, setCurrentDate] = useState(moment());
    const [displayMonth, setDisplayMonth] = useState(false);
    const [displayWeek, setDisplayWeek] = useState(true);
    const [displayDaily, setDisplayDaily] = useState(false);
    const [year, setYear] = useState('');
    const [displayNormal, setDisplayNormal] = useState(false);
    const [displayTable, setDisplayTable] = useState(true);
    const [weekActive, setWeekActive] = useState(true);
    const [dailyActive, setDailyActive] = useState(false);
    const [normalActive, setNormalActive] = useState(false);
    const [monthActive, setMonthActive] = useState(false);

    const months = [1,2,3,4,5,6,7,8,9,10,11,12];

    const {adminRosterUtilisationSchedule, adminRosterUtilisationScheduleResult, getMasterWeeks, masterWeeks, rosterLoading} = useContext(RosterContext);
    const { user } = useContext(AppContext);

    useEffect(() => {
        setDisplayTable(false);
    }, [storeID.storeId])

    const selectMonth = e => {
        e.preventDefault();
        setDisplayMonth(true);
        setDisplayNormal(false);
        setDisplayWeek(false);
        setDisplayDaily(false);
        setWeekActive(false);
        setDailyActive(false);
        setMonthActive(true);
        setNormalActive(false);
    }

    const selectNormal = e => {
        e.preventDefault();
        setDisplayMonth(false);
        setDisplayNormal(true);
        setDisplayWeek(false);
        setDisplayDaily(false);
        setWeekActive(false);
        setDailyActive(false);
        setMonthActive(false);
        setNormalActive(true);
    }

    const selectWeek = e => {
        e.preventDefault();
        setDisplayWeek(true);
        setDisplayNormal(false);
        setDisplayDaily(false);
        setDisplayMonth(false);
        setWeekActive(true);
        setDailyActive(false);
        setMonthActive(false);
        setNormalActive(false);
    }

    const selectDaily = e => {
        e.preventDefault();
        setDisplayDaily(true);
        setDisplayNormal(false);
        setDisplayMonth(false);
        setDisplayWeek(false);
        setWeekActive(false);
        setDailyActive(true);
        setMonthActive(false);
        setNormalActive(false);
    }

    const monthSelected = e => {
        e.preventDefault();
        setDisplayTable(true);
        // console.log(typeof Number(e.target.value), 'e.target');
        const currentYear = new Date().getFullYear();
        console.log(currentYear, 'currentYear');
        if( e.target.value !== "Select month" && storeID.storeId) 
        adminRosterUtilisationSchedule('M', Number(e.target.value), storeID.storeId, 0, 0, 0, 0, 2021);
    }

    const weekSelected = e => {
        e.preventDefault();
        setDisplayTable(true);
        // console.log(e.target.value, 'e.target');
        if( e.target.value && storeID.storeId && year) 
        adminRosterUtilisationSchedule('W', 0, storeID.storeId, 0, 0, 0, Number(e.target.value), year);
    }

    const dailySelected = (e, date) => {
        e.preventDefault();
        setDisplayTable(true);
        // console.log(moment(date, 'YYYY-MM-DD').format("YYYY-MM-DD"), 'e.target.value');
        adminRosterUtilisationSchedule('D', 0, storeID.storeId, moment(date, 'YYYY-MM-DD').format("YYYY-MM-DD"));
    }

    const yearSelected = e => {
        e.preventDefault();
        // setDisplayTable(true);
        setYear(e.target.value);
        getMasterWeeks(e.target.value);
    }

    const normalStartDateSelected = (e, date) => {
        e.preventDefault();
        setDisplayTable(true);
        if(endDate > startDate)
        adminRosterUtilisationSchedule('N', 0, storeID.storeId, 0, endDate.format("YYYY-MM-DD"), moment(date, 'YYYY-MM-DD').format("YYYY-MM-DD"));
    }

    const normalEndDateSelected = (e, date) => {
        e.preventDefault();
        setDisplayTable(true);
        if(endDate > startDate)
        adminRosterUtilisationSchedule('N', 0, storeID.storeId, 0, moment(date, 'YYYY-MM-DD').format("YYYY-MM-DD"), startDate.format("YYYY-MM-DD"));
    }

    return (
        <Fragment>
            <Container>
                {/* {console.log(storeID, 'storeID')} */}
                <Row>
                    <Col style={{paddingTop: '10px'}}>
                        <Link onClick={selectDaily} className={"roster-link " + (dailyActive ? 'active-link' : '') }>Daily</Link>
                        <Link onClick={selectNormal} className={"roster-link " + (normalActive ? 'active-link' : '') }>Normal</Link>
                        <Link onClick={selectWeek} className={"roster-link " + (weekActive ? 'active-link' : '') }>Weekly</Link>
                        <Link onClick={selectMonth} className={"roster-link " + (monthActive ? 'active-link' : '') }>Monthly</Link>
                    </Col>
                    
                    {displayMonth && (
                    <Col className="right">
                        <Form.Control 
                            style={{
                                width: '150px', 
                                height: '40px', 
                                fontSize: '16px', 
                                padding: '0px 5px'
                            }} 
                            as="select" 
                            defaultValue="Choose..."
                            onChange={monthSelected}
                        >
                            <option>Select month</option>
                            {months.map(month => (
                                <option>{month}</option>
                            ))}
                        </Form.Control>
                    </Col>
                    )}
                    {displayWeek && (
                    <Col className="right">
                        <span>
                            <Form.Control 
                                style={{
                                    display: 'inline-block',
                                    width: '150px', 
                                    height: '40px', 
                                    fontSize: '16px', 
                                    padding: '0px 5px',
                                    marginRight: '20px',
                                }} 
                                as="select" 
                                defaultValue="Choose..."
                                onChange={yearSelected}
                            >
                                <option>Select Year</option>
                                <option>2019</option>
                                <option>2020</option>
                                <option>2021</option>
                            </Form.Control>
                        </span>
                        <span>
                            <Form.Control 
                                style={{
                                    display: 'inline-block',
                                    width: '150px', 
                                    height: '40px', 
                                    fontSize: '16px', 
                                    padding: '0px 5px',
                                    margin: 0,
                                }} 
                                as="select" 
                                defaultValue="Choose..."
                                onChange={weekSelected}
                            >
                                <option>Select Week</option>
                                {masterWeeks.map(week => (
                                    <option value={week.weekId}>{week.weekName}</option>
                                ))}
                            </Form.Control>
                        </span>    
                    </Col>
                    )}
                    {displayDaily && (
                    <Col className="right">
                        <span style={{marginRight: '10px'}}>
                            <label style={{marginRight: '5px'}}>Select Date</label>
                            <DatePicker wrapperClassName="datePicker" selected={currentDate.toDate()} onChange={(date, e) => {
                                setCurrentDate(moment(date, 'YYYY-MM-DD'))
                                dailySelected(e, date);
                            }}
                                className="input_date" dateFormat="yyyy-MM-dd"
                                placeholderText="From Date" required />
                        </span>
                    </Col>
                    )}
                    {displayNormal && (
                        <Col className="right" style={{padding: '0px'}}>
                            <span className="roster-date" style={{marginRight: '10px'}}>
                                <label style={{marginRight: '5px'}}>Start Date</label>
                                <DatePicker wrapperClassName="datePicker" selected={startDate.toDate()} onChange={(date, e) => {
                                    setStartDate(moment(date, 'YYYY-MM-DD'))
                                    normalStartDateSelected(e, date);
                                }}
                                    className="input_date" dateFormat="yyyy-MM-dd"
                                    placeholderText="From Date" required />
                            </span>
                            <span>
                                <label className="roster-date" style={{marginRight: '5px'}}>End Date</label>
                                <DatePicker wrapperClassName="datePicker" selected={endDate.toDate()} onChange={(date, e) => {
                                    setEndDate(moment(date, 'YYYY-MM-DD'))
                                    normalEndDateSelected(e, date);
                                }}
                                    className="input_date" dateFormat="yyyy-MM-dd"
                                    placeholderText="From Date" required />
                            </span>
                        </Col>
                    )}
                </Row>
                {/* {console.log(storeID.storeID, 'storeID.storeID')} */}
                {storeID.storeId && displayTable ? (
                    <div style={{marginTop: '10px'}}>
                    {/* {console.log(rosterLoading, 'check check')} */}
                    {adminRosterUtilisationScheduleResult && adminRosterUtilisationScheduleResult.rosterDates && adminRosterUtilisationScheduleResult.rosterDates.length && rosterLoading? (
                        <table className="roster-table">
                            <thead>
                                <tr>
                                    <th className="table-head header-option">
                                        <div>Resource Utilisation Schedule</div>
                                    </th>
                                    { adminRosterUtilisationScheduleResult && adminRosterUtilisationScheduleResult.rosterDates && adminRosterUtilisationScheduleResult.rosterDates.length && adminRosterUtilisationScheduleResult.rosterDates.map(data => (
                                        <th className="table-head">
                                            <h6>{data.date}</h6>
                                            <ul>
                                                <li>{data.generalCount} General</li>
                                                <li>{data.onDutyCount} on duty</li>
                                                <li>{data.captainCount} Captain</li>
                                            </ul>
                                        </th>
                                    ))}
                                </tr>
                            </thead>
                            <tbody>
                                { adminRosterUtilisationScheduleResult.rosterResponses && adminRosterUtilisationScheduleResult.rosterResponses.length && adminRosterUtilisationScheduleResult.rosterResponses.map((data, index) => {
                                        return (
                                            <tr>
                                                <td 
                                                    className="table-empDetails left-option"
                                                    style={{
                                                        width: `${data.rank === 1 ? '200px' : data.rank === 2 ? '175px' : '150px'}`,
                                                        marginLeft: `${data.rank === 1 ? '3px' : data.rank === 2 ? '27px' : '53px'}`
                                                    }}     
                                                >
                                                    <div className="empDetails-left">
                                                        <div>{data.firstName} {data.lastName}</div>
                                                        <div>{data.contractType}</div>
                                                        <div>{data.position}</div>
                                                    </div>
                                                    {/* {console.log(data.utilization.split('%'), 'data.utilization')} */}
                                                    <div style={{width: '45px', margin: 'auto'}}>
                                                        <CircularProgressbar value={data.utilization.split('%')[0]} text={`${data.utilization}`}/>
                                                    </div>
                                                </td>
                                                {data.employeeRosters.map(empData => (
                                                    <td 
                                                        className='table-empDetails table-empSchedule' 
                                                        style={{
                                                            backgroundColor: `${empData.roster && empData.roster.leave ? '#FF5370' : empData.roster && empData.roster.holiday ? '#FF9F40' : empData.roster && empData.roster.weekOff ? '#006EBB' : empData.roster && empData.roster.shiftName ? '#22AF47' : '#8d8d8d94'}`,
                                                            color: 'white'    
                                                        }}
                                                    >
                                                        {/* <div>{empData.date}</div> */}
                                                        {empData.roster === null ? (<div>----</div>)
                                                    : ( 
                                                        <div style={{textAlign: 'center'}}>{empData.roster.leave ? 'Leave': empData.roster.holiday ? 'Holiday': empData.roster.weekOff ? 'WeekOff' : empData.roster.shiftName ? empData.roster.shiftName : '----'}</div>
                                                    )}
                                                    {/* {console.log(empData, 'empData')} */}
                                                    </td>
                                                ))}
                                            </tr>
                                        )
                                    }
                                )}
                                {/* {console.log(adminRosterUtilisationScheduleResult.rosterResponses)}
                                { adminRosterUtilisationScheduleResult.rosterResponses && adminRosterUtilisationScheduleResult.rosterResponses.length && adminRosterUtilisationScheduleResult.rosterResponses.map((data, index) => (
                                    <tr>
                                        <td>Dummy</td>
                                    </tr>
                                ))} */}
                            </tbody>
                        </table> ) : (<div style={{position: 'absolute', top: '50%', left: '50%'}}><Spinner animation="border" variant="primary" /></div>)}
                    </div> ) : null 
                }
                
            </Container>
        </Fragment>
    );
};

export default RosterTable;