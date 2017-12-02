// @flow
import { STOP_NUMBER_CHANGE } from './actions';

type State = { value: string };
const defaultState: State = { value: '' };

const MAX_DIGITS = 4;
function stopNumberIsValid(value: string): boolean {
  const lengthError = value.length > MAX_DIGITS;
  if (lengthError) {
    return false;
  }

  const parseError = +value !== parseInt(value);
  const parsedIsNaN = isNaN(parseInt(value));
  const isInvalidInput = ((parseError || parsedIsNaN) && value !== '') || lengthError;
  return !isInvalidInput;
}

export default function stopInput(state: State = defaultState, action: any): State {
  switch (action.type) {
    case STOP_NUMBER_CHANGE:
      const { value } = action;
      if (!stopNumberIsValid(value)) {
        return state;
      }
      return { value };
    default:
      return state;
  }
}
