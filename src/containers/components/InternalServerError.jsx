import { Alert, Text } from '@tonic-ui/react';

import i18n from 'app/libs/i18n';

function InternalServerError(props) {
  return (
    <Alert variant="solid" severity="error" {...props}>
      <Text fontWeight="bold">{i18n._('Internal server error')}</Text>
      <Text>
        {i18n._(
          'An unexpected error has occurred. Refresh the screen or try again later. If the issue persists, contact Trend Micro Support.'
        )}
      </Text>
    </Alert>
  );
}

export default InternalServerError;
