/**
 * @param { import("knex").Knex } knex
 * @returns { Promise<void> }
 */
exports.seed = async function (knex) {
  // Deletes ALL existing entries
  await knex('informations').del();
  await knex('items').del();
  await knex('items').insert([
    {
      id: 1,
      持ち物: 'カバン',
    },
    {
      id: 2,
      持ち物: '水筒',
    },
    {
      id: 3,
      持ち物: 'フォーク',
    },
    {
      id: 4,
      持ち物: 'スプーン',
    },
    {
      id: 5,
      持ち物: 'コップ',
    },
    {
      id: 6,
      持ち物: '体操服',
    },
    {
      id: 7,
      持ち物: 'お弁当',
    },
  ]);
};
