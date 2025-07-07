// Declarações globais para Google APIs

declare global {
  interface Window {
    gapi: {
      load: (api: string, callback: () => void) => void;
      client: {
        init: (config: any) => Promise<void>;
        load: (api: string, version: string, callback: () => void) => void;
        gmail: {
          users: {
            messages: {
              list: (params: any) => Promise<any>;
              get: (params: any) => Promise<any>;
            };
          };
        };
        setToken: (token: any) => void;
        getToken: () => any;
      };
    };
  }
}

export {}; 