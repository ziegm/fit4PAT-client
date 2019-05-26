import {Injectable} from '@angular/core';
import {Alert, AlertController} from "ionic-angular";
import Patient = fhir.Patient;

/**
 * Provider for displaying an error message popup in forms, where no patient is selected.
 */
@Injectable()
export class NoPatientErrorProvider {
  private _radios: boolean[] = [];
  private alert: Alert;

  get radios(): boolean[] {
    return this._radios;
  }

  constructor(private alertCtrl: AlertController) {
  }

  /**
   * Selects the clicked radio button, if a patient was selected. If no patient was selected, a
   * clicked radio button is unselected again. If no event is given as parameter, this method only
   * checks if there is a patient or not.
   * Returns true, if a patient was selected or false if not.
   * @param patient   The currently selected patient, if any.
   * @param event     The click-event containing the id of the clicked radio button. (Optional)
   */
  public hasPatient(patient: Patient, event?): boolean {
    if (patient) {
      if (event && event.currentTarget) {
        this._radios[event.currentTarget.id] = true;
      }
      return true;
    }

    if (event && event.currentTarget) {
      this._radios[event.currentTarget.id] = false;
    }
    return false;
  }

  /**
   * Shows the popup, if no patient was selected.
   * @param patient
   * @param event
   */
  public handleMissingPatient(patient: Patient, event?): void {
    if (!this.hasPatient(patient, event)) {
      this.showPopup();
    }
  }

  /**
   * Creates and shows the popup.
   */
  public showPopup(): void {
    // Opens this popup only, if it does not already exist.
    if (!this.alert) {
      this.alert = this.alertCtrl.create({
        title: 'Hinweis',
        message: 'Bitte zuerst einen Patienten auswählen.',
        buttons: ['OK']
      });
    }

    // Deletes the popup, if the user presses the ok button.
    this.alert.onDidDismiss(() => {
      this.alert = null;
    });

    this.alert.present();
  }
}
