// @flow


import type { IColorRepresentation } from './models';
import { lazyDict } from '../../util';

const colors: IColorRepresentation[] = require('../data/colors.json');
const lazyColorDict = lazyDict(colors, 'shortName');

export const colorRepresentationForRouteShortName =
  (routeName: string): ?IColorRepresentation =>
    lazyColorDict()[routeName];
