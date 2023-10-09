const mongoose = require('mongoose');
const pdf = require('pdf-parse');
const express = require('express');
const router = express.Router();

const pdfDocumentSchema = new mongoose.Schema({
  title: {
    type: String,
    required: true,
  },
  content: {
    type: String,
    required: true,
  },
});

const PDFDocument = mongoose.model('PDFDocument', pdfDocumentSchema);

router.post('/upload', async (req, res) => {
  try {
    const { file } = req;

    if (!file || !file.buffer) {
      return res.status(400).json({ message: 'Invalid PDF file' });
    }

    // Extract text from the PDF.
    const pdfData = await pdf(file.buffer);

    // Create a new PDFDocument instance and store the extracted text in the database.
    const newPDFDocument = new PDFDocument({
      title: 'PDF Title', // Replace with the actual title if available.
      content: pdfData.text,
    });

    await newPDFDocument.save(); // Save the document to the database.

    // You can perform additional processing on the extracted text if needed.

    return res.status(200).json({ message: 'PDF uploaded and processed successfully' });
  } catch (error) {
    console.error('Error uploading PDF:', error);
    return res.status(500).json({ message: 'Internal server error' });
  }
});
module.exports = { PDFDocument, router };
