import React, { useEffect, Fragment, useContext, useState } from 'react'
import Breadcrumb from "../common/breadcrumb";
import moment from 'moment';
import ReactHTMLTableToExcel from 'react-html-table-to-excel';
import { ClusterContext } from "../../context/ClusterState";
import DatePicker from "react-datepicker";
import "react-datepicker/dist/react-datepicker.css";
import { subDays,addDays } from 'date-fns';
function ViewShift() {
  useEffect(() => {
    viewSalary()
  }, [])
  const [getMonth, setGetMonth] = useState(null);
  const [shiftButton, setShiftButton] = useState(true);
  //alert(stime);
  // variables
  const { viewSalary, salaryList } = useContext(ClusterContext);


  const onSubmit = e => {
    e.preventDefault();

    const month = moment(getMonth, ["MMM Do YY"]).format("M");
    const year = moment(getMonth, ["MMM Do YY"]).format('YYYY');
     viewSalary(month, year)
  }
const getMonthForSalaryInput=(date)=>{
  setShiftButton(false)
  setGetMonth(date)
 }


  return (
    <Fragment>
      <Breadcrumb title="Salary" parent="salary" />
      <div className="container-fluid">
        <form className="form-inline" onSubmit={onSubmit}>
          <div className="row">
            <div className="col-sm-6">
              <div className="form-group">
                <label htmlFor="exampleFormControlInput1">Select Month and Year</label>
                <br />
                <br />
                {/* <DatePicker
                  selected={getMonth}
                  className="form-control"
                  onChange={(date)=>{getMonthForSalaryInput(date)}}
                  dateFormat="MM YYY"
                  placeholderText="Select Month and Year"
                  showMonthYearPicker
                /> */}

                 <DatePicker
                  selected={getMonth}
                  className="form-control"
                  onChange={(date)=>{getMonthForSalaryInput(date)}}
                  minDate={subDays(new Date(),8)}
                  dateFormat="MM YYY"
                  placeholderText="Select Month and Year"
                  showMonthYearPicker
                />

              </div>

            </div>



            <div className="col-sm-3 mt-4">
              <button className="btn btn-primary mb-2 mt-3" type="submit"  disabled={shiftButton} value="Submit">Submit</button>
              
            </div>
            <div className="col-sm-3" style={{marginTop:"39px"}}>
            <ReactHTMLTableToExcel
                  className="btn btn-primary"
                  table="table-to-xls1"
                  filename="salaryFile"
                  sheet="Sheet"
                  buttonText="Export excel" />
          </div>
            </div>
  
        </form>
        {/* Table */}
        <br />
        <div className="row">
          <div className="col-sm-12">
            <div className="card" style={{ overflowX: "auto" }}>
                <div className="table-responsive">
                <table id="table-to-xls1" className="table table-hover">
                  <thead className="thead-light" style={{ backgroundColor: "#2f3c4e" }}>
                    <tr>
                      <th>No</th>
                     <th scope="col">Employee Id</th>
                     <th scope="col">Employee Name</th>                   
                      <th scope="col">Number Of Hours</th>
                      <th scope="col">Contract Type</th>
                      <th scope="col">Month</th>
                      <th scope="col">Year</th>
                      <th scope="col">Lop</th>
                      <th scope="col">Other Allowance</th>
                      <th scope="col">Per Hour Cost</th>
                    </tr>
                  </thead>
                
                    {salaryList.map((item, i) => {
                      return (
                        <tbody key={i + 1}>
                          <tr>
                            <td>{i + 1}</td>
                          
                            <td>{item.employeeId}</td>
                            <td>{item.firstName} {item.lastName}</td>
                            <td>{item.numberOfHours}</td>
                            <td>{item.contractType}</td>
                            <td>{item.month}</td>
                            <td>{item.year}</td>
                            <td>{item.lop}</td>
                            <td>{item.otherAllowance}</td>
                            <td>{item.perHourCost}</td>
                        
                           
                          </tr>
                          
                        </tbody>
                      
                      )
                    })}
                </table>
                { (salaryList.length<=0) ? <p style={{textAlign:"center"}}>Select Month and Year</p>:null }
                {/* {salaryList.length>0 ?<p>No data found</p>:null} */}
              </div>
            </div>
          </div>
        </div>


      </div>
    </Fragment>

  )
}

export default ViewShift

