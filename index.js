const express = require('express');
const mongoose = require('mongoose');
const cors = require('cors');
const app = express();
const PORT = process.env.PORT || 5000;

// Middleware
app.use(express.json());
app.use(cors());

// MongoDB Connection
mongoose.connect('mongodb+srv://shellu:8560892164@cluster0.nmna7re.mongodb.net/pdf', {
  useNewUrlParser: true,
  useUnifiedTopology: true,
});
const db = mongoose.connection;
db.on('error', console.error.bind(console, 'MongoDB connection error:'));
db.once('open', () => {
  console.log('Connected to MongoDB');
});

// API Routes
const uploadRouter = require('./routes/upload');
const chatRouter = require('./routes/chat');

app.use('/api/upload', uploadRouter);
app.use('/api/chat', chatRouter);


app.get('/',(req,res)=>{
  res.send ('ok') ;
})


app.use((err, req, res, next) => {
  console.error('Global error handler:', err);

  // Respond with an appropriate error status and message.
  res.status(500).json({ message: 'Internal server error' });
});

// Start the server
app.listen(PORT, () => {
  console.log(`Server is running on port ${PORT}`);
});
