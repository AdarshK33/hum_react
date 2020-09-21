import React, { useState, useContext, useEffect } from 'react';
import { Row, Col } from 'react-bootstrap';
import Graph from './graph/Graph';
import DatePicker from "react-datepicker";
import './dashboard.css';
import { ClusterContext } from "../../context/ClusterState";
import { DashboardContext } from "../../context/DashboardState";


function Dashboard () {
    const { cosCentreList,viewCostCentre,viewData,graphData } = useContext(DashboardContext);

    const [startDate, setStartDate] = useState();
    const [StoreType, setStoreType] = useState('');
    const [ClusterType, setClusterType] = useState('');
    const [clusterFT, setclusterFT] = useState(0);
    const [clusterPPT, setclusterPPT] = useState(0);
    const [clusterTPT, setclusterTPT] = useState(0);
    const [clusterINT, setclusterINT] = useState(0);
    const [storeFT, setstoreFT] = useState(0);
    const [storePPT, setstorePPT] = useState(0);
    const [storeINT, setstoreINT] = useState(0);


    const fromDateHandler = (e) => {        
        setStartDate(e);        
        if(StoreType !== "" && ClusterType !== "" ){
            viewData(e,StoreType,ClusterType)
        }
        

    }
   
    const fromStoreHandler = (e) => {
        setStoreType(e);
        if(startDate !== undefined && ClusterType !== "" ){
            viewData(startDate,e,ClusterType)
        }
        

    }
    const fromClusterHandler = (e) => {
        setClusterType(e);
        if(startDate !== undefined && StoreType !== "" ){
            viewData(startDate,StoreType,e)
        }
        

    }
   
    useEffect(() => {
        viewCluster()
        viewCostCentre()
    }, []);
   
    const { clusterList,viewCluster } = useContext(ClusterContext);
    console.log(graphData);
      
   
        let dpsQtyStore = [];
        let dpsQtyCluster = [];
        let dpshoursCluster = [];
        let dpshoursStore = [];

        
        if(graphData[0] != undefined){

            for(let i = 1; i<=24; i++){
                for(let x in graphData[0].graphData){
                    if(i == graphData[0].graphData[x].id){
                        dpsQtyStore.push({label: x, y: graphData[0].graphData[x].qtyStore,id : graphData[0].graphData[x].id});
                        dpsQtyCluster.push({label: x, y: graphData[0].graphData[x].qtyCluster});
                        dpshoursStore.push({label: x, y: graphData[0].graphData[x].hoursStore});
                        dpshoursCluster.push({label: x, y: graphData[0].graphData[x].hoursCluster});
                        
                    }                   			
                    
                }
            }
                     
            for (let item in graphData[0].rosterCluster){
                if(graphData[0].rosterCluster[item].contractType == "permanent"){
                    setclusterFT(clusterFT + graphData[0].rosterCluster[item].workingHours);
                }
                if(graphData[0].rosterCluster[item].contractType == "parttime"){
                    setclusterPPT(clusterPPT + graphData[0].rosterCluster[item].workingHours);
                }
                if(graphData[0].rosterCluster[item].contractType == "internship"){
                    setclusterINT(clusterINT + graphData[0].rosterCluster[item].workingHours);
                }
                if(graphData[0].rosterCluster[item].contractType == "temporary"){
                    setclusterTPT(clusterTPT + graphData[0].rosterCluster[item].workingHours);
                }

            }
            for (let item in graphData[0].rosterStore){
                if(graphData[0].rosterStore[item].contractType == "permanent"){
                    setstoreFT(storeFT + graphData[0].rosterStore[item].workingHours);
                }
                if(graphData[0].rosterStore[item].contractType == "parttime"){
                    setstorePPT(storePPT + graphData[0].rosterStore[item].workingHours);
                }
                if(graphData[0].rosterStore[item].contractType == "internship"){
                    setstoreINT(storeINT + graphData[0].rosterStore[item].workingHours);
                }
                               
            }
        }
           
        
        
		
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
                                        onChange={(e) => fromDateHandler(e)}
                                        />
                                    </div>
                                </div>
                                <div className="col-sm-4">
                                    <div className="form-group">
                                        <label className="name f-w-600" >Select Cluster&nbsp; </label>
                                        <select
                                            className="form-control Value"
                                            onChange={(e)=>fromClusterHandler(e.target.value)}
                                            >
                                                <option value ="">Select</option>
                                                { clusterList.map((e, i) => {
                                                    return(
                                                    <option key={i + 1} value={e.clusterId}>{e.clusterName}</option>)
                                                })}
                                           
                                            
                                        </select>
                                    </div>
                                </div>
                                <div className="col-sm-4">
                                    <div className="form-group">
                                        <label className="name f-w-600" >Select Store&nbsp; </label>
                                        <select
                                            className="form-control Value"
                                            onChange={(e)=>fromStoreHandler(e.target.value)}
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
                                <td className="Tdwidth">{graphData[0] != undefined ? graphData[0].hoursData[0].clusterProductivityTarget: "0"}</td>
                                <td className="Tdwidth">Target productivity of store</td>
                                <td className="Tdwidth">{graphData[0] != undefined ? graphData[0].hoursData[0].storeProductivityTarget: "0"}</td>
                            </tr>
                            <tr >
                                <td className="Tdwidth">Quality Target of cluster</td>
                                <td className="Tdwidth">{graphData[0] != undefined ? graphData[0].hoursData[0].clusterQtyTarget: "0"}</td>
                                <td className="Tdwidth">Quality Piloted of store</td>
                                <td className="Tdwidth">{graphData[0] != undefined ? (graphData[0].hoursData[0].storeQtyPiloted).toFixed(2): "0"}</td>
                            </tr>
                            <tr >
                                <td className="Tdwidth">Planned Hours of cluster</td>
                                <td className="Tdwidth">{graphData[0] != undefined ? graphData[0].hoursData[0].clusterPlannedHours: "0"}</td>
                                <td className="Tdwidth">Quality Target of store</td>
                                <td className="Tdwidth">{graphData[0] != undefined ? graphData[0].hoursData[0].storeQtYTarget: "0"}</td>
                            </tr>
                        </table>
                    </Row>
                    <Row className="container-fluid">
                        <Col></Col>
                        <Col xs={6}>
                        <table className="table" style ={{width:'100%',textAlign:'left',backgroundColor:'rgba(214, 242, 253, 1)',margin:'3% 0%'}}>
                        <tr >
                                
                                <td className="Tdwidth">Gap</td>
                                <td className="Tdwidth">{graphData[0] != undefined ? (graphData[0].hoursData[0].storeQtYTarget - graphData[0].hoursData[0].storeQtyPiloted).toFixed(2) : "0"}</td>
                            </tr>
                            </table>
                        </Col>
                    </Row>
                    <Row className="container-fluid">
                        <table style ={{width:'100%',textAlign:'left',margin: '0 2%',borderBottom:'1px solid #dee2e6' }} className = "table">
                            <tr >
                                <td className="Tdwidth">Planned Hours FT</td>
                                <td className="Tdwidth">{clusterFT}</td>
                                <td className="Tdwidth">Planned Hours Store</td>
                                <td className="Tdwidth">{graphData[0] != undefined ? graphData[0].hoursData[0].storePlannedHours: "0"}</td>
                            </tr>
                            <tr >
                                <td className="Tdwidth">Planned Hours PPT</td>
                                <td className="Tdwidth">{clusterPPT}</td>
                                <td className="Tdwidth">Planned Hours FT</td>
                                <td className="Tdwidth">{storeFT}</td>
                            </tr>
                            <tr >
                                <td className="Tdwidth">Planned Hours TPT</td>
                                <td className="Tdwidth">{clusterTPT}</td>
                                <td className="Tdwidth">Planned Hours PPT</td>
                                <td className="Tdwidth">{storePPT}</td>
                            </tr>
                            <tr >
                                <td className="Tdwidth">Planned Hours INT</td>
                                <td className="Tdwidth">{clusterINT}</td>
                                <td className="Tdwidth">Planned Hours INT</td>
                                <td className="Tdwidth">{storeINT}</td>
                            </tr>
                        </table>
                    </Row>
                    {/* {graphData[0] != undefined?                     */}
                        <div>
                            <Row style ={{margin: '7% 0%'}}>                        
                            <Col><Graph name = "Cluster - Daily Qty vs No. of hours Planned" hours = {dpshoursCluster} Qty={dpsQtyCluster}/></Col>
                            
                            </Row>
                            <Row style ={{margin: '7% 0%', textAlign: "center"}}>                        
                                <Col><Graph name = "Store - Daily Qty vs No. of hours Planned" hours={dpshoursStore} Qty = {dpsQtyStore}/></Col>
                                
                            </Row>
                        </div>
                     {/* : ""} */}
                   
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