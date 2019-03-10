import {Component} from '@angular/core';
import {App, NavController, NavParams} from 'ionic-angular';
import {GeriatricsPage} from "../../assessments/disciplines/geriatrics/geriatrics";
import {EvaluationDemmiPage} from "../../assessments/assessment-evaluations/evaluation-demmi/evaluation-demmi";
import {PatientScanPage} from "../patient-selector/patient-scan/patient-scan";
import {PatientStationaryPage} from "../patient-selector/patient-stationary/patient-stationary";
import {PatientAmbulatoryPage} from "../patient-selector/patient-ambulatory/patient-ambulatory";
import {WardOverviewPage} from "../wards/ward-overview/ward-overview";

@Component({
  selector: 'page-patient',
  templateUrl: 'patient-tab.html'
})
export class PatientTabPage {

  private rootNav:any;

  constructor(public navCtrl: NavController, public navParams: NavParams, public app: App) {
    this.rootNav = app.getRootNav();
  }

  navToPatientScan() {
    this.rootNav.push(PatientScanPage);
  }

  navToWardOverview() {
    this.rootNav.push(WardOverviewPage);
  }

  navToPatientAmbulatory() {
    this.rootNav.push(PatientAmbulatoryPage);
  }

}
