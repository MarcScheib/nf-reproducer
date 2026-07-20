import {
  fromPackageJson,
  withNativeFederation,
} from '@angular-architects/native-federation/config';

export default withNativeFederation({
  name: 'nf-reproducer',

  shared: fromPackageJson({
    singleton: true,
    strictVersion: true,
    requiredVersion: 'auto',
    build: 'package',
  })
    .patch(['@angular/core'], { includeSecondaries: { keepAll: true } })
    .get(),

  skip: [
    'rxjs/ajax',
    'rxjs/fetch',
    'rxjs/testing',
    'rxjs/webSocket',
    // Add further packages you don't need at runtime
  ],

  features: {
    ignoreUnusedDeps: true,
  },
});
