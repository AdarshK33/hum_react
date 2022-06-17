import React,{useState}from "react";
import { Table, Row } from "react-bootstrap";
import { Link } from "react-router-dom";
import TableActionButton from "./TableAction.component";
import TableScrollbar from "react-table-scrollbar";
import "./Table.style.css";

const TableComponentManager360 = ({
  tableHeaders,
  tableBody,
  height = "265px",
  button = false,
}) => {
  return (
    <div style={{ height: height }}>
      <TableScrollbar>
        <table className="table table-hover">
          <thead className="thead-light" style={{ fontSize: "15px" }}>
            <tr>
              {Object.entries(tableHeaders).map(([key, value]) => (
                <th key={key}>{value}</th>
              ))}
            </tr>
          </thead>
          {tableBody !== null &&
          tableBody !== undefined &&
          Object.keys(tableBody).length !== 0 ? (
            <tbody style={{ fontSize: "15px" }}>
              {tableBody.map((item, itemIndex) => (
                <tr key={`${item.sno}_${itemIndex}`}>
                  {Object.entries(item).map(([key, value], index) => {
                    if (key === "view") {
                      return (
                        <td key={`${item.sno}_${itemIndex}_${index}_${key}`}>
                          {value.link !== "" ? (
                            <Link to={value.link}>
                              <TableActionButton
                                disabled={!value.active}
                                type={key}
                                EmployeeId={item.empId}
                              />
                            </Link>
                          ) : (
                            <TableActionButton
                              disabled={!value.active}
                              type={key}
                              EmployeeId={item.empId}
                            />
                          )}
                        </td>
                      );
                    } else if (key === "action") {
                      return (
                        <td key={`${item.sno}_${itemIndex}_${index}_${key}`}>
                          <Row className="text-center">
                            {Object.entries(value).map(([actKey, actValue]) => {
                              if (actValue.link !== "") {
                                return (
                                  <Link to={actValue.link}  key={`${item.sno}_${itemIndex}_${index}_${key}_${actKey}`}>
                                    <TableActionButton
                                      key={`${item.sno}_${itemIndex}_${index}_${key}_${actKey}`}
                                      disabled={!actValue.active}
                                      type={actKey}
                                      EmployeeId={item.empId}
                                    />
                                  </Link>
                                );
                              } else {
                                return (
                                  <TableActionButton
                                    key={`${item.sno}_${itemIndex}_${index}_${key}_${actKey}`}
                                    disabled={!actValue.active}
                                    type={actKey}
                                    EmployeeId={item.empId}
                                  />
                                );
                              }
                            })}
                          </Row>
                        </td>
                      );
                    } else {
                      return (
                        <td key={`${item.sno}_${itemIndex}_${index}_${key}`}>
                          <Link
                            to={item.action.edit.link}
                            style={{ textDecoration: "none" }}
                          >
                            {value}
                          </Link>
                        </td>
                      );
                    }
                  })}
                </tr>
              ))}
            </tbody>
          ) : (
            <tbody>
              <tr>
                <td colSpan="14">No Record Found</td>
              </tr>
            </tbody>
          )}
        </table>
      </TableScrollbar>
    </div>
  );
};

export default TableComponentManager360;
