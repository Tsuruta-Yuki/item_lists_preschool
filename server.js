const path = require('path'); //よくわからん
const express = require('express');
const app = express();
const PORT = process.env.PORT || 3000;
app.use(express.json());
app.use(express.static(path.join(__dirname, '/public')));
const controller = require('./controller');
const db = require('./index');

const cors = require('cors');
app.use(
  cors({
    origin: 'http://localhost:5173',
    credentials: true,
  })
);

app.get('/items', controller.index);

app.post('/items', controller.addSentItem);

app.listen(PORT, () => {
  console.log(`Server running on port ${PORT}`);
});
