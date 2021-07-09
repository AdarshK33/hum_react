import React from "react";
import { Table, Row } from "react-bootstrap";
import { Link } from "react-router-dom";
import TableActionButton from "./TableAction.component";
import "./Table.style.css";

const TableComponent = ({ tableHeaders, tableBody }) => {
  return (
    <div className="table-responsive">
      <Table className="table table-hover">
        <thead className="thead-light" style={{ backgroundColor: "#2f3c4e" }}>
          <tr>
            {Object.entries(tableHeaders).map(([key, value]) => (
              <th key={key}>{value}</th>
            ))}
          </tr>
        </thead>
        <tbody>
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
                      <Row>
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
      </Table>
    </div>
  );
};

export default TableComponent;
