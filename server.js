const bodyParser = require('body-parser');
const express = require('express');
const { bottender } = require('bottender');

const userRoute = require("./routes/userroute");
const fbPageRoute = require("./routes/fbpageroute");
const projectRoute = require("./routes/projectroute");
const blockRoute = require("./routes/blockroute");
const profileRoute = require("./routes/profileroute");
const payloadRoute = require("./routes/payloadroute");

const AuthMiddleware = require("./middlewares/authmiddleware");

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

  server.use("/api/user", userRoute);
  server.use("/api/fbpage", AuthMiddleware, fbPageRoute);
  server.use("/api/project", AuthMiddleware, projectRoute);
  server.use("/api/block", AuthMiddleware, blockRoute);
  server.use("/api/profile", AuthMiddleware, profileRoute);
  server.use("/api/payload", AuthMiddleware, payloadRoute);

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
