import { Link } from '@tonic-ui/react';
import PropTypes from 'prop-types';
import { useCallback } from 'react';

import useHistory from 'app/hooks/useHistory';

import ExternalLink from '../ExternalLink';

import { getAppKeys, getAppURL } from './utils';

function AppLink({ app, children, queryString, isExternalLink, isHideExternalLinkIcon, ...rest }) {
  const appUrl = getAppURL(app);
  const targetUrl = queryString ? `${appUrl}${queryString}` : appUrl;
  const history = useHistory();

  const navigateToTargetUrl = useCallback(
    (e) => {
      // Use <a/>'s default behavior on special clicks in order to support open in new tabs (e.g. cmd + click)
      const isNormalLeftClick = !e.metaKey && !e.altKey && !e.ctrlKey && !e.shiftKey;
      if (isNormalLeftClick) {
        e.preventDefault();
        history.push(targetUrl);
      }
    },
    [history, targetUrl]
  );

  return isExternalLink ? (
    <ExternalLink href={targetUrl} isHideExternalLinkIcon={isHideExternalLinkIcon} {...rest}>
      {children}
    </ExternalLink>
  ) : (
    // Use target="_parent" to ensure link is opened in UIC frame.
    // Although Link is default prevented, still use href in order to leverage <a/>'s `&:visited`.
    <Link href={targetUrl} target="_parent" onClick={navigateToTargetUrl} {...rest}>
      {children}
    </Link>
  );
}

AppLink.propTypes = {
  app: PropTypes.oneOf(getAppKeys()).isRequired,
  children: PropTypes.node,
  queryString: PropTypes.string,
  isExternalLink: PropTypes.bool,
  isHideExternalLinkIcon: PropTypes.bool,
};

export default AppLink;
