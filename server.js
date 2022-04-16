const bodyParser = require('body-parser');
const express = require('express');
const { bottender } = require('bottender');

const fbPageRoute = require("./routes/fbpageroute");
const profileRoute = require("./routes/profileroute");
const blockRoute = require("./routes/blockroute");
const payloadRoute = require("./routes/payloadroute");

const app = bottender({
  dev: process.env.NODE_ENV !== 'production',
});

const port = Number(process.env.PORT) || 5000;

const handle = app.getRequestHandler();

app.prepare().then(() => {
  const server = express();

  // If your express server is behind a proxy, you need to call `enable('trust proxy')`
  // See: http://expressjs.com/en/guide/behind-proxies.html#express-behind-proxies
  // server.enable('trust proxy');

  const verify = (req, _, buf) => {
    req.rawBody = buf.toString();
  };
  server.use(bodyParser.json({ verify }));
  server.use(bodyParser.urlencoded({ extended: false, verify }));

  server.use("/api/fbpages", fbPageRoute);
  server.use("/api/profiles", profileRoute);
  server.use("/api/blocks", blockRoute);
  server.use("/api/payloads", payloadRoute);

  // server.get('/api', (req, res) => {
  //   res.json({ ok: true });
  // });

  server.all('*', (req, res) => {
    return handle(req, res);
  });

  server.listen(port, (err) => {
    if (err) throw err;
    console.log(`> Ready on http://localhost:${port}`);
  });
});
