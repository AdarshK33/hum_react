import React, { Fragment, useState, useContext, useEffect } from "react";
import Breadcrumb from "../common/breadcrumb";
import { RosterContext } from "../../context/RosterState";
import { AppContext } from "../../context/AppState";
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
    // const [contract] = useState('permanent');
    // const [weekid] = useState(0);
    const [singleWeek, getSingleWeek] = useState()
    const [firstName, setFirstName] = useState('');
    const [costCenter1, setCostCenter1] = useState('');
    const [tableShow, setTableShow] = useState(false);
    const [adminRosterButton, setadminRosterButton] = useState(true);
    const [storecostCenterName, setstorecostCenterName] = useState('');

    const { user } = useContext(AppContext);

    useEffect(() => {
        viewContractTypes()
        costCenter()
        calcWeek()

        if (user.loginType !== "1" && user.loginType !== "7" && user.loginType !== "9") {
            setCostCenter1(user.costCenter)
            setstorecostCenterName(user.costCenter)
        }
    }, [user.costCenter, user.loginType])




    const { adminWeekOffDataEmp, viewContractTypes, shiftContractNames, costCenterList, adminWeekOffDataListHeader, adminWeekOffDataList, adminCalculateWeek, adminCalculateWeekResult, adminRosterAvailableShift, getallWeeks, costCenter } = useContext(RosterContext);

    const handleClose = () => setAdminModal(false)
    const handleShow = (item, name, ctype) => {
        setshiftDate(item)
        setAdminModal(true)
        setFirstName(name);
        setContractType(ctype)
        adminRosterAvailableShift(contractType, costCenter1)
        getallWeeks()
    }



    const setWeekCalc = (e) => {
        let data1 = e.target.value
        getSingleWeek(data1)

    }

    const handleCostCenter = (e) => {
        let data2 = e.target.value
        setCostCenter1(data2)
        setstorecostCenterName(data2)
        setadminRosterButton(false)
    }




    const submitDate = (e) => {
        e.preventDefault();
        adminWeekOffDataEmp(endDate.format("YYYY-MM-DD"), startDate.format("YYYY-MM-DD"), contractType, singleWeek, costCenter1)
        checkAdminListLength()
    }
    const checkAdminListLength = () => {

        if (checkAdminListLength.length === 0) {
            setTableShow(true)
        }
    }
    const calcWeek = () => {
        adminCalculateWeek(endDate.format("YYYY-MM-DD"), startDate.format("YYYY-MM-DD"))
    }



    const checkCondition = (item, name, ctype, costCentreName) => {


        if (item.roster == null) {
            return <button className="btn btn-square bg-gradient-secondary btn-sm pl-5 pr-5" onClick={() => handleShow(item, name, ctype, costCentreName)}>+</button>
        } else if (item.roster.holiday !== "" && item.roster.holiday !== null) {
            return <button className="btn btn-square btn-warning btn-sm" onClick={() => handleShow(item)}>{item.roster.holiday}</button>
        } else if (item.roster.leave !== "" && item.roster.leave !== null) {
            return <button className="btn btn-square btn-danger btn-sm" onClick={() => handleShow(item)} type="button">Leave</button>
        } else if (item.roster.weekOff) {
            return <button className="btn btn-square btn-info btn-sm" onClick={() => handleShow(item)} type="button">Week Off</button>
        } else if (item.roster.shiftName !== "" && item.roster.shiftName !== null) {
            return <button className="btn btn-square btn-success  btn-sm" onClick={() => handleShow(item)} type="button">{item.roster.shiftName}</button>
        } else {
            return <button className="btn btn-square bg-gradient-secondary btn-sm pl-5 pr-5" onClick={() => handleShow(item, name)}>+</button>
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

                                <form className="form-inline">
                                    <div className="row align-items-start">
                                        <div className="col-sm-3">
                                            <div className="form-group">
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
                                        <div className="col-sm-3">
                                            <div className="form-group">
                                                <label className="name f-w-600">To Date&nbsp; </label>
                                                <DatePicker
                                                    className="form-control"
                                                    selected={endDate.toDate()}
                                                    dateFormat="yyyy-MM-dd"
                                                    required
                                                    onCalendarClose={() => { calcWeek() }}
                                                    onChange={(date) => setEndDate(moment(date, 'YYYY-MM-DD'))}
                                                />

                                            </div>
                                        </div>

                                        {(() => {
                                            if (user.loginType !== "1" || user.loginType !== "7" || user.loginType !== "9") {
                                                return (
                                                    <div className="col-sm-3">
                                                        <div className="form-group">
                                                            <label className="name f-w-600">Select Cost Center&nbsp;<span style={{ color: 'red' }}>*</span> &nbsp;</label>
                                                            <select
                                                                className="form-control"
                                                                style={{ fontSize: "0.8rem", height: "34px" }}
                                                                value={costCenter1}
                                                                required
                                                                onChange={(e) => handleCostCenter(e)}>
                                                                <option value="">Select Cost Center</option>
                                                                {costCenterList !== null && costCenterList.map((item, i) => {
                                                                    return (
                                                                        <option key={item.costCenterId} value={item.costCentreName}>
                                                                            {item.costCentreName}</option>

                                                                    );
                                                                })}
                                                            </select>
                                                        </div>
                                                    </div>
                                                )
                                            }
                                        })()}


                                    </div>
                                    <br />
                                    <div className="row align-items-start">
                                        <div className="col-sm-3">
                                            <div className="form-group">
                                                <label className="name f-w-600">&nbsp;Select Week </label>

                                                <select
                                                    className="form-control"
                                                    value={singleWeek}
                                                    style={{ height: "34px", paddingLeft: "5px" }}
                                                    onChange={(e) => setWeekCalc(e)}>
                                                    <option value="">Select Week &nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;
                                                &nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;</option>
                                                    {adminCalculateWeekResult !== null && adminCalculateWeekResult.map((e, i) => {
                                                        return (
                                                            <option key={e.weekId} value={e.weekId}>
                                                                {e.weekName}
                                                            </option>
                                                        );
                                                    })}
                                                </select>
                                            </div>

                                        </div>


                                        <div className="col-sm-3">

                                            <div className="form-group">
                                                <label className="name f-w-600">&nbsp;Select Employee Type </label>

                                                <select
                                                    className="form-control"
                                                    style={{ height: "34px", paddingLeft: "5px", marginLeft: "5px" }}
                                                    value={contractType}
                                                    onChange={(e) => {
                                                        setContractType(e.target.value)
                                                        console.log(contractType)
                                                    }
                                                    }>

                                                    <option value="">Select Employee Type</option>
                                                    {shiftContractNames !== null && shiftContractNames.map((e, i) => {
                                                        return (
                                                            <option key={e.typeId} value={e.contractType}>
                                                                {e.contractType}
                                                            </option>
                                                        );
                                                    })}
                                                </select>
                                            </div>
                                        </div>
                                        <div className="col-sm-3">
                                            <div class="align-self-center mx-auto">
                                                <button className="myclass" style={{ marginTop: "20px", marginLeft: "20px", paddingLeft: "40px", paddingRight: "40px", fontWeight: "bold" }}
                                                    disabled={adminRosterButton}
                                                    type="button" onClick={(e) => submitDate(e)}>Submit</button>
                                            </div>
                                        </div>

                                    </div>
                                </form>
                            </div>
                            {tableShow &&
                                <div className="table-responsive">
                                    <table className="table table-fixed">

                                        <thead style={{ background: '#006EBB', color: 'white', position: "sticky", top: 0 }}>
                                            <tr>
                                                <th style={{ fontWeight: "bold", paddingLeft: "70px", paddingTop: "10px", paddingRight: "70px" }}>Employee</th>
                                                {adminWeekOffDataListHeader !== null && adminWeekOffDataListHeader.map((e, i) => {
                                                    return (
                                                        <th scope="col" key={e.date}>{e.day}<br />{e.weekName} </th>
                                                    )
                                                })}
                                            </tr>
                                        </thead>


                                        <tbody>
                                            {adminWeekOffDataList !== null &&
                                                adminWeekOffDataList.length > 0 &&
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
                                                            {item.employeeRosters.map((data, index, empArr) => {
                                                                // let newData = new Date(data.date)

                                                                //  console.log(newData.getDay(), "day")

                                                                return <td>{item.weekName}<br />{data.date}<br /> {checkCondition(data, item.firstName, item.contractType, item.costCentreName)}</td>
                                                            })}
                                                        </tr>
                                                    )

                                                })}
                                        </tbody>
                                    </table>
                                </div>
                            }
                        </div>
                    </div>
                </div>
                {adminModal &&
                    <AdminShiftModal
                        handleClose={handleClose}
                        contractType={contractType}
                        firstName={firstName}
                        modal={adminModal}
                        shiftDate={shiftDate.date}
                        mystoreId={storecostCenterName}

                    />}
            </div>

        </Fragment >
    );
};

export default AdminRoster;
