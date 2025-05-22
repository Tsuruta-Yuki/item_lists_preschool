const path = require('path'); //よくわからん
const express = require('express');
const app = express();
const PORT = process.env.PORT || 3000;
app.use(express.json());
app.use(express.static(path.join(__dirname, '/public')));

const db = require('./index');

const cors = require('cors');
app.use(
  cors({
    origin: 'http://localhost:5173',
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
  console.log('💀 ~ index ~ getitems:', getitems);

  res.status(200).send(Array.from(new Set(getitems)));
}

async function addSentItem(req, res) {
  const evnetName = Object.keys(req.body)[0];
  const itemName = {
    持ち物: req.body[evnetName],
  };
  console.log('💀 ~ addSentItem ~ itemName:', itemName);

  const duplicateCheck = await db
    .select('持ち物')
    .from('items')
    .where({ 持ち物: itemName['持ち物'] });

  if (duplicateCheck.length === 0) {
    await db.insert(itemName).into('items');
  }
  const itemID = await db
    .select('id')
    .from('items')
    .where({ 持ち物: itemName['持ち物'] });

  const itemInfo = {
    持ち物id: itemID[0].id,
    イベント: evnetName,
  };

  await db.insert(itemInfo).into('informations');

  res.status(201).end();
}

app.get('/items', index);

app.post('/items', addSentItem);

app.listen(PORT, () => {
  console.log(`Server running on port ${PORT}`);
});
