const express = require('express');
const path = require('path');
const app = express();

const PORT = process.env.PORT || 3000;

// Middleware for main domain
app.use((req, res, next) => {
  if (req.hostname === 'jacksweeney.xyz' || req.hostname === 'localhost') {
    express.static(path.join(__dirname, 'main-domain'))(req, res, next);
  } else {
    next();
  }
});

// Middleware for subdomain
app.use((req, res, next) => {
  if (req.hostname === 'services.jacksweeney.xyz') {
    express.static(path.join(__dirname, 'sub-domain'))(req, res, next);
  } else {
    next();
  }
});

// Route handler for main domain
app.get('/', (req, res, next) => {
  if (req.hostname === 'jacksweeney.xyz' || req.hostname === 'localhost') {
    res.sendFile(path.join(__dirname, 'main-domain', 'index.html'));
  } else {
    next();
  }
});

// Route handler for subdomain
app.get('/', (req, res) => {
  if (req.hostname === 'services.jacksweeney.xyz') {
    res.sendFile(path.join(__dirname, 'sub-domain', 'index.html'));
  } else {
    res.status(404).send('Not Found');
  }
});

app.listen(PORT, () => {
  console.log(`Server is running on port ${PORT}`);
});

