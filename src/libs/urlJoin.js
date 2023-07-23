const normalize = (str) =>
  str.replace(/[\/]+/g, '/').replace(/\/\?/g, '?').replace(/\/#/g, '#').replace(/:\//g, '://');

const urlJoin = function (...args) {
  let joined = [].slice.call(args, 0).join('/');
  return normalize(joined);
};

export default urlJoin;
