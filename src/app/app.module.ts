import {ErrorHandler, NgModule} from '@angular/core';
import {BrowserModule} from '@angular/platform-browser';
import {IonicApp, IonicErrorHandler, IonicModule} from 'ionic-angular';
import {MyApp} from './app.component';

import {PatientTabPage} from '../pages/patients/patient-tab/patient-tab';
import {AssessmentTabPage} from '../pages/assessments/assessment-tab/assessment-tab';
import {TabsPage} from '../pages/tabs/tabs';

import {StatusBar} from '@ionic-native/status-bar';
import {SplashScreen} from '@ionic-native/splash-screen';
import {GeriatricsPage} from '../pages/assessments/disciplines/geriatrics/geriatrics';
import {CardiologyPage} from "../pages/assessments/disciplines/cardiology/cardiology";
import {MusculoskeletalPage} from "../pages/assessments/disciplines/musculoskeletal/musculoskeletal";
import {NeurologyPage} from "../pages/assessments/disciplines/neurology/neurology";
import {OthersPage} from "../pages/assessments/disciplines/others/others";
import {FormDemmiPage} from "../pages/assessments/assessment-forms/form-demmi/form-demmi";
import {FormDgiPage} from "../pages/assessments/assessment-forms/form-dgi/form-dgi";
import {FormWalkingtestPage} from "../pages/assessments/assessment-forms/form-walkingtest/form-walkingtest";
import {EvaluationDemmiPage} from "../pages/assessments/assessment-evaluations/evaluation-demmi/evaluation-demmi";
import {EvaluationDgiPage} from "../pages/assessments/assessment-evaluations/evaluation-dgi/evaluation-dgi";
import {EvaluationWalkingtestPage} from "../pages/assessments/assessment-evaluations/evaluation-walkingtest/evaluation-walkingtest";
import {PatientAmbulatoryPage} from "../pages/patients/patient-selector/patient-ambulatory/patient-ambulatory";
import {PatientStationaryPage} from "../pages/patients/patient-selector/patient-stationary/patient-stationary";
import {PatientScanPage} from "../pages/patients/patient-selector/patient-scan/patient-scan";
import {WardA1Page} from "../pages/patients/wards/ward-a1/ward-a1";
import {WardA2Page} from "../pages/patients/wards/ward-a2/ward-a2";
import {WardB1Page} from "../pages/patients/wards/ward-b1/ward-b1";
import {WardB2Page} from "../pages/patients/wards/ward-b2/ward-b2";
import {WardB3Page} from "../pages/patients/wards/ward-b3/ward-b3";
import {WardC1Page} from "../pages/patients/wards/ward-c1/ward-c1";
import {WardIpsPage} from "../pages/patients/wards/ward-ips/ward-ips";

import {BarcodeScanner} from "@ionic-native/barcode-scanner";
import {RestProvider} from "../providers/rest/rest";
import {HttpClientModule} from "@angular/common/http";
import {PatientListComponent} from "../components/patient/patient-list/patient-list";
import {PatientSelectorComponent} from "../components/patient/patient-selector/patient-selector";


@NgModule({
  declarations: [
    MyApp,
    PatientTabPage,
    AssessmentTabPage,
    TabsPage,
    GeriatricsPage,
    CardiologyPage,
    MusculoskeletalPage,
    NeurologyPage,
    OthersPage,
    FormDemmiPage,
    FormDgiPage,
    FormWalkingtestPage,
    EvaluationDemmiPage,
    EvaluationDgiPage,
    EvaluationWalkingtestPage,
    PatientAmbulatoryPage,
    PatientStationaryPage,
    PatientScanPage,
    WardA1Page,
    WardA2Page,
    WardB1Page,
    WardB2Page,
    WardB3Page,
    WardC1Page,
    WardIpsPage,
    PatientListComponent,
    PatientSelectorComponent
  ],
  imports: [
    BrowserModule,
    IonicModule.forRoot(MyApp),
    HttpClientModule
  ],
  bootstrap: [IonicApp],
  entryComponents: [
    MyApp,
    PatientTabPage,
    AssessmentTabPage,
    TabsPage,
    GeriatricsPage,
    CardiologyPage,
    MusculoskeletalPage,
    NeurologyPage,
    OthersPage,
    FormDemmiPage,
    FormDgiPage,
    FormWalkingtestPage,
    EvaluationDemmiPage,
    EvaluationDgiPage,
    EvaluationWalkingtestPage,
    PatientAmbulatoryPage,
    PatientStationaryPage,
    PatientScanPage,
    WardA1Page,
    WardA2Page,
    WardB1Page,
    WardB2Page,
    WardB3Page,
    WardC1Page,
    WardIpsPage
  ],
  providers: [
    StatusBar,
    SplashScreen,
    {provide: ErrorHandler, useClass: IonicErrorHandler},
    BarcodeScanner,
    RestProvider
  ]
})
export class AppModule {
}
