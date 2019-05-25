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
/**
 * Displays a button for choosing a patient or a patient if already selected in each assessment form.
 */
export class PatientSelectorComponent extends WorkflowPage {
  private rootNav: any;
  @Input() private patient: Patient;

  constructor(private app: App, navParams: NavParams) {
    super(navParams.data);
    this.rootNav = app.getRootNav();
  }

  /**
   *  View representation of a patient in the format:
   *  [Room:] Family name, given name
   *  If no patient is selected an empty string is returned.
   * @param patient   The patient to be represented.
   */
  private viewPatientName(patient: Patient): string {
    return patient !== undefined ? PatientHelper.viewPatientName(patient) : "";
  }

  /**
   * View representation of a patients additional information in the format:
   * Gender, birthdate (age), case id (Fall-ID)
   * If no patient is selected an empty string is returned.
   * @param patient   The patient to be represented.
   */
  private viewPatientInfos(patient: Patient): string {
    return patient !== undefined ? PatientHelper.viewPatientInfos(patient) : "";
  }

  navToPatientTab() {
    this.rootNav.push(PatientTabPage, this.workflowParameters);
  }
}
