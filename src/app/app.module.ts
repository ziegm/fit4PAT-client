import {ErrorHandler, NgModule} from '@angular/core';
import {BrowserModule} from '@angular/platform-browser';
import {IonicApp, IonicErrorHandler, IonicModule} from 'ionic-angular';
import {MyApp} from './app.component';

import {PatientPage} from '../pages/patient/patient';
import {AssessmentPage} from '../pages/assessment/assessment';
import {TabsPage} from '../pages/tabs/tabs';

import {StatusBar} from '@ionic-native/status-bar';
import {SplashScreen} from '@ionic-native/splash-screen';
import {NoTabPage} from '../pages/no-tab/no-tab';

@NgModule({
  declarations: [
    MyApp,
    PatientPage,
    AssessmentPage,
    TabsPage,
    NoTabPage
  ],
  imports: [
    BrowserModule,
    IonicModule.forRoot(MyApp)
  ],
  bootstrap: [IonicApp],
  entryComponents: [
    MyApp,
    PatientPage,
    AssessmentPage,
    TabsPage,
    NoTabPage
  ],
  providers: [
    StatusBar,
    SplashScreen,
    {provide: ErrorHandler, useClass: IonicErrorHandler}
  ]
})
export class AppModule {}
