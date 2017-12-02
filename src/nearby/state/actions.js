// @flow
import { useLocationUpdate, locationDistanceKm } from '../is-better-location';
import type { StateShape } from './reducer';
import type { StopShape } from './models';
import { getStopsForLatLng } from '../../stops-db';

export const GOT_LOCATION_ERROR = 'GOT_LOCATION_ERROR';
export const GOT_LOCATION = 'GOT_LOCATION';
export const GOT_STOPS = 'GOT_STOPS';

export function gotLocationError(error: PositionError) {
  return { type: GOT_LOCATION_ERROR, error };
}

function setLocation(location: Position) {
  return { type: GOT_LOCATION, location };
}

function gotStops(stops: StopShape[]) {
  return { type: GOT_STOPS, stops };
}

export function gotLocation(location: Position) {
  return async (dispatch: any, getState: any) => {
    const state = (getState().nearby: StateShape);
    const currentLocation = state.location;

    let useUpdate = useLocationUpdate(location, currentLocation);
    if (!useUpdate) {
      return;
    }

    dispatch(setLocation(location));

    try {
      const stops: StopShape[] = await getStopsForLatLng(location.coords.latitude, location.coords.longitude);
      dispatch(gotStops(stops));
    } catch (e) {
      dispatch(gotLocationError(e));
    }

  };
}
