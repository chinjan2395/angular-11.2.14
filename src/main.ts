import {enableProdMode, TRANSLATIONS} from '@angular/core';
import {platformBrowserDynamic} from '@angular/platform-browser-dynamic';

import {AppModule} from './app/app.module';
import {environment} from './environments/environment';
import {Amplify} from 'aws-amplify';
import awsconfig from './aws-exports';

if (environment.production) {
  enableProdMode();
}

const translations = 'en';

platformBrowserDynamic().bootstrapModule(AppModule, {
  providers: [{provide: TRANSLATIONS, useValue: translations}]
})
  .catch(err => console.error(err));

Amplify.configure(awsconfig);
