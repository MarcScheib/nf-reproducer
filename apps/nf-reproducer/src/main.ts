import { initFederation } from '@softarc/native-federation-orchestrator';
import {
  consoleLogger,
  globalThisStorageEntry,
  useShimImportMap,
} from '@softarc/native-federation-orchestrator/options';
import { EnvironmentConfig } from './providers';

const config: EnvironmentConfig = {
  enableFederation: true,
  federationRemote: 'http://localhost:4201',
};

const ConfigLoader = new Promise<EnvironmentConfig>(resolve =>
  setTimeout(() => resolve(config), 1000)
);

ConfigLoader.then(config =>
  initFederation(
    config.enableFederation
      ? {
          'nf-reproducer-remote': `${config.federationRemote}/remoteEntry.json`,
        }
      : {},
    {
      ...useShimImportMap({ shimMode: true }),
      logger: consoleLogger,
      storage: globalThisStorageEntry,
      hostRemoteEntry: './remoteEntry.json',
      logLevel: 'debug',
      profile: {
        latestSharedExternal: false,
        overrideCachedRemotesIfURLMatches: true,
      },
      sse: false,
    }
  )
    // Error is caught twice to ensure that any errors in federation
    // initialization or bootstrapping are logged. In addition, if federation
    // initialization fails, the application will still attempt to bootstrap.
    .catch(err =>
      // eslint-disable-next-line no-console
      console.error('Error initializing federation:', err)
    )
    .then(nfr => import('./bootstrap').then(m => m.bootstrap(config, nfr)))
    .catch(err =>
      // eslint-disable-next-line no-console
      console.error('Error bootstrapping application:', err)
    )
);
