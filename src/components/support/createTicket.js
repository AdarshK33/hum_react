import React, { Fragment, useState, useContext, useEffect } from 'react';
import Breadcrumb from '../common/breadcrumb';

const CreateTicket = () => {
    const [shiftButton, setShiftButton] = useState(false);
    return (
        <Fragment>
            <Breadcrumb title="Create Ticket" parent="Create Ticket" />
            <div className="container-fluid">
                <div className="row">
                    <div className="col-sm-12">
                        <div className="card">
                            <div className="row">
                                <div className="col-5 px-4 py-3">

                                    <label className="name f-w-600">Ticket Number:&nbsp;&nbsp;</label>34776
                                    </div>
                                <div className="col-5 px-4 py-3">
                                    <label className="name f-w-600">Cost Center:&nbsp;&nbsp;</label>IN1058
                                    </div>
                            </div>

                            <div className="row">
                                <div className="col-5 px-4">

                                    <label className="name f-w-600">Name:&nbsp;&nbsp;</label>Ranjith Kumar HN
                                    </div>
                                <div className="col-5 px-4">
                                    <label className="name f-w-600">FED ID:&nbsp;&nbsp;</label>AXP102
                                    </div>
                            </div>
                            <br />
                            <div className="row">
                                <div className="col-5 px-4">

                                    <label className="name f-w-600">Email Id:&nbsp;&nbsp;</label>ranjithReatilInsightgmail.com
                                    </div>
                                <div className="col-5 px-4">
                                    <label className="name f-w-600">Position:&nbsp;&nbsp;</label>Store Leader
                                    </div>
                            </div>

                            <br />
                            <div className="row px-2">
                                <div className="col-sm-12">
                                    <div className="form">
                                        <div className="row">
                                            <div className="col-sm-12">
                                                <div className="form-group">
                                                    <label className="name f-w-600">Select Role</label>
                                                    <select
                                                        className="form-control"
                                                        required
                                                    // value={contractType}

                                                    // defaultValue={shiftContractNames.contractType}
                                                    // onChange={(e) => getContractType(e)}
                                                    >

                                                        <option value="">Select Role</option>
                                                        {/* {shiftContractNames !== null &&
                                                    shiftContractNames.map((e, i) => { */}
                                                        return (
                                                            <option >

                                                        </option>
                                                        {/* <option key={e.typeId} value={e.contractType}>
                                                                {e.contractType}
                                                            </option> */}
                                                        {/* );
                                                    })} */}
                                                    </select>
                                                </div>
                                            </div>


                                        </div>
                                        <div className="row">
                                            <div className="col-sm-12">
                                                <div className="form-group">
                                                    <label className="name f-w-600">Select Issue and Category</label>
                                                    <select
                                                        className="form-control"
                                                        required
                                                    // value={contractType}

                                                    // defaultValue={shiftContractNames.contractType}
                                                    // onChange={(e) => getContractType(e)}
                                                    >

                                                        <option value="">Select Role</option>
                                                        {/* {shiftContractNames !== null &&
                                                    shiftContractNames.map((e, i) => { */}
                                                        return (
                                                            <option >

                                                        </option>
                                                        {/* <option key={e.typeId} value={e.contractType}>
                                                                {e.contractType}
                                                            </option> */}
                                                        {/* );
                                                    })} */}
                                                    </select>
                                                </div>
                                            </div>


                                        </div>
                                        <div className="row">
                                            <div className="col-sm-12">
                                                <div className="form-group">
                                                    <label className="name f-w-600">Title</label>
                                                    <select
                                                        className="form-control"
                                                        required
                                                    // value={contractType}

                                                    // defaultValue={shiftContractNames.contractType}
                                                    // onChange={(e) => getContractType(e)}
                                                    >

                                                        <option value="">Select Role</option>
                                                        {/* {shiftContractNames !== null &&
                                                    shiftContractNames.map((e, i) => { */}
                                                        return (
                                                            <option >

                                                        </option>
                                                        {/* <option key={e.typeId} value={e.contractType}>
                                                                {e.contractType}
                                                            </option> */}
                                                        {/* );
                                                    })} */}
                                                    </select>
                                                </div>
                                            </div>
                                        </div>


                                        <label className="name f-w-600">Description</label>
                                        <textarea className="form-control" rows="3" placeholder="Description.."></textarea>

                                        <br />
                                        <div className="row">
                                            <div className="col-sm-12">
                                                <div className="form-group">
                                                    <label className="name f-w-600">Select Urgency</label>
                                                    <select
                                                        className="form-control"
                                                        required
                                                    // value={contractType}

                                                    // defaultValue={shiftContractNames.contractType}
                                                    // onChange={(e) => getContractType(e)}
                                                    >

                                                        <option value="">Select Urgency</option>
                                                        {/* {shiftContractNames !== null &&
                                                    shiftContractNames.map((e, i) => { */}
                                                        return (
                                                            <option >

                                                        </option>
                                                        {/* <option key={e.typeId} value={e.contractType}>
                                                                {e.contractType}
                                                            </option> */}
                                                        {/* );
                                                    })} */}
                                                    </select>
                                                </div>
                                            </div>


                                        </div>
                                        <div className="row">
                                            <div className="col-sm-12">
                                                <div className="form-group">
                                                    <label className="name f-w-600">Priority</label>
                                                    <select
                                                        className="form-control"
                                                        required
                                                    // value={contractType}

                                                    // defaultValue={shiftContractNames.contractType}
                                                    // onChange={(e) => getContractType(e)}
                                                    >

                                                        <option value="">Select Priority</option>
                                                        {/* {shiftContractNames !== null &&
                                                    shiftContractNames.map((e, i) => { */}
                                                        return (
                                                            <option >

                                                        </option>
                                                        {/* <option key={e.typeId} value={e.contractType}>
                                                                {e.contractType}
                                                            </option> */}
                                                        {/* );
                                                    })} */}
                                                    </select>
                                                </div>
                                            </div>


                                        </div>
                                        <button className="myclass" style={{ marginTop: "5px", paddingLeft: "40px", paddingRight: "40px", fontWeight: "bold", marginBottom: "20px" }}
                                            disabled={shiftButton}
                                            type="button" >Submit</button>
                                    </div>
                                </div>
                            </div>

                        </div>
                    </div>
                </div>
            </div>
        </Fragment >
    );
};

export default CreateTicket;