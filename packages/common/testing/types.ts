import {
  render as domRender,
  waitFor as domWaitFor,
  waitForElementToBeRemoved as domWaitForElementToBeRemoved,
  within as domWithin,
} from '@testing-library/react';
import { act as reactAct } from 'react-dom/test-utils';
export type Render = typeof domRender;
export declare const render: Render;

export interface FireEvent {
  press: (element: Element) => boolean;
  type: (element: Element, text: string) => void;
}
export declare const fireEvent: FireEvent;

export type WaitFor = typeof domWaitFor;
export declare const waitFor: WaitFor;

export type WaitForElementToBeRemoved = typeof domWaitForElementToBeRemoved;
export declare const waitForElementToBeRemoved: WaitForElementToBeRemoved;

export declare const act: typeof reactAct;

export type Within = typeof domWithin;
export declare const within: Within;
