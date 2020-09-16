import React, { Fragment, useState, useContext, useEffect } from "react";
import Breadcrumb from "../common/breadcrumb";
import { RosterContext } from "../../context/RosterState";
import DatePicker from "react-datepicker";
import "react-datepicker/dist/react-datepicker.css";
import AdminShiftModal from "./adminShiftModal";
import moment from 'moment'

const AdminRoster = () => {
    const [startDate, setStartDate] = useState(moment());
    const [endDate, setEndDate] = useState(moment().add('30', 'd'));
    const [adminModal, setAdminModal] = useState(false)
    const [shiftDate, setshiftDate] = useState(false)
    const [contractType, setContractType] = useState('');
    const [contract,setContract] = useState('Permanent')
    const [adminweekDayList, setAdminWeekDayList] = useState('')
    useEffect(() => {
        adminGetAllWeeks()
        viewContractTypes()
    }, [])


    const { adminWeekOffDataEmp, viewContractTypes, shiftContractNames, adminGetAllWeeks, adminWeeksInYear, adminWeekOffDataListHeader, adminWeekOffDataList } = useContext(RosterContext);
    const handleClose = () => setAdminModal(false)
    const handleShow = (item) => {
       
       // console.log(item, "item onclick")
        setshiftDate(item)
        setAdminModal(true)
    }
    useEffect(() => {
        adminWeekOffDataEmp(endDate.format("YYYY-MM-DD"), startDate.format("YYYY-MM-DD"),contract)
    }, [])


    const submitDate = (e) => {
        e.preventDefault();
        adminWeekOffDataEmp(endDate.format("YYYY-MM-DD"), startDate.format("YYYY-MM-DD"),contractType)

    }
    const checkCondition = (item) => {

        if (item.roster == null) {
            return <button className="btn btn-square bg-gradient-secondary btn-sm pl-5 pr-5" onClick={() => handleShow(item)}>+</button>
        } else if (item.roster.holiday !== "" && item.roster.holiday !== null) {
            return <button className="btn btn-square btn-warning btn-sm" disabled type="button">{item.roster.holiday}</button>
        } else if (item.roster.leave !== "" && item.roster.leave !== null) {
            return <button className="btn btn-square btn-danger btn-sm" onClick={() => handleShow(item)} type="button">Leave</button>
        } else if (item.roster.weekOff) {
            return <button className="btn btn-square btn-info btn-sm" onClick={() => handleShow(item)} type="button">Week Off</button>
        } else if (item.roster.shiftName !== "" && item.roster.shiftName !== null) {
            return <button className="btn btn-square btn-success  btn-sm" type="button">{item.roster.shiftName}</button>
        } else {
            return <button className="btn btn-square bg-gradient-secondary btn-sm pl-5 pr-5" onClick={() => handleShow(item)}>+</button>
        }
    }
    return (
        <Fragment>
            <Breadcrumb title="Admin Roster" parent="Admin Roster" />
            <div className="container-fluid">
                <div className="row">
                    <div className="col-sm-12">
                        <div className="card h-100" >
                            <div className="card-header">
                                {/* <DateFromEnd sendDate={sendDate}/> */}
                                <form className="form-inline">
                                    <div className="row">
                                        <div className="col-sm-4">
                                            <div className="form-group mb-1">
                                                <label className="name f-w-600">From Date &nbsp;</label>
                                                <DatePicker
                                                    className="form-control"
                                                    selected={startDate.toDate()}
                                                    dateFormat="yyyy-MM-dd"
                                                    required
                                                    onChange={(date) => setStartDate(moment(date, 'YYYY-MM-DD'))}
                                                />
                                            </div>
                                        </div>
                                        <div className="col-sm-4 pl-3">
                                        
                                                <label className="name f-w-600">To Date&nbsp; </label>
                                                <DatePicker
                                                    className="form-control"
                                                    selected={endDate.toDate()}
                                                    dateFormat="yyyy-MM-dd"
                                                    required
                                                    onChange={(date) => setEndDate(moment(date, 'YYYY-MM-DD'))}
                                                />
                                           
                                        </div>
                                        <div className="col-sm-4">
                                            <button className="myclass" style={{ marginTop: "20px" }} type="button" onClick={(e) => submitDate(e)}>Submit</button>
                                        </div>
                                    </div>
                               
                                <br />
                                <div className="row">
                                    <div className="col-sm-3">
                                        <div className="form-group">
                                            <label className="name f-w-600">Select Week&nbsp; </label>
                                            <select
                                                className="form-control"
                                                style={{ width: "320px" }}
                                                onChange={(e) => setAdminWeekDayList(e)}>
                                                <option value="">Select Weeks</option>
                                                {adminWeeksInYear.map((e, i) => {
                                                    return (
                                                        <option key={e.weekId} value={e.weekId}>
                                                            {e.weekName}
                                                        </option>
                                                    );
                                                })}
                                            </select>
                                        </div>
                                    </div>

                                    <div className="col-sm-4">

                                        <div className="form-group">
                                            <label className="name f-w-600">&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;Select Employee Type </label>

                                            <select
                                                className="form-control"
                                                required
                                                style={{ width: "185px" }}
                                                value={contractType}
                                                onChange={(e) => setContractType(e.target.value)}>

                                                <option value="">Select Employee Type</option>
                                                {shiftContractNames.map((e, i) => {
                                                    return (
                                                        <option key={e.typeId} value={e.contractType}>
                                                            {e.contractType}
                                                        </option>
                                                    );
                                                })}
                                            </select>
                                        </div>
                                    </div>

                                </div>
                                </form>
                            </div>
                            <div className="table-responsive">
                                <table className="table">

                                    <thead style={{ background: '#006EBB', color: 'white' }}>
                                        <tr>
                                            <h6 style={{ fontWeight: "bold", paddingLeft: "60px", paddingTop: "20px", paddingRight: "70px" }}>Employeee</h6>
                                            {adminWeekOffDataListHeader.map((e,i) => {
                                                return (
                                                    <th scope="col" key={e.date}>{e.date}<br />{e.weekName} </th>
                                                )
                                            })}
                                        </tr>
                                    </thead>

                                    {/* <tbody>
                                        {adminWeekOffDataList.length > 0 &&
                                            adminWeekOffDataList.map((item, i) => {
                                                if (i == 0) {
                                                    return (
                                                        <tr>
                                                            {item.employeeRosters.map((data, ind) => {
                                                                if (ind == 0) {

                                                                    let newData = new Date(data.date)
                                                                    // console.log(newData.getDay(), "day")
                                                                    return (
                                                                        <>
                                                                            {Array.from(Array(newData.getDay() - 1)).map(() => <td></td>)}
                                                                            <td>{item.weekName}<br />{data.date}<br />{checkCondition(data)}</td>
                                                                        </>
                                                                    )
                                                                } else {
                                                                    return <td>{item.weekName}<br />{data.date}<br />{checkCondition(data)}</td>
                                                                }

                                                            }
                                                            )}
                                                        </tr>
                                                    )
                                                } else {

                                                    return (
                                                        <tr>
                                                            {item.employeeRosters.map(data => {
                                                                let newData = new Date(data.date)
                                                                console.log(newData.getDay(), "day")
                                                                return <td>{item.weekName}<br />{data.date}<br />{checkCondition(data)}</td>
                                                            })}
                                                        </tr>
                                                    )
                                                }
                                            })}
                                    </tbody> */}



                                    <tbody>
                                        {adminWeekOffDataList.length > 0 &&
                                            adminWeekOffDataList.map((item, i) => {

                                               

                                                return (
                                                    <tr>
                                                        <td>
                                                            <div className="row">
                                                                <div className="col-sm-3">
                                                                    <i
                                                                        className="fa fa-user-circle fa-4x py-2"
                                                                        aria-hidden="true"
                                                                    ></i>
                                                                </div>
                                                                <div className="col-sm-9" >
                                                                    <p>{item.firstName}&nbsp;{item.lastName}</p>
                                                                    <p style={{ lineHeight: "0.8", color: "red" }}>{item.employeeId}</p>
                                                                    <p style={{ lineHeight: "0.8", color: "blue" }}>{item.contractType}</p>

                                                                </div>
                                                            </div>
                                                        </td>
                                                        {item.employeeRosters.map(data => {
                                                            let newData = new Date(data.date)
                                                        //   console.log(newData.getDay(), "day")
                                                            return <td>{item.weekName}<br />{data.date}<br />{checkCondition(data)}</td>
                                                        })}
                                                    </tr>
                                                )
                                                // }
                                            })}
                                    </tbody>
                                </table>
                            </div>
                        </div>
                    </div>
                </div>
                {adminModal && <AdminShiftModal handleClose={handleClose} modal={adminModal} shiftDate={shiftDate.date} />}
            </div>

        </Fragment>
    );
};

export default AdminRoster;
