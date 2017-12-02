// @flow

import router from '../router/reducer';
import { stopInput } from '../stop-input/reducer';
import { arrivals } from '../arrivals/reducer';
import { nearby } from '../nearby/reducer';

const reducers = {
  router,
  stopInput,
  arrivals,
  nearby,
};

export default reducers;
