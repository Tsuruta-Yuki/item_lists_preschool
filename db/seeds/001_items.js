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
      持ち物: 'カバン',
    },
    {
      持ち物: '水筒',
    },
    {
      持ち物: 'フォーク',
    },
    {
      持ち物: 'スプーン',
    },
    {
      持ち物: 'コップ',
    },
    {
      持ち物: '体操服',
    },
    {
      持ち物: 'お弁当',
    },
  ]);
};
