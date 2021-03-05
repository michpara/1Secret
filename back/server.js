const express = require('express');
const app = express();
const PORT = process.env.PORT || 5000;

app.get('/', (req, res) => {
  res.send('<h1>Some HTML</h1>');
  res.send('<p>Even more HTML</p>');
});

app.listen(PORT, () => console.log(`Server is listening on port ${PORT}`));