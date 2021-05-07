import React, { Fragment, useState, useEffect, useContext } from 'react';
import { Container, Row, Col, Card } from 'react-bootstrap'
import Chart from 'react-google-charts'
import { RosterContext } from "../../context/RosterState";
import Select from 'react-select'
import RosterTable from './rosterTable'

const RosterDashboard = () => {
    const [costCenter1, setCostCenter1] = useState();

    const {costCenterList, costCenter, adminRosterCalculateUtilisationList, adminRosterCalculateUtilisation} = useContext(RosterContext);

    useEffect(() => {
        costCenter()
        if(costCenter1)
        adminRosterCalculateUtilisation(costCenter1)
        // else 
        // adminRosterCalculateUtilisation('IN1041');
        // if(adminRosterCalculateUtilisationList && adminRosterCalculateUtilisationList.length)
        // console.log(costCenterList, costCenter1, adminRosterCalculateUtilisationList, 'asdasd');
    },[costCenter1])

    const handleCostCenter = (options) => {
        let data2 = options !== null ? options.value : ''
        setCostCenter1(data2)
        console.log( data2, costCenter1, 'sdakjsdhashd');
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
            {
                color: 'orange'
            }
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
            holidayUtilisedValue: adminRosterCalculateUtilisationList && adminRosterCalculateUtilisationList.length ? adminRosterCalculateUtilisationList[0].holidayUtilisedValue : 'null',
            holidayUtilised: adminRosterCalculateUtilisationList && adminRosterCalculateUtilisationList.length ? adminRosterCalculateUtilisationList[0].holidayUtilised : 'null',
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
            {
                color: 'orange'
            }
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
            holidayUtilisedValue: adminRosterCalculateUtilisationList && adminRosterCalculateUtilisationList.length ? adminRosterCalculateUtilisationList[1].holidayUtilisedValue : 'null',
            holidayUtilised: adminRosterCalculateUtilisationList && adminRosterCalculateUtilisationList.length ? adminRosterCalculateUtilisationList[1].holidayUtilised : 'null',
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
            {
                color: 'orange'
            }
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
            holidayUtilisedValue: adminRosterCalculateUtilisationList && adminRosterCalculateUtilisationList.length ? adminRosterCalculateUtilisationList[2].holidayUtilisedValue : 'null',
            holidayUtilised: adminRosterCalculateUtilisationList && adminRosterCalculateUtilisationList.length ? adminRosterCalculateUtilisationList[2].holidayUtilised : 'null',
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
            {
                color: "orange"
            }
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
            holidayUtilisedValue: adminRosterCalculateUtilisationList && adminRosterCalculateUtilisationList.length ? adminRosterCalculateUtilisationList[3].holidayUtilisedValue : 'null',
            holidayUtilised: adminRosterCalculateUtilisationList && adminRosterCalculateUtilisationList.length ? adminRosterCalculateUtilisationList[3].holidayUtilised : 'null',
        }
    };

    return (
        <Fragment>
            <Container style={{paddingBottom: '30px'}}>
                <Row className='costCenter-row' style={{margin: '10px 0px', paddingTop: '10px', display: 'flex', justifyContent: 'flex-end'}}>
                    <Col style={{maxWidth:'20%'}}>
                        <Select
                            name="filters"
                            placeholder="Cost Center"
                            options={costCenterList !== null ?
                                costCenterList.map(e => ({ label: e.costCentreName, value: e.costCentreName })) : []}
                            onChange={handleCostCenter}
                            required isSearchable />
                    </Col>
                </Row>
                <Row>
                    <Col sm={12}>
                        <Card className='big-card p-30'>
                            <h2 className="roster-center">{adminRosterCalculateUtilisationList && adminRosterCalculateUtilisationList.length ? (adminRosterCalculateUtilisationList[3].utilisationType + ' Utilisation') : 'Overall Utilisation'}</h2>
                            <Chart
                                chartType="PieChart"
                                data={[["Utilisation", "hrs"], [`Utilised ${options4.data.utilisedValue} hrs (${options4.data.utilised})`, options4.data.utilisedValue], [`Unutilised ${options4.data.unUtilisedValue} hrs (${options4.data.unUtilised})`, options4.data.unUtilisedValue], [`Holiday Utilization ${options4.data.holidayUtilisedValue} hrs (${options4.data.holidayUtilised})`, options4.data.holidayUtilisedValue]]}
                                options={options4}
                                width={"100%"}
                                height={"300px"}
                                legend_toggle
                            />
                        </Card>
                    </Col>
                </Row>
                <Row>    
                    <Col sm={4} px={0}>
                        <Card className='small-card1 p-10'>
                            <h4 className="roster-center">{adminRosterCalculateUtilisationList && adminRosterCalculateUtilisationList.length ? (adminRosterCalculateUtilisationList[0].utilisationType + ' Utilisation') : 'Permanent Utilisation'}</h4>
                            <Chart
                                chartType="PieChart"
                                data={[["Utilisation", "hrs"], [`Utilised ${options1.data.utilisedValue} hrs (${options1.data.utilised})`, options1.data.utilisedValue], [`Unutilised ${options1.data.unUtilisedValue} hrs (${options1.data.unUtilised})`, options1.data.unUtilisedValue], [`Holiday Utilization ${options1.data.holidayUtilisedValue} hrs (${options1.data.holidayUtilised})`, options1.data.holidayUtilisedValue]]}
                                options={options1}
                                width={"100%"}
                                height={"150px"}
                                legend_toggle
                            />
                        </Card>
                    </Col>
                    <Col sm={4} px={0}>
                        <Card className='small-card2 p-10'>
                            <h4 className="roster-center">{adminRosterCalculateUtilisationList && adminRosterCalculateUtilisationList.length ? (adminRosterCalculateUtilisationList[1].utilisationType + ' Utilisation') : 'Part Time Utilisation'}</h4>
                            <Chart
                                chartType="PieChart"
                                data={[["Utilisation", "hrs"], [`Utilised ${options2.data.utilisedValue} hrs (${options2.data.utilised})`, options2.data.utilisedValue], [`Unutilised ${options2.data.unUtilisedValue} hrs (${options2.data.unUtilised})`, options2.data.unUtilisedValue], [`Holiday Utilization ${options2.data.holidayUtilisedValue} hrs (${options2.data.holidayUtilised})`, options2.data.holidayUtilisedValue]]}
                                options={options2}
                                width={"100%"}
                                height={"150px"}
                                legend_toggle
                            />
                        </Card>
                    </Col>
                    <Col sm={4} px={0}>
                        <Card className='small-card3 p-10'>
                            <h4 className="roster-center">{adminRosterCalculateUtilisationList && adminRosterCalculateUtilisationList.length ? (adminRosterCalculateUtilisationList[2].utilisationType + ' Utilisation') : 'Internship Utilisation'}</h4>
                            <Chart
                                chartType="PieChart"
                                data={[["Utilisation", "hrs"], [`Utilised ${options3.data.utilisedValue} hrs (${options3.data.utilised})`, options3.data.utilisedValue], [`Unutilised ${options3.data.unUtilisedValue} hrs (${options3.data.unUtilised})`, options3.data.unUtilisedValue], [`Holiday Utilization ${options3.data.holidayUtilisedValue} hrs (${options3.data.holidayUtilised})`, options3.data.holidayUtilisedValue]]}
                                options={options3}
                                width={"100%"}
                                height={"150px"}
                                legend_toggle
                            />
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