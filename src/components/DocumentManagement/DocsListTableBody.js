import React, { useContext } from "react";
import { Eye, Download } from "react-feather";
import { DocumentManagementContext } from "../../context/DocumentManagementState";

const DocsListTableBody = ({ doc, index }) => {
  const { downloadModuleDoc } = useContext(DocumentManagementContext);

  const downloadDoc = (e) => {
    const docName = e.target.getAttribute("data-doc");
    downloadModuleDoc(docName);
  };

  return (
    <tr>
      <td>{index}</td>
      <td>{doc}</td>
      <td>
        <a href={process.env.REACT_APP_S3_URL + doc} target="_blank">
          <Eye />
        </a>
      </td>
      <td>
        <Download
          data-doc={doc}
          onClick={downloadDoc}
          style={{ color: "#007bff" }}
        />
      </td>
    </tr>
  );
};

export default DocsListTableBody;
