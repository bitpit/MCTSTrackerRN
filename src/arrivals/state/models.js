
// @flow

import { colorRepresentationForRouteShortName } from './color-repo';

export type IColorRepresentation = {
  shortName: string,
  color: string, // hex string (eg `#fff000`)
  displayDesignator: string,
  ea: number,
  name: string,
  textColor: string,
};

export interface IStopRepresentation {
  minutesOut: string;
  minutesOutDenomination: string;
  headsign: string;
  busNumber: string;
  busLine: string;
}

export class StopViewModel {

  _model: IStopRepresentation;

  constructor(model: IStopRepresentation) {
    this._model = model;
  }

  get routeName(): string {
    return this._model.busLine;
  }

  get destination(): string {
    return this._model.headsign;
  }

  get arrivalInfo(): string {
    if (this.isApproachingStop) {
      return `Approaching stop`;
    }
    if (this.isDelayed) {
      return `Bus is delayed`;
    }
    return `Arrives to stop in ${this._model.minutesOut} minutes`;
  }

  get busNumberText(): string {
    if (!this.hasBusAssigned) {
        return `Scheduled`;
    }
    return `Bus #${this._model.busNumber}`;
  }

  get hasBusAssigned(): boolean {
    return -1 === this._model.busNumber.toUpperCase().indexOf('SCHEDULED');
  }

  get isApproachingStop(): boolean {
    return -1 !== this._model.minutesOutDenomination.toUpperCase().indexOf('APPROACHING');
  }

  get isDelayed(): boolean {
    return -1 !== this._model.minutesOutDenomination.toUpperCase().indexOf('DELAYED');
  }

  get textColorHex(): string {
    const colorRepr = colorRepresentationForRouteShortName(this._model.busLine);
    if (null != colorRepr) {
      return colorRepr.textColor;
    }
    return '#fff';
  }

  get backgroundColorHex(): string {
    const colorRepr = colorRepresentationForRouteShortName(this._model.busLine);
    if (null != colorRepr) {
      return colorRepr.color;
    }
    return '#00539f';
  }

}
