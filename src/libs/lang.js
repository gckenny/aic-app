import i18next from 'i18next';

/* eslint no-unused-vars: 0 */
const langKeyToApiKeyMap = {
  en: 'en_US',
  'en-us': 'en_US',
  'en-au': 'en_US',
  ar: 'ar_SA',
  'ar-sa': 'ar_SA',
  cs: 'cs_CZ',
  'cs-cz': 'cs_CZ',
  da: 'da_DK',
  'da-dk': 'da_DK',
  de: 'de_DE',
  'de-de': 'de_DE',
  el: 'el_GR',
  'el-gr': 'el_GR',
  es: 'es_ES',
  'es-es': 'es_ES',
  fr: 'fr_FR',
  'fr-FR': 'fr_FR',
  he: 'he_IL',
  'he-il': 'he_IL',
  it: 'it_IT',
  'it-it': 'it_IT',
  ja: 'ja_JP',
  'ja-jp': 'ja_JP',
  ko: 'ko_KR',
  'ko-kr': 'ko_KR',
  nb: 'nb_NO',
  'nb-no': 'nb_NO',
  nl: 'nl_NL',
  'nl-nl': 'nl_NL',
  pl: 'pl_PL',
  'pl-pl': 'pl_PL',
  pt: 'pt_BR',
  'pt-br': 'pt_BR',
  ru: 'ru_RU',
  'ru-ru': 'ru_RU',
  sv: 'sv_SE',
  'sv-se': 'sv_SE',
  th: 'th_TH',
  'th-th': 'th_TH',
  tr: 'tr_TR',
  'tr-tr': 'tr_TR',
  'zh-tw': 'zh_TW',
};

const langKeyToOLHLangKeyMap = {
  en: 'en-us',
  'en-US': 'en-us',
  ja: 'ja-jp',
  'ja-JP': 'ja-jp',
};

const getUILangKey = () => i18next.language;

const getOLHLangKey = () =>
  langKeyToOLHLangKeyMap[i18next.language] || langKeyToOLHLangKeyMap['en'];

export { getUILangKey, getOLHLangKey };
