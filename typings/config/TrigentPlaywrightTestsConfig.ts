export interface TrigentPlaywrightTestsConfig {
  internal?: {
    email: string;
    password: string;
  };
  external?: {
    email: string;
    password: string;
  };
  sales?: {
    email: string;
    password: string;
  };
  externalNoReport?: {
    email: string;
    password: string;
  };
}
