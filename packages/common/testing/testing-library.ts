import {
  render as domRender,
  fireEvent as domFireEvent,
  waitFor as domWaitFor,
  waitForElementToBeRemoved as domWaitForElementToBeRemoved,
  act as domAct,
  within as domWithin,
} from '@testing-library/react';
import { act as reactAct } from 'react-dom/test-utils';

import {
  Render,
  FireEvent,
  WaitFor,
  Within,
  WaitForElementToBeRemoved,
} from './types';

export const fireEvent: FireEvent = {
  press: domFireEvent.click,
  type: (element: any, text: string) =>
    domFireEvent.change(element, {
      target: {
        value: text,
      },
    }),
};
export const render: Render = ((...args: Parameters<Render>) => {
  try {
    return domRender(...args);
  } catch (error) {
    if (
      (error as Error).message ===
        `Cannot read property 'appendChild' of undefined` &&
      (global as any).testEnvironment !== 'jsdom'
    ) {
      throw new Error(
        'JSDOM was not set as a jest-environment to this test file'
      );
    }

    throw error;
  }
}) as any;
export const waitFor: WaitFor = domWaitFor;
export const waitForElementToBeRemoved: WaitForElementToBeRemoved =
  domWaitForElementToBeRemoved;
export const act: typeof reactAct = domAct;
export const within: Within = domWithin;
