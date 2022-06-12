import React, { useContext } from "react";
import { Eye, Download } from "react-feather";
import { DocumentManagementContext } from "../../context/DocumentManagementState";
import { PermissionContext } from "../../context/PermissionState";


const DocsListTableBody = ({ doc, index,EmployeeId }) => {
  const { downloadModuleDoc ,moduleDocsList} = useContext(DocumentManagementContext);
  const { rolePermission ,ImageView,imageViewData} = useContext(PermissionContext);

  const downloadDoc = (e) => {
    e.preventDefault()
    const docName = e.target.getAttribute("data-doc");
    downloadModuleDoc(docName,EmployeeId);
  };

  return (
    <tr>
      <td>{index}</td>
      <td>{doc}</td>
      <td>
        {/* <a href={process.env.REACT_APP_S3_URL + doc} target="_blank">
          <Eye  />
        </a> */}
        <a href={imageViewData.data ? imageViewData.data:""} target="_blank">
          <Eye onClick={()=>ImageView(doc,EmployeeId)} />
        </a>
      </td>
      <td>
        <Download
          data-doc={doc}
          onClick={downloadDoc}
          style={{ color: "#007bff", cursor: "pointer" }}
        />
      </td>
    </tr>
  );
};

export default DocsListTableBody;
