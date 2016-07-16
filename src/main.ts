import {bootstrap}    from '@angular/platform-browser-dynamic';
import {AppComponent} from './app.component';
import { FIREBASE_PROVIDERS, defaultFirebase } from 'angularfire2';

import {appRouterProviders} from './app.routes';

bootstrap(AppComponent, [
    appRouterProviders,
    FIREBASE_PROVIDERS,
    defaultFirebase({
        apiKey: "AIzaSyC4VktVHhi-Qo9vR5DZeygEqYlW9PF05E0",
        authDomain: "usertech-lunch-app.firebaseapp.com",
        databaseURL: "https://usertech-lunch-app.firebaseio.com",
        storageBucket: "usertech-lunch-app.appspot.com"
    })
]);

