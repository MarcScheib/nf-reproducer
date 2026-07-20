import {
  ApplicationConfig,
  ApplicationRef,
  EnvironmentProviders,
  Provider,
} from '@angular/core';
import { bootstrapApplication } from '@angular/platform-browser';
import { NativeFederationResult } from '@softarc/native-federation-orchestrator';
import { App } from './app/app';
import { provideApp } from './app/app.config';
import { EnvironmentConfig } from './providers';

const createAppConfig: (
  ...providers: Array<Provider | EnvironmentProviders>
) => ApplicationConfig = (...providers) => ({
  providers: [providers],
});

export async function bootstrap(
  config: EnvironmentConfig,
  nfr: NativeFederationResult | void
): Promise<ApplicationRef> {
  return bootstrapApplication(App, createAppConfig(provideApp(config, nfr)));
}
