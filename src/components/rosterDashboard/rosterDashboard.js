import React, { Fragment, useState, useEffect, useContext } from 'react';
import { Container, Row, Col, Card } from 'react-bootstrap'
import Chart from 'react-google-charts'
import { RosterContext } from "../../context/RosterState";
import Select from 'react-select'

const RosterDashboard = () => {
    const [costCenter1, setCostCenter1] = useState();

    const {costCenterList, costCenter} = useContext(RosterContext);

    useEffect(() => {
        costCenter()
    },[])

    const handleCostCenter = (options) => {
        let data2 = options !== null ? options.value : ''
        setCostCenter1(data2)
    }

    const options1 = {
        title: "Overall Utilisation",
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
        }
    };

    const options2 = {
        title: "Part Time Utilisation",
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
        }
    };

    return (
        <Fragment>
            <Container>
                <Row className='costCenter-row'>
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
                    <Col sm={5}>
                        <Card className='big-card'>
                            <Chart
                                chartType="PieChart"
                                data={[["Utilised", "Unutilised"], ["Utilised", 7], ["Unutilised", 3]]}
                                options={options1}
                                width={"100%"}
                                height={"500px"}
                                legend_toggle
                            />
                        </Card>
                    </Col>
                    <Col sm={7}>
                        <Row>
                            <Col>
                                <Card className='small-card1'>
                                    <Chart
                                        chartType="PieChart"
                                        data={[["Utilised", "Unutilised"], ["Utilised", 7], ["Unutilised", 3]]}
                                        options={options2}
                                        width={"100%"}
                                        height={"250px"}
                                        legend_toggle
                                    />
                                </Card>
                            </Col>
                        </Row>
                        <Row>
                            <Col>
                                <Card className='small-card2'>
                                    <Chart
                                        chartType="PieChart"
                                        data={[["Utilised", "Unutilised"], ["Utilised", 7], ["Unutilised", 3]]}
                                        options={options2}
                                        width={"100%"}
                                        height={"250px"}
                                        legend_toggle
                                    />
                                </Card>
                            </Col>
                        </Row>
                    </Col>
                </Row>
            </Container>
        </Fragment>
    );
};

export default RosterDashboard;