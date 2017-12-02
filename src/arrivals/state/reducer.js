// @flow

import { IStopRepresentation } from './models';
import { RECEIVED_STOPS, RECEIVED_ERROR, START_REFRESHING, CLEAR_DATA } from './actions';

export type StateShape = {
  stops: ?IStopRepresentation[],
  stopId: ?number,
  timestamp: ?number,
  error: ?Error,
  refreshing: boolean,
  name: ?string,
};

const defaultState: StateShape = {
  stops: null,
  stopId: null,
  timestamp: null,
  error: null,
  refreshing: false,
  name: null,
};

export default function arrivals(state: StateShape = defaultState, action: any): StateShape {
  switch (action.type) {
    case START_REFRESHING:
      return { ...state, error: null, refreshing: true };
    case RECEIVED_STOPS:
      return {
        ...defaultState,
        stops: action.stops,
        stopId: action.stopId,
        timestamp: action.timestamp,
        name: action.name,
        refreshing: false,
      };
    case RECEIVED_ERROR:
      return {
        ...defaultState,
        error: action.error,
        refreshing: false,
      };
    case CLEAR_DATA:
      return defaultState;
    default:
      return state;
  }
}
