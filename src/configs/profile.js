import ensureArray from 'ensure-array';
import { cloneDeep, get, intersection, isEqual, noop, set, uniqBy, uniqWith } from 'lodash';

import api from 'app/apis';
import env from 'app/configs/env';
import log from 'app/libs/log';

const defaultState = {
  theme: 'gray',
  sidenav: {
    expanded: null,
  },
  ftux: {
    // First-Time User Experience
    firstTimeUser: '', // an empty string or a semver string
    whatsNew: '', // an empty string or a semver string
  },
  securityRiskDetections: {
    threatFilter: 'known',
    timeFilter: '30d',
    showChartView: false,
  },
  infectionChannel: {
    typeFilter: 'all',
    timeFilter: '30d',
    isChartShow: false,
  },
  logs: {
    dateTimeKey: 'recvtime', // 'recvtime' or 'detctime'
  },
  devicesCollapse: {
    groups: false,
  },
  businessModeSwitcher: {
    collapsed: false,
  },
  policy: {
    deviceControl: {
      users: [],
    },
  },
  noteworthyEvents: {
    filter: {
      // 1: New
      // 2: Under investigation
      // 3: Closed
      status: [1, 2], // Defaults to filter only "New" and "Under investigation"
    },
  },
  threatInvestigation: {
    assessment: {
      queuedEndpointAssessment: null,
      endpointCriteriaList: [],
      emailCriteriaList: [],
    },
  },
};

const normalizeProfileState = (state) => {
  const valueOf = (key) => get(state, key, get(defaultState, key));

  return {
    theme: valueOf('theme'),
    sidenav: {
      expanded: valueOf('sidenav.expanded'),
    },
    ftux: {
      firstTimeUser: valueOf('ftux.firstTimeUser'),
      whatsNew: valueOf('ftux.whatsNew'),
    },
    securityRiskDetections: {
      threatFilter: valueOf('securityRiskDetections.threatFilter'),
      timeFilter: valueOf('securityRiskDetections.timeFilter'),
      showChartView: valueOf('securityRiskDetections.showChartView'),
    },
    infectionChannel: {
      typeFilter: valueOf('infectionChannel.typeFilter'),
      timeFilter: valueOf('infectionChannel.timeFilter'),
      isChartShow: valueOf('infectionChannel.isChartShow'),
    },
    logs: {
      dateTimeKey: valueOf('logs.dateTimeKey'),
    },
    devicesCollapse: {
      groups: valueOf('devicesCollapse.groups'),
    },
    businessModeSwitcher: {
      collapsed: valueOf('businessModeSwitcher.collapsed'),
    },
    policy: {
      deviceControl: {
        users: (() => {
          const users = ensureArray(valueOf('policy.deviceControl.users'));
          return uniqWith(users, isEqual);
        })(),
      },
    },
    noteworthyEvents: {
      filter: {
        status: (() => {
          // 1: New
          // 2: Under investigation
          // 3: Closed
          const allowedFilterStatus = [1, 2, 3];
          const filterStatus = ensureArray(valueOf('noteworthyEvents.filter.status'));
          return intersection(allowedFilterStatus, filterStatus);
        })(),
      },
    },
    threatInvestigation: {
      assessment: {
        queuedEndpointAssessment: valueOf(
          'threatInvestigation.assessment.queuedEndpointAssessment'
        ),
        endpointCriteriaList: (() => {
          const endpointCriteriaList = ensureArray(
            valueOf('threatInvestigation.assessment.endpointCriteriaList')
          );
          return uniqBy(endpointCriteriaList, 'id');
        })(),
        emailCriteriaList: (() => {
          const emailCriteriaList = ensureArray(
            valueOf('threatInvestigation.assessment.emailCriteriaList')
          );
          return uniqBy(emailCriteriaList, 'id');
        })(),
      },
    },
  };
};

class Profile {
  version = env.BUILD_VERSION;

  state = cloneDeep(defaultState);

  reset() {
    const version = env.BUILD_VERSION;
    const state = cloneDeep(defaultState);

    return api.restful.profile
      .update({ version, state })
      .then(() => noop)
      .catch((err) => noop);
  }

  load(payload) {
    const { version, state } = { ...payload };

    this.version = version || this.version;
    this.state = normalizeProfileState(state);

    // log.debug('profile.load():', this.state);
  }

  async set(key, value) {
    const state = cloneDeep(this.state);

    set(state, key, value);

    this.state = normalizeProfileState(state);

    try {
      await api.restful.profile.update({
        version: this.version,
        state: this.state,
      });

      return this.state;
    } catch (e) {
      return null;
    }
  }

  get(key, defaultValue) {
    if (!key) {
      return cloneDeep(this.state);
    }

    const value = get(this.state, key, defaultValue);
    if (!key || typeof value === 'undefined') {
      log.error(`"key" is not defined: ${key}`);
    }

    return value;
  }
}

const profile = new Profile();

export default profile;
