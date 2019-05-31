import {Component} from '@angular/core';
import {App, IonicPage, NavController, NavParams} from 'ionic-angular';
import {BarcodeScanner} from "@ionic-native/barcode-scanner";
import {WorkflowPage} from "../../../../workflow/workflow-page";
import {RestProvider} from "../../../../providers/rest/rest";
import {BarcodeConverter} from "./barcode-converter";
import {WorkflowSelector} from "../../../../workflow/workflow-selector";
import {PatientDetailPage} from "../../patient-detail/patient-detail";
import {PatientToAssessmentNavProvider} from "../../../../providers/patient-to-assessment-nav/patient-to-assessment-nav";
import Bundle = fhir.Bundle;
import Patient = fhir.Patient;

@IonicPage()
@Component({
  selector: 'page-patient-scan',
  templateUrl: 'patient-scan.html',
})
/**
 * Page for the patients wristband scanner.
 */
export class PatientScanPage extends WorkflowPage {
  private rootNav: any;

  constructor(app: App, navParams: NavParams, private barcodeScanner: BarcodeScanner,
              private rest: RestProvider,
              private navCtrl: NavController,
              private toAssessment: PatientToAssessmentNavProvider) {
    super(navParams.data);
    this.rootNav = app.getRootNav();

    // Starts the scanner on load of the page and handles the promise
    // of a loaded patient.
    this.barcodeScanner.scan().then(barcodeData => {
      this.patient(barcodeData.text);
    }).catch(err => {
    });
  }

  /**
   * Loads the patient from a wristband code, stores it to the workflow parameters
   * and triggers the loading of the next page of the current workflow.
   * @param code   The barcode/data matrix of a scan.
   */
  private patient(code: string): void {
    this.rest.getPatient(BarcodeConverter.toCaseId(code)).then(data => {
      this.workflowParameters.patient = (data as Bundle).entry[0].resource as Patient;
      this.navToNextWorkflowStep();
    });
  }

  /**
   * Navigates to the next page of the chosen workflow.
   */
  private navToNextWorkflowStep(): void {
    if (this.workflowParameters.workflowSelector === WorkflowSelector.FromPatient) {
      this.rootNav.push(PatientDetailPage, this.workflowParameters);
    } else {
      this.toAssessment.navToAssessment(this.workflowParameters, this.navCtrl);
    }
  }
}
