import { get } from 'lodash';

export const isUICExists = !!window.parent._CURRENT_ENV;

export function reloadWindow(options) {
  const targetWindow = get(options, 'targetWindow', window);
  targetWindow.location.reload();
}

export const redirectTo401 = () => {
  if (isUICExists) {
    window.parent.location.href = `${window.parent.location.origin}/#/users/401`;
  }
};

export const redirectTo403 = () => {
  if (isUICExists) {
    window.parent.location.href = `${window.parent.location.origin}/#/users/403`;
  }
};
