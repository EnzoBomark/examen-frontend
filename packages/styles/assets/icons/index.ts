import React from 'react';
import * as forward from './forward.svg';
import * as backward from './backward.svg';
import * as upArrow from './up-arrow.svg';
import * as downArrow from './down-arrow.svg';
import * as leftArrow from './left-arrow.svg';
import * as rightArrow from './right-arrow.svg';
import * as fillCircleCheck from './fill-check.svg';
import * as circleCheck from './circle-check.svg';
import * as info from './info.svg';
import * as infoDrop from './info-drop.svg';
import * as settings from './settings.svg';
import * as trash from './trash.svg';
import * as apple from './apple.svg';
import * as facebook from './facebook.svg';
import * as google from './google.svg';
import * as search from './search.svg';
import * as circleAdd from './circle-add.svg';
import * as add from './add.svg';
import * as exit from './exit.svg';
import * as star from './star.svg';
import * as spinner from './spinner.svg';
import * as radio from './radio.svg';
import * as radioFill from './radio-fill.svg';
import * as checkbox from './checkbox.svg';
import * as checkboxFill from './checkbox-fill.svg';
import * as profile from './profile.svg';
import * as community from './community.svg';
import * as chat from './chat.svg';
import * as addChat from './add-chat.svg';
import * as house from './house.svg';
import * as offer from './offer.svg';
import * as share from './share.svg';
import * as sad from './sad.svg';
import * as hamburger from './hamburger.svg';
import * as lock from './lock.svg';
import * as lockOpen from './lock-open.svg';
import * as currency from './currency.svg';
import * as refresh from './refresh.svg';
import * as calender from './calender.svg';
import * as clock from './clock.svg';
import * as notification from './notification.svg';
import * as notificationActive from './notification-active.svg';
import * as ball from './ball.svg';
import * as slider from './slider.svg';
import * as stopwatch from './stopwatch.svg';
import * as menu from './menu.svg';
import * as bookmark from './bookmark.svg';
import * as bookmarkFill from './bookmark-fill.svg';
import * as chatActive from './chat-active.svg';
import * as deal from './deal.svg';
import * as cup from './cup.svg';

const Icons = {
  forward,
  backward,
  spinner,
  star,
  upArrow,
  downArrow,
  leftArrow,
  rightArrow,
  fillCircleCheck,
  circleCheck,
  info,
  infoDrop,
  settings,
  trash,
  apple,
  facebook,
  google,
  search,
  circleAdd,
  add,
  addChat,
  exit,
  radio,
  radioFill,
  checkbox,
  checkboxFill,
  profile,
  community,
  chat,
  house,
  offer,
  share,
  sad,
  hamburger,
  lock,
  lockOpen,
  currency,
  refresh,
  calender,
  clock,
  notification,
  notificationActive,
  ball,
  slider,
  stopwatch,
  menu,
  bookmark,
  bookmarkFill,
  chatActive,
  deal,
  cup,
};

enum Platform {
  Web = 'web',
  Native = 'native',
}

const convertSvg = <T>(obj: T, type: Platform) =>
  Object.entries(obj).reduce((acc, [k, v]) => {
    const convert = {
      [Platform.Web]: v.ReactComponent,
      [Platform.Native]: v.default,
    };

    return { ...acc, [k]: convert[type] };
  }, {});

export const NativeIcons = convertSvg(Icons, Platform.Native) as {
  [key in keyof typeof Icons]: string;
};

export const WebIcons = convertSvg(Icons, Platform.Web) as {
  [key in keyof typeof Icons]: React.FC<React.SVGProps<SVGSVGElement>>;
};

export default Icons;
