const express = require('express');
const path = require('path');
const app = express();
const PORT = process.env.PORT || 2095; // Use environment variable for PORT or default to 2095

// Serve static files from the public directory
app.use(express.static(path.join(__dirname, 'public')));

// A simple route that sends a response from the root URL
app.get('/', (req, res) => {
  res.sendFile(path.join(__dirname, 'public', 'index.html'));
});

// Start the server
app.listen(PORT, () => {
  console.log(`Server running on http://localhost:${PORT}`);
});
