import React from "react";
import { Table, Row } from "react-bootstrap";
import { Link } from "react-router-dom";
import TableActionButton from "./TableAction.component";
import "./Table.style.css";

const TableComponent = ({
  tableHeaders,
  tableBody,
  scroll = false,
  button = false,
}) => {
  return (
    <div className="table-responsive">
      <Table
        className="table table-hover"
        style={scroll ? { width: "100%", display: "block" } : {}}
      >
        <thead
          className="thead-light"
          style={
            scroll
              ? {
                  display: "inline-block",
                  width: "100%",
                }
              : {}
          }
        >
          <tr>
            {Object.entries(tableHeaders).map(([key, value]) => (
              <th key={key}>{value}</th>
            ))}
          </tr>
        </thead>
        {tableBody !== null &&
        tableBody !== undefined &&
        Object.keys(tableBody).length !== 0 ? (
          <tbody
            style={
              scroll
                ? {
                    height: "160px",
                    display: "inline-block",
                    width: "100%",
                    overflow: "auto",
                  }
                : {}
            }
          >
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
                            />
                          </Link>
                        ) : (
                          <TableActionButton
                            disabled={!value.active}
                            type={key}
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
                                <Link to={actValue.link}>
                                  <TableActionButton
                                    key={`${item.sno}_${itemIndex}_${index}_${key}_${actKey}`}
                                    disabled={!actValue.active}
                                    type={actKey}
                                  />
                                </Link>
                              );
                            } else {
                              return (
                                <TableActionButton
                                  key={`${item.sno}_${itemIndex}_${index}_${key}_${actKey}`}
                                  disabled={!actValue.active}
                                  type={actKey}
                                />
                              );
                            }
                          })}
                        </Row>
                      </td>
                    );
                  } else if (key === "status" && button) {
                    return (
                      <td key={`${item.sno}_${itemIndex}_${index}_${key}`}>
                        {value === "Approved" ? (
                          <button
                            style={{
                              backgroundColor: "green",
                              color: "white",
                              border: "1px",
                              height: "30px",
                              width: "100px",
                            }}
                            disabled="true"
                          >
                            {value}
                          </button>
                        ) : (
                          <button
                            style={{
                              backgroundColor: "red",
                              color: "white",
                              border: "1px",
                              height: "30px",
                              width: "100px",
                            }}
                          >
                            {value}
                          </button>
                        )}
                      </td>
                    );
                  } else {
                    return (
                      <td key={`${item.sno}_${itemIndex}_${index}_${key}`}>
                        {value}
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
      </Table>
    </div>
  );
};

export default TableComponent;
