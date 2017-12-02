// @flow

import { GOT_LOCATION_ERROR, GOT_LOCATION, GOT_STOPS } from './actions';
import type { StopShape } from './models';

export type StateShape = {
  error: ?PositionError,
  location: ?Position,
  stops: ?StopShape[],
};

const defaultState: StateShape = {
  error: null,
  location: null,
  stops: null,
};

export function nearby(state: StateShape = defaultState, action: any): StateShape {
  switch (action.type) {
    case GOT_LOCATION_ERROR:
      return { ...state, location: null, error: action.error };
    case GOT_LOCATION:
      return { ...state, error: null, location: action.location };
    case GOT_STOPS:
      return { ...state, stops: action.stops };
    default:
      return state;
  }
}
