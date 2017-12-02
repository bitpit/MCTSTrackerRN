// @flow

const MAX_ITERATIONS = 30;
const DESIRED_STOP_COUNT = 60;


export async function locationQuery(latitude: number, longitude: number, executeDb: string => Promise<any>): Promise<string> {

  let dif  = 0.01;
  let iterations = 0;

  let latA, latB, lonA, lonB;
  let retVal: string = (null: any);

  while (true) {

    ++iterations;

    latA = latitude + dif;
    latB = latitude - dif;
    lonA = longitude + dif;
    lonB = longitude - dif;

    const queryToCheck = `
      SELECT COUNT(*) AS count
      FROM stops
      WHERE
        (lat < ${latA} AND lat > ${latB})
        AND (lon < ${lonA} AND lon > ${lonB})
    `;

    const { count } = await executeDb(queryToCheck);

    if (count >= DESIRED_STOP_COUNT || iterations >= MAX_ITERATIONS) {
      retVal = `
        SELECT *
        FROM stops
        WHERE
          (lat < ${latA} AND lat > ${latB})
          AND (lon < ${lonA} AND lon > ${lonB})
      `;
      break;
    }

    dif += 0.005;

  }

  return retVal;
}
