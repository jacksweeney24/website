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
