import React, { Fragment, useState } from 'react';
import { Container, Row, Col } from 'react-bootstrap'
import { Link } from 'react-router-dom'
import DatePicker from 'react-datepicker'
import "react-datepicker/dist/react-datepicker.css";

const RosterTable = () => {
    const [startDate, setStartDate] = useState(new Date())
    const [endDate, setEndDate] = useState(new Date())

    return (
        <Fragment>
            <Container>
                <Row>
                    <Col>
                        <Link>Daily</Link>
                        <Link>Weekly</Link>
                        <Link>Monthly</Link>
                    </Col>
                    <Col>
                        <label>Start Date</label>
                        <DatePicker selected={startDate} onChange={(date) => setStartDate(date)}
                            className="input_date" dateFormat="yyyy-MM-dd"
                            placeholderText="From Date" required />

                        <label>End Date</label>
                        <DatePicker selected={endDate} onChange={(date) => setEndDate(date)}
                            className="input_date" dateFormat="yyyy-MM-dd"
                            placeholderText="From Date" required />
                    </Col>
                </Row>
            </Container>
        </Fragment>
    );
};

export default RosterTable;