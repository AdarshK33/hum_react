import React from "react";
import { Table } from "react-bootstrap";
import NoDataComp from "../no-data/NoData.component";
import DocsListTableHeader from "./DocsListTableHeader";
import DocsListTableBody from "./DocsListTableBody";

const DocsModuleList = ({ docsList,EmployeeId }) => {
  console.log(docsList,"DocsModuleList")
  return (
    <div className="docs-module-list mt-5">
      {docsList !== null && docsList !== undefined && docsList.length > 0 ? (
        <div className="table-responsive">
          <Table className="table table-hover">
            <thead
              className="thead-light"
              style={{ backgroundColor: "#2f3c4e" }}
            >
              <DocsListTableHeader />
            </thead>
            <tbody>
              {docsList.map((doc, index) => (
                <DocsListTableBody key={index} doc={doc} index={index + 1} EmployeeId={EmployeeId} />
              ))}
            </tbody>
          </Table>
        </div>
      ) : (
        <NoDataComp msg="No Documents Found" />
      )}
    </div>
  );
};

export default DocsModuleList;
