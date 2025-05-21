const path = require('path'); //よくわからん
const express = require('express');
const app = express();
const PORT = process.env.PORT || 3000;
app.use(express.json());
app.use(express.static(path.join(__dirname, '/public')));
console.log('💀 ~ process.env:', process.env.NODE_ENV);

const db = require('./index');

const cors = require('cors');
app.use(
  cors({
    // origin: 'http://localhost:5173',
    origin: 'https://item-lists-preschool.onrender.com',
    credentials: true,
  })
);

async function getItems(array) {
  // return await db.select().from('items');
  return await db
    .select('持ち物', 'イベント')
    .table('items')
    .innerJoin('informations', '持ち物id', '=', 'items.id')
    .whereIn('イベント', array);
}

async function index(req, res) {
  let eventwords;
  if (req.query.event === '') {
    eventwords = '通常';
  } else {
    eventwords = req.query.event + ',通常';
  }
  const arrayEvent = eventwords.split(',');

  const getitems = await getItems(arrayEvent);

  res.status(200).send(getitems.json());
}

app.get('/items', index);

app.listen(PORT, () => {
  console.log(`Server running on port ${PORT}`);
});
