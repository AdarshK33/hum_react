import React, { Fragment, useState, useEffect, useContext } from 'react';
import { Container, Row, Col, Card, Form } from 'react-bootstrap'
import Chart from 'react-google-charts'
import { RosterContext } from "../../context/RosterState";
import Select from 'react-select'
import RosterTable from './rosterTable'

const RosterDashboard = () => {
    const [costCenter1, setCostCenter1] = useState();
    const [month, setMonth] = useState(0);
    const [year, setYear] = useState(0);

    const {costCenterList, costCenter, adminRosterCalculateUtilisationList, adminRosterCalculateUtilisation} = useContext(RosterContext);

    const months = [1,2,3,4,5,6,7,8,9,10,11,12];

    const years = [2019, 2020, 2021];

    const currentYear = new Date().getFullYear();
    const currentMonth = new Date().getMonth() + 1;


    useEffect(() => {
        costCenter()
        // if(costCenter1)
        // adminRosterCalculateUtilisation(costCenter1)
        // console.log(costCenterList, 'costCenterList')
        if(costCenterList && costCenterList.length) {
        // setCostCenter1(costCenterList[0].costCentreName);
        console.log(currentYear, currentMonth, 'year and month')
        // console.log(costCenterList[0].costCentreName, costCenter1, 'asdasdasd')
        setMonth(currentMonth);
        setYear(currentYear);
            if(costCenter1) {
                adminRosterCalculateUtilisation(costCenter1, currentMonth, currentYear);
            } else {
                setCostCenter1(costCenterList[0].costCentreName);
                adminRosterCalculateUtilisation(costCenterList[0].costCentreName, currentMonth, currentYear);
            }
        }

        // else 
        // adminRosterCalculateUtilisation('IN1041');
        // if(adminRosterCalculateUtilisationList && adminRosterCalculateUtilisationList.length)
        // console.log(costCenterList, costCenter1, adminRosterCalculateUtilisationList, 'asdasd');
    },[costCenter1, costCenterList.length])

    const handleCostCenter = (options) => {
        let data2 = options !== null ? options.value : ''
        setCostCenter1(data2)
        // console.log( data2, costCenter1, 'sdakjsdhashd');
        adminRosterCalculateUtilisation(data2, month, year);
    }

    const monthSelected = e => {
        e.preventDefault();
        // setDisplayTable(true);
        // console.log(typeof Number(e.target.value), 'e.target');
        // console.log(currentYear, 'currentYear');
        // if( e.target.value !== "Select month") 
        // adminRosterUtilisationSchedule('M', Number(e.target.value), storeID.storeId, 0, 0, 0, 0, 2021);
        // setCostCenter1(Number(e.target.value))
        setMonth(Number(e.target.value));
        if(costCenter1)
        {
            adminRosterCalculateUtilisation(costCenter1, Number(e.target.value), year);
        } else {
            adminRosterCalculateUtilisation(costCenterList[0].costCentreName, Number(e.target.value), year)
        }
    }

    const yearSelected = e => {
        e.preventDefault();
        // setDisplayTable(true);
        // console.log(typeof Number(e.target.value), 'e.target');
        const currentYear = new Date().getFullYear();
        // console.log(currentYear, 'currentYear');
        // if( e.target.value !== "Select month") 
        // adminRosterUtilisationSchedule('M', Number(e.target.value), storeID.storeId, 0, 0, 0, 0, 2021);
        // setCostCenter1(Number(e.target.value))
        setYear(Number(e.target.value));
        if(costCenter1) {
            adminRosterCalculateUtilisation(costCenter1, month, Number(e.target.value));
        } else {
            adminRosterCalculateUtilisation(costCenterList[0].costCentreName, month, Number(e.target.value));
        }
    }

    const options1 = {
        // title: adminRosterCalculateUtilisationList && adminRosterCalculateUtilisationList.length ? (adminRosterCalculateUtilisationList[0].utilisationType + ' Utilisation') : 'Permanent Utilisation',
        slices: [
            {
                color: "#5059ab"
            },
            {
                color: "#01cc9b"
            },
            // {
            //     color: 'orange'
            // }
        ],
        legend: {
            position: "center",
            alignment: "center",
            textStyle: {
                color: "233238",
                fontSize: 11
            }
        },
        chartArea: {
            left: 10,
            top: 10,
            width: "100%",
            height: "80%"
        },
        data: {
            utilisedValue: adminRosterCalculateUtilisationList && adminRosterCalculateUtilisationList.length ? adminRosterCalculateUtilisationList[0].utilisedValue : 'null',
            utilised: adminRosterCalculateUtilisationList && adminRosterCalculateUtilisationList.length ? adminRosterCalculateUtilisationList[0].utilised : 'null',
            unUtilisedValue: adminRosterCalculateUtilisationList && adminRosterCalculateUtilisationList.length ? adminRosterCalculateUtilisationList[0].unUtilisedValue : 'null',
            unUtilised: adminRosterCalculateUtilisationList && adminRosterCalculateUtilisationList.length ? adminRosterCalculateUtilisationList[0].unUtilised : 'null',
            // holidayUtilisedValue: adminRosterCalculateUtilisationList && adminRosterCalculateUtilisationList.length ? adminRosterCalculateUtilisationList[0].holidayUtilisedValue : 'null',
            // holidayUtilised: adminRosterCalculateUtilisationList && adminRosterCalculateUtilisationList.length ? adminRosterCalculateUtilisationList[0].holidayUtilised : 'null',
        }
    };

    const options2 = {
        // title: adminRosterCalculateUtilisationList && adminRosterCalculateUtilisationList.length ? (adminRosterCalculateUtilisationList[1].utilisationType + ' Utilisation') : 'Permanent Utilisation',
        slices: [
            {
                color: "#5059ab"
            },
            {
                color: "#01cc9b"
            },
            // {
            //     color: 'orange'
            // }
        ],
        legend: {
            position: "center",
            alignment: "center",
            textStyle: {
                color: "233238",
                fontSize: 11
            }
        },
        chartArea: {
            left: 10,
            top: 10,
            width: "100%",
            height: "80%"
        },
        data: {
            utilisedValue: adminRosterCalculateUtilisationList && adminRosterCalculateUtilisationList.length ? adminRosterCalculateUtilisationList[1].utilisedValue : 'null',
            utilised: adminRosterCalculateUtilisationList && adminRosterCalculateUtilisationList.length ? adminRosterCalculateUtilisationList[1].utilised : 'null',
            unUtilisedValue: adminRosterCalculateUtilisationList && adminRosterCalculateUtilisationList.length ? adminRosterCalculateUtilisationList[1].unUtilisedValue : 'null',
            unUtilised: adminRosterCalculateUtilisationList && adminRosterCalculateUtilisationList.length ? adminRosterCalculateUtilisationList[1].unUtilised : 'null',
            // holidayUtilisedValue: adminRosterCalculateUtilisationList && adminRosterCalculateUtilisationList.length ? adminRosterCalculateUtilisationList[1].holidayUtilisedValue : 'null',
            // holidayUtilised: adminRosterCalculateUtilisationList && adminRosterCalculateUtilisationList.length ? adminRosterCalculateUtilisationList[1].holidayUtilised : 'null',
        }
    };

    const options3 = {
        // title: adminRosterCalculateUtilisationList && adminRosterCalculateUtilisationList.length ? (adminRosterCalculateUtilisationList[2].utilisationType + ' Utilisation') : 'Permanent Utilisation',
        slices: [
            {
                color: "#5059ab"
            },
            {
                color: "#01cc9b"
            },
            // {
            //     color: 'orange'
            // }
        ],
        legend: {
            position: "center",
            alignment: "center",
            textStyle: {
                color: "233238",
                fontSize: 11
            }
        },
        chartArea: {
            left: 10,
            top: 10,
            width: "100%",
            height: "80%",
        },
        data: {
            utilisedValue: adminRosterCalculateUtilisationList && adminRosterCalculateUtilisationList.length ? adminRosterCalculateUtilisationList[2].utilisedValue : 'null',
            utilised: adminRosterCalculateUtilisationList && adminRosterCalculateUtilisationList.length ? adminRosterCalculateUtilisationList[2].utilised : 'null',
            unUtilisedValue: adminRosterCalculateUtilisationList && adminRosterCalculateUtilisationList.length ? adminRosterCalculateUtilisationList[2].unUtilisedValue : 'null',
            unUtilised: adminRosterCalculateUtilisationList && adminRosterCalculateUtilisationList.length ? adminRosterCalculateUtilisationList[2].unUtilised : 'null',
            // holidayUtilisedValue: adminRosterCalculateUtilisationList && adminRosterCalculateUtilisationList.length ? adminRosterCalculateUtilisationList[2].holidayUtilisedValue : 'null',
            // holidayUtilised: adminRosterCalculateUtilisationList && adminRosterCalculateUtilisationList.length ? adminRosterCalculateUtilisationList[2].holidayUtilised : 'null',
        }
    };

    const options4 = {
        // title: adminRosterCalculateUtilisationList && adminRosterCalculateUtilisationList.length ? (adminRosterCalculateUtilisationList[3].utilisationType + ' Utilisation') : 'Permanent Utilisation',
        slices: [
            {
                color: "#5059ab"
            },
            {
                color: "#01cc9b"
            },
            // {
            //     color: "orange"
            // }
        ],
        legend: {
            position: "center",
            alignment: "center",
            textStyle: {
                color: "233238",
                fontSize: 14
            }
        },
        chartArea: {
            left: 0,
            top: 10,
            paddingTop: '20px', 
            width: "100%",
            height: "80%"
        },
        data: {
            utilisedValue: adminRosterCalculateUtilisationList && adminRosterCalculateUtilisationList.length ? adminRosterCalculateUtilisationList[3].utilisedValue : 'null',
            utilised: adminRosterCalculateUtilisationList && adminRosterCalculateUtilisationList.length ? adminRosterCalculateUtilisationList[3].utilised : 'null',
            unUtilisedValue: adminRosterCalculateUtilisationList && adminRosterCalculateUtilisationList.length ? adminRosterCalculateUtilisationList[3].unUtilisedValue : 'null',
            unUtilised: adminRosterCalculateUtilisationList && adminRosterCalculateUtilisationList.length ? adminRosterCalculateUtilisationList[3].unUtilised : 'null',
            // holidayUtilisedValue: adminRosterCalculateUtilisationList && adminRosterCalculateUtilisationList.length ? adminRosterCalculateUtilisationList[3].holidayUtilisedValue : 'null',
            // holidayUtilised: adminRosterCalculateUtilisationList && adminRosterCalculateUtilisationList.length ? adminRosterCalculateUtilisationList[3].holidayUtilised : 'null',
        }
    };

    return (
        <Fragment>
            <Container style={{paddingBottom: '30px'}}>
                <Row className='costCenter-row' style={{margin: '10px 0px', paddingTop: '10px', display: 'flex', justifyContent: 'flex-end'}}>
                    <Col style={{maxWidth:'20%'}}>
                        {costCenterList && costCenterList.length &&
                            <Select
                            name="filters"
                            // placeholder="Cost Center"
                            // value={costCenterList && costCenterList.length ? costCenterList[0].costCentreName : 'sdasd'}
                            defaultValue={{ label: costCenterList[0].costCentreName , value: costCenterList[0].costCentreName }}
                            options={costCenterList !== null ?
                                costCenterList.map(e => ({ label: e.costCentreName, value: e.costCentreName })) : []}
                            onChange={handleCostCenter}
                            required isSearchable />
                        }
                    </Col>
                    <Col style={{maxWidth:'20%', paddingRight: '0px'}}>
                        <Form.Control 
                            style={{
                                width: '150px', 
                                height: '40px', 
                                fontSize: '16px', 
                                padding: '0px 5px',
                                margin: '0px'
                            }} 
                            as="select" 
                            defaultValue={currentMonth}
                            onChange={monthSelected}
                        >
                            <option>Select month</option>
                            {months.map(month => (
                                <option>{month}</option>
                            ))}
                        </Form.Control>
                    </Col>
                    <Col style={{maxWidth:'20%', paddingRight: '0px'}}>
                        <Form.Control 
                            style={{
                                width: '150px', 
                                height: '40px', 
                                fontSize: '16px', 
                                padding: '0px 5px',
                                margin: '0px'
                            }} 
                            as="select" 
                            defaultValue={currentYear}
                            onChange={yearSelected}
                        >
                            <option>Select year</option>
                            {years.map(year => (
                                <option>{year}</option>
                            ))}
                        </Form.Control>
                    </Col>
                </Row>
                <Row>
                    <Col sm={12}>
                        <Card className='big-card p-30'>
                            <h2 className="roster-center">{adminRosterCalculateUtilisationList && adminRosterCalculateUtilisationList.length ? (adminRosterCalculateUtilisationList[3].utilisationType + ' Utilisation') : 'Overall Utilisation'}</h2>
                            {/* {console.log(adminRosterCalculateUtilisationList, 'adminRosterCalculateUtilisationList')} */}
                            { options4.data.utilisedValue > 0 || options4.data.unUtilisedValue > 0 ? <Chart
                                chartType="PieChart"
                                data={
                                    [
                                        ["Utilisation", "hrs"], 
                                        [`Utilised ${options4.data.utilisedValue} hrs (${options4.data.utilised})`, options4.data.utilisedValue], 
                                        [`Unutilised ${options4.data.unUtilisedValue} hrs (${options4.data.unUtilised})`, options4.data.unUtilisedValue], 
                                        // [`Holiday Utilization ${options4.data.holidayUtilisedValue} hrs (${options4.data.holidayUtilised})`, options4.data.holidayUtilisedValue]
                                    ]
                                }
                                options={options4}
                                width={"100%"}
                                height={"300px"}
                                legend_toggle
                            /> : <h3 style={{margin: 'auto'}}>No data available</h3> 
                            }
                        </Card>
                    </Col>
                </Row>
                <Row>    
                    <Col sm={4} px={0}>
                        <Card className='small-card1 p-10 small-card'>
                            <h4 className="roster-center">{adminRosterCalculateUtilisationList && adminRosterCalculateUtilisationList.length ? (adminRosterCalculateUtilisationList[0].utilisationType + ' Utilisation') : 'Permanent Utilisation'}</h4>
                            { options1.data.utilisedValue > 0 || options1.data.unUtilisedValue > 0 ? <Chart
                                chartType="PieChart"
                                data={
                                    [
                                        ["Utilisation", "hrs"], 
                                        [`Utilised ${options1.data.utilisedValue} hrs (${options1.data.utilised})`, options1.data.utilisedValue], 
                                        [`Unutilised ${options1.data.unUtilisedValue} hrs (${options1.data.unUtilised})`, options1.data.unUtilisedValue], 
                                        // [`Holiday Utilization ${options1.data.holidayUtilisedValue} hrs (${options1.data.holidayUtilised})`, options1.data.holidayUtilisedValue]
                                    ]
                                }
                                options={options1}
                                width={"100%"}
                                height={"150px"}
                                legend_toggle
                            /> : <h5 style={{margin: 'auto'}}>No data available</h5>
                            }
                        </Card>
                    </Col>
                    <Col sm={4} px={0}>
                        <Card className='small-card2 p-10 small-card'>
                            <h4 className="roster-center">{adminRosterCalculateUtilisationList && adminRosterCalculateUtilisationList.length ? (adminRosterCalculateUtilisationList[1].utilisationType + ' Utilisation') : 'Part Time Utilisation'}</h4>
                            { options2.data.utilisedValue > 0 || options2.data.unUtilisedValue > 0 ? <Chart
                                chartType="PieChart"
                                data={
                                    [
                                        ["Utilisation", "hrs"], 
                                        [`Utilised ${options2.data.utilisedValue} hrs (${options2.data.utilised})`, options2.data.utilisedValue], 
                                        [`Unutilised ${options2.data.unUtilisedValue} hrs (${options2.data.unUtilised})`, options2.data.unUtilisedValue], 
                                        // [`Holiday Utilization ${options2.data.holidayUtilisedValue} hrs (${options2.data.holidayUtilised})`, options2.data.holidayUtilisedValue]
                                    ]
                                }
                                options={options2}
                                width={"100%"}
                                height={"150px"}
                                legend_toggle
                            /> : <h5 style={{margin: 'auto'}}>No data available</h5>
                            }
                        </Card>
                    </Col>
                    <Col sm={4} px={0}>
                        <Card className='small-card3 p-10 small-card'>
                            <h4 className="roster-center">{adminRosterCalculateUtilisationList && adminRosterCalculateUtilisationList.length ? (adminRosterCalculateUtilisationList[2].utilisationType + ' Utilisation') : 'Internship Utilisation'}</h4>
                            { options3.data.utilisedValue > 0 || options3.data.unUtilisedValue > 0 ? <Chart
                                chartType="PieChart"
                                data={
                                    [
                                        ["Utilisation", "hrs"], 
                                        [`Utilised ${options3.data.utilisedValue} hrs (${options3.data.utilised})`, options3.data.utilisedValue], 
                                        [`Unutilised ${options3.data.unUtilisedValue} hrs (${options3.data.unUtilised})`, options3.data.unUtilisedValue], 
                                        // [`Holiday Utilization ${options3.data.holidayUtilisedValue} hrs (${options3.data.holidayUtilised})`, options3.data.holidayUtilisedValue]
                                    ]
                                }
                                options={options3}
                                width={"100%"}
                                height={"150px"}
                                legend_toggle
                            /> : <h5 style={{margin: 'auto'}}>No data available</h5>
                            }
                        </Card>
                    </Col>
                </Row>
                {/* {console.log(costCenter1, 'costCenter1')} */}
                <RosterTable storeId={costCenter1}/>
            </Container>
        </Fragment>
    );
};

export default RosterDashboard;