const express = require('express');
const app = express();
const mainDomainStatic = express.static('main-domain');
const subDomainStatic = express.static('sub-domain');

app.use((req, res, next) => {
  if (req.hostname === 'jacksweeney.xyz') {
    mainDomainStatic(req, res, next);
  } else {
    next();
  }
});

app.use((req, res, next) => {
  if (req.hostname === 'services.jacksweeney.xyz') {
    subDomainStatic(req, res, next);
  } else {
    next();
  }
});

app.get('/', (req, res) => {
  if(req.hostname === 'jacksweeney.xyz') {
    res.sendFile(__dirname + '/main-domain/index.html');
  } else if(req.hostname === 'services.jacksweeney.xyz') {
    res.sendFile(__dirname + '/sub-domain/index.html');
  } else {
    res.status(404).send('Not Found');
  }
});

const PORT = process.env.PORT || 3000;
app.listen(PORT, () => {
  console.log(`Server is running on port ${PORT}`);
});
