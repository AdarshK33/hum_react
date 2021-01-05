import React, { Fragment, useState, useContext, useEffect } from 'react';
import Breadcrumb from '../common/breadcrumb';
import '../common/style.css'
import 'react-dropzone-uploader/dist/styles.css';
import { AppContext } from "../../context/AppState";
import { SupportContext } from "../../context/SupportState"
import { Container, Row, Col, Form } from 'react-bootstrap'
import { useHistory } from "react-router-dom";
import { toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import '../common/style.css'
import { PlusCircle, MinusCircle } from 'react-feather';
import { client } from '../../utils/axios';
// import { Edit2, Search } from 'react-feather'


const CreateTicket = () => {

    const [role, setRole] = useState('')
    const [categoryId, setcategoryId] = useState('')
    const [title, setTitle] = useState('')
    const [description, setDescription] = useState('')
    const [urgencyId, setUrgencyId] = useState('');
    const [priority, setPriority] = useState('')
    const [number, setNumber] = useState()
    // const [filesCount, setFilesCount] = useState([])
    const [fileSubmitButtonFirst, setFileSubmitButtonFirst] = useState(false);
    const [fileSubmitButtonSecond, setFileSubmitButtonSecond] = useState(false);
    const [fileSubmitButtonThird, setFileSubmitButtonThird] = useState(false);
    const [fileNames, setFileNames] = useState([])
    const [filenames, setFilenames] = useState([])
    const [fileUpload, setFileUpload] = useState();
    const [loader, setLoader] = useState(false);
    const [showFirst, setshowFirst] = useState(false);
    const [showSecond, setshowSecond] = useState(false);
    const [deleteFirstFile, setDeleteFirstFile] = useState()
    const [deleteSecondFile, setDeleteSecondFile] = useState()
    const [deleteThirdFile, setDeleteThirdFile] = useState()



    let history = useHistory();
    const { user } = useContext(AppContext);
    const { getRolesForSupport, getRoles, getIssueAndCategory,
        getIssueAndCategoryList, selectUrgency, urgencyList, priorityList, selectPriority, addCreateTicket, priorityListId, } = useContext(SupportContext);


    useEffect(() => {
        getRolesForSupport()
        getIssueAndCategory()
        selectUrgency()
        setTimeout(() => { callLoader() }, 1500);
    }, [])

    const handleAddUpload = () => {
        if (showFirst !== true) {
            setshowFirst(true);
        } else if (showFirst === true && showSecond !== true) {
            setshowSecond(true);
        } else {
            toast.info("Cannot upload more than 3 files.");
        }
    }

    const handleRemoveUpload = (text) => {
        let fileArr = [];
        if (text === "second") {
            setshowFirst(false);
            for (let i = 0; i < fileNames.length; i++) {
                if (deleteSecondFile !== fileNames[i].fileName) {
                    fileArr.push({ fileId: 0, fileName: fileNames[i].fileName });
                }
            }
            setFileNames(fileArr);
            deleteFile(deleteSecondFile)
        } else if (text === "third") {
            setshowSecond(false);
            for (let i = 0; i < fileNames.length; i++) {
                if (deleteThirdFile !== fileNames[i].fileName) {
                    fileArr.push({ fileId: 0, fileName: fileNames[i].fileName });
                }
            }
            setFileNames(fileArr);
            deleteFile(deleteThirdFile)
        } else if (text === "first") {
            var file = document.getElementById(text);
            var emptyFile = document.createElement('input');
            emptyFile.type = 'file';
            emptyFile.id = text;
            file.files = emptyFile.files;
            setFileSubmitButtonFirst(false)
            for (let i = 0; i < fileNames.length; i++) {
                if (deleteFirstFile !== fileNames[i].fileName) {
                    fileArr.push({ fileId: 0, fileName: fileNames[i].fileName });
                }
            }
            setFileNames(fileArr);
            deleteFile(deleteFirstFile)
        }
    }

    const setClear = () => {
        setRole('')
        setcategoryId('')
        setTitle('')
        setDescription('')
        setUrgencyId('')
        setPriority('')
    }

    const selectValueForDropDownRole = (e) => {
        let data1 = e.target.value
        setRole(data1)
        console.log("data ", data1)
    }
    const selectValueForDropDownUrgency = (e) => {
        let data2 = e.target.value
        setUrgencyId(data2)
        console.log("data ", data2)
        selectPriority(role, data2)
    }


    const callLoader = () => {
        setLoader(true)
    }






    // ===================================================================================
    const changeHandler = (event, text) => {
        let fName = [];
        let i = 0

        for (i = 0; i < event.target.files.length; i++) {
            let fileObj = event.target.files[i];

            console.log("clicked", fileObj)
            let fileSize = fileObj.size / 1000;
            fName.push({ name: fileObj.name });



            // console.log(filenames)
            if (fileObj.type === "image/png" || fileObj.type === "image/jpeg") {

                if (fileSize <= 500) {
                    if (text === "first") {
                        setFileSubmitButtonFirst(false)
                    }
                    else if (text === "second") {
                        setFileSubmitButtonSecond(false)
                    }
                    else if (text === "third") {
                        setFileSubmitButtonThird(false)
                    }
                    // setFileSubmitButton(false)
                    console.log("clicked", fileObj)
                    setFileUpload(fileObj)
                    setNumber(1)
                }
                else {
                    // setFileSubmitButton(true)
                    if (text === "first") {
                        setFileSubmitButtonFirst(true)
                    }
                    else if (text === "second") {
                        setFileSubmitButtonSecond(true)
                    }
                    else if (text === "third") {
                        setFileSubmitButtonThird(true)
                    }
                    toast.info("Cannot upload file with size more than 500 KB")
                }
            }
            else if (fileObj.type === "application/pdf" || fileObj.type === "application/vnd.openxmlformats-officedocument.spreadsheetml.sheet") {
                if (fileSize <= 200) {
                    if (text === "first") {
                        setFileSubmitButtonFirst(false)
                    }
                    else if (text === "second") {
                        setFileSubmitButtonSecond(false)
                    }
                    else if (text === "third") {
                        setFileSubmitButtonThird(false)
                    }
                    console.log("clicked", fileObj)
                    setFileUpload(fileObj)
                    setNumber(1)
                }
                else {
                    //  setFileSubmitButton(true)
                    if (text === "first") {
                        setFileSubmitButtonFirst(true)
                    }
                    else if (text === "second") {
                        setFileSubmitButtonSecond(true)
                    }
                    else if (text === "third") {
                        setFileSubmitButtonThird(true)
                    }
                    toast.info("Cannot upload file with size more than 200 KB")
                }
            }
            else if (fileObj.type === "video/mp4") {
                if (fileSize <= 1500) {
                    if (text === "first") {
                        setFileSubmitButtonFirst(false)
                    }
                    else if (text === "second") {
                        setFileSubmitButtonSecond(false)
                    }
                    else if (text === "third") {
                        setFileSubmitButtonThird(false)
                    }
                    console.log("clicked", fileObj)
                    setFileUpload(fileObj)
                    setNumber(1)
                }
                else {
                    //  setFileSubmitButton(true)
                    if (text === "first") {
                        setFileSubmitButtonFirst(true)
                    }
                    else if (text === "second") {
                        setFileSubmitButtonSecond(true)
                    }
                    else if (text === "third") {
                        setFileSubmitButtonThird(true)
                    }
                    toast.info("Cannot upload file with size more than 1 mb")

                }
            } else {
                toast.info("Please select only .png, .jpeg, .pdf, .xlsx and .mp4")
            }
        }

        setFilenames(fName);
    }


    const handleUpload = (text) => {


        console.log(fileUpload);
        if (fileUpload !== undefined && fileUpload !== null) {
            uploadDailyQty(fileUpload, text)
        } else {
            toast.info("Please select a file to upload")
        }
    }
    const uploadDailyQty = (file, text) => {


        const formData = new FormData();
        formData.append('file', file)


        return client.post('/ticket/upload', formData)
            .then((response) => {

                if (response.status === 200) {
                    if (text === "first") {
                        setFileSubmitButtonFirst(true)
                        setDeleteFirstFile(response.data.data)
                    }
                    else if (text === "second") {
                        setFileSubmitButtonSecond(true)
                        setDeleteSecondFile(response.data.data)
                    }
                    else if (text === "third") {
                        setFileSubmitButtonThird(true)
                        setDeleteThirdFile(response.data.data)
                    }
                }

                console.log(response, "responce")
                fileNames.push({ fileId: 0, fileName: response.data.data })
                toast.info(response.data.message)


                // toast.info(response.data.data)
            })
            .catch((error) => {
                console.log(error)
            })
    }
    //========================================================================================


    const deleteFile = (file) => {
        //   alert("file", file)
        if (file !== undefined || file !== null || file !== '') {
            return client.get('/ticket/delete/' + file)
                .then((response) => {
                    console.log(response, "responce")
                    toast.info(response.data.message)
                })
                .catch((error) => {
                    console.log(error)
                })
        }






    }




    const onSubmit = e => {

        if (number === 1) {

            e.preventDefault();

            const createSingleTicket = {
                employeeId: user.employeeId,
                categoryId,
                completionStatus: 0,
                description,
                priorityId: priorityListId,
                resolution: null,
                role,
                storeId: user.costCentre,
                ticketId: 0,
                ticketStatus: 0,
                title,
                urgencyId,
                ticketResolutions: null,
                ticketFiles: fileNames
            }
            addCreateTicket(createSingleTicket)
            console.log(JSON.stringify(createSingleTicket));
            //alert(JSON.stringify(createSingleTicket));
            setClear()
            history.push("./ticketlistingpage")
        }
        else {
            console.log("outside")

            e.preventDefault();

            const createSingleTicket = {
                employeeId: user.employeeId,
                categoryId,
                completionStatus: 0,
                description,
                priorityId: priorityListId,
                resolution: null,
                role,
                storeId: user.costCentre,
                ticketId: 0,
                ticketStatus: 0,
                title,
                urgencyId,
                ticketResolutions: null,
                ticketFiles: null
            }
            addCreateTicket(createSingleTicket)
            console.log(JSON.stringify(createSingleTicket));
            //alert(JSON.stringify(createSingleTicket));
            setClear()
            history.push("./ticketlistingpage")
        }

    }

    return (

        <Fragment>
            <Breadcrumb title="Create Ticket" parent="Create Ticket" />

            <Container fluid>
                {loader === true ?
                    <Form style={{ backgroundColor: 'white', padding: '3rem' }} onSubmit={onSubmit}>
                        <Row>
                            <Col sm={6}>
                                <Form.Group as={Row}>
                                    <Form.Label column sm='4' className='labels'>Position :</Form.Label>
                                    <Col sm='6'>
                                        <Form.Control type='text' value={user.position} readOnly className='disabledValue blueText' />
                                    </Col>
                                </Form.Group>
                            </Col>
                            <Col sm={6}>
                                <Form.Group as={Row}>
                                    <Form.Label column sm='4' className='labels'>Cost Center :</Form.Label>
                                    <Col sm='6'>
                                        <Form.Control type='text' value={user.costCentre} readOnly className='disabledValue blueText' />
                                    </Col>
                                </Form.Group>
                            </Col>
                        </Row>
                        <Row>
                            <Col sm={6}>
                                <Form.Group as={Row}>
                                    <Form.Label column sm='4' className='labels'>Name :</Form.Label>
                                    <Col sm='6'>
                                        <Form.Control type='text' value={user.firstName + " " + user.lastName} readOnly className='disabledValue blueText' />
                                    </Col>
                                </Form.Group>
                            </Col>
                            <Col sm={6}>
                                <Form.Group as={Row}>
                                    <Form.Label column sm='4' className='labels'>FED ID :</Form.Label>
                                    <Col sm='6'>
                                        <Form.Control type='text' value={user.fedId} readOnly className='disabledValue blueText' />
                                    </Col>
                                </Form.Group>
                            </Col>
                        </Row>
                        <Row>
                            <Col sm={6}>
                                <Form.Group as={Row}>
                                    <Form.Label column sm='4' className='labels'>Emai Id :</Form.Label>
                                    <Col sm='7'>
                                        <Form.Control type='text' value={user.email} readOnly className='disabledValue blueText' />
                                    </Col>
                                </Form.Group>
                            </Col>

                        </Row>






                        <Row>
                            <Col sm={8}>
                                <Form.Group as={Row} >
                                    <Form.Label column sm='4' className='labels'>Select Role :<span style={{ color: 'red' }}>*</span></Form.Label>
                                    <Col sm='8'>
                                        <select
                                            className="form-control"
                                            required
                                            value={role}
                                            defaultValue={getRoles.name}
                                            onChange={(e) => selectValueForDropDownRole(e)}>


                                            <option value="">Select Role</option>
                                            {getRoles !== null &&
                                                getRoles.map((e, i) => {
                                                    return (
                                                        <option key={e.value} value={e.value}>
                                                            {e.name}
                                                        </option>
                                                    );
                                                })}
                                        </select>

                                    </Col>
                                </Form.Group>
                            </Col>
                        </Row>

                        <Row>
                            <Col sm={8}>
                                <Form.Group as={Row} >
                                    <Form.Label column sm='4' className='labels'>Select Issue :<span style={{ color: 'red' }}>*</span></Form.Label>
                                    <Col sm='8'>
                                        <select
                                            className="form-control"
                                            required
                                            value={categoryId}
                                            onChange={(event) => setcategoryId(event.target.value)}>

                                            <option value="">Select Issue</option>
                                            {getIssueAndCategoryList !== null &&
                                                getIssueAndCategoryList.map((e, i) => {
                                                    return (
                                                        <option key={e.categoryId} value={e.categoryId}>
                                                            {e.categoryName}
                                                        </option>
                                                    );
                                                })}
                                        </select>
                                    </Col>
                                </Form.Group>
                            </Col>
                        </Row>
                        <Row>
                            <Col sm={8}>
                                <Form.Group as={Row} >
                                    <Form.Label column sm='4' className='labels'>Title :<span style={{ color: 'red' }}>*</span></Form.Label>
                                    <Col sm='8'>
                                        <input type="text" style={{ fontSize: "0.8rem" }} className="form-control" value={title} placeholder="Title" maxLength="50" required onChange={(event) => setTitle(event.target.value)} />
                                    </Col>
                                </Form.Group>
                            </Col>
                        </Row>

                        <Row>
                            <Col sm={8}>
                                <Form.Group as={Row} >
                                    <Form.Label column sm='4' className='labels'>Description :</Form.Label>
                                    <Col sm='8'>
                                        <textarea className="form-control" rows="3" placeholder="Description" maxLength="300" value={description} onChange={(event) => setDescription(event.target.value)}></textarea>
                                    </Col>
                                </Form.Group>
                            </Col>
                        </Row>


                        <Row>
                            <Col sm={8}>
                                <Form.Group as={Row} >
                                    <Form.Label column sm='4' className='labels'>File Upload :</Form.Label>
                                    <Col sm='4'>


                                        <input
                                            className="btn"
                                            type="file"
                                            id="first"
                                            accept="image/*,video/*,.pdf"
                                            // multiple="multiple"
                                            onChange={(e) => changeHandler(e, "first")}
                                            style={{ padding: "5px", width: "200px", whiteSpace: "initial" }}
                                        />
                                        <br />

                                        {filenames !== null && filenames.length > 1 && filenames.map((e, i) => {
                                            return (
                                                <div>{e.name}</div>
                                            );
                                        })}
                                    </Col>

                                    <Col sm='4'>
                                        <button className="btn btn-primary" style={{ paddingLeft: "20px", paddingRight: "20px", fontWeight: "bold" }}
                                            type="button" onClick={() => handleUpload("first")} disabled={fileSubmitButtonFirst}
                                        >Upload</button>

                                        <div style={{ paddingTop: '5px', float: 'right' }}>
                                            <PlusCircle style={{ color: '#376ebb' }}
                                                onClick={handleAddUpload}

                                            />
                                            <MinusCircle style={{ color: '#376ebb' }} onClick={() => handleRemoveUpload("first")} />



                                        </div>


                                    </Col>

                                    {/* </Form.Group> */}

                                </Form.Group>

                            </Col>
                        </Row>


                        {showFirst === true ?
                            <Row>
                                <Col sm={8}>
                                    <Form.Group as={Row} >
                                        <Form.Label column sm='4' className='labels'></Form.Label>
                                        <Col sm='4'>


                                            <input
                                                className="btn"
                                                type="file"
                                                accept="image/*,video/*,.pdf"
                                                // multiple="multiple"
                                                onChange={(e) => changeHandler(e, "second")}
                                                style={{ padding: "5px", width: "200px", whiteSpace: "initial" }}
                                            />
                                            <br />

                                            {filenames !== null && filenames.length > 1 && filenames.map((e, i) => {
                                                return (
                                                    <div>{e.name}</div>
                                                );
                                            })}
                                        </Col>
                                        {/* <Form.Group as={Row} >
                                <Col sm='4'></Col> */}
                                        <Col sm='4'>
                                            <button className="btn btn-primary" style={{ paddingLeft: "20px", paddingRight: "20px", fontWeight: "bold" }}
                                                type="button" onClick={() => handleUpload("second")} disabled={fileSubmitButtonSecond}
                                            >Upload</button>
                                            {/* <button className="btn btn-primary mx-2" style={{ paddingLeft: "20px", paddingRight: "20px", fontWeight: "bold" }}
                                        type="button" onClick={handleAddUpload} disabled={fileSubmitButton}
                                    >+</button> */}
                                            <div style={{ paddingTop: '5px', float: 'right' }}>
                                                <PlusCircle style={{ color: '#376ebb' }}
                                                    onClick={handleAddUpload}

                                                />
                                                <MinusCircle style={{ color: '#376ebb' }}
                                                    onClick={() => handleRemoveUpload("second")}

                                                />
                                            </div>
                                        </Col>

                                        {/* </Form.Group> */}

                                    </Form.Group>

                                </Col>
                            </Row>
                            : ""}

                        {showSecond === true ?
                            <Row>
                                <Col sm={8}>
                                    <Form.Group as={Row} >
                                        <Form.Label column sm='4' className='labels'></Form.Label>
                                        <Col sm='4'>


                                            <input
                                                className="btn"
                                                type="file"
                                                accept="image/*,video/*,.pdf"
                                                // multiple="multiple"
                                                onChange={(e) => changeHandler(e, "third")}
                                                style={{ padding: "5px", width: "200px", whiteSpace: "initial" }}
                                            />
                                            <br />

                                            {filenames !== null && filenames.length > 1 && filenames.map((e, i) => {
                                                return (
                                                    <div>{e.name}</div>
                                                );
                                            })}
                                        </Col>

                                        <Col sm='4'>
                                            <button className="btn btn-primary" style={{ paddingLeft: "20px", paddingRight: "20px", fontWeight: "bold" }}
                                                type="button" onClick={() => handleUpload("third")} disabled={fileSubmitButtonThird}
                                            >Upload</button>

                                            <div style={{ paddingTop: '5px', float: 'right' }}>
                                                <PlusCircle disabled style={{ color: 'lightgrey' }}
                                                    onClick={handleAddUpload}

                                                />
                                                <MinusCircle style={{ color: '#376ebb' }}
                                                    onClick={() => handleRemoveUpload("third")}

                                                />
                                            </div>
                                        </Col>



                                    </Form.Group>

                                </Col>
                            </Row>
                            : ""}

                        <Row>
                            <Col sm={8}>
                                <Form.Group as={Row} >
                                    <Form.Label column sm='4' className='labels'>Urgency:<span style={{ color: 'red' }}>*</span></Form.Label>
                                    <Col sm='8'>
                                        <select
                                            className="form-control"
                                            required
                                            value={urgencyId}
                                            //     defaultValue={urgencyList.categoryName}
                                            onChange={(e) => selectValueForDropDownUrgency(e)}>

                                            <option value="">Select Urgency</option>
                                            {urgencyList !== null &&
                                                urgencyList.map((e, i) => {
                                                    return (
                                                        <option key={e.urgencyId} value={e.urgencyId}>
                                                            {e.urgencyName}
                                                        </option>
                                                    );
                                                })}
                                        </select>

                                    </Col>
                                </Form.Group>
                            </Col>
                        </Row>
                        <Row>
                            <Col sm={8}>
                                <Form.Group as={Row} >
                                    <Form.Label column sm='4' className='labels'>Priority:</Form.Label>
                                    <Col sm='8'>

                                        <input type="text" value={priority} style={{ fontSize: "0.8rem" }} className="form-control"
                                            readOnly placeholder={priorityList} />

                                    </Col>
                                </Form.Group>
                            </Col>
                        </Row>

                        <Row>
                            <Col sm={8}>


                            </Col>

                        </Row>




                        <br />

                        <Row>
                            <Col sm={5}></Col>
                            <Col sm={4}>
                                <button className="btn btn-primary" style={{ marginTop: "5px", paddingLeft: "30px", paddingRight: "30px", fontWeight: "bold" }}
                                    type="submit" value="Submit"
                                >Submit</button>
                            </Col>
                        </Row>
                    </Form>


                    :
                    <div className="loader-box loader" style={{ width: "100% !important" }}>
                        <div className="loader">
                            <div className="line bg-primary"></div>
                            <div className="line bg-primary"></div>
                            <div className="line bg-primary"></div>
                            <div className="line bg-primary"></div>
                        </div>
                    </div>
                }

            </Container>
        </Fragment >
    );
};

export default CreateTicket;