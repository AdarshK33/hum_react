import React, { Fragment } from 'react';
import Breadcrumb from '../common/breadcrumb';

const CreateTicket = () => {

    return (
        <Fragment>
            <Breadcrumb title="Create Ticket" parent="Create Ticket" />
            <div className="container-fluid">
                <div className="row">
                    <div className="col-sm-12">
                        <div className="card">



                            <div className="row">
                                <div className="col-5 px-4">

                                    <label className="name f-w-600">Ticket Number:</label>34776
                                    </div>
                                <div className="col-5 px-4">
                                    <label className="name f-w-600">Cost Center:</label>IN1058
                                    </div>
                            </div>
                            <br />
                            <div className="row">
                                <div className="col-5 px-4">

                                    <label className="name f-w-600">Name:</label>34776
                                    </div>
                                <div className="col-5 px-4">
                                    <label className="name f-w-600">FED ID:</label>IN1058
                                    </div>
                            </div>
                            <br />
                            <div className="row">
                                <div className="col-5 px-4">

                                    <label className="name f-w-600">Email Id:</label>34776
                                    </div>
                                <div className="col-5 px-4">
                                    <label className="name f-w-600">Position:</label>IN1058
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