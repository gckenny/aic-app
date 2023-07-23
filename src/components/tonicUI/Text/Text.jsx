import { Text as TonicText } from '@tonic-ui/react';
import { forwardRef } from 'react';

const Text = forwardRef((props, ref) => <TonicText ref={ref} display="inline-block" {...props} />);

export default Text;
