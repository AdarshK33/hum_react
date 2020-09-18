import React, { Fragment, useState, useContext, useEffect } from 'react';
import { Row, Col } from 'react-bootstrap';
import Graph from './graph/Graph';
import DatePicker from "react-datepicker";
import './dashboard.css';
import { ClusterContext } from "../../context/ClusterState";
import { DashboardContext } from "../../context/DashboardState";


function Dashboard () {

    const [startDate, setStartDate] = useState();
    const fromDateHandler = (date) => {
        let value = date;
        setStartDate(value);

    }
    useEffect(() => {
        viewCluster()
        viewCostCentre()
    }, []);
    const { cosCentreList,viewCostCentre } = useContext(DashboardContext);
    const { clusterList,viewCluster } = useContext(ClusterContext);
      

               return( <div>
                    <Row className="Row2" >                                
                        <Col></Col>
                        <Col xs={6}>
                            <Row>
                                <div className="col-sm-4">
                                    <div className="form-group">
                                        <label className="name f-w-600">Select Date &nbsp;</label>
                                        <DatePicker
                                        className="form-control Value"
                                        selected={startDate}
                                        dateFormat="yyyy-MM-dd"
                                        required
                                        // onChange={(date) => setStartDate(moment(date, 'YYYY-MM-DD'))}
                                        onChange={(e) => fromDateHandler(e)}
                                        />
                                    </div>
                                </div>
                                <div className="col-sm-4">
                                    <div className="form-group">
                                        <label className="name f-w-600" >Select Cluster&nbsp; </label>
                                        <select
                                            className="form-control Value"
                                            // style={{ width: "320px" }}
                                            // onChange={}
                                            >
                                                <option value ="">Select</option>
                                                { clusterList.map((e, i) => {
                                                    return(
                                                    <option key={i + 1} value={e.clusterName}>{e.clusterName}</option>)
                                                })}
                                           
                                            
                                        </select>
                                    </div>
                                </div>
                                <div className="col-sm-4">
                                    <div className="form-group">
                                        <label className="name f-w-600" >Select Store&nbsp; </label>
                                        <select
                                            className="form-control Value"
                                            // style={{ width: "320px" }}
                                            // onChange={}
                                            >
                                            <option value="">Select</option>
                                            { cosCentreList.map((e, i) => {
                                                    return(
                                                    <option key={i + 1} value={e.costCentreName}>{e.costCentreName}</option>)
                                                })}
                                            
                                        </select>
                                    </div>
                                </div>
                            </Row>
                        </Col>
                    </Row>
                    <Row className="Row3" > Cluster : Racket </Row>
                    <Row className="container-fluid">
                        <table style ={{width:'100%',textAlign:'left',margin: '0 2%',borderBottom:'1px solid #dee2e6' }} className="table">
                            <tr >
                                <td className="Tdwidth">Target productivity of cluster</td>
                                <td className="Tdwidth">20</td>
                                <td className="Tdwidth">Target productivity of store</td>
                                <td className="Tdwidth">14</td>
                            </tr>
                            <tr >
                                <td className="Tdwidth">Quality Target of cluster</td>
                                <td className="Tdwidth">420</td>
                                <td className="Tdwidth">Quality Piloted of store</td>
                                <td className="Tdwidth">420</td>
                            </tr>
                            <tr >
                                <td className="Tdwidth">Planned Hours of cluster</td>
                                <td className="Tdwidth">30</td>
                                <td className="Tdwidth">Quality Target of store</td>
                                <td className="Tdwidth"></td>
                            </tr>
                        </table>
                    </Row>
                    <Row className="container-fluid">
                        <Col></Col>
                        <Col xs={6}>
                        <table className="table" style ={{width:'100%',textAlign:'left',backgroundColor:'rgba(214, 242, 253, 1)',margin:'3% 0%'}}>
                        <tr >
                                
                                <td className="Tdwidth">Gap</td>
                                <td className="Tdwidth">-228</td>
                            </tr>
                            </table>
                        </Col>
                    </Row>
                    <Row className="container-fluid">
                        <table style ={{width:'100%',textAlign:'left',margin: '0 2%',borderBottom:'1px solid #dee2e6' }} className = "table">
                            <tr >
                                <td className="Tdwidth">Planned Hours FT</td>
                                <td className="Tdwidth">328</td>
                                <td className="Tdwidth">Planned Hours Store</td>
                                <td className="Tdwidth">295</td>
                            </tr>
                            <tr >
                                <td className="Tdwidth">Planned Hours PPT</td>
                                <td className="Tdwidth">461</td>
                                <td className="Tdwidth">Planned Hours FT</td>
                                <td className="Tdwidth">185</td>
                            </tr>
                            <tr >
                                <td className="Tdwidth">Planned Hours TPT</td>
                                <td className="Tdwidth"></td>
                                <td className="Tdwidth">Planned Hours PPT</td>
                                <td className="Tdwidth">42</td>
                            </tr>
                            <tr >
                                <td className="Tdwidth">Planned Hours INT</td>
                                <td className="Tdwidth"></td>
                                <td className="Tdwidth">Planned Hours INT</td>
                                <td className="Tdwidth">21</td>
                            </tr>
                        </table>
                    </Row>
                    <Row style ={{margin: '7% 0%'}}>                        
                        <Col><Graph/></Col>
                        
                    </Row>
                    <Row style ={{margin: '7% 0%', textAlign: "center"}}>                        
                        <Col><Graph/></Col>
                        
                    </Row>
                    <Row>
                        <Col></Col>
                        <Col xs={8}>
                            <table className="table table-bordered">
                                <th></th>
                                <th>This Year</th>
                                <th>Last Year</th>
                                <tr>
                                    <td>Planned Hours</td>
                                    <td>232</td>
                                    <td>280</td>
                                </tr>
                                <tr>
                                    <td>Target Quantity</td>
                                    <td>3248</td>
                                    <td>3916</td>
                                </tr>
                            </table>
                        </Col>
                        <Col></Col>
                    </Row>
                </div>
               );
}


export default Dashboard;