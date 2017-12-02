// @flow

const SQLite = require('react-native-sqlite-storage');

let DB_CONFIG = {
  name : "n",
  createFromLocation : '~stops.db',
  location: 'Library',
};

export async function dispenseDb() {
  let config = { ...DB_CONFIG };
  return await SQLite.openDatabase(config);
}

export async function execute(query: string): Promise<any[]> {
  let db: any;
  let obj: any[];
  try {
    db = await dispenseDb();
    obj = await executeDb(query, db);
  } finally {
    if (null != db) {
      try {
        await db.close();
      } catch (e) {
        console.error(e);
      }
    }
  }
  return obj;
}

export async function executeScalar(query: string): Promise<any> {

  let db: any;
  let obj;
  try {
    db = await dispenseDb();
    obj = await executeScalarDb(query, db);
  } catch(e) {
    console.error(e);
  } finally {
    if (null != db) {
      try {
        await db.close();
      } catch (e) {
        console.error(e);
      }
    }
  }

  return obj;

}

export async function executeDb(query: string, db: any) {
  const [ results ] = await db.executeSql(query);
  const resultsArray = [];
  for (let i = 0; i < results.rows.length; ++i) {
    resultsArray.push(results.rows.item(i));
  }
  return resultsArray;
}

export async function executeScalarDb(query: string, db: any): Promise<any> {
  const [ results ] = await db.executeSql(query);
  const obj = results.rows.item(0);
  return obj;
}
