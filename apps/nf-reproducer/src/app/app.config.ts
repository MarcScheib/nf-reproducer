import {
  ApplicationConfig,
  provideBrowserGlobalErrorListeners,
} from '@angular/core';
import { SDK_VERSION } from '@ui/sdk';

export const appConfig: ApplicationConfig = {
  providers: [
    provideBrowserGlobalErrorListeners(),
    {
      provide: SDK_VERSION,
      useValue: '0.0.1',
    },
  ],
};
