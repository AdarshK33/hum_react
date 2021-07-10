// import React, { useContext, useEffect } from "react";
// import { useParams } from "react-router-dom";
// import Breadcrumb from "../../common/breadcrumb";
// import { Row, Col, Container } from "react-bootstrap";
// import { TransferContext } from "../../../context/TransferState";
// import NoDataComp from "../../no-data/NoData.component";
// import RegularTransferAcceptance from "./RegularTransferAcceptance";
// import LoaderIcon from "../../Loader/LoaderIcon";

// const TransferAcceptance = () => {
//   const { transferId } = useParams();
//   const {
//     getTransferData,
//     transferData,
//     loader,
//     getCostCentreLocationDetails,
//     costCentreLocationData,
//   } = useContext(TransferContext);

//   useEffect(() => {
//     if (transferId !== null && transferId !== undefined) {
//       getTransferData(transferId);
//     }
//   }, [transferId]);

//   useEffect(() => {
//     if (transferData !== null && transferData !== undefined) {
//       getCostCentreLocationDetails(transferData.promotedCostCentre);
//     }
//   }, [transferData]);

//   return (
//     <div className="transfer-view">
//       <Breadcrumb title="TRANSFER ACCEPTANCE" parent="TRANSFER ACCEPTANCE" />
//       <div className="container-fluid">
//         <div className="card" style={{ borderRadius: "1rem" }}>
//           <div className="OnBoardHeading">
//             <b className="align-middle">TRANSFER ACCEPTANCE </b>
//           </div>
//           {/* {loader ? (
//             <LoaderIcon />
//           ) : ( */}
//           <>
//             {transferData !== null &&
//             transferData !== undefined &&
//             Object.keys(transferData).length > 0 ? (
//               <Container className="ml-4 mt-4">
//                 <Row className="mb-4">
//                   <Col md={2}>Transfer Type</Col>
//                   <Col md={8} className="text-primary">
//                     {transferData.transferType}
//                   </Col>
//                 </Row>
//                 <Row className="mb-4">
//                   <Col md={2}>Employee Name</Col>
//                   <Col md={8} className="text-primary">
//                     {transferData.employeeName} {transferData.currentEmployeeId}
//                   </Col>
//                 </Row>
//                 <Row className="mb-4">
//                   <Col
//                     md={{ span: 3, offset: 2 }}
//                     className="font-weight-bold my-2"
//                   >
//                     Current
//                   </Col>
//                   <Col
//                     md={{ span: 3, offset: 2 }}
//                     className="font-weight-bold my-2"
//                   >
//                     New
//                   </Col>
//                 </Row>
//                 {transferData.transferType === "Regular Transfer" ? (
//                   <RegularTransferAcceptance />
//                 ) : (
//                   <RegularTransferAcceptance />
//                 )}
//               </Container>
//             ) : (
//               <NoDataComp />
//             )}
//           </>
//         </div>
//       </div>
//     </div>
//   );
// };

// export default TransferAcceptance;
