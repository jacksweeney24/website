const express = require('express');
const app = express();
const PORT = process.env.PORT || 3000;

// Middleware to handle requests for the main domain
app.use((req, res, next) => {
  if (req.hostname === 'jacksweeney.xyz') {
    express.static('main-domain')(req, res, next);
  } else {
    next();
  }
});

// Middleware to handle requests for the subdomain
app.use((req, res, next) => {
  if (req.hostname === 'services.jacksweeney.xyz') {
    express.static('sub-domain')(req, res, next);
  } else {
    next();
  }
});

app.listen(PORT, () => {
  console.log(`Server is running on port ${PORT}`);
});
