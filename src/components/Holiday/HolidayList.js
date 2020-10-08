import React, { Fragment, useEffect, useContext } from 'react';
import Breadcrumb from '../common/breadcrumb';
import { LeaveContext } from '../../context/LeaveState';
import ReactHTMLTableToExcel from 'react-html-table-to-excel';
import '../Leaves/Leaves.css'
const HolidayList = () => {

  const { getHoliday, holidayDataList, uploadFile } = useContext(LeaveContext);

  useEffect(() => {
    getHoliday()
  }, [])

  console.log("holida", holidayDataList)
  const changeHandler = (event) => {
    let fileObj = event.target.files[0];
    console.log("clicked", fileObj)
    uploadFile(fileObj)
  }
  return (
    <Fragment>
      <Breadcrumb title="Hoilday List" parent="Holiday List" />
      <div className="container-fluid">
        <div className="row">
          <div className="col-sm-12">
            <div className="card" style={{ overflowX: "auto" }}>

              <div className="title_bar" >
                {/* <Button className="btn btn-light mr-2" >Create</Button> */}
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
                  filename="holidaylist"
                  sheet="Sheet"
                  buttonText="Export excel" />
              </div>

              <div className="table-responsive">
                <table id="table-to-xls" className="table table-hover">
                  <thead className="thead-light" style={{ backgroundColor: "#2f3c4e" }}>
                    <tr>
                      <th>S. No</th>
                      <th scope="col"> Date</th>
                      <th scope="col"> Name</th>
                      <th scope="col">Year</th>
                      <th scope="col">State</th>
                      <th scope="col">Department</th>
                    </tr>
                  </thead>

                  {holidayDataList.length > 0 &&
                    holidayDataList.map((item, i) => {
                      return (
                        <tbody key={i + 1}>
                          <tr>
                            <td>{i + 1}</td>
                            <td>{item.holidayDate}</td>
                            <td>{item.holidayName}</td>
                            <td>{item.year}</td>
                            <td>{item.state}</td>
                            <td>{item.department}</td>
                          </tr>
                        </tbody>
                      )
                    })}

                </table>

              </div>

            </div>
          </div>
        </div>


      </div>
    </Fragment>
  );

};

export default HolidayList;