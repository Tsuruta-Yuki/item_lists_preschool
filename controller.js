const db = require('./index');
const model = require('./model');

module.exports = {
  async index(req, res) {
    let eventwords;
    if (req.query.event === '') {
      eventwords = '通常';
    } else {
      eventwords = req.query.event + ',通常';
    }
    const arrayEvent = eventwords.split(',');

    const getitems = await model.getItems(arrayEvent);

    res.status(200).send(getitems);
  },

  async addSentItem(req, res) {
    const evnetName = Object.keys(req.body)[0];
    const itemName = {
      持ち物: req.body[evnetName],
    };

    await model.addItem(evnetName, itemName);
    res.status(201).end();
  },
};
