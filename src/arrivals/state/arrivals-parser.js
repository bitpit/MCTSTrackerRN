// @flow

import { IStopRepresentation } from './models';
import { DOMParser } from 'xmldom';

const XML_MIME_TYPE = `text/xml`;

const K_STOP_EL = `pre`;
const K_MINUTES_OUT = `pt`;
const K_MINUTES_OUT_DENOMINATION = `pu`;
const K_HEADSIGN = `fd`;
const K_BUS_NUMBER = `v`;
const K_BUS_LINE = `rn`;

const EMPTY_STR = ``;

function safeGetStringNodeValue(key: string, parentElement: any): string {
  const targetElementWrapper = parentElement.getElementsByTagName(key)[0];
  if (null == targetElementWrapper) {
    return EMPTY_STR;
  }
  const targetTextElement = targetElementWrapper.firstChild;
  if (null == targetTextElement) {
    return EMPTY_STR;
  }
  return String(targetTextElement.nodeValue).trim();
}

const stopReprForElement = (preElement: any): IStopRepresentation => ({
    minutesOut: safeGetStringNodeValue(K_MINUTES_OUT, preElement),
    minutesOutDenomination: safeGetStringNodeValue(K_MINUTES_OUT_DENOMINATION, preElement),
    headsign: safeGetStringNodeValue(K_HEADSIGN, preElement),
    busNumber: safeGetStringNodeValue(K_BUS_NUMBER, preElement),
    busLine: safeGetStringNodeValue(K_BUS_LINE, preElement),
});

export function parseResponseText(text: string): IStopRepresentation[] {
  const parser = new DOMParser;
  const parsedDoc = parser.parseFromString(text, XML_MIME_TYPE).documentElement;
  const preElements = parsedDoc.getElementsByTagName(K_STOP_EL);

  if (preElements == null || preElements.length == 0) {
    throw new Error(`No arrivals for entered stop. Please check and try again`);
  }

  const processed: IStopRepresentation[] = [];

  for (let i = 0; i < preElements.length; ++i) {
    processed.push(stopReprForElement(preElements[i]));
  }

  return processed;
}
