import { TrigentPlaywrightTestsConfig } from '../typings/config/TrigentPlaywrightTestsConfig';

const customEnvironmentVariables: TrigentPlaywrightTestsConfig = {
  internal: {
    email: 'TEST_INTERNAL_USER',
    password: 'TEST_INTERNAL_PASSWORD',
  },
  external: {
    email: 'TEST_EXTERNAL_SITE_USER',
    password: 'TEST_EXTERNAL_SITE_PASSWORD',
  },
  sales: {
    email: 'TEST_EXTERNAL_SPONSOR_USER',
    password: 'TEST_EXTERNAL_SPONSOR_PASSWORD',
  },
  externalNoReport: {
    email: 'TEST_EXTERNAL_SPONSOR_USER',
    password: 'TEST_EXTERNAL_SPONSOR_PASSWORD',
  },
};

export default customEnvironmentVariables;
