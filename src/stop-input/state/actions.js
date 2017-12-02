// @flow

export const STOP_NUMBER_CHANGE = 'STOP_NUMBER_CHANGE';

export function stopNumberChange(value: string) {
  return { type: STOP_NUMBER_CHANGE, value };
}
