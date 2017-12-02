// @flow

import type { StateShape } from './reducer';
import { stopsForStopId } from './arrivals-repo';
import { stopNameForNumber } from '../../stops-db';
import { IStopRepresentation } from './models';

export const START_REFRESHING = 'START_REFRESHING';
export const RECEIVED_STOPS = 'RECEIVED_STOPS';
export const RECEIVED_ERROR = 'RECEIVED_ERROR';
export const CLEAR_DATA = 'CLEAR_DATA';

function timestampIsValid(timestamp: ?number) {
  // TODO timestamp
  return false;
}

function receivedError(error: Error) {
  return { type: RECEIVED_ERROR, error };
}

function receivedStops(stops: IStopRepresentation[], stopId: number, name: ?string) {
  return { type: RECEIVED_STOPS, stops, stopId, name, timestamp: Date.now() };
}

function startRefreshing() {
  return { type: START_REFRESHING };
}

function clearData() {
  return { type: CLEAR_DATA };
}


export function fetchStops(nextStopId: number) {
  return async (dispatch: any, getState: any) => {

    const { stopId, timestamp, error, name } = (getState().arrivals: StateShape);
    // TODO figure out seperate refresh if needed method using below
    // if ((stopId === nextStopId && timestampIsValid(timestamp)) && null == error) {
    //   return;
    // }

    if (stopId !== nextStopId) {
      dispatch(clearData());
    }

    dispatch(startRefreshing());

    // get stopa name if needed
    let stopName: ?string;
    if (nextStopId === stopId) {
      stopName = name;
    } else {
      try {
        stopName = await stopNameForNumber(nextStopId);
      } catch (e) {
        dispatch(receivedError(e));
        return;
      }
    }

    // fetch new stops
    let stops: IStopRepresentation[];
    try {
      stops = await stopsForStopId(String(nextStopId));
    } catch (e) {
      dispatch(receivedError(e));
      return;
    }

    dispatch(receivedStops(stops, nextStopId, stopName));
  };
}
