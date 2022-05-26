import React from 'react';
import forward from './forward.svg';
import backward from './backward.svg';
import upArrow from './up-arrow.svg';
import downArrow from './down-arrow.svg';
import leftArrow from './left-arrow.svg';
import rightArrow from './right-arrow.svg';
import fillCircleCheck from './fill-check.svg';
import circleCheck from './circle-check.svg';
import info from './info.svg';
import infoDrop from './info-drop.svg';
import settings from './settings.svg';
import trash from './trash.svg';
import apple from './apple.svg';
import facebook from './facebook.svg';
import google from './google.svg';
import search from './search.svg';
import circleAdd from './circle-add.svg';
import add from './add.svg';
import exit from './exit.svg';
import star from './star.svg';
import spinner from './spinner.svg';
import radio from './radio.svg';
import radioFill from './radio-fill.svg';
import checkbox from './checkbox.svg';
import checkboxFill from './checkbox-fill.svg';
import profile from './profile.svg';
import community from './community.svg';
import chat from './chat.svg';
import addChat from './add-chat.svg';
import house from './house.svg';
import offer from './offer.svg';
import share from './share.svg';
import sad from './sad.svg';
import hamburger from './hamburger.svg';
import lock from './lock.svg';
import lockOpen from './lock-open.svg';
import currency from './currency.svg';
import refresh from './refresh.svg';
import calender from './calender.svg';
import clock from './clock.svg';
import notification from './notification.svg';
import notificationActive from './notification-active.svg';
import ball from './ball.svg';
import slider from './slider.svg';
import stopwatch from './stopwatch.svg';
import menu from './menu.svg';
import bookmark from './bookmark.svg';
import bookmarkFill from './bookmark-fill.svg';
import chatActive from './chat-active.svg';
import deal from './deal.svg';
import cup from './cup.svg';

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

// enum Platform {
//   Web = 'web',
//   Native = 'native',
// }

// const convertSvg = <T>(obj: T, type: Platform) =>
//   Object.entries(obj).reduce((acc, [k, v]) => {
//     const convert = {
//       [Platform.Web]: v.ReactComponent,
//       [Platform.Native]: v.default,
//     };

//     return { ...acc, [k]: convert[type] };
//   }, {});

// export const NativeIcons = convertSvg(Icons, Platform.Native) as {
//   [key in keyof typeof Icons]: string;
// };

// export const WebIcons = convertSvg(Icons, Platform.Web) as {
//   [key in keyof typeof Icons]: React.FC<React.SVGProps<SVGSVGElement>>;
// };

export default Icons;
