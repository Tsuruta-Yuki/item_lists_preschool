const model = require('../model');
const { expect } = require('chai');

const db = require('../index');

describe('getItems', () => {
  before(async () => {
    await db.migrate
      .forceFreeMigrationsLock()
      .then(() => db.migrate.rollback({ all: true }))
      .then(() => db.migrate.latest())
      .then(() => db.seed.run())
      .catch(console.error);
  });

  it('イベントなしの時のアイテム', async () => {
    let items = await model.getItems(['通常']);

    expect(items[0]).to.deep.equal({ 持ち物: 'カバン', イベント: '通常' });
    expect(items[1]).to.deep.equal({ 持ち物: '水筒', イベント: '通常' });
    expect(items[2]).to.deep.equal({ 持ち物: 'フォーク', イベント: '通常' });
    expect(items[3]).to.deep.equal({ 持ち物: 'スプーン', イベント: '通常' });
    expect(items[4]).to.deep.equal({ 持ち物: 'コップ', イベント: '通常' });
  });
  it('体育選択時の時のアイテム', async () => {
    let items = await model.getItems(['体育', '通常']);

    expect(items[5]).to.deep.equal({ 持ち物: '体操服', イベント: '体育' });
  });
  it('遠足選択時の時のアイテム', async () => {
    let items = await model.getItems(['遠足', '通常']);

    expect(items[5]).to.deep.equal({ 持ち物: 'お弁当', イベント: '遠足' });
  });
});

describe('addItems', () => {
  before(async () => {
    await db.migrate
      .forceFreeMigrationsLock()
      .then(() => db.migrate.rollback({ all: true }))
      .then(() => db.migrate.latest())
      .then(() => db.seed.run())
      .catch(console.error);
  });

  it('帽子を通常イベントとして追加', async () => {
    await model.addItem('通常', { 持ち物: '帽子' });
    console.log('hello');
    let items = await model.getItems(['通常']);

    expect(items[0]).to.deep.equal({ 持ち物: 'カバン', イベント: '通常' });
    expect(items[1]).to.deep.equal({ 持ち物: '水筒', イベント: '通常' });
    expect(items[2]).to.deep.equal({ 持ち物: 'フォーク', イベント: '通常' });
    expect(items[3]).to.deep.equal({ 持ち物: 'スプーン', イベント: '通常' });
    expect(items[4]).to.deep.equal({ 持ち物: 'コップ', イベント: '通常' });
    expect(items[5]).to.deep.equal({ 持ち物: '帽子', イベント: '通常' });
  });

  after(async () => {
    await db.migrate
      .forceFreeMigrationsLock()
      .then(() => db.migrate.rollback({ all: true }))
      .then(() => db.migrate.latest())
      .then(() => db.seed.run())
      .catch(console.error);
  });
});
