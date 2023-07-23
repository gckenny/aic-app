import { getEndpointInventoryAppHashString } from 'app/libs/locations';

const appURL = {
  defaultApp: '/',
  endpointInventoryApp: `/${getEndpointInventoryAppHashString()}`,
  policyApp: '/#/app/policy/endpoint',
  operationsDashboardApp: '/#/app/sase',
  searchApp: '/#/app/search',
  workbenchApp: '/#/workbench',
  productConnectorApp: '/#/admin/products',
};

export default appURL;
