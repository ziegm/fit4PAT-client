import {Component} from '@angular/core';
import {App, NavParams} from 'ionic-angular';
import {PatientScanPage} from "../patient-selector/patient-scan/patient-scan";
import {PatientStationaryPage} from "../patient-selector/patient-stationary/patient-stationary";
import {PatientAmbulatoryPage} from "../patient-selector/patient-ambulatory/patient-ambulatory";
import {WorkflowPage} from "../../../workflow/workflow-page";

@Component({
  selector: 'page-patient',
  templateUrl: 'patient-tab.html'
})
/**
 * Page lets the user select a way to choose a patient.
 */
export class PatientTabPage extends WorkflowPage {
  private rootNav: any;
  private isSearchbarVisible = false;

  constructor(navParams: NavParams, app: App) {
    super(navParams.data);
    this.rootNav = app.getRootNav();
  }

  private navToPatientScan(): void {
    this.rootNav.push(PatientScanPage, this.workflowParameters);
  }

  private navToPatientStationary(): void {
    this.rootNav.push(PatientStationaryPage, this.workflowParameters);
  }

  private navToPatientAmbulatory(): void {
    this.rootNav.push(PatientAmbulatoryPage, this.workflowParameters);
  }
}
