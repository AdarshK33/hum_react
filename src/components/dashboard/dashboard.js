import React, { useState, useContext, useEffect } from 'react';
import { Row, Col } from 'react-bootstrap';
import Graph from './graph/Graph';
import DatePicker from "react-datepicker";
import './dashboard.css';
import { ClusterContext } from "../../context/ClusterState";
import { DashboardContext } from "../../context/DashboardState";

import { AppContext } from "../../context/AppState";




function Dashboard() {
    const { cosCentreList, viewCostCentre, viewData, graphData } = useContext(DashboardContext);

    const { user, getUserInfo } = useContext(AppContext);
    const [startDate, setStartDate] = useState();
    const [StoreType, setStoreType] = useState('');
    const [ClusterType, setClusterType] = useState('');
    const [ClusterName, setClusterName] = useState('');
    var days = ['Sunday', 'Monday', 'Tuesday', 'Wednesday', 'Thursday', 'Friday', 'Saturday'];
    const today = new Date();

    const fromDateHandler = (e) => {
        setStartDate(e);


        if (StoreType !== "" && ClusterType !== "") {
            viewData(e, StoreType, ClusterType)
        }



    }
    useEffect(() => {
        getUserInfo()
    }, [])
    function week_no(dt) {
        var tdt = new Date(dt.valueOf());
        var dayn = (dt.getDay() + 6) % 7;
        tdt.setDate(tdt.getDate() - dayn + 3);
        var firstThursday = tdt.valueOf();
        tdt.setMonth(0, 1);
        if (tdt.getDay() !== 4) {
            tdt.setMonth(0, 1 + ((4 - tdt.getDay()) + 7) % 7);
        }
        return 1 + Math.ceil((firstThursday - tdt) / 604800000);
    }


    const fromStoreHandler = (e) => {
        setStoreType(e);
        if (startDate !== undefined && ClusterType !== "") {
            viewData(startDate, e, ClusterType)
        }


    }
    const fromClusterHandler = (e) => {
        setClusterType(e.target.value);
        let idx = e.target.selectedIndex;

        if (e.target.options[idx].innerHTML !== "Select") {
            setClusterName(e.target.options[idx].innerHTML);
        } else {
            setClusterName("");
        }
        if (startDate !== undefined && StoreType !== "") {
            viewData(startDate, StoreType, e.target.value);

        }


    }

    const { clusterList, viewCluster, viewClusterCostCenter, clusterCostCenterList, } = useContext(ClusterContext);

    useEffect(() => {
        viewCluster()
        viewCostCentre()
        if (user.costCentre !== undefined) {
            viewClusterCostCenter(user.costCentre)
        }

        // console.log(clusterList)
        // if(user.loginType !== '1' && user.loginType !== '9'){
        setStoreType(user.costCentre)
        // }
    }, [user.costCentre]);

    useEffect(() => {
        setStartDate(today)
        if (cosCentreList !== undefined && cosCentreList !== null && cosCentreList.length > 0 && clusterList !== null && clusterList !== undefined && clusterList.length > 0) {
            setStartDate(today)
            viewData(today, cosCentreList[0].costCentreName, clusterList[0].clusterId);
        }
    }, [user.costCentre]);



    let dpsQtyStore = [];
    let dpsQtyCluster = [];
    let dpshoursCluster = [];
    let dpshoursStore = [];
    let roasterHour = [];
    let clusterHours = [];

    let FTcluster = 0, PPTcluster = 0, INTcluster = 0, TPTcluster = 0, FTstore = 0, PPTstore = 0, INTstore = 0;
    if (graphData !== null && graphData[0] !== undefined) {

        for (let i = 1; i <= 24; i++) {
            for (let x in graphData[0].graphData) {
                if (i === graphData[0].graphData[x].id) {
                    dpsQtyStore.push({ label: x, y: graphData[0].graphData[x].qtyStore });
                    dpsQtyCluster.push({ label: x, y: graphData[0].graphData[x].qtyCluster });
                    dpshoursStore.push({ label: x, y: graphData[0].graphData[x].hoursStore });
                    dpshoursCluster.push({ label: x, y: graphData[0].graphData[x].hoursCluster });

                }

            }
        }


        for (let item in graphData[0].rosterCluster) {
            if (graphData[0].rosterCluster[item].contractType === "permanent") {
                FTcluster = FTcluster + graphData[0].rosterCluster[item].workingHours;
            }
            if (graphData[0].rosterCluster[item].contractType === "parttime") {
                PPTcluster = PPTcluster + graphData[0].rosterCluster[item].workingHours;
            }
            if (graphData[0].rosterCluster[item].contractType === "internship") {
                INTcluster = INTcluster + graphData[0].rosterCluster[item].workingHours;
            }
            if (graphData[0].rosterCluster[item].contractType === "temporary") {
                TPTcluster = TPTcluster + graphData[0].rosterCluster[item].workingHours;
            }

        }
        clusterHours.push({ permanent: FTcluster });
        clusterHours.push({ parttime: PPTcluster });
        clusterHours.push({ internship: INTcluster });
        clusterHours.push({ temporary: TPTcluster });


        for (let item in graphData[0].rosterStore) {
            if (graphData[0].rosterStore[item].contractType === "permanent") {
                FTstore = FTstore + graphData[0].rosterStore[item].workingHours;
            }
            if (graphData[0].rosterStore[item].contractType === "parttime") {
                PPTstore = PPTstore + graphData[0].rosterStore[item].workingHours;
            }
            if (graphData[0].rosterStore[item].contractType === "internship") {
                INTstore = INTstore + graphData[0].rosterStore[item].workingHours;
            }

        }
        roasterHour.push({ permanent: FTstore });
        roasterHour.push({ parttime: PPTstore });
        roasterHour.push({ internship: INTstore });


    } else {
        dpsQtyStore.splice(0, dpsQtyStore.length);
        dpsQtyCluster.splice(0, dpsQtyCluster.length);
        dpshoursStore.splice(0, dpshoursStore.length);
        dpshoursCluster.splice(0, dpshoursCluster.length);
    }


    return (



        <div>
            <Row className="Row2" >
                <Col>
                    <Row>
                        <div className="col-sm-4">
                            <div className="form-group" style={{ paddingTop: "35px" }}>
                                Week no : {startDate !== undefined ? week_no(startDate) : 0}
                            </div>
                        </div>
                        <div className="col-sm-4">
                            <div className="form-group" style={{ paddingTop: "35px" }}>
                                Day :  {startDate !== undefined ? days[startDate.getDay()] : 0}
                            </div>
                        </div>
                    </Row>

                </Col>
                <Col xs={6}>

                    <Row>
                        <div className="col-sm-4">
                            <div className="form-group">
                                <label className="name f-w-600"> Date<span style={{ color: 'red' }}>*</span> &nbsp;</label>
                                <DatePicker
                                    className="form-control Value"
                                    selected={startDate}
                                    dateFormat="yyyy-MM-dd"
                                    // readOnly
                                    required
                                    onChange={(e) => fromDateHandler(e)}
                                />
                            </div>
                        </div>
                        <div className="col-sm-4">
                            <div className="form-group">
                                <label className="name f-w-600" >Select Cluster<span style={{ color: 'red' }}>*</span>&nbsp; </label>
                                {user.loginType === "1" || user.loginType === "9" || user.additionalRole === "1" || user.additionalRole === "9" ?


                                    <select
                                        className="form-control Value"
                                        onChange={(e) => fromClusterHandler(e)}
                                    >
                                        {/* <option value ="">{clusterList !== undefined ?clusterList[0].clusterName : " "}</option> */}

                                        {clusterList !== null &&
                                            clusterList.map((e, i) => {
                                                return (
                                                    <option key={i + 1} value={e.clusterId} >{e.clusterName}</option>)
                                            })}


                                    </select> :

                                    <select
                                        className="form-control Value"
                                        onChange={(e) => fromClusterHandler(e)}
                                    >
                                        {clusterCostCenterList == null ?

                                            <option value="">No Options</option> :

                                            clusterCostCenterList.map((e, i) => {
                                                return (
                                                    <option key={i + 1} value={e.clusterId} >{e.clusterName}</option>)
                                            })
                                        }





                                    </select>
                                }
                            </div>
                        </div>
                        <div className="col-sm-4">
                            <div className="form-group">
                                <label className="name f-w-600" >Select Store<span style={{ color: 'red' }}>*</span>&nbsp; </label>
                                {user.loginType === "1" || user.loginType === "9" || user.additionalRole === "1" || user.additionalRole === "9" ?
                                    <select
                                        className="form-control Value"
                                        onChange={(e) => fromStoreHandler(e.target.value)}
                                    >
                                        {/* <option value="">Select</option> */}
                                        {cosCentreList !== null && cosCentreList !== undefined && cosCentreList.map((e, i) => {
                                            return (
                                                <option key={i + 1} value={e.costCentreName}>{e.costCentreName}</option>)
                                        })}

                                    </select>
                                    :
                                    <input type="text" className="form-control Value" required readOnly value={user.costCentre} />
                                }
                            </div>
                        </div>
                    </Row>

                </Col>
            </Row>
            <Row className="Row3" > Cluster : {ClusterName} </Row>
            <Row className="container-fluid">
                <table style={{ width: '100%', textAlign: 'left', margin: '0 2%', borderBottom: '1px solid #dee2e6' }} className="table">
                    <tbody>
                        <tr className="Border">
                            <td className="Tdwidth Border">Target productivity of cluster</td>
                            <td className="Tdwidth Border">{graphData !== null && graphData[0] !== undefined ? graphData[0].hoursData[0].clusterProductivityTarget : "0"}</td>
                            <td className="Tdwidth Border">Target productivity of store</td>
                            <td className="Tdwidth Border">{graphData !== null && graphData[0] !== undefined ? graphData[0].hoursData[0].storeProductivityTarget : "0"}</td>
                        </tr>
                        <tr >
                            <td className="Tdwidth">Quality Target of cluster</td>
                            <td className="Tdwidth">{graphData !== null && graphData[0] !== undefined ? graphData[0].hoursData[0].clusterQtyTarget : "0"}</td>
                            <td className="Tdwidth">Quality Piloted of store</td>
                            <td className="Tdwidth">{graphData !== null && graphData[0] !== undefined ? (graphData[0].hoursData[0].storeQtyPiloted).toFixed(2) : "0"}</td>
                        </tr>
                        <tr >
                            <td className="Tdwidth">Planned Hours of cluster</td>
                            <td className="Tdwidth">{graphData !== null && graphData[0] !== undefined ? graphData[0].hoursData[0].clusterPlannedHours : "0"}</td>
                            <td className="Tdwidth">Quality Target of store</td>
                            <td className="Tdwidth">{graphData !== null && graphData[0] !== undefined ? graphData[0].hoursData[0].storeQtYTarget : "0"}</td>
                        </tr>
                    </tbody>

                </table>
            </Row>
            <Row className="container-fluid">
                <Col></Col>
                <Col xs={6}>
                    <table className="table" style={{ width: '100%', textAlign: 'left', backgroundColor: '#376ebb', color: 'white', margin: '3% 0%' }}>
                        <tbody>
                            <tr >

                                <td className="Tdwidth Border">Gap</td>
                                <td className="Tdwidth Border">{graphData !== null && graphData[0] !== undefined ? (graphData[0].hoursData[0].storeQtYTarget - graphData[0].hoursData[0].storeQtyPiloted).toFixed(2) : "0"}</td>
                            </tr>
                        </tbody>
                    </table>
                </Col>
            </Row>
            <Row className="container-fluid">
                <table style={{ width: '100%', textAlign: 'left', margin: '0 2%', borderBottom: '1px solid #dee2e6' }} className="table">
                    <tbody>
                        <tr >
                            <td className="Tdwidth">Planned Hours FT</td>
                            <td className="Tdwidth">{clusterHours.length !== 0 ? clusterHours[0].permanent : 0}</td>
                            <td className="Tdwidth">Planned Hours Store</td>
                            <td className="Tdwidth">{graphData !== null && graphData[0] !== undefined ? graphData[0].hoursData[0].storePlannedHours : "0"}</td>
                        </tr>
                        <tr >
                            <td className="Tdwidth">Planned Hours PPT</td>
                            <td className="Tdwidth">{clusterHours.length !== 0 ? clusterHours[1].parttime : 0}</td>
                            <td className="Tdwidth">Planned Hours FT</td>
                            <td className="Tdwidth">{roasterHour.length !== 0 ? roasterHour[0].permanent : 0}</td>
                        </tr>
                        <tr >
                            <td className="Tdwidth">Planned Hours TPT</td>
                            <td className="Tdwidth">{clusterHours.length !== 0 ? clusterHours[3].temporary : 0}</td>
                            <td className="Tdwidth">Planned Hours PPT</td>
                            <td className="Tdwidth">{roasterHour.length !== 0 ? roasterHour[1].parttime : 0}</td>
                        </tr>
                        <tr >
                            <td className="Tdwidth">Planned Hours INT</td>
                            <td className="Tdwidth">{clusterHours.length !== 0 ? clusterHours[2].internship : 0}</td>
                            <td className="Tdwidth">Planned Hours INT</td>
                            <td className="Tdwidth">{roasterHour.length !== 0 ? roasterHour[2].internship : 0}</td>
                        </tr>
                    </tbody>
                </table>
            </Row>

            <div>
                <Row style={{ margin: '7% 0%' }}>
                    <Col><Graph name="Cluster - Daily Qty vs No. of hours Planned" hours={dpshoursCluster} Qty={dpsQtyCluster} /></Col>

                </Row>
                <Row style={{ margin: '7% 0%', textAlign: "center" }}>
                    <Col><Graph name="Store - Daily Qty vs No. of hours Planned" hours={dpshoursStore} Qty={dpsQtyStore} /></Col>

                </Row>
            </div>


            {/* <Row>
                        <Col></Col>
                        <Col xs={8}>
                            <table className="table table-bordered">
                            <tbody>
                                    <tr>
                                        <th></th>
                                        <th>This Year</th>
                                        <th>Last Year</th>
                                    </tr>
                                
                                
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
                                </tbody>
                            </table>
                        </Col>
                        <Col></Col>
                    </Row> */}
        </div>

    );
}


export default Dashboard;
