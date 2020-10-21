import React, { Fragment, useEffect, useContext, useState} from 'react';
import Breadcrumb from '../common/breadcrumb';
import ReactHTMLTableToExcel from 'react-html-table-to-excel';
import Pagination from 'react-js-pagination'
import { MasterFilesContext } from "../../context/MasterFilesState";
import { DashboardContext } from "../../context/DashboardState";
import { Button, Modal,Form, Table, Row, Container } from "react-bootstrap";


const MasterDailyQty = () => {

  const {dailyQty, viewDailyQty, uploadDailyQty} = useContext(MasterFilesContext);
  const { cosCentreList, viewCostCentre } = useContext(DashboardContext);


  const [date, setDate] = useState();
  const [costCenter, setCostCenter] = useState();

  useEffect(() =>{
    viewCostCentre()
  }, [])

    
  const changeHandler = (event) => {
    let fileObj = event.target.files[0];
    console.log("clicked", fileObj)
    uploadDailyQty(fileObj)
  }

  const costCenterHandler = e => {
    // console.log(e.target.value);
    setCostCenter(e.target.value);
  }

  const dateHandler = (d) =>{
    // console.log(d);
    setDate(d);
  }

  const onSubmit = (e) =>{
    e.preventDefault();
    viewDailyQty(costCenter, date);
  }

  return (
    <Fragment>
      <Breadcrumb title="Master" parent="Week Master" />
      <div className="container-fluid">
      <Form 
        onSubmit={onSubmit}
        >
          <Row>
            <div className="col-sm-4">
              <Form.Group>
                <Form.Label>Select Date</Form.Label><span style = {{color:'red'}}>*</span>
                <input 
                  type="date" 
                  style={{ fontSize: "0.8rem" }} 
                  className="form-control digit"                   
                  placeholder="Enter Date"
                  required 
                  onChange={(e) => dateHandler(e.target.value)} 
                  value={date} 
                />
              </Form.Group>
            </div>
            <div className="col-sm-4">
              <Form.Group>
                <Form.Label>Cost Center</Form.Label><span style = {{color:'red'}}>*</span>
                <Form.Control as="select" 
                  required 
                  value={costCenter}  
                  onChange={(e) => costCenterHandler(e)}
                >
                  <option value="">Select</option>
                    {cosCentreList.map((e, i) => {
                      return (
                        <option key={i + 1} value={e.costCentreName}>{e.costCentreName}</option>)
                    })}

                </Form.Control>
              </Form.Group>
            </div>
          </Row>

          <Button 
            type="submit"              
            className="submitButton"
            // style={{paddingBottom:"10px"}}            
          >
            Submit</Button>
          

        </Form>
        <div className="row">
          <div className="col-sm-12">
          <br />
            <div className="card" style={{ overflowX: "auto" }}>
            {                  
                  <div className="title_bar" >                   
                    <input
                      className="btn"
                      type="file"
                      accept=".xlsx, .xls, .csv"
                      onChange={(e) => changeHandler(e)}
                      style={{ padding: "10px" }}
                    />
                    <ReactHTMLTableToExcel
                      className="btn btn-light mr-2"
                      table="table-to-xls"
                      filename="dailyQtyList"
                      sheet="Sheet"
                      buttonText="Export excel" />
                  </div>
            }
              

              <div className="table-responsive">
                <table id="table-to-xls" className="table table-hover">
                  <thead className="thead-light" style={{ backgroundColor: "#2f3c4e" }}>
                    <tr>
                      <th>S. No</th>
                      <th scope="col"> Store ID</th>
                      <th scope="col">  Date</th>
                      <th scope="col">  Day </th>     
                      <th scope="col"> Week </th>    
                      <th scope="col"> Month </th>  
                      <th scope="col"> To </th>  
                      <th scope="col"> Quantity </th>             
                    </tr>
                  </thead>

                  

                  {dailyQty !== null && dailyQty !== undefined && dailyQty.length > 0 &&
                    dailyQty.map((item, i) => {
                      return (
                        <tbody key={i + 1}>
                          <tr>
                            <td>{i + 1 }</td>
                            <td>{item.dqStoreId}</td>
                            <td>{item.dqDate}</td>
                            <td>{item.dqDay}</td>
                            <td>{item.dqWeek}</td>
                            <td>{item.dqMonth}</td>
                            <td>{item.dqTo}</td>
                            <td>{item.dqQty}</td>
                          </tr>
                        </tbody>
                      )
                    })}       
                </table>
                {dailyQty !== null && dailyQty.length <= 0 ? (
                    <p style={{ textAlign: "center" }}>Select Date and Cost Center</p>
                  ) : null}

              </div>

            </div>
          </div>
        </div>
        
      </div>
    </Fragment>
  );

};

export default MasterDailyQty;