import React, { useState } from 'react';
import { Document, Page } from 'react-pdf';
import Form11 from "./Form_11_UAN.pdf"
function DownloadForm() {
  const [numPages, setNumPages] = useState(null);
  const [pageNumber, setPageNumber] = useState(1);

  function onDocumentLoadSuccess({ numPages }) {
    setNumPages(numPages);
  }

  return (
    <div>
      <Document
        file={Form11}
      >
        <Page pageNumber={1} />
      </Document>
      <p>Page {pageNumber} of {numPages}</p>
    </div>
  );
}