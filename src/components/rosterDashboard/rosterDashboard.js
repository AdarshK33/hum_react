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
        if(adminRosterCalculateUtilisationList && adminRosterCalculateUtilisationList.length)
        console.log(costCenterList, costCenter1, adminRosterCalculateUtilisationList, 'asdasd');
    },[costCenter1])

    const handleCostCenter = (options) => {
        let data2 = options !== null ? options.value : ''
        setCostCenter1(data2)
        console.log( data2, costCenter1, 'sdakjsdhashd');
    }

    const options1 = {
        title: adminRosterCalculateUtilisationList && adminRosterCalculateUtilisationList.length ? (adminRosterCalculateUtilisationList[0].utilisationType + ' Utilisation') : 'Permanent Utilisation',
        slices: [
            {
                color: "#5059ab"
            },
            {
                color: "#01cc9b"
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
            top: 0,
            width: "100%",
            height: "80%"
        },
        data: {
            utilisedValue: adminRosterCalculateUtilisationList && adminRosterCalculateUtilisationList.length ? adminRosterCalculateUtilisationList[0].utilisedValue : 'null',
            unUtilisedValue: adminRosterCalculateUtilisationList && adminRosterCalculateUtilisationList.length ? adminRosterCalculateUtilisationList[0].unUtilisedValue : 'null'
        }
    };

    const options2 = {
        title: adminRosterCalculateUtilisationList && adminRosterCalculateUtilisationList.length ? (adminRosterCalculateUtilisationList[1].utilisationType + ' Utilisation') : 'Permanent Utilisation',
        slices: [
            {
                color: "#5059ab"
            },
            {
                color: "#01cc9b"
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
            top: 0,
            width: "100%",
            height: "80%"
        },
        data: {
            utilisedValue: adminRosterCalculateUtilisationList && adminRosterCalculateUtilisationList.length ? adminRosterCalculateUtilisationList[1].utilisedValue : 'null',
            unUtilisedValue: adminRosterCalculateUtilisationList && adminRosterCalculateUtilisationList.length ? adminRosterCalculateUtilisationList[1].unUtilisedValue : 'null'
        }
    };

    const options3 = {
        title: adminRosterCalculateUtilisationList && adminRosterCalculateUtilisationList.length ? (adminRosterCalculateUtilisationList[2].utilisationType + ' Utilisation') : 'Permanent Utilisation',
        slices: [
            {
                color: "#5059ab"
            },
            {
                color: "#01cc9b"
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
            top: 0,
            width: "100%",
            height: "80%"
        },
        data: {
            utilisedValue: adminRosterCalculateUtilisationList && adminRosterCalculateUtilisationList.length ? adminRosterCalculateUtilisationList[2].utilisedValue : 'null',
            unUtilisedValue: adminRosterCalculateUtilisationList && adminRosterCalculateUtilisationList.length ? adminRosterCalculateUtilisationList[2].unUtilisedValue : 'null'
        }
    };

    const options4 = {
        title: adminRosterCalculateUtilisationList && adminRosterCalculateUtilisationList.length ? (adminRosterCalculateUtilisationList[3].utilisationType + ' Utilisation') : 'Permanent Utilisation',
        slices: [
            {
                color: "#5059ab"
            },
            {
                color: "#01cc9b"
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
            top: 0,
            width: "100%",
            height: "80%"
        },
        data: {
            utilisedValue: adminRosterCalculateUtilisationList && adminRosterCalculateUtilisationList.length ? adminRosterCalculateUtilisationList[3].utilisedValue : 'null',
            unUtilisedValue: adminRosterCalculateUtilisationList && adminRosterCalculateUtilisationList.length ? adminRosterCalculateUtilisationList[3].unUtilisedValue : 'null'
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
                            <h2>{options4.title}</h2>
                            <Chart
                                chartType="PieChart"
                                data={[["Utilised", "Unutilised"], [`Utilised ${options4.data.utilisedValue}`, options4.data.utilisedValue], [`Unutilised ${options4.data.unUtilisedValue}`, options4.data.unUtilisedValue]]}
                                options={options4}
                                width={"100%"}
                                height={"500px"}
                                legend_toggle
                            />
                        </Card>
                    </Col>
                </Row>
                <Row>    
                    <Col sm={4} px={0}>
                        <Card className='small-card1 p-10'>
                            <h4>{options1.title}</h4>
                            <Chart
                                chartType="PieChart"
                                data={[["Utilised", "Unutilised"], [`Utilised ${options1.data.utilisedValue}`, options1.data.utilisedValue], [`Unutilised ${options1.data.unUtilisedValue}`, options1.data.unUtilisedValue]]}
                                options={options1}
                                width={"100%"}
                                height={"250px"}
                                legend_toggle
                            />
                        </Card>
                    </Col>
                    <Col sm={4} px={0}>
                        <Card className='small-card2 p-10'>
                            <h4>{options2.title}</h4>
                            <Chart
                                chartType="PieChart"
                                data={[["Utilised", "Unutilised"], [`Utilised ${options2.data.utilisedValue}`, options2.data.utilisedValue], [`Unutilised ${options2.data.unUtilisedValue}`, options2.data.unUtilisedValue]]}
                                options={options2}
                                width={"100%"}
                                height={"250px"}
                                legend_toggle
                            />
                        </Card>
                    </Col>
                    <Col sm={4} px={0}>
                        <Card className='small-card3 p-10'>
                            <h4>{options3.title}</h4>
                            <Chart
                                chartType="PieChart"
                                data={[["Utilised", "Unutilised"], [`Utilised ${options3.data.utilisedValue}`, options3.data.utilisedValue], [`Unutilised ${options3.data.unUtilisedValue}`, options3.data.unUtilisedValue]]}
                                options={options3}
                                width={"100%"}
                                height={"250px"}
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