import {
  EnvironmentProviders,
  makeEnvironmentProviders,
  provideBrowserGlobalErrorListeners,
  provideZonelessChangeDetection,
  signal,
} from '@angular/core';
import { NativeFederationResult } from '@softarc/native-federation-orchestrator';
import { SDK_VERSION } from '@ui/sdk';
import {
  ENVIRONMENT_CONFIG,
  EnvironmentConfig,
  MODULE_LOADER,
} from '../providers';

export function provideApp(
  config: EnvironmentConfig,
  nfr: NativeFederationResult | void
): EnvironmentProviders {
  return makeEnvironmentProviders([
    {
      provide: ENVIRONMENT_CONFIG,
      useValue: signal(config),
    },
    { provide: MODULE_LOADER, useValue: nfr },
    provideZonelessChangeDetection(),
    provideBrowserGlobalErrorListeners(),
    {
      provide: SDK_VERSION,
      useValue: '0.0.1',
    },
  ]);
}
