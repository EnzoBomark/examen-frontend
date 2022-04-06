// @ts-nocheck
import {
  render as nativeRender,
  fireEvent as nativeFireEvent,
  waitFor as nativeWait,
  waitForElementToBeRemoved as nativeWaitForElementToBeRemoved,
  act as nativeAct,
  within as nativeWithin,
} from '@testing-library/react-native';
import type {
  FireEvent,
  WaitFor,
  Within,
  WaitForElementToBeRemoved,
} from './types';
import { ReactTestInstance } from 'react-test-renderer';

export const fireEvent: FireEvent = {
  press: (element: any) => nativeFireEvent.press(element),
  type: (element: any, text: string) =>
    nativeFireEvent.changeText(element, text),
};

const byTextCompat =
  (byTextFn: any) =>
  (text: string | RegExp, options: any): ReactTestInstance => {
    if (options?.exact === false) {
      return byTextFn(new RegExp(text, 'i'));
    }

    return byTextFn(text);
  };

const patchQueries = (queryType: string, patchObj: any) =>
  Object.keys(patchObj)
    .filter((k) => k.endsWith(queryType))
    .reduce(
      (acc, funcName) => (acc[funcName] = byTextCompat(patchObj[funcName])),
      {}
    );

const renderWrapperCompat = (...args: any) => {
  // @ts-ignore
  const renderResult = nativeRender(...args);

  const json = renderResult.toJSON();
  const firstChild = Array.isArray(json?.children) && json && json.children[0];
  const container = {
    firstChild,
  };

  const byTextFuncs = patchQueries('ByText', renderResult);

  return {
    ...renderResult,
    container,
    asJSON: renderResult.toJSON,
    ...byTextFuncs,
  };
};

const withinCompat = (...args: any) => {
  // @ts-ignore
  const withinResult = nativeWithin(...args);

  const byTextFuncs = patchQueries('ByText', withinResult);

  return {
    ...withinResult,
    ...byTextFuncs,
  };
};

export const render = renderWrapperCompat;
export const waitFor = nativeWait as WaitFor;
export const waitForElementToBeRemoved =
  nativeWaitForElementToBeRemoved as WaitForElementToBeRemoved;
export const act = nativeAct;
export const within: Within = withinCompat as any;
