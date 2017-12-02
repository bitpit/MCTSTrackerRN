// @flow

const TWO_MINUTES = 1000 * 60 * 2;
const EARTH_RADIUS_KM = 6371;

function degreesToRadians(degrees: number) {
  return degrees * Math.PI / 180;
}

export function locationDistanceKm(location1: Position, location2: Position) {
  let lat1 = location1.coords.latitude;
  let lon1 = location1.coords.longitude;
  let lat2 = location2.coords.latitude;
  let lon2 = location2.coords.longitude;

  const dLat = degreesToRadians(lat2 - lat1);
  const dLon = degreesToRadians(lon2 - lon1);

  lat1 = degreesToRadians(lat1);
  lat2 = degreesToRadians(lat2);

  const a = Math.sin(dLat/2) * Math.sin(dLat/2) +
          Math.sin(dLon/2) * Math.sin(dLon/2) * Math.cos(lat1) * Math.cos(lat2);
  const c = 2 * Math.atan2(Math.sqrt(a), Math.sqrt(1-a));

  return EARTH_RADIUS_KM * c;
}

export function useLocationUpdate(location: ?Position, currentLocation: ?Position): boolean {
  if (null == currentLocation) {
    return true;
  }

  if (null == location) {
    return false;
  }

  const timeDelta = location.timestamp - currentLocation.timestamp;
  const isSignificantlyNewer = timeDelta > TWO_MINUTES;
  const isSignificantlyOlder = timeDelta < -TWO_MINUTES;
  const isNewer = timeDelta > 0;

  if (isSignificantlyNewer) {
    return true;
  } else if (isSignificantlyOlder) {
    return false;
  }

  const accuracyDelta = location.coords.accuracy - currentLocation.coords.accuracy;
  const isLessAccurate = accuracyDelta > 0;
  const isMoreAccurate = accuracyDelta < 0;

  if (isMoreAccurate) {
    return true;
  } else if (isNewer && !isLessAccurate) {
    return true;
  }

  const distanceMeters = ((locationDistanceKm(location, currentLocation) * 1000 /* to meters */) | 0);
  if (isNewer && distanceMeters > 30) {
    return true;
  }

  return false;
}
