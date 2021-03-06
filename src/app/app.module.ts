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
import {PatientDetailPage} from "../pages/patients/patient-detail/patient-detail";
import {DocumentViewer} from "@ionic-native/document-viewer";
import {NavbarComponent} from "../components/navbar/navbar";
import {ChartModule} from 'angular2-chartjs';
import 'chartjs-plugin-annotation';
import {MenuNavigationProvider} from '../providers/menu-navigation/menu-navigation';
import {AssessmentSearchProvider} from '../providers/assessment-search/assessment-search';
import {MoreHomePage} from "../pages/popover/more-popover/more-home/more-home";
import {InstructionPage} from "../pages/popover/more-popover/more-home/instruction/instruction";
import {PrivacyPage} from "../pages/popover/more-popover/more-home/privacy/privacy";
import {LicencesPage} from "../pages/popover/more-popover/more-home/licences/licences";
import {ImpressumPage} from "../pages/popover/more-popover/more-home/impressum/impressum";
import {NotImplementedYetComponent} from "../components/not-implemented-yet/not-implemented-yet";
import {MoreAZPage} from "../pages/popover/more-popover/more-a-z/more-a-z";
import {MoreNavToPatientDetailPage} from "../pages/popover/more-popover/more-nav-to-patient-detail/more-nav-to-patient-detail";
import {MorePatientAmbulatoryPage} from "../pages/popover/more-popover/more-patient-ambulatory/more-patient-ambulatory";
import {MorePatientDetailPage} from "../pages/popover/more-popover/more-patient-detail/more-patient-detail";
import {MorePatientIpsPage} from "../pages/popover/more-popover/more-patient-ips/more-patient-ips";
import {MorePatientStationaryPage} from "../pages/popover/more-popover/more-patient-stationary/more-patient-stationary";
import {MorePatientScanPage} from "../pages/popover/more-popover/more-patient-scan/more-patient-scan";
import {SearchAssessmentComponent} from "../components/search-assessment/search-assessment";
import {NoPatientErrorProvider} from '../providers/no-patient-error/no-patient-error';
import {PatientToAssessmentNavProvider} from '../providers/patient-to-assessment-nav/patient-to-assessment-nav';
import {LoseDataIfContinueProvider} from "../providers/lose-data-if-continue/lose-data-if-continue";
import {FabNavigationComponent} from "../components/fab-navigation/fab-navigation";
import {File} from "@ionic-native/file";
import {FileOpener} from "@ionic-native/file-opener";
import {PdfPrinterProvider} from '../providers/pdf-printer/pdf-printer';

/**
 * Class from the ionic framework for declaration of modules, providers etc.
 */
// @ts-ignore
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
    PatientSelectorComponent,
    PatientDetailPage,
    NavbarComponent,
    MoreHomePage,
    InstructionPage,
    PrivacyPage,
    LicencesPage,
    ImpressumPage,
    NotImplementedYetComponent,
    MoreAZPage,
    MoreNavToPatientDetailPage,
    MorePatientAmbulatoryPage,
    MorePatientDetailPage,
    MorePatientIpsPage,
    MorePatientStationaryPage,
    MorePatientScanPage,
    SearchAssessmentComponent,
    FabNavigationComponent
  ],
  imports: [
    BrowserModule,
    IonicModule.forRoot(MyApp),
    HttpClientModule,
    ChartModule
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
    WardIpsPage,
    PatientDetailPage,
    MoreHomePage,
    InstructionPage,
    PrivacyPage,
    LicencesPage,
    ImpressumPage,
    MoreAZPage,
    MoreNavToPatientDetailPage,
    MorePatientAmbulatoryPage,
    MorePatientDetailPage,
    MorePatientIpsPage,
    MorePatientStationaryPage,
    MorePatientScanPage
  ],
  providers: [
    StatusBar,
    SplashScreen,
    {provide: ErrorHandler, useClass: IonicErrorHandler},
    BarcodeScanner,
    RestProvider,
    DocumentViewer,
    MenuNavigationProvider,
    AssessmentSearchProvider,
    NoPatientErrorProvider,
    PatientToAssessmentNavProvider,
    LoseDataIfContinueProvider,
    File,
    FileOpener,
    PdfPrinterProvider
  ]
})

export class AppModule {
}
