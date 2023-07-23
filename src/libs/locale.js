import * as dayjs from 'dayjs';
import customParseFormat from 'dayjs/plugin/customParseFormat';
import utc from 'dayjs/plugin/utc';
import ensureArray from 'ensure-array';
import { defaults as _defaults, isUndefined } from 'lodash';
import moment from 'moment';
import readableSize from 'readable-size';

import i18n from './i18n';

dayjs.extend(utc);
dayjs.extend(customParseFormat);
// Creates and returns a new string by concatenating all of the elements in each array, separated by a locale-specific separator string.
// @example
//   locale.joinArrays(['foo', 'bar']);
//   -> 'foo, bar'
//   locale.joinArrays(['foo'], ['bar', 'baz']);
//   -> 'foo, bar, baz'
const joinArrays = (...args) => {
  let arr = [];
  for (let i = 0; i < args.length; ++i) {
    arr = arr.concat(ensureArray(args[i]));
  }
  return arr.join(i18n.t('locale:separator.withspace'));
};

/**
 * Convert bytes to human readable format
 * @param bytes Size in bytes to convert
 * @param settings A set of key/value pairs that configure the settings. All settings are optional.
 * @return object
 */
const humanReadableBytes = (bytes, settings) => {
  const KiB = 1024,
    KB = 1000;
  const defaults = {
    precision: 2, // keeps a specified number of decimals
    useBinary: false, // use 'decimal' as the default
    formatString: function (size, unit) {
      // http://en.wikipedia.org/wiki/File_size
      return i18n.t('locale:filesize', { size: size, unit: unit });
    },
  };
  const binaryUnits = [
    i18n.t('locale:unitSymbol.byte'), // 1
    i18n.t('locale:unitSymbol.kibibyte'), // 1024
    i18n.t('locale:unitSymbol.mebibyte'), // 1024^2
    i18n.t('locale:unitSymbol.gibibyte'), // 1024^3
    i18n.t('locale:unitSymbol.tebibyte'), // 1024^4
    i18n.t('locale:unitSymbol.pebibyte'), // 1024^5
    i18n.t('locale:unitSymbol.exbibyte'), // 1024^6
    i18n.t('locale:unitSymbol.zebibyte'), // 1024^7
    i18n.t('locale:unitSymbol.yobibyte'), // 1024^8
  ];
  const decimalUnits = [
    i18n.t('locale:unitSymbol.byte'), // 1
    i18n.t('locale:unitSymbol.kilobyte'), // 1000
    i18n.t('locale:unitSymbol.megabyte'), // 1000^2
    i18n.t('locale:unitSymbol.gigabyte'), // 1000^3
    i18n.t('locale:unitSymbol.terabyte'), // 1000^4
    i18n.t('locale:unitSymbol.petabyte'), // 1000^5
    i18n.t('locale:unitSymbol.exabyte'), // 1000^6
    i18n.t('locale:unitSymbol.zettabyte'), // 1000^7
    i18n.t('locale:unitSymbol.yottabyte'), // 1000^8
  ];

  settings = _defaults(settings, defaults);
  let i, size, unit;
  if (settings.useBinary) {
    i = Math.floor(Math.log(bytes) / Math.log(KiB));
    size = (bytes / Math.pow(KiB, i)).toFixed(settings.precision) * 1;
    unit = binaryUnits[i];
  } else {
    i = Math.floor(Math.log(bytes) / Math.log(KB));
    size = (bytes / Math.pow(KB, i)).toFixed(settings.precision) * 1;
    unit = decimalUnits[i];
  }
  return {
    size: size,
    unit: unit,
    toString: function () {
      return settings.formatString(size, unit);
    },
  };
};

const humanReadableBinaryBytes = (bytes, settings) => {
  settings = {
    ...settings,
    useBinary: true,
  };
  return humanReadableBytes(bytes, settings);
};
const humanReadableDecimalBytes = (bytes, settings) => {
  settings = {
    ...settings,
    useBinary: false,
  };
  return humanReadableBytes(bytes, settings);
};

const numberToLocaleString = (value) => {
  value = String(value);

  const thousandsSeparator = i18n.t('locale:thousandsSeparator');
  const decimalSeparator = i18n.t('locale:decimalSeparator');
  const parts = value.split(decimalSeparator);

  if (thousandsSeparator && parts[0] && parts[0].length > 3) {
    parts[0] = parts[0].replace(/\B(?=(?:\d{3})+(?!\d))/g, thousandsSeparator);
  }

  value = parts.join(decimalSeparator);

  return value;
};

// Converts bytes into human readable size units. (https://github.com/cheton/readable-size)
// @param {number} value The value to be converted to a human readable size.
// @param {object} [options] The options object.
// @param {boolean} [options.extendedOutput] True to output extended format string, otherwise false.
const bytesToReadableSize = (value, options) => {
  const { extendedOutput = false } = { ...options };
  const thousandsSeparator = i18n.t('locale:thousandsSeparator');
  const decimalSeparator = i18n.t('locale:decimalSeparator');
  const units = {
    B: i18n.t('locale:unitSymbol.byte'),
    KB: i18n.t('locale:unitSymbol.kibibyte'),
    MB: i18n.t('locale:unitSymbol.mebibyte'),
    GB: i18n.t('locale:unitSymbol.gibibyte'),
    TB: i18n.t('locale:unitSymbol.tebibyte'),
    PB: i18n.t('locale:unitSymbol.pebibyte'),
    EB: i18n.t('locale:unitSymbol.exbibyte'),
    ZB: i18n.t('locale:unitSymbol.zebibyte'),
    YB: i18n.t('locale:unitSymbol.yobibyte'),
  };

  let output = '';

  try {
    value = Number(value);
    const { size, unit } = readableSize(value, {
      output: 'object',
      separator: {
        thousands: thousandsSeparator,
        decimal: decimalSeparator,
      },
    });

    if (extendedOutput) {
      // '{{size}} {{unit}} ({{size_in_bytes}} bytes)'
      output = i18n.t('locale:filesize_combo', {
        size: size,
        unit: units[unit] || '',
        size_in_bytes: numberToLocaleString(value),
      });
    } else {
      // '{{size}} {{unit}}'
      output = i18n.t('locale:filesize', {
        size: size,
        unit: units[unit] || '',
      });
    }
  } catch (e) {
    // Ignore
  }

  return output;
};

const toNameOrderArray = (count) => {
  let value;
  if (count === 3) {
    value = i18n.t('locale:namingConventions.order_3');
  } else if (count === 2) {
    value = i18n.t('locale:namingConventions.order_2');
  } else {
    value = i18n.t('locale:namingConventions.order');
  }
  return value.split('\n'); // i18next will join the array with '\n'.
};

// return timestamp (in seconds)
const unixTimestamp = () => {
  return Math.round(new Date().getTime() / 1000);
};

/**
 * Get the timezone offset from the account, and if that fails, return browser's timezone offset.
 */
const currentTimezoneOffset = () => {
  const uicTimeZone = localStorage.getItem('uic_timezone');

  if (!uicTimeZone || !uicTimeZone.split) {
    return new Date().getTimezoneOffset(); // Use browser's timezone offset
  }

  return 0 - Number.parseInt(uicTimeZone.split(':')[0], 10); // returns the time difference between UTC time and local time, in minutes.
};

/**
 * http://momentjs.com/docs/#/displaying/format/
 */
const formatDashboardRefreshDate = (dt, tzOffset) => {
  if (isUndefined(tzOffset)) {
    tzOffset = currentTimezoneOffset();
  }
  return moment
    .unix(dt)
    .utcOffset(0 - tzOffset)
    .format('YYYY-M-D H:m:s');
};
const formatISODate = (dt, tzOffset) => {
  if (isUndefined(tzOffset)) {
    tzOffset = currentTimezoneOffset();
  }
  return moment
    .unix(dt)
    .utcOffset(0 - tzOffset)
    .format('YYYY-MM-DD');
};
const formatISOTime = (dt, tzOffset) => {
  if (isUndefined(tzOffset)) {
    tzOffset = currentTimezoneOffset();
  }
  return moment
    .unix(dt)
    .utcOffset(0 - tzOffset)
    .format('HH:mm:ss');
};
const formatISODateTime = (dt, tzOffset) => {
  if (isUndefined(tzOffset)) {
    tzOffset = currentTimezoneOffset();
  }
  return moment
    .unix(dt)
    .utcOffset(0 - tzOffset)
    .format('YYYY-MM-DDTHH:mm:ssZ');
};
const formatISODateTimeInLocalTime = (dt) => {
  return moment.unix(dt).format('YYYY-MM-DDTHH:mm:ssZ');
};
const formatFileDate = (dt, tzOffset) => {
  if (isUndefined(tzOffset)) {
    tzOffset = currentTimezoneOffset();
  }
  return moment
    .unix(dt)
    .utcOffset(0 - tzOffset)
    .format('YYYYMMDD');
};
const formatFileTime = (dt, tzOffset) => {
  if (isUndefined(tzOffset)) {
    tzOffset = currentTimezoneOffset();
  }
  return moment
    .unix(dt)
    .utcOffset(0 - tzOffset)
    .format('HHmmss');
};
const formatFileDateTime = (dt, tzOffset) => {
  if (isUndefined(tzOffset)) {
    tzOffset = currentTimezoneOffset();
  }
  return moment
    .unix(dt)
    .utcOffset(0 - tzOffset)
    .format('YYYYMMDDHHmmss');
};
const formatFullDate = (dt, tzOffset) => {
  if (isUndefined(tzOffset)) {
    tzOffset = currentTimezoneOffset();
  }
  return moment
    .unix(dt)
    .utcOffset(0 - tzOffset)
    .format(i18n.t('locale:moment.lc_d'));
};

const formatBSFullDate = (dt, tzOffset) => {
  if (isUndefined(tzOffset)) {
    tzOffset = currentTimezoneOffset();
  }
  return moment
    .unix(dt)
    .utcOffset(0 - tzOffset)
    .format('M/D/YYYY');
};
const formatFullDateShort = (dt, tzOffset) => {
  if (isUndefined(tzOffset)) {
    tzOffset = currentTimezoneOffset();
  }
  return moment
    .unix(dt)
    .utcOffset(0 - tzOffset)
    .format(i18n.t('locale:moment.lc_dd'));
};
const formatFullTime = (dt, tzOffset) => {
  if (isUndefined(tzOffset)) {
    tzOffset = currentTimezoneOffset();
  }
  return moment
    .unix(dt)
    .utcOffset(0 - tzOffset)
    .format(i18n.t('locale:moment.lc_t'));
};
const formatFullTimeShort = (dt, tzOffset) => {
  if (isUndefined(tzOffset)) {
    tzOffset = currentTimezoneOffset();
  }
  return moment
    .unix(dt)
    .utcOffset(0 - tzOffset)
    .format(i18n.t('locale:moment.lc_r'));
};
const formatFullDateTime = (dt, tzOffset) => {
  if (isUndefined(tzOffset)) {
    tzOffset = currentTimezoneOffset();
  }
  return dayjs
    .unix(dt)
    .utc()
    .utcOffset(0 - tzOffset)
    .format('YYYY-MM-DD HH:mm:ss');
  // return moment.unix(dt).utcOffset(0 - tzOffset).toISOString();
};
const oldFormatFullDateTime = (dt, tzOffset) => {
  if (isUndefined(tzOffset)) {
    tzOffset = currentTimezoneOffset();
  }
  return moment
    .unix(dt)
    .utcOffset(0 - tzOffset)
    .format(i18n.t('locale:moment.lc_dt'));
};
const formatFullDateTimeWithBSLogDateFormat = (dt, tzOffset) => {
  if (isUndefined(tzOffset)) {
    tzOffset = currentTimezoneOffset();
  }
  const momentObj = moment.unix(dt).utcOffset(0 - tzOffset);
  if (momentObj.isValid()) {
    return moment
      .unix(dt)
      .utcOffset(0 - tzOffset)
      .format('M/D/YYYY H:m:s');
  } else {
    return i18n._('Invalid date');
  }
};
const formatFullDateTimeWithBSLogDateFormatShort = (dt, tzOffset) => {
  if (isUndefined(tzOffset)) {
    tzOffset = currentTimezoneOffset();
  }
  return moment
    .unix(dt)
    .utcOffset(0 - tzOffset)
    .format('M/D');
};
const formatFullDateTimeWithLocaleByLLLL = (dt, tzOffset) => {
  if (isUndefined(tzOffset)) {
    tzOffset = currentTimezoneOffset();
  }
  return moment
    .unix(dt)
    .utcOffset(0 - tzOffset)
    .format(i18n.t('locale:moment.lc_LLLL'));
};
const formatFullDateTimeShort = (dt, tzOffset) => {
  if (isUndefined(tzOffset)) {
    tzOffset = currentTimezoneOffset();
  }
  return moment
    .unix(dt)
    .utcOffset(0 - tzOffset)
    .format(i18n.t('locale:moment.lc_dr'));
};
const formatTimezoneOffset = (tzOffset) => {
  if (isUndefined(tzOffset)) {
    tzOffset = currentTimezoneOffset();
  }
  return (
    '(GMT' +
    moment()
      .utcOffset(0 - tzOffset)
      .format('Z') +
    ')'
  );
};

// Get time fomat for query log
// timestamp (in seconds)
const formatLogQueryTime = (timestamp, tzOffset) => {
  if (isUndefined(tzOffset)) {
    tzOffset = currentTimezoneOffset();
  }

  return moment
    .unix(timestamp)
    .utcOffset(0 - tzOffset)
    .format('YYYYMMDDTHHmmss');
};

const mapISOStringToTimestamp = (iso) => {
  const strictParsing = true;

  if (moment(iso, 'YYYYMMDDTHHmmss', strictParsing).isValid()) {
    const tzOffset = currentTimezoneOffset();
    const tzd = moment()
      .utcOffset(0 - tzOffset)
      .format('Z');
    return moment(iso + tzd).unix();
  }

  if (moment(iso, moment.ISO_8601, strictParsing).isValid()) {
    return moment(iso).unix();
  }

  return 0;
};

