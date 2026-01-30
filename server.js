const express = require('express');
const cors = require('cors');
const dotenv = require('dotenv');
const alertsRouter = require('./routes/alerts');
const logger = require('./middleware/logger');
const errorHandler = require('./utils/errorHandler');

dotenv.config();
const app = express();
const PORT = process.env.PORT || 5000;

// Middleware
app.use(cors());
app.use(express.json());
app.use(logger);

// Routes
app.use('/alerts', alertsRouter);

// Centralized error handling
app.use(errorHandler);

app.listen(PORT, () => {
  console.log(`Server running on port ${PORT}`);
});