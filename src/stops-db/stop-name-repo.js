// @flow

const SQLite = require('react-native-sqlite-storage');
import { executeScalar } from './stops-db-interface';

const stopError = () => new Error(`Could not find stop in database. Please check the stop number and try again.`);
let nameCache: { [string | number]: string } = {};

export async function stopNameForNumber(stopNumber: number | string): Promise<string> {

  if (stopNumber in nameCache) {
    return nameCache[stopNumber];
  }

  const query = `
    SELECT name_text
    FROM stops
    WHERE _id = ${stopNumber}
  `;

  let resultsWrapper: any;
  try {
    resultsWrapper = await executeScalar(query);
  } catch (e) {
    throw stopError();
  }

  if (null == resultsWrapper) throw stopError();

  let result = resultsWrapper['name_text'];
  if (null == result || '' === result) throw stopError();

  const hashIndex = result.indexOf(`#`);
  if (-1 !== hashIndex) {
    result = result.substring(0, hashIndex).trim();
  }

  nameCache[stopNumber] = result;
  return result;

}
