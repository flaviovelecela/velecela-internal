const express = require('express');
const https = require('https');
const fs = require('fs');
const path = require('path');
const multer = require('multer');

const app = express();
const HTTPS_PORT = process.env.EXPRESS_HTTPS_PORT || 5000;
const HTTP_PORT = process.env.EXPRESS_HTTP_PORT || 2095;
const isProduction = process.env.NODE_ENV === 'production';

// Middleware
app.use(express.json());
app.use(express.urlencoded({ extended: true }));

// Multer configuration for file uploads
const storage = multer.diskStorage({
  destination: function (req, file, cb) {
    cb(null, path.join(__dirname, 'public', 'Pictures'));
  },
  filename: function (req, file, cb) {
    cb(null, Date.now() + '-' + file.originalname);
  }
});

const upload = multer({ storage: storage });

// File upload route
app.post('/api/upload', upload.single('photo'), (req, res) => {
  if (!req.file) {
    return res.status(400).send('No file uploaded.');
  }
  res.send({ filePath: `/Pictures/${req.file.filename}` });
});

// Serve static files
app.use('/Pictures', express.static(path.join(__dirname, 'public', 'Pictures')));

if (isProduction) {
  app.use(express.static(path.join(__dirname, 'build')));
} else {
  app.use(express.static(path.join(__dirname, 'public')));
}

// Catch-all route for serving the main application
app.get('*', (req, res) => {
  const indexPath = isProduction
    ? path.join(__dirname, 'build', 'index.html')
    : path.join(__dirname, 'public', 'index.html');
  
  if (fs.existsSync(indexPath)) {
    res.sendFile(indexPath);
  } else {
    res.status(404).send('Not found');
  }
});

// Error handling middleware
app.use((err, req, res, next) => {
  console.error(err.stack);
  res.status(500).send('Something broke!');
});

// Start HTTP server
const httpServer = app.listen(HTTP_PORT, () => {
  console.log(`HTTP server running on http://localhost:${HTTP_PORT}`);
});

// Start HTTPS server (if certificates are available)
try {
  const certPath = 'C:\\Users\\flavi\\OneDrive\\Escritorio\\VS Code Repos\\velecela-internal\\';
  const httpsOptions = {
    key: fs.readFileSync(path.join(certPath, 'origin-key.pem')),
    cert: fs.readFileSync(path.join(certPath, 'origin.pem'))
  };
  
  const httpsServer = https.createServer(httpsOptions, app);
  httpsServer.listen(HTTPS_PORT, () => {
    console.log(`HTTPS server running on https://localhost:${HTTPS_PORT}`);
  });
} catch (error) {
  console.error('Failed to start HTTPS server:', error.message);
}

console.log(`Server running in ${isProduction ? 'production' : 'development'} mode`);