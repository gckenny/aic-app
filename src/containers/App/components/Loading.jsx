import { Spinner } from '@tonic-ui/react';

import Center from './components/Center';
import InternalServerError from 'app/containers/components/InternalServerError';
import log from 'app/libs/log';

const Loading = (props) => {
  if (props.error) {
    log.error('Render Component Error.', props.error);
    return <InternalServerError />;
  }

  return (
    <Center vertical horizontal stretched>
      <Spinner />
    </Center>
  );
};

export default Loading;
