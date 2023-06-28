import {
  SQLiteDatabase,
  openDatabase,
  enablePromise,
} from 'react-native-sqlite-storage';

import {CurrenciesType} from 'config/Axios/getAPI';

const DATA_BASE_NAME = 'm-economizer.db';
const CURRENCY_TABLE_NAME = 'currency';

enablePromise(true);

export const getDBConnection = async () => {
  return openDatabase({name: DATA_BASE_NAME, location: 'default'});
};

export const createTable = async (db: SQLiteDatabase) => {
  // create table if not exists
  const query = `CREATE TABLE IF NOT EXISTS ${CURRENCY_TABLE_NAME}(
          id INTEGER PRIMARY KEY AUTOINCREMENT,
          code TEXT NOT NULL,
          quantity INTEGER NOT NULL,
          rateFormated TEXT NOT NULL,
          diffFormated TEXT NOT NULL,
          rate INTEGER NOT NULL,
          name TEXT NOT NULL,
          diff INTEGER NOT NULL,
          date REAL NOT NULL,
          validFromDate REAL NOT NULL
      );`;

  await db.executeSql(query);
};

export const getTodoItems = async (
  db: SQLiteDatabase,
): Promise<CurrenciesType[]> => {
  try {
    const todoItems: CurrenciesType[] = [];
    const results = await db.executeSql(
      `SELECT rowid as id,value FROM ${CURRENCY_TABLE_NAME}`,
    );
    results.forEach(result => {
      for (let index = 0; index < result.rows.length; index++) {
        todoItems.push(result.rows.item(index));
      }
    });
    return todoItems;
  } catch (error) {
    console.error(error);
    throw Error('Failed to get todoItems !!!');
  }
};

export const saveCurrencyList = async (
  db: SQLiteDatabase,
  currencyItems: CurrenciesType[],
) => {
  const insertQuery =
    `INSERT OR REPLACE INTO ${CURRENCY_TABLE_NAME}(code, quantity, rateFormated, diffFormated, rate, name, diff, date, validFromDate) VALUES` +
    currencyItems
      .map(
        i =>
          `('${i.code}','${i.quantity}','${i.rateFormated}','${i.diffFormated}','${i.rate}','${i.name}','${i.diff}','${i.date}','${i.validFromDate}','')`,
      )
      .join(',');

  return db.executeSql(insertQuery);
};

export const deleteTodoItem = async (db: SQLiteDatabase, id: number) => {
  const deleteQuery = `DELETE from ${CURRENCY_TABLE_NAME} where rowid = ${id}`;
  await db.executeSql(deleteQuery);
};

export const deleteTable = async (db: SQLiteDatabase) => {
  const query = `drop table ${CURRENCY_TABLE_NAME}`;

  await db.executeSql(query);
};
