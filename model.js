const db = require('./index');

module.exports = {
  async getItems(array) {
    return await db
      .select('持ち物', 'イベント')
      .table('items')
      .innerJoin('informations', '持ち物id', '=', 'items.id')
      .whereIn('イベント', array);
  },

  async addItem(evnetName, itemName) {
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
  },
};
