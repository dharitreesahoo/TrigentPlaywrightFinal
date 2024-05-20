import { TrigentPlaywrightTestsConfig } from '../typings/config/TrigentPlaywrightTestsConfig';

const defaultConfig: TrigentPlaywrightTestsConfig = {
  internal: {
    email: '',
    password: '',
  },
  external: {
    email: '',
    password: '',
  },
  sales: {
    email: '',
    password: '',
  },
  externalNoReport: {
    email: '',
    password: '',
  },
};

export default defaultConfig;
