import { EventEmitter } from 'events';
import { EVENT_ON_THEME_CHANGE } from './constants';

let currentUiTheme = {};

const emitter = new EventEmitter();
emitter.addListener(EVENT_ON_THEME_CHANGE, (uiTheme) => {
  currentUiTheme = uiTheme;
});

export const getUiTheme = () => currentUiTheme;

export default emitter;
