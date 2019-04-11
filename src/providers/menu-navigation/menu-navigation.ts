import {Injectable} from '@angular/core';
import {MenuController, NavController} from "ionic-angular";
import {MusculoskeletalPage} from "../../pages/assessments/disciplines/musculoskeletal/musculoskeletal";
import {WorkflowSelector} from "../../workflow/workflow-selector";
import {GeriatricsPage} from "../../pages/assessments/disciplines/geriatrics/geriatrics";
import {NeurologyPage} from "../../pages/assessments/disciplines/neurology/neurology";
import {CardiologyPage} from "../../pages/assessments/disciplines/cardiology/cardiology";
import {OthersPage} from "../../pages/assessments/disciplines/others/others";
import {PatientScanPage} from "../../pages/patients/patient-selector/patient-scan/patient-scan";
import {PatientStationaryPage} from "../../pages/patients/patient-selector/patient-stationary/patient-stationary";
import {PatientAmbulatoryPage} from "../../pages/patients/patient-selector/patient-ambulatory/patient-ambulatory";

@Injectable()
export class MenuNavigationProvider {
  private _navCtrl: NavController;

  constructor(private menuCtrl: MenuController) {
  }

  set navCtrl(value: NavController) {
    this._navCtrl = value;
  }

  navToMusculoskeletal() {
    this._navCtrl.push(MusculoskeletalPage, { workflowSelector: WorkflowSelector.FromAssessment });
    this.menuCtrl.close();
  }

  navToGeriatrics() {
    this._navCtrl.push(GeriatricsPage, { workflowSelector: WorkflowSelector.FromAssessment });
    this.menuCtrl.close();
  }

  navToNeurology() {
    this._navCtrl.push(NeurologyPage, { workflowSelector: WorkflowSelector.FromAssessment });
    this.menuCtrl.close();
  }

  navToCardiology() {
    this._navCtrl.push(CardiologyPage, { workflowSelector: WorkflowSelector.FromAssessment });
    this.menuCtrl.close();
  }

  navToOthers() {
    this._navCtrl.push(OthersPage, { workflowSelector: WorkflowSelector.FromAssessment });
    this.menuCtrl.close();
  }

  navToPatientScan() {
    this._navCtrl.push(PatientScanPage, { workflowSelector: WorkflowSelector.FromPatient });
    this.menuCtrl.close();
  }

  navToPatientStationary() {
    this._navCtrl.push(PatientStationaryPage, { workflowSelector: WorkflowSelector.FromPatient });
    this.menuCtrl.close();
  }

  navToPatientAmbulatory() {
    this._navCtrl.push(PatientAmbulatoryPage, { workflowSelector: WorkflowSelector.FromPatient });
    this.menuCtrl.close();
  }
}