/* eslint no-underscore-dangle: 0 */
import i18next from 'i18next';
import sha1 from 'sha1';

const t = (...args) => {
  const key = args[0];
  const options = args[1];

  let text = i18next.t(key, options);
  if (typeof text === 'string' && text.length === 0) {
    text = i18next.t(key, { ...options, lng: 'en' });
  }

  return text;
};

const _ = (...args) => {
  if (args.length === 0 || typeof args[0] === 'undefined') {
    return i18next.t.apply(i18next, args);
  }

  const [text = '', options = {}] = args;
  const key = ((value, options) => {
    const { context } = { ...options };
    const containsContext = context !== undefined && context !== null;
    if (containsContext) {
      value = value + i18next.options.contextSeparator + options.context;
    }
    return sha1(value);
  })(text, options);

  options.defaultValue = text;
  options.interpolation = {
    ...options.interpolation,
    escapeValue: false,
  };

  const i18nText = i18next.t(key, options);
  if (typeof i18nText === 'string' && i18nText.length !== 0) {
    return i18nText;
  }

  const enText = i18next.t(key, { ...options, lng: 'en' });
  if (typeof enText === 'string' && enText.length !== 0) {
    console.warn(
      `Fallback to use en text '${enText}', since i18n text of string '${text}' is not found.`
    );
    return enText;
  }

  console.warn(
    `Fallback to use string declaration '${text}', since i18n text and en text of string '${text}' is not found.`
  );
  return text;
};

const __ = (...args) => {
  if (args.length === 0 || typeof args[0] === 'undefined') {
    return i18next.t.apply(i18next, args);
  }

  const value = args[0];
  const options = {
    ...args[1],
    ...{
      interpolation: {
        prefix: '#$?',
        suffix: '?$#',
      },
    },
  };

  return _(value, options);
};

export default {
  t,
  _,
  __,
};
