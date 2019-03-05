import {ErrorHandler, NgModule} from '@angular/core';
import {BrowserModule} from '@angular/platform-browser';
import {IonicApp, IonicErrorHandler, IonicModule} from 'ionic-angular';
import {MyApp} from './app.component';

import {PatientPage} from '../pages/patient/patient';
import {AssessmentPage} from '../pages/assessment/assessment';
import {TabsPage} from '../pages/tabs/tabs';

import {StatusBar} from '@ionic-native/status-bar';
import {SplashScreen} from '@ionic-native/splash-screen';
import {GeriatricsPage} from '../pages/geriatrics/geriatrics';
import {CardiologyPage} from "../pages/cardiology/cardiology";
import {MusculoskeletalPage} from "../pages/musculoskeletal/musculoskeletal";
import {NeurologyPage} from "../pages/neurology/neurology";
import {OthersPage} from "../pages/others/others";

@NgModule({
  declarations: [
    MyApp,
    PatientPage,
    AssessmentPage,
    TabsPage,
    GeriatricsPage,
    CardiologyPage,
    MusculoskeletalPage,
    NeurologyPage,
    OthersPage
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
    GeriatricsPage,
    CardiologyPage,
    MusculoskeletalPage,
    NeurologyPage,
    OthersPage
  ],
  providers: [
    StatusBar,
    SplashScreen,
    {provide: ErrorHandler, useClass: IonicErrorHandler}
  ]
})
export class AppModule {}
