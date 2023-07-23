import { Icon, Link } from '@tonic-ui/react';
import PropTypes from 'prop-types';
import { forwardRef, useCallback } from 'react';

const ExternalLink = forwardRef(({ children, href, isHideExternalLinkIcon, ...rest }, ref) => {
  const openExternalLink = useCallback(() => {
    // XXX: Manually open the link in order to prevent default behavior being cancelled by ancestors.
    //      See https://codepen.io/henry61024/pen/QWVNaxZ for the event cancelation test.
    window.open(href, '_blank');
  }, [href]);

  return (
    <Link
      ref={ref}
      target="_blank"
      rel="noopener noreferrer"
      href={href}
      onClick={openExternalLink}
      {...rest}
    >
      {children}
      {!isHideExternalLinkIcon && <Icon icon="external-link" ml="1x" mt="-2px" />}
    </Link>
  );
});

export default ExternalLink;

ExternalLink.propTypes = {
  href: PropTypes.string.isRequired,
  children: PropTypes.node.isRequired,
  isHideExternalLinkIcon: PropTypes.bool,
};
