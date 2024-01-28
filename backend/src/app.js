const express = require('express');
const bodyParser = require('body-parser');
const cors = require('cors');
const helmet = require('helmet');

// Middleware
const authMiddleware = require('./middleware/authMiddleware');
const rateLimit = require('./middleware/rateLimit');
const errorHandler = require('./utils/errorHandler');

const app = express();

// Setup middleware
app.use(bodyParser.json());
app.use(cors());
app.use(helmet());
app.use(authMiddleware);
app.use(rateLimit);

// Define routes
app.use('/api/users', require('./routes/userRoutes'));
app.use('/api/admin', require('./routes/adminRoutes'));

// Handle unhandled routes
app.use((req, res, next) => {
    res.status(404).send('Page not found');
});

app.use(errorHandler);

// Set port and start server
const PORT = process.env.PORT || 3000;
app.listen(PORT, () => {
    console.log(`Server is running on port ${PORT}`);
});

module.exports = app;
