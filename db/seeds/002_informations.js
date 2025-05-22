/**
 * @param { import("knex").Knex } knex
 * @returns { Promise<void> }
 */
exports.seed = async function (knex) {
  // Deletes ALL existing entries
  // await knex('informations').del();
  await knex('informations').insert([
    {
      持ち物id: 1,
      イベント: '通常',
    },
    {
      持ち物id: 2,
      イベント: '通常',
    },
    {
      持ち物id: 3,
      イベント: '通常',
    },
    {
      持ち物id: 4,
      イベント: '通常',
    },
    {
      持ち物id: 5,
      イベント: '通常',
    },
    {
      持ち物id: 6,
      イベント: '体育',
    },
    {
      持ち物id: 7,
      イベント: '遠足',
    },
  ]);
};
