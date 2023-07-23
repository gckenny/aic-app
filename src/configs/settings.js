import { endsWith, mapKeys } from 'lodash';
import sha1 from 'sha1';

import locale from 'app/libs/locale';
import { checkHasQueryParam } from 'app/libs/locations';
import log from 'app/libs/log';

const webroot = process.env.PUBLIC_PATH;
const isDevelopment = process.env.NODE_ENV === 'development';
const buildVersion = process.env.BUILD_VERSION;
const timestamp = locale.unixTimestamp();
const i18nResourceStamp = buildVersion || timestamp;

const settings = {
  webroot: webroot,
  api: {
    mock: isDevelopment && checkHasQueryParam('mock'),
    path: '',
  },
  log: {
    level: isDevelopment ? 'debug' : 'warn', // trace, debug, info, warn, error
  },
  i18next: {
    lowerCaseLng: true,

    // logs out more info (console)
    debug: false,

    // language to lookup key if not found on set language
    fallbackLng: 'en',

    // string or array of namespaces
    ns: [
      'locale', // locale: language, timezone, ...
      'resource', // default
    ],
    // default namespace used if not passed to translation function
    defaultNS: 'resource',

    whitelist: process.env.LANGUAGES,

    // array of languages to preload
    preload: [],

    // language codes to lookup, given set language is 'en-US':
    // 'all' --> ['en-US', 'en', 'dev']
    // 'currentOnly' --> 'en-US'
    // 'languageOnly' --> 'en'
    load: 'all',

    // char to separate keys
    keySeparator: '.',

    // char to split namespace from key
    nsSeparator: ':',

    interpolation: {
      prefix: '{{',
      suffix: '}}',
      escapeValue: false,
    },

    // react i18next special options (optional)
    react: {
      wait: true,
      hashTransKey: function (defaultValue) {
        // return a key based on defaultValue
        return sha1(defaultValue);
      },
    },

    // options for language detection
    // https://github.com/i18next/i18next-browser-languageDetector
    detection: {
      // order and from where user language should be detected
      order: ['querystring', 'localStorage', 'cookie'],

      // keys or params to lookup language from
      lookupQuerystring: 'lang',
      lookupCookie: 'lang',
      lookupLocalStorage: 'uic_language',

      // cache user language on
      caches: ['cookie', 'localStorage'],
    },
    // options for backend
    // https://github.com/i18next/i18next-xhr-backend
    backend: {
      // path where resources get loaded from
      loadPath: `${webroot}i18n/{{lng}}/{{ns}}.json?_=${i18nResourceStamp}`,

      // path to post missing resources
      addPath: 'api/i18n/sendMissing/{{lng}}/{{ns}}',

      // your backend server supports multiloading
      // /locales/resources.json?lng=de+en&ns=ns1+ns2
      allowMultiLoading: false,

      // parse data after it has been fetched
      parse: function (data, url) {
        data = JSON.parse(data);

        log.debug(`Loading resource: url="${url}"`, data);

        if (endsWith(url, '/resource.json?_=' + i18nResourceStamp)) {
          const value = mapKeys(data, (value, key) => sha1(key));
          return value;
        }

        return data;
      },

      // allow cross domain requests
      crossDomain: false,
    },
  },
};

export default settings;
