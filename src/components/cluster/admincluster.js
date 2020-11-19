import React, { useEffect, Fragment, useContext, useState } from 'react'
import Breadcrumb from "../common/breadcrumb";
import AdminCreateClusterModal from "./adminCreateClusterModal";
import AdminEditClusterModal from "./adminEditClusterModal";
import { Button } from 'react-bootstrap'
import { Edit2, Search } from 'react-feather'
import { ClusterContext } from "../../context/ClusterState";
import { SearchContext } from '../../context/SearchState';
import { AppContext } from "../../context/AppState";
import Pagination from 'react-js-pagination';
function AdminCluster() {



    const [modal, setModal] = useState(false);

    const handleShow = () => setModal(true)

    const [editModal, setEditModal] = useState(false)
    const handleEditClose = () => setEditModal(false)
    const handleEditShow = () => setEditModal(true)
    // const [searchValue, setSearchValue] = useState(false);
    // const [searchCluster, setSearchCluster] = useState();

    // const { viewSearchClusterList, searchClusterList } = useContext(SearchContext);
    const [searchValue, setSearchValue] = useState(false);
    const [searchLeaveList, setLeaveList] = useState();
    const { viewSearchClusterList, searchClusterList } = useContext(SearchContext);
    const { viewCluster, clusterList, getCluster, viewCostCenterEmployeeByManger, getSingleCluster, getSingleCluster1, getEmployeesNames, loader } = useContext(ClusterContext);
    const { user } = useContext(AppContext);

    useEffect(() => {
        viewCluster()
    }, [])




    const [currentPage, setCurrentPage] = useState(1);
    const recordPerPage = 10;
    const totalRecords = searchLeaveList !== null && searchLeaveList !== undefined && searchLeaveList.length;
    const pageRange = 10;
    const indexOfLastRecord = currentPage * recordPerPage;
    const indexOfFirstRecord = indexOfLastRecord - recordPerPage;
    const currentRecords = searchLeaveList !== null ? searchLeaveList !== undefined && searchLeaveList.slice(indexOfFirstRecord, indexOfLastRecord) : [];


    const handlePageChange = pageNumber => {
        setCurrentPage(pageNumber);
    }
    useEffect(() => {
        if (clusterList !== undefined && clusterList !== null && clusterList.length > 0) {
            setLeaveList(clusterList);
        }

    }, [clusterList])


    const searchHandler = (e) => {
        setSearchValue(e.target.value)

    }

    const searchDataHandler = () => {
        if (searchValue !== "") {
            viewSearchClusterList(searchValue);
        } else {
            viewCluster()
        }

    }


    const handleClose = () => {
        setModal(false)
        setCurrentPage(1)
    }
    useEffect(() => {
        if (searchClusterList !== undefined && searchClusterList !== null && searchClusterList.length > 0) {
            setLeaveList(searchClusterList);
        }
    }, [searchClusterList])

    return (
        <Fragment>
            <Breadcrumb title="Admin Cluster" parent="Admin Cluster" />
            <div className="container-fluid">
                <div className="row">
                    <div className="col-sm-12">
                        <div className="card" style={{ overflowX: "auto" }}>


                            <div className="title_bar">
                                <div className="job-filter">
                                    <div className="faq-form mr-2">
                                        <input className="form-control searchButton" type="text" placeholder="Search.." onChange={(e) => searchHandler(e)} />
                                        <Search className="search-icon" style={{ color: "#313131" }} onClick={searchDataHandler} />
                                    </div>
                                </div>
                                <Button className="btn btn-light mr-2" onClick={handleShow}>Create</Button>
                                {/* <Button className="btn btn-light mr-2" onClick={handleEditShow}>edit</Button> */}

                            </div>
                            <AdminCreateClusterModal handleClose={handleClose} modal={modal} />
                            <div className="table-responsive">
                                <table id="table" className="table table-hover">
                                    <thead className="thead-light" style={{ backgroundColor: "#2f3c4e" }}>
                                        <tr>
                                            <th>S. No</th>
                                            <th scope="col">Sports Name</th>
                                            <th scope="col">Cost Center</th>
                                            <th scope="col">Cluster Name</th>
                                            <th scope="col">Cluster Details</th>
                                            <th scope="col">Cluster Leader</th>
                                            <th scope="col">Team Count</th>
                                            <th scope="col">Create Date&nbsp;&nbsp;&nbsp;&nbsp;</th>
                                            <th scope="col">Status</th>
                                            <th scope="col">Edit</th>
                                        </tr>
                                    </thead>

                                    {loader === true && currentRecords !== null && currentRecords !== undefined ?
                                        <tbody>
                                            <tr>
                                                <td colspan='6'>
                                                    <div className="loader-box loader" style={{ width: "100% !important", marginLeft: "200px" }}>
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
                                        currentRecords !== undefined && currentRecords !== null &&
                                            currentRecords.length > 0 ?
                                            currentRecords.map((e, i) => {
                                                return (
                                                    <tbody key={i + 1}>
                                                        <tr>
                                                            <td>{i + 1 + indexOfFirstRecord}</td>
                                                            {e.sports.map((f, j) => {
                                                                return (<tr key={j + 1}>
                                                                    <td style={{ marginLeft: "10px", fontSize: "10px", paddingTop: "5px", paddingBottom: "5px" }}>{f.sportName}</td>
                                                                </tr>)
                                                            })}
                                                            <td>{e.storeId}</td>
                                                            <td>{e.clusterName}</td>
                                                            <td>{e.description}</td>
                                                            <td>{e.clusterLeaderName}</td>
                                                            <td>{e.teamCount}</td>
                                                            <td>{e.createdDate}</td>
                                                            <td>{e.status === 0 ? "active" : "inactive"} </td>
                                                            <td><Edit2 onClick={() => {
                                                                setEditModal(true);
                                                                getCluster(e.clusterId);
                                                                viewCostCenterEmployeeByManger(e.storeId)
                                                            }} />
                                                            </td>

                                                        </tr>

                                                    </tbody>
                                                )
                                            }) :
                                            <tbody>
                                                <tr>
                                                    <td colspan='12'>No Record Found</td>
                                                </tr>
                                            </tbody>}

                                </table>



                                <AdminEditClusterModal handleEditClose={handleEditClose}
                                    shiftData={getSingleCluster}
                                    clusterData={getSingleCluster1}
                                    clusterData1={getEmployeesNames}
                                    modal={editModal}
                                />
                            </div>
                            <div>
                                {searchLeaveList !== null && searchLeaveList !== undefined && searchLeaveList.length > 10 &&
                                    <Pagination
                                        itemClass="page-item"
                                        linkClass="page-link"
                                        activePage={currentPage}
                                        itemsCountPerPage={recordPerPage}
                                        totalItemsCount={totalRecords}
                                        pageRangeDisplayed={pageRange}
                                        onChange={handlePageChange}
                                    />
                                }
                            </div>
                        </div>
                    </div>
                </div>


            </div>
        </Fragment>

    )
}

export default AdminCluster
