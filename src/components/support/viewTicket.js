import React, { Fragment, useContext, useEffect, useState } from 'react';
import Breadcrumb from '../common/breadcrumb';
import { Container, Row, Col, Form, Button, Table } from 'react-bootstrap'
import { useHistory } from "react-router-dom";
import { Download } from 'react-feather';
import '../common/style.css'
import { SupportContext } from '../../context/SupportState'
import { GroupContext } from '../../context/GroupState'
import { AppContext } from "../../context/AppState";
import { toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import '../common/style.css'
import { PlusCircle, MinusCircle } from 'react-feather';
import { client } from '../../utils/axios';

const ViewTicket = () => {
    const { completeStatus, completeStatusView, ticketStatus,
        ticketStatusView, ticketIdList, updateTicket, loader, downloadFile } = useContext(SupportContext)
    const { serviceGroupView, serviceGroupList } = useContext(GroupContext)
    const { user } = useContext(AppContext);

    const [compStatus, setCompStatus] = useState()
    const [tickStatus, setTickStatus] = useState()
    const [resolution, setResolution] = useState('')
    const [serviceGroup, setServiceGroup] = useState()
    // const [fileUpload, setFileUpload] = useState('');
    //const [fileName, setFileName] = useState('')
    const [number, setNumber] = useState()
    // const [filesCount, setFilesCount] = useState([])
    const [fileSubmitButtonFirst, setFileSubmitButtonFirst] = useState(false);
    const [fileSubmitButtonSecond, setFileSubmitButtonSecond] = useState(false);
    const [fileSubmitButtonThird, setFileSubmitButtonThird] = useState(false);
    const [fileNames, setFileNames] = useState([])
    const [filenames, setFilenames] = useState([])
    const [fileUpload, setFileUpload] = useState();
    const [showFirst, setshowFirst] = useState(false);
    const [showSecond, setshowSecond] = useState(false);
    const [deleteFirstFile, setDeleteFirstFile] = useState()
    const [deleteSecondFile, setDeleteSecondFile] = useState()
    const [deleteThirdFile, setDeleteThirdFile] = useState()
    const [errormsg, setErrorMsg] = useState(false)

    let history = useHistory();

    useEffect(() => {
        serviceGroupView()
    }, [])


    /* const changeHandler = (e) => {
        let fileObj = e.target.files[0].name;
        console.log("clicked", fileObj)
        setFileUpload(fileObj)
    }
    const handleUpload = () => {
        if (fileUpload !== undefined && fileUpload !== null) {
            setFileUpload(fileUpload)
        } else {
            toast.info("Please select a file to upload")
        }
    } */

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
    
    const validation = () => {
        let flag = true
        if (resolution === '') {
           setErrorMsg(true)
            flag = false;
            return;
        }
        return flag;
    }
    
    const submitHandler = (e) => {
        e.preventDefault();
        const validate = validation()
        const updateData = {
            categoryId: ticketIdList.categoryId,
            completionStatus: compStatus,
            description: ticketIdList.description,
            email: ticketIdList.email,
            employeeId: ticketIdList.employeeId,
            fedId: ticketIdList.fedId,
            firstName: ticketIdList.firstName,
            groupId: serviceGroup,
            lastName: ticketIdList.lastName,
            phoneNumber:ticketIdList.phoneNumber,
            position: ticketIdList.position,
            priorityId: ticketIdList.priorityId,
            resolution: resolution,
            resolutionFiles: fileNames.map((e, i) => e.fileName),
            role: ticketIdList.role,
            serviceGroup: serviceGroup,
            storeId: ticketIdList.storeId,
            ticketFiles: null,
            ticketId: ticketIdList.ticketId,
            ticketResolutions: null,
            ticketStatus: tickStatus,
            title: ticketIdList.title,
            urgencyId: ticketIdList.urgencyId
        }
        console.log("resolutionFile", updateData.resolutionFiles)
        console.log("fileNames", fileNames)
        if(validate){
        updateTicket(updateData, ticketIdList.ticketId)
        setResolution('')
        setFileNames([])
        setshowFirst(false)
        setshowSecond(false)
        history.push("./ticketlistingpage")
        }

    }

    const backHandler = (e) => {
        history.push("./ticketlistingpage")
    }

    const downloadFileButton = (e) => {
        console.log("e==========", e)
        downloadFile(e)
    }

    useEffect(() => {
        setCompStatus(ticketIdList.completionStatus)
    }, [ticketIdList.completionStatus])

    useEffect(() => {
        setTickStatus(ticketIdList.ticketStatus)
    }, [ticketIdList.ticketStatus])

    useEffect(() => {
        setServiceGroup(ticketIdList.groupId)
    }, [ticketIdList.groupId])


    /* useEffect(() => {
        setFileName(ticketIdList.fileName)
        console.log("ticketIdList.fileName", ticketIdList.fileName)
    }, [ticketIdList.fileName]) */

    useEffect(() => {
        completeStatus()
        ticketStatus()
    }, [])

    const compStatusHandler = (e) => {
        setCompStatus(e.target.value)
        console.log("compStatus value", e.target.value)
    }

    const tickStatusHandler = (e) => {
        setTickStatus(e.target.value)
        console.log("ticket value", e.target.value)
    }

    const resolutionHandler = (e) => {
        setResolution(e.target.value)
        if(e.target.value === ''){
            setErrorMsg(true)
        }else{
            setErrorMsg(false)
        }
    }

    const serviceGroupHandler = (e) => {
        setServiceGroup(e.target.value)
        console.log("e.target.value of service group", e.target.value)
    }

    console.log("ticketid list", ticketIdList.ticketStatus)
    return (
        <Fragment>
            <Breadcrumb title="View Ticket" parent="View Ticket" />
            <Container fluid>
                {loader === true ?
                    <div className="loader-box loader" style={{ width: "100% !important" }}>
                        <div className="loader">
                            <div className="line bg-primary"></div>
                            <div className="line bg-primary"></div>
                            <div className="line bg-primary"></div>
                            <div className="line bg-primary"></div>
                        </div>
                    </div> :
                    <Form style={{ backgroundColor: 'white', padding: '3rem' }} >
                        <Row>
                            <Col sm={6}>
                                <Form.Group as={Row}>
                                    <Form.Label column sm='4' className='labels'>Ticket Number:</Form.Label>
                                    <Col sm='8'>
                                        <Form.Control type='text' value={ticketIdList.ticketId} readOnly className='disabledValue blueText' />
                                    </Col>
                                </Form.Group>
                            </Col>
                            <Col sm={6}>
                                <Form.Group as={Row}>
                                    <Form.Label column sm='4' className='labels'>Cost Center :</Form.Label>
                                    <Col sm='8'>
                                        <Form.Control type='text' value={ticketIdList.storeId} readOnly className='disabledValue blueText' />
                                    </Col>
                                </Form.Group>
                            </Col>
                        </Row>
                        <Row>
                            <Col sm={6}>
                                <Form.Group as={Row}>
                                    <Form.Label column sm='4' className='labels'>Name :</Form.Label>
                                    <Col sm='8'>
                                        <Form.Control type='text' value={ticketIdList.firstName + ' ' + ticketIdList.lastName} readOnly className='disabledValue blueText' />
                                    </Col>
                                </Form.Group>
                            </Col>
                            <Col sm={6}>
                                <Form.Group as={Row}>
                                    <Form.Label column sm='4' className='labels'>FED ID :</Form.Label>
                                    <Col sm='8'>
                                        <Form.Control type='text' value={ticketIdList.fedId} readOnly className='disabledValue blueText' />
                                    </Col>
                                </Form.Group>
                            </Col>
                        </Row>
                        <Row>
                            <Col sm={6}>
                                <Form.Group as={Row}>
                                    <Form.Label column sm='4' className='labels'>Email Id :</Form.Label>
                                    <Col sm='8'>
                                        <Form.Control type='text' value={ticketIdList.email} readOnly className='disabledValue blueText' />
                                    </Col>
                                </Form.Group>
                            </Col>
                            <Col sm={6}>
                                <Form.Group as={Row}>
                                    <Form.Label column sm='4' className='labels'>Position :</Form.Label>
                                    <Col sm='8'>
                                        <Form.Control type='text' value={ticketIdList.position} readOnly className='disabledValue blueText' />
                                    </Col>
                                </Form.Group>
                            </Col>
                        </Row>
                        <Row>
                            <Col sm={8}>
                                <Form.Group as={Row} >
                                    <Form.Label column sm='3' className='labels'>Phone Number :</Form.Label>
                                    <Col sm='9'>
                                        <Form.Control type='text' value={ticketIdList.phoneNumber} readOnly className='disabledValue'/>
                                    </Col>
                                </Form.Group>
                            </Col>
                        </Row>
                        <Row>
                            <Col sm={8}>
                                <Form.Group as={Row} >
                                    <Form.Label column sm='3' className='labels'>Select Role :</Form.Label>
                                    <Col sm='9'>
                                        <Form.Control type='text' readOnly className='disabledValue'
                                            value={ticketIdList.role === 0 ? 'Super Cost Center' :
                                                (ticketIdList.role === 1 ? 'Store Leader' :
                                                    (ticketIdList.role === 2 ? 'Coach' :
                                                        (ticketIdList.role === 3 ? 'Sports Leader' : '')))} />
                                    </Col>
                                </Form.Group>
                            </Col>
                        </Row>
                        <Row>
                            <Col sm={8}>
                                <Form.Group as={Row} >
                                    <Form.Label column sm='3' className='labels'>Selected Issue :</Form.Label>
                                    <Col sm='9'>
                                        <Form.Control type='text' readOnly className='disabledValue'
                                            value={ticketIdList.categoryId === 1 ? 'User Interface Issue' :
                                                (ticketIdList.categoryId === 2 ? 'Performance Issue' :
                                                    (ticketIdList.categoryId === 3 ? 'Leave Functionality/Feature Issue' :
                                                        (ticketIdList.categoryId === 4 ? 'Enhancement suggestions' :
                                                            (ticketIdList.categoryId === 5 ? 'Data mismatch' :
                                                                (ticketIdList.categoryId === 6 ? 'Roster Functionality/Feature Issue' :
                                                                    (ticketIdList.categoryId === 7 ? 'Report Extract Issue' :
                                                                        (ticketIdList.categoryId === 8 ? 'Salary Calculation Issue' :
                                                                            (ticketIdList.categoryId === 9 ? 'Leave Calculation Issue' :
                                                                                (ticketIdList.categoryId === 10 ? 'Clarification/Queries' : '')))))))))} />
                                    </Col>
                                </Form.Group>
                            </Col>
                        </Row>
                        <Row>
                            <Col sm={8}>
                                <Form.Group as={Row} >
                                    <Form.Label column sm='3' className='labels'>Title :</Form.Label>
                                    <Col sm='9'>
                                        <Form.Control type='text' value={ticketIdList.title} readOnly className='disabledValue' />
                                    </Col>
                                </Form.Group>
                            </Col>
                        </Row>
                        <Row>
                            <Col sm={8}>
                                <Form.Group as={Row} >
                                    <Form.Label column sm='3' className='labels'>Description :</Form.Label>
                                    <Col sm='9'>
                                        <Form.Control type='text' value={ticketIdList.description}
                                            readOnly className='disabledValue' />
                                    </Col>
                                </Form.Group>
                            </Col>
                        </Row>
                        <Row>
                            {ticketIdList.ticketFiles !== undefined &&
                                ticketIdList.ticketFiles !== null &&
                                ticketIdList.ticketFiles.length === 0 ? '' :
                                <Col sm={8}>
                                    <Form.Group as={Row}>
                                        <Form.Label column sm='3'></Form.Label>
                                        <Col sm='9' style={{ paddingLeft: '1.5rem' }}>
                                            {ticketIdList.ticketFiles != null &&
                                                ticketIdList.ticketFiles !== undefined &&
                                                ticketIdList.ticketFiles.length > 0 &&
                                                ticketIdList.ticketFiles.map((item, i) => {
                                                    return (

                                                        <div style={{ display: 'flow-root' }}>
                                                            <span style={{ float: 'left' }}>
                                                                {item.fileName}</span>
                                                            <Download onClick={() => { downloadFileButton(item.fileName) }}
                                                                style={{ cursor: 'pointer', color: 'blue', float: 'right' }} />

                                                        </div>

                                                    )
                                                })}
                                        </Col>
                                    </Form.Group>

                                </Col>}
                        </Row>
                        <Row>
                            <Col sm={8}>
                                <Form.Group as={Row} >
                                    <Form.Label column sm='3' className='labels'>Urgency :</Form.Label>
                                    <Col sm='9'>
                                        <Form.Control type='text' readOnly className='disabledValue'
                                            value={ticketIdList.urgencyId === 1 ? 'I am blocked from doing my work' :
                                                (ticketIdList.urgencyId === 2 ? 'The issue partially blocks my work' :
                                                    (ticketIdList.urgencyId === 3 ? 'This issue disrupts my work' :
                                                        (ticketIdList.urgencyId === 4 ? 'I can continue work' : '')))} />
                                    </Col>
                                </Form.Group>
                            </Col>
                        </Row>
                        <Row>
                            <Col sm={8}>
                                <Form.Group as={Row} >
                                    <Form.Label column sm='3' className='labels'>Priority :</Form.Label>
                                    <Col sm='9'>
                                        <Form.Control type='text' readOnly className='disabledValue'
                                            value={ticketIdList.priorityId === 1 ? 'Critical' :
                                                (ticketIdList.priorityId === 2 ? 'High' :
                                                    (ticketIdList.priorityId === 3 ? 'High' :
                                                        (ticketIdList.priorityId === 4 ? 'Medium' :
                                                            (ticketIdList.priorityId === 5 ? 'High' :
                                                                (ticketIdList.priorityId === 6 ? 'High' :
                                                                    (ticketIdList.priorityId === 7 ? 'Medium' :
                                                                        (ticketIdList.priorityId === 8 ? 'Medium' :
                                                                            (ticketIdList.priorityId === 9 ? 'High' :
                                                                                (ticketIdList.priorityId === 10 ? 'Medium' :
                                                                                    (ticketIdList.priorityId === 11 ? 'Medium' :
                                                                                        (ticketIdList.priorityId === 12 ? 'Low' :
                                                                                            (ticketIdList.priorityId === 13 ? 'Medium' :
                                                                                                (ticketIdList.priorityId === 14 ? 'Medium' :
                                                                                                    (ticketIdList.priorityId === 15 ? 'Low' :
                                                                                                        (ticketIdList.priorityId === 16 ? 'Low' : '')))))))))))))))} />
                                    </Col>
                                </Form.Group>
                            </Col>
                        </Row>
                       
                        <Row>
                            <Col sm={8}>
                                <Form.Group as={Row} >
                                    <Form.Label column sm='3' className='labels'>Service Groups :</Form.Label>
                                    <Col sm='9'>
                                        {/*  {user.loginType === '1' || user.loginType === '9' ||
                                            user.additionalRole === '1' || user.additionalRole === '9'  ?
                                            <Form.Control as='select' value={serviceGroup} onChange={serviceGroupHandler} >
                                                {serviceGroupList !== null &&
                                                    serviceGroupList !== undefined &&
                                                    serviceGroupList.length > 0 &&
                                                    serviceGroupList.map((item, i) => {
                                                        return (
                                                            <option key={item.groupId} value={item.groupId}>{item.groupName}</option>
                                                        )

                                                    })}
                                            </Form.Control> :
                                            <Form.Control type='text' readOnly className='disabledValue'
                                                value={ticketIdList.serviceGroup} />
                                        } */}
                                        {ticketIdList.ticketStatus === 3 ?
                                            <Form.Control type='text' readOnly className='disabledValue'
                                                value={ticketIdList.serviceGroup} /> :
                                            (user.loginType === '1' || user.loginType === '9' ||
                                                user.additionalRole === '1' || user.additionalRole === '9' ?
                                                <Form.Control as='select' value={serviceGroup} onChange={serviceGroupHandler} >
                                                    {serviceGroupList !== null &&
                                                        serviceGroupList !== undefined &&
                                                        serviceGroupList.length > 0 &&
                                                        serviceGroupList.map((item, i) => {
                                                            return (
                                                                <option key={item.groupId} value={item.groupId}>{item.groupName}</option>
                                                            )

                                                        })}
                                                </Form.Control> :
                                                <Form.Control type='text' readOnly className='disabledValue'
                                                    value={ticketIdList.serviceGroup} />)
                                        }
                                    </Col>
                                </Form.Group>
                            </Col>
                        </Row>
                        <Row>
                            <Col sm={8}>
                                <Form.Group as={Row} >
                                    <Form.Label column sm='3' className='labels'>Completion Status :</Form.Label>
                                    <Col sm='9'>
                                        {/*  {user.loginType === '1' || user.loginType === '9' ||
                                            user.additionalRole === '1' || user.additionalRole === '9' &&
                                            ticketIdList.ticketStatus !== 3 ?
                                            <Form.Control as='select' value={compStatus}
                                                onChange={compStatusHandler} >
                                                {completeStatusView !== null &&
                                                    completeStatusView !== undefined &&
                                                    completeStatusView.length > 0 &&
                                                    completeStatusView.map((item, i) => {
                                                        return (
                                                            <option key={i} value={item.value}>{item.name}</option>
                                                        )
                                                    })}
                                            </Form.Control> :
                                            <Form.Control type='text' readOnly className='disabledValue'
                                                value={ticketIdList.completionStatus === 0 ? 'Fulfilled Offline' :
                                                    (ticketIdList.completionStatus === 1 ? 'Fulfilled by live support' :
                                                        (ticketIdList.completionStatus === 2 ? 'Abandoned by User' :
                                                            (ticketIdList.completionStatus === 3 ? 'Enhancement request' :
                                                                (ticketIdList.completionStatus === 4 ? 'Resolved by Workaround' :
                                                                    (ticketIdList.completionStatus === 5 ? 'Training' : '')))))} />} */}
                                        {ticketIdList.ticketStatus === 3 ?
                                            <Form.Control type='text' readOnly className='disabledValue'
                                                value={ticketIdList.completionStatus === 0 ? 'Fulfilled Offline' :
                                                    (ticketIdList.completionStatus === 1 ? 'Fulfilled by live support' :
                                                        (ticketIdList.completionStatus === 2 ? 'Abandoned by User' :
                                                            (ticketIdList.completionStatus === 3 ? 'Enhancement request' :
                                                                (ticketIdList.completionStatus === 4 ? 'Resolved by Workaround' :
                                                                    (ticketIdList.completionStatus === 5 ? 'Training' : '')))))} />
                                            :
                                            (user.loginType === '1' || user.loginType === '9' ||
                                                user.additionalRole === '1' || user.additionalRole === '9' ?
                                                <Form.Control as='select' value={compStatus}
                                                    onChange={compStatusHandler} >
                                                    {completeStatusView !== null &&
                                                        completeStatusView !== undefined &&
                                                        completeStatusView.length > 0 &&
                                                        completeStatusView.map((item, i) => {
                                                            return (
                                                                <option key={i} value={item.value}>{item.name}</option>
                                                            )
                                                        })}
                                                </Form.Control> :
                                                <Form.Control type='text' readOnly className='disabledValue'
                                                    value={ticketIdList.completionStatus === 0 ? 'Fulfilled Offline' :
                                                        (ticketIdList.completionStatus === 1 ? 'Fulfilled by live support' :
                                                            (ticketIdList.completionStatus === 2 ? 'Abandoned by User' :
                                                                (ticketIdList.completionStatus === 3 ? 'Enhancement request' :
                                                                    (ticketIdList.completionStatus === 4 ? 'Resolved by Workaround' :
                                                                        (ticketIdList.completionStatus === 5 ? 'Training' : '')))))} />
                                            )
                                        }
                                    </Col>
                                </Form.Group>
                            </Col>
                        </Row>
                        <Row>
                            <Col sm={8}>
                                <Form.Group as={Row} >
                                    <Form.Label column sm='3' className='labels'>Ticket Status :</Form.Label>
                                    <Col sm='9'>
                                        {/* {user.loginType === '1' || user.loginType === '9' ||
                                            user.additionalRole === '1' || user.additionalRole === '9' &&
                                            ticketIdList.ticketStatus === 0 ||
                                            ticketIdList.ticketStatus === 1 ||
                                            ticketIdList.ticketStatus === 2  ?
                                            <Form.Control as='select' value={tickStatus}
                                                onChange={tickStatusHandler} >
                                                {ticketStatusView !== null &&
                                                    ticketStatusView !== undefined &&
                                                    ticketStatusView.length > 0 &&
                                                    ticketStatusView.map((item, i) => {
                                                        return (
                                                            <option key={i} value={item.value}>{item.name}</option>
                                                        )
                                                    })}
                                            </Form.Control> :
                                            <Form.Control type='text' readOnly className='disabledValue'
                                                value={ticketIdList.ticketStatus === 0 ? 'Open' :
                                                    (ticketIdList.ticketStatus === 1 ? 'In Progress' :
                                                        (ticketIdList.ticketStatus === 2 ? 'On Hold' :
                                                            (ticketIdList.ticketStatus === 3 ? 'Closed' : '')))} />} */}
                                        {ticketIdList.ticketStatus === 3 ?
                                            <Form.Control type='text' readOnly className='disabledValue'
                                                value={ticketIdList.ticketStatus === 0 ? 'Open' :
                                                    (ticketIdList.ticketStatus === 1 ? 'In Progress' :
                                                        (ticketIdList.ticketStatus === 2 ? 'On Hold' :
                                                            (ticketIdList.ticketStatus === 3 ? 'Closed' : '')))} />
                                            :
                                            (user.loginType === '1' || user.loginType === '9' ||
                                                user.additionalRole === '1' || user.additionalRole === '9' ?
                                                <Form.Control as='select' value={tickStatus}
                                                    onChange={tickStatusHandler} >
                                                    {ticketStatusView !== null &&
                                                        ticketStatusView !== undefined &&
                                                        ticketStatusView.length > 0 &&
                                                        ticketStatusView.map((item, i) => {
                                                            return (
                                                                <option key={i} value={item.value}>{item.name}</option>
                                                            )
                                                        })}
                                                </Form.Control> :
                                                <Form.Control type='text' readOnly className='disabledValue'
                                                    value={ticketIdList.ticketStatus === 0 ? 'Open' :
                                                        (ticketIdList.ticketStatus === 1 ? 'In Progress' :
                                                            (ticketIdList.ticketStatus === 2 ? 'On Hold' :
                                                                (ticketIdList.ticketStatus === 3 ? 'Closed' : '')))} />
                                            )
                                        }
                                    </Col>
                                </Form.Group>
                            </Col>
                        </Row>
                        {ticketIdList.ticketResolutions !== null &&
                            ticketIdList.ticketResolutions !== undefined &&
                            ticketIdList.ticketResolutions.length === 0 &&
                            ticketIdList.ticketStatus === 3 ?
                            <Row></Row>
                            :
                        <Row>
                            <Col sm={8}>
                                <Form.Group as={Row} >
                                    <Form.Label column sm='3' className='labels'>Resolution :<span style={{ color: 'red' }}>*</span></Form.Label>
                                    <Col sm='9' style={{ padding: '0 2rem' }}>
                                        <Row>
                                            <Table>
                                                {ticketIdList.ticketResolutions !== null &&
                                                    ticketIdList.ticketResolutions !== undefined &&
                                                    ticketIdList.ticketResolutions.length > 0 &&
                                                    ticketIdList.ticketResolutions.map((item, id) => {
                                                        return (
                                                            <tbody style={{border:'none'}}>
                                                                <tr>
                                                                    <td style={{
                                                                        textAlign: 'center', padding: '4px 0',
                                                                        border: 'none', fontWeight: 'bolder'
                                                                    }}>
                                                                        {item.date}</td>
                                                                </tr>

                                                                {item.resolutions.map((i, j) => {
                                                                    return (
                                                                        <Fragment>
                                                                            <tr>
                                                                                <td style={{
                                                                                    textAlign: 'left', padding: '4px 0',
                                                                                    border: 'none', fontWeight: 'bolder', textDecoration: 'underline'
                                                                                }}>
                                                                                    {i.employeeName}</td>
                                                                            </tr>
                                                                            {i.comments.map(a => {
                                                                                return (
                                                                                    <Fragment>
                                                                                        <tr style={{ backgroundColor: 'aliceblue' }}>
                                                                                            <td style={{
                                                                                                textAlign: 'left', padding: '4px 0', border: 'none'
                                                                                            }}>{a.comment}</td>
                                                                                            <td style={{ border: 'none' }}>{a.time}</td>
                                                                                        </tr>
                                                                                        {a.fileNames !== null && a.fileNames.length > 0 &&
                                                                                            <tr>{a.fileNames}<Download onClick={() => { downloadFileButton(a.fileNames) }}
                                                                                                style={{ cursor: 'pointer', color: 'blue', float: 'right' }} /></tr>}
                                                                                    </Fragment>
                                                                                )
                                                                            })}

                                                                        </Fragment>



                                                                    )
                                                                })}

                                                            </tbody>
                                                        )
                                                    })}

                                            </Table>
                                        </Row>
                                        {ticketIdList.ticketStatus === 3 ? <Row></Row>
                                            :
                                            <Fragment>
                                                <Row>
                                                    <Form.Control as='textarea' row='3' value={resolution || ''}
                                                        onChange={resolutionHandler} required></Form.Control>
                                                        {errormsg === true ? <p style={{color:'red',fontWeight:'bold'}}>*This field is Mandatory</p> : ''}
                                                </Row>
                                                {/*  <Row className='mt-2'>
                                            <input
                                            className="btn"
                                            type="file"
                                            accept="image/*,video/*,.pdf"
                                            onChange={(e) => changeHandler(e)}
                                            style={{ padding: "5px", width: "200px", whiteSpace: "initial" }}
                                        />
                                         <Button className="btn btn-primary" style={{ paddingLeft: "10px", paddingRight: "10px"}}
                                            type="button" onClick={handleUpload}>Upload File</Button>
                                        </Row> */}
                                            </Fragment>
                                        }
                                    </Col>
                                </Form.Group>
                            </Col>
                        </Row>
                        }
                        {ticketIdList.ticketStatus === 3 ? <Row></Row> :
                            <Row style={{ marginBottom: '2rem' }}>
                                <Col sm={8}>
                                    <Form.Group as={Row} >
                                        <Col sm='3'></Col>
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
                            </Row>}


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
                            <Col sm={3}></Col>
                            {ticketIdList.ticketStatus === 3 ? ''
                                :
                                <Col sm={2}>
                                    <Button type='submit' onClick={submitHandler}>Submit</Button>
                                </Col>
                            }
                            <Col sm={2}>
                                <Button onClick={backHandler}>Back</Button>
                            </Col>
                            <Col sm={3}></Col>
                        </Row>
                    </Form>
                }
            </Container>
        </Fragment>
    );
};

export default ViewTicket;