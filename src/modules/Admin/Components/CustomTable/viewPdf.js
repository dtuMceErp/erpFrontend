import React, { useState } from 'react';
import { Document, Page } from 'react-pdf';

export const ViewPdf=() =>{
  const [numPages, 
    // setNumPages
  ] = useState(null);
  const [pageNumber, 
    // setPageNumber
  ]= useState(1);

  // function onDocumentLoadSuccess({ numPages }) {
  //   setNumPages(numPages);
  // }

  return (
    <div>
      {console}
      <Document file={"C:/Users/Nikhil/Desktop/Dept/macs-deptt-front-end/public/files/1654600627417ConfirmationPage-220320022350.pdf"} >
        <Page pageNumber={pageNumber} />
      </Document>
      <p>
        Page {pageNumber} of {numPages}
      </p>
    </div>
  );
}