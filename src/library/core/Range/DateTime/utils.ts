/* eslint-disable no-param-reassign */
import moment from 'moment';

export const normalizeDateTime = ([startTime, endTime] : [any, any]) => {
  if (
    startTime
    && endTime
    && moment(startTime).valueOf() > moment(endTime).valueOf()
  ) {
    return [endTime || null, startTime || null];
  }
  return [startTime || null, endTime || null];
};

export const getDateRangeDisplayFunc = (displayFunc : Function) => (range : any) => {
  const [
    startTime = null,
    endTime = null,
  ] = range || [];
  const startText = displayFunc(startTime, '');
  const finishText = displayFunc(endTime, '');
  if (startText && finishText) {
    return `${startText}\n~\n${finishText}`;
  } else if (startText) {
    return `${startText} ~`;
  } else if (finishText) {
    return `~ ${finishText}`;
  }
  return '';
};
