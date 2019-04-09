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
export class PatientTabPage extends WorkflowPage {
  private rootNav: any;
  public isSearchbarVisible = false;

  constructor(navParams: NavParams, app: App) {
    super(navParams.data);
    this.rootNav = app.getRootNav();
  }

  navToPatientScan() {
    this.rootNav.push(PatientScanPage, this.workflowParameters);
  }

  navToPatientStationary() {
    this.rootNav.push(PatientStationaryPage, this.workflowParameters);
  }

  navToPatientAmbulatory() {
    this.rootNav.push(PatientAmbulatoryPage, this.workflowParameters);
  }

  public onSearchbarVisibilityChange(isVisible: boolean): void {
    this.isSearchbarVisible = isVisible;
  }
}
