import React from 'react';
import addons, { makeDecorator } from '@storybook/addons';
import { ADDON_ID, PANEL_ID, EVENT_ON_PARAMETER, EVENT_ON_THEME_CHANGE } from './constants';
import emitter from './emitter';

export default makeDecorator({
  name: 'withAzrmuiTheme',
  allowDeprecatedUsage: true,
  parameterName: 'azrmuiTheme',
  // This means don't run this decorator if the notes decorator is not set
  skipIfNoParametersOrOptions: true,
  wrapper: (getStory, context, { parameters }) => {
    const channel = addons.getChannel();

    channel.on(EVENT_ON_THEME_CHANGE, (e) => {
      emitter.emit(EVENT_ON_THEME_CHANGE, e);
    })
    console.log('wrapper', parameters);
    // Our API above sets the notes parameter to a string,
    // which we send to the channel
    channel.emit(EVENT_ON_PARAMETER, parameters);
    // we can also add subscriptions here using channel.on('eventName', callback);
    
    return getStory(context);
  }
});
