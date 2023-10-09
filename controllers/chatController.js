// Inside your chatController.js file

const pdf = require('pdf-parse');
  const {PDFDocument} = require('../models/PDFDocument');

const searchPDFsForAnswer = async (question) => {
  try {
    // Iterate over your PDF documents and search for the answer.
    const pdfDocuments = await PDFDocument.find(); // Assuming you've stored PDFs in your MongoDB.

    for (const pdfDoc of pdfDocuments) {
      const pdfData = await pdf(pdfDoc.content);

      // Implement your search logic here, e.g., checking if the question exists in the PDF content.
      if (pdfData.text.includes(question)) {
        // Return the answer and the PDF page number where the answer was found.
        return {
          answer: 'Your answer from the PDF',
          pageNumber: pdfData.page,
        };
      }
    }

    // If the question is not found in any PDF, return an appropriate response.
    return { answer: 'Answer not found in the PDFs' };
  } catch (error) {
    console.error('Error searching PDFs:', error);
  }
};

const chat = async (req, res) => {
  try {
    const { question } = req.body;
   console.log(question);
    // Call the searchPDFsForAnswer function to find the answer.
    const answer = await searchPDFsForAnswer(question);

    return res.status(200).json({ answer });
  } catch (error) {
    console.error('Error processing chat:', error);
    return res.status(404).json(error);
  }
};

module.exports = {
  chat,
};