// @param {string} period A period string starts with a digit and ends with a valid unit.
//
// Units (https://momentjs.com/docs/#/parsing/object/)
// y, year, years
// M, month, months
// d, day, days
// h, hour, hours
// m, minute, minutes
// s, second, seconds
// ms, millisecond, milliseconds
const mapPeriodToTimeRange = (period) => {
  if (process.env.NODE_ENV === 'development') {
    console.warn(
      "[Deprecate warning] Please use the new function to create time range!!! newMapPeriodToTimeRange({ period, fromKey = 'from', toKey = 'to' })"
    );
  }
  const utcOffset = 0 - currentTimezoneOffset();
  const unit = String(period).replace(/[0-9]/g, '').toLowerCase();
  const value = parseInt(period, 10) || 0;
  const startOfUnit = moment().startOf(unit);
  const endOfUnit = moment().endOf(unit);
  const from = moment(startOfUnit)
    .utcOffset(utcOffset)
    .subtract(value > 0 ? value - 1 : 0, unit)
    .unix();
  const to = moment(endOfUnit).utcOffset(utcOffset).unix();

  return { from, to };
};

const newMapPeriodToTimeRange = ({ period, fromKey = 'from', toKey = 'to' }) => {
  const utcOffset = 0 - currentTimezoneOffset();
  const unit = String(period).replace(/[0-9]/g, '').toLowerCase();
  const value = parseInt(period, 10) || 0;
  const startOfUnit = moment().startOf(unit);
  const endOfUnit = moment().endOf(unit);
  const fromValue = moment(startOfUnit)
    .utcOffset(utcOffset)
    .subtract(value > 0 ? value - 1 : 0, unit)
    .unix();
  const toValue = moment(endOfUnit).utcOffset(utcOffset).unix();

  return { [fromKey]: fromValue, [toKey]: toValue };
};

const mapTimeToDayRange = (timeStamp) => {
  const tzOffset = currentTimezoneOffset();
  const dayStamp = moment(timeStamp).utcOffset(0 - tzOffset);

  return {
    from: dayStamp.startOf('day').unix(),
    to: dayStamp.endOf('day').unix(),
  };
};

/**
 * http://en.wikipedia.org/wiki/National_conventions_for_writing_telephone_numbers
 */
const formatPhoneNumber = (options) => {
  let value = '';
  // - Separate the country and city codes with a hyphen.
  //   Examples
  //   +1-415-555-XXXX (San Francisco number likely to be called from another country: plus sign, country code, area code, 7-digit local number)
  //   +81-3-XXXX-XXXX (Tokyo number likely to be called from another country: plus sign, country code, area/city code, 8-digit local number)
  //
  // - For non-U.S. phone numbers that don’t contain hyphens or at least spaces to indicate where you can put hyphens, follow the local convention for styling the local part of the phone number. For instance, in some countries it is customary to close up numbers. If so, use that style. Don’t try to guess where you should insert a hyphen.
  //   Examples
  //   +62-21-XXXXXXX (Jakarta, Indonesia, phone number)
  //   +39-041-XXXXXXX (Venice, Italy, phone number)

  let phonenumbers = [];
  if (options.areacode) {
    phonenumbers.push(options.areacode);
  }
  if (options.phonenumber) {
    phonenumbers.push(options.phonenumber);
  }
  phonenumbers = phonenumbers.join(i18n.t('locale:phonenumbers.separator'));

  if (options.extension) {
    // w/ extension
    value = i18n.t('locale:phonenumbers.format_ext', {
      phonenumbers: phonenumbers,
      extensions: options.extension,
    });
  } else {
    // w/o extension
    value = i18n.t('locale:phonenumbers.format', {
      phonenumbers: phonenumbers,
    });
  }

  return value;
};

export default {
  joinArrays,
  humanReadableBinaryBytes,
  humanReadableDecimalBytes,
  numberToLocaleString,
  bytesToReadableSize,
  toNameOrderArray,

  // Time related
  formatDashboardRefreshDate,
  unixTimestamp,
  currentTimezoneOffset,
  formatISODate,
  formatISOTime,
  formatISODateTime,
  formatISODateTimeInLocalTime,
  formatFileDate,
  formatFileTime,
  formatFileDateTime,
  formatFullDate,
  formatBSFullDate,
  formatFullDateShort,
  formatFullTime,
  formatFullTimeShort,
  formatFullDateTime,
  formatFullDateTimeWithBSLogDateFormat,
  formatFullDateTimeWithBSLogDateFormatShort,
  formatFullDateTimeShort,
  formatFullDateTimeWithLocaleByLLLL,
  formatTimezoneOffset,
  formatLogQueryTime,
  mapISOStringToTimestamp,
  mapPeriodToTimeRange,
  mapTimeToDayRange,
  newMapPeriodToTimeRange,

  oldFormatFullDateTime,

  // Phone related
  formatPhoneNumber,
};
