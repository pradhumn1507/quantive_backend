const fs = require('fs');
const pdf = require('pdf-parse');
const {PDFDocument} = require('../models/PDFDocument'); // Assuming you have a MongoDB model for storing PDF data.

const extractAndStorePDF = async (fileBuffer) => {
  try {
    // Extract text from the PDF.
    const pdfData = await pdf(fileBuffer);

    // Create a new PDFDocument instance and store the extracted text in the database.
    const newPDFDocument = new PDFDocument({
      title: 'PDF Title', // Replace with the actual title if available.
      content: pdfData.text,
    });

    // // Save the document to the database.
    await newPDFDocument.save();

    // You can perform additional processing on the extracted text if needed.

    return pdfData.text;
  } catch (error) {
    console.error('Error extracting/storing PDF:', error); // Log detailed error information.
    throw error; // Re-throw the error for global error handling.
  }
};

const uploadPDF = async (req, res) => {
  try {
    const { file } = req;

    if (!file || !file.buffer) {
      return res.status(400).json({ message: 'Invalid PDF file' });
    }

    // Call the extractAndStorePDF function to extract text and store it in the database.
    const extractedText = await extractAndStorePDF(file.buffer);

    return res.status(200).json({ message: 'PDF uploaded and processed successfully' });
  } catch (error) {
    console.error('Error uploading PDF:', error); // Log detailed error information.
    return res.status(500).json({ message: 'Internal server error' });
  }
};

module.exports = {
  uploadPDF,
};
