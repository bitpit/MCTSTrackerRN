// @flow


import { dispenseDb, executeDb, executeScalarDb } from './stops-db-interface';
import { locationQuery  } from './location-query';

export async function getStopsForLatLng(latitude: number, longitude: number): Promise<any[]> {

  let db: any;
  let query: string;
  let stops: any[];
  try {
    db = await dispenseDb();
    query = await locationQuery(latitude, longitude, query => executeScalarDb(query, db));
    stops = await executeDb(query, db);
  } finally {
    if (db != null) {
      await db.close();
    }
  }

  return stops;
}
