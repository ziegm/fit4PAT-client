import {Component, Input} from '@angular/core';
import {App, NavParams} from "ionic-angular";
import {PatientTabPage} from "../../../pages/patients/patient-tab/patient-tab";
import {WorkflowPage} from "../../../workflow/workflow-page";
import {PatientHelper} from "../patient-helper";
import Patient = fhir.Patient;

@Component({
  selector: 'patient-selector',
  templateUrl: 'patient-selector.html'
})
export class PatientSelectorComponent extends WorkflowPage {
  private rootNav: any;
  @Input() private patient: Patient;

  constructor(private app: App, navParams: NavParams) {
    super(navParams.data);
    this.rootNav = app.getRootNav();
  }

  private viewPatientName(patient: Patient) {
    return patient !== undefined ? PatientHelper.viewPatientName(patient) : "";
  }
  private viewPatientInfos(patient: Patient) {
    return patient !== undefined ? PatientHelper.viewPatientInfos(patient) : "";
  }

  navToPatientTab() {
    this.rootNav.push(PatientTabPage, this.workflowParameters);
  }
}
