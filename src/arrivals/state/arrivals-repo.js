// @flow

import { IStopRepresentation } from './models';
import { parseResponseText } from './arrivals-parser';

const urlBase = `http://realtime.ridemcts.com/bustime/eta/getStopPredictionsETA.jsp`;

const urlForStop = (stopId: string) =>
  `${urlBase}?route=all&stop=${stopId}&key=${Math.random()}`;

const urlForStopAndRoute = (stopId: string, route: string) =>
  `${urlBase}?route=${route}&stop=${stopId}&key=${Math.random()}`;


async function performFetch(url: string): Promise<IStopRepresentation[]> {

  const fetched = await fetch(url);
  const text = await fetched.text();
  const results = parseResponseText(text);
  return results;

}

export async function stopsForStopId(stopId: string): Promise<IStopRepresentation[]> {

  const url = urlForStop(stopId);
  return Promise.resolve()
    .then(() => performFetch(url))
    .then(stops => new Promise(resolve => resolve(stops)));
}
