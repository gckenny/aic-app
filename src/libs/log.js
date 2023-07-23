import browser from 'detect-browser';
import { includes } from 'lodash';
import logger from 'universal-logger';
import { styleable } from 'universal-logger-browser';

const log = logger().use(
  styleable({
    colorized: browser && browser.detect() && !includes(['ie', 'edge'], browser.detect().name),
    showSource: true,
    showTimestamp: true,
  })
);

log.enableStackTrace();

export default log;
