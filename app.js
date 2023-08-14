const express = require('express');
const app = express();
const cors = require('cors');
const path = require('path');
const apiRoutes = require('./routes/api');
const PORT = process.env.PORT || 3001;

// Middlewares
app.use(express.json());
app.use(cors());
app.use(express.static(path.join(__dirname, 'public')));

// Routes
app.use('/api', apiRoutes);

// Starting server
app.listen(PORT, () => {
    console.log(`Server is running on port ${PORT}`);
});