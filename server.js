const express = require('express');
const app = express();
const PORT = process.env.PORT || 3000;

app.get('/hello', (req, res) => {
  res.type('text/plain').send('hello world');
});

// Optional health check
app.get('/healthz', (req, res) => res.send('ok'));

app.listen(PORT, '0.0.0.0', () => {
  console.log(`Hello app listening on ${PORT}`);
});
