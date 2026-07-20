import { InjectionToken, WritableSignal } from '@angular/core';
import { NativeFederationResult } from '@softarc/native-federation-orchestrator';

export type EnvironmentConfig = {
  enableFederation: boolean;
  federationRemote: string;
};

export const MODULE_LOADER = new InjectionToken<NativeFederationResult>(
  'loader'
);

export const ENVIRONMENT_CONFIG = new InjectionToken<
  WritableSignal<EnvironmentConfig>
>('EnvironmentConfig');
