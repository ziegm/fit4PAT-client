import {Component, Input} from '@angular/core';
import {RestProvider} from "../../../providers/rest/rest";
import {App, Loading, LoadingController, NavController} from "ionic-angular";
import {PatientHelper} from "../patient-helper";
import {PatientDetailPage} from "../../../pages/patients/patient-detail/patient-detail";
import {WorkflowParameters} from "../../../workflow/workflow-parameters";
import {WorkflowSelector} from "../../../workflow/workflow-selector";
import {PatientToAssessmentNavProvider} from "../../../providers/patient-to-assessment-nav/patient-to-assessment-nav";
import Patient = fhir.Patient;
import Bundle = fhir.Bundle;


@Component({
  selector: 'patient-list',
  templateUrl: 'patient-list.html'
})
/**
 * Component for displaying a list of patients or a message that there is actually no patient.
 */
export class PatientListComponent {
  private patients: Patient[] = [];
  @Input() private ward: string;
  private noPatientMessage = "";
  @Input() private workflowParameters: WorkflowParameters;
  private rootNav: any;
  @Input() private search = "";
  private loading: Loading;

  constructor(private restProvider: RestProvider, private navCtrl: NavController, app: App,
              private toAssessment: PatientToAssessmentNavProvider,
              private loadingCtrl: LoadingController) {
    this.rootNav = app.getRootNav();
  }

  /**
   * Used to load the patients list initially or when the search parameters have changed.
   * Displays a loading spinner, in case the loading takes a while.
   */
  private ngOnChanges(): void {
    // Loads and displays the spinner.
    this.loading = this.loadingCtrl.create({
      spinner: 'bubbles',
      content: 'Lädt, bitte warten...'
    });
    this.loading.present();

    // Loads the patients list.
    this.getPatients(this.search);
  }

  /**
   * Loads the patients list from the fit4PAT server.
   * @param searchParam   A search string.
   */
  private getPatients(searchParam?: string): void {
    // Resets the patients list on every new load.
    this.patients = [];

    // Loads the patients for the defined ward and search string.
    this.restProvider.getPatients(this.ward, searchParam)
      .then(data => {
        // Dismisses the loading spinner when a search result was loaded.
        this.loading.dismiss();

        // Writes loaded patients into the patients list or sets the no patient message.
        if ((data as Bundle).entry !== undefined) {
          (data as Bundle).entry.forEach(entry => {
            this.patients.push(entry.resource as Patient);
          });
        } else {
          this.patients = [];
          this.noPatientMessage = "Es existieren momentan keine Patienten mit Physiotherapie-Verordnung.";
        }

        // Sorts the patients list alphabetically descending by patient names.
        this.patients.sort((a: Patient, b: Patient) => {
          return this.viewPatientName(a) > this.viewPatientName(b) ? 1 : -1;
        })
      });
  }

  /**
   *  View representation of a patient in the format:
   *  [Room:] Family name, given name
   * @param patient   The patient to be represented.
   */
  private viewPatientName(patient: Patient): string {
    return PatientHelper.viewPatientName(patient);
  }

  /**
   * View representation of a patients additional information in the format:
   * Gender, birthdate (age), case id (Fall-ID)
   * @param patient   The patient to be represented.
   */
  private viewPatientInfos(patient: Patient): string {
    return PatientHelper.viewPatientInfos(patient);
  }

  /**
   * Selects a patient as active one and decides based on the workflow selector,
   * where to navigate next.
   * @param patient   The patient to be selected as active.
   */
  private takeOverPatient(patient: Patient): void {
    switch (this.workflowParameters.workflowSelector) {
      case WorkflowSelector.FromAssessment:
        this.workflowParameters.patient = patient;
        this.toAssessment.navToAssessment(this.workflowParameters, this.navCtrl);
        break;
      case WorkflowSelector.FromPatient:
        this.workflowParameters.patient = patient;
        this.rootNav.push(PatientDetailPage, this.workflowParameters);
        break;
    }
  }

  /**
   * Searches inside the loaded patient list for a patients name (given or family) and removes
   * not fitting patients.
   * @param search    The search string.
   */
  private filter(search: string): void {
    if (search) {
      this.patients = this.patients.filter(patient => {
        return PatientHelper.viewPatientName(patient).toLowerCase().includes(search.toLowerCase());
      });
    }
  }
}
