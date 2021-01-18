import React, { Fragment, useState, useContext, useEffect } from 'react';
import { Link } from 'react-router-dom'
import { Button, Table, Container, Row, Col } from 'react-bootstrap'
import Breadcrumb from '../common/breadcrumb';
import { Edit2, Search, Info } from 'react-feather';
import { SupportContext } from '../../context/SupportState'
import Pagination from 'react-js-pagination'
import 'react-confirm-alert/src/react-confirm-alert.css';

const TicketListingPage = () => {
    const [pageCount, setPageCount] = useState(0)
    const [currentRecords, setCurrentRecords] = useState([])
    const [searchValue, setSearchValue] = useState('');

    const { ticketView, ticketListing, loader, total, ticketIdView } = useContext(SupportContext)

    useEffect(() => {
        ticketView('all', pageCount)
    }, [])

    useEffect(() => {
        if (ticketListing !== null && ticketListing !== undefined) {
            setCurrentRecords(ticketListing)
        }
    }, [ticketListing, currentRecords])

    /*-----------------Pagination------------------*/
    const [currentPage, setCurrentPage] = useState(1);
    const recordPerPage = 10;
    const totalRecords = total;
    const pageRange = 10;

    const indexOfLastRecord = currentPage * recordPerPage;
    const indexOfFirstRecord = indexOfLastRecord - recordPerPage;


    const handlePageChange = pageNumber => {
        setPageCount(pageNumber - 1)
        setCurrentPage(pageNumber);
        if (searchValue !== "") {
            ticketView(searchValue, pageNumber - 1);
        } else {
            ticketView('all', pageNumber - 1)
        }
        setCurrentRecords(ticketListing)
    }


    /*-----------------Pagination------------------*/

    const searchHandler = (e) => {
        setSearchValue(e.target.value)

    }

    const searchDataHandler = () => {
        if (searchValue !== "") {
            ticketView(searchValue, pageCount);
        } else {
            ticketView('all', pageCount)
        }

    }

    return (
        <Fragment>
            <Breadcrumb title="View Ticket Status" parent="Ticket status" />
            <Container fluid>
                <Row>
                    <Col sm={12}>
                        <div className="card" style={{ overflowX: "auto" }}>
                            <div className="title_bar" >
                                <div className="job-filter">
                                    <div className="faq-form mr-2">
                                        <input className="form-control searchButton" type="text" placeholder="Search.." onChange={(e) => searchHandler(e)} />
                                        <Search className="search-icon" style={{ color: "#313131" }} onClick={searchDataHandler} />
                                    </div>
                                </div>
                                <Link to='/createticket'><Button className="apply-button btn btn-light mr-2">Create</Button></Link>
                            </div>

                            <div className="table-responsive">
                                <Table id="table-to-xls" className="table table-hover">
                                    <thead className="thead-light" style={{ backgroundColor: "#2f3c4e" }}>
                                        <tr>
                                            <th scope="col">S. No</th>
                                            <th scope="col">Ticket Id</th>
                                            <th scope="col">Cost Center</th>
                                            <th scope="col">Name</th>
                                            <th scope="col">Role</th>
                                            <th scope="col">Issue Category</th>
                                            <th scope="col">Priority</th>
                                            <th scope="col">Completion Status</th>
                                            <th scope="col">Ticket Status</th>
                                            <th scope="col">Created Date</th>
                                            <th scope="col">Updated Date</th>
                                            <th scope="col">Edit</th>
                                        </tr>

                                    </thead>
                                    {loader === true && ticketListing !== null && ticketListing !== undefined ?
                                        <tbody>
                                            <tr>
                                                <td colSpan='12'>
                                                    <div className="loader-box loader" style={{ width: "100% !important" }}>
                                                        <div className="loader">
                                                            <div className="line bg-primary"></div>
                                                            <div className="line bg-primary"></div>
                                                            <div className="line bg-primary"></div>
                                                            <div className="line bg-primary"></div>
                                                        </div>
                                                    </div>
                                                </td>
                                            </tr>
                                        </tbody>

                                        :
                                        ticketListing !== undefined && ticketListing !== null &&
                                            ticketListing.length > 0 ?
                                            ticketListing.map((item, i) => {
                                                return (
                                                    <tbody key={i}>
                                                        <tr>
                                                            <td>{i + 1 + indexOfFirstRecord}</td>
                                                            <td>{item.ticketId}</td>
                                                            <td>{item.storeId}</td>
                                                            <td>{item.firstName} {item.lastName}</td>
                                                            <td>{item.role}</td>
                                                            <td>{item.issueCategory === null ?
                                                                '-' : item.issueCategory}</td>
                                                            <td>{item.priority}</td>
                                                            <td>{item.completionStatusDesc}</td>
                                                            <td>{item.ticketStatusDesc}</td>
                                                            <td>{item.createdDate}</td>
                                                            <td>{item.updatedDate === null ? '-' :
                                                                item.updatedDate}</td>
                                                            {item.ticketStatusDesc === 'Closed' ?
                                                                 <Link to='/viewTicket'>
                                                                 <td><Info onClick={() => {
                                                                     ticketIdView(item.ticketId)
                                                                 }} /></td></Link>
                                                                :
                                                                <Link to='/viewTicket'>
                                                                    <td><Edit2 onClick={() => {
                                                                        ticketIdView(item.ticketId)
                                                                    }} /></td></Link>}
                                                        </tr>
                                                    </tbody>
                                                )
                                            }) :
                                            <tbody>
                                                <tr>
                                                    <td colSpan='12'>No Record Found</td>
                                                </tr>
                                            </tbody>}

                                </Table>
                            </div>

                            <div>
                            </div>
                        </div>
                    </Col>
                </Row>


            </Container>
            {ticketListing !== null && ticketListing !== undefined &&
                <Pagination
                    itemClass="page-item"
                    linkClass="page-link"
                    activePage={currentPage}
                    itemsCountPerPage={recordPerPage}
                    totalItemsCount={totalRecords}
                    pageRangeDisplayed={pageRange}
                    onChange={handlePageChange}
                    firstPageText="First"
                    lastPageText="Last"
                />
            }
        </Fragment >
    );
};

export default TicketListingPage;