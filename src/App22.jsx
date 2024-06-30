import React from 'react';
import { Document, Page, Text, PDFViewer, PDFDownloadLink } from '@react-pdf/renderer';


// Define your component
const MyPDFComponent = () => {
  return (
    <Document>
      <Page>
        <Text>This is my PDF content!</Text>
      </Page>
    </Document>
  );
};

// Function to generate and download PDF
// const downloadPDF = () => {
//   const blob = MyPDFComponent().toBlob();
//   saveAs(blob, 'my_document.pdf');
// };

// Render the component into a PDF using PDFViewer
const App22 = () => {
  return (
    <div>
      <PDFViewer width="1000" height="600">
        <MyPDFComponent />
      </PDFViewer>
      <PDFDownloadLink document={<MyPDFComponent />} fileName="my_document.pdf">
        {({ blob, url, loading, error }) => (loading ? 'Loading document...' : 'Download now!')}
      </PDFDownloadLink>    </div>
  );
};

export default App22;