import appURL from 'app/configs/url';

export function getAppURLMap() {
  return {
    ei: appURL.endpointInventoryApp,
    policy: appURL.policyApp,
    operationsDashboard: appURL.operationsDashboardApp,
    search: appURL.searchApp,
    workbench: appURL.workbenchApp,
    productConnector: appURL.productConnectorApp,
  };
}

export function getAppKeys() {
  return Object.keys(getAppURLMap());
}

export function getAppURL(app) {
  const appDetailsMap = getAppURLMap();
  return appDetailsMap[app];
}
