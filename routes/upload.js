const express = require('express');
const router = express.Router();
const multer = require('multer');
const uploadController = require('../controllers/uploadController');

// Configure Multer to use memory storage.
const storage = multer.memoryStorage();
const upload = multer({ storage });

// Define a POST route for uploading PDF files.
router.post('/', upload.single('pdfFile'), uploadController.uploadPDF);

module.exports = router;
