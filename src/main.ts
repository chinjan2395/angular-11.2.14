import {enableProdMode, TRANSLATIONS} from '@angular/core';
import {platformBrowserDynamic} from '@angular/platform-browser-dynamic';

import {AppModule} from './app/app.module';
import {environment} from './environments/environment';
import * as Sentry from '@sentry/angular';
import {Amplify} from 'aws-amplify';
import awsconfig from './aws-exports';
import {Integrations} from '@sentry/tracing';

if (environment.production) {
  enableProdMode();
}

const translations = 'en';

platformBrowserDynamic().bootstrapModule(AppModule, {
  providers: [{provide: TRANSLATIONS, useValue: translations}]
})
  .catch(err => console.error(err));


// Sentry
Sentry.init({
  dsn: 'https://45d94506d3d74186afca9177a5a433e5@o1104092.ingest.sentry.io/6130719',
  integrations: [
    new Integrations.BrowserTracing({
      tracingOrigins: ['localhost', 'https://yourserver.io/api'],
      routingInstrumentation: Sentry.routingInstrumentation,
    }),
  ],

  // Set tracesSampleRate to 1.0 to capture 100%
  // of transactions for performance monitoring.
  // We recommend adjusting this value in production
  tracesSampleRate: 1.0,
});

// AWS Amplify
Amplify.configure(awsconfig);
