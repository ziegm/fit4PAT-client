import {Injectable} from '@angular/core';
import {Alert, AlertController} from "ionic-angular";
import Patient = fhir.Patient;

@Injectable()
export class NoPatientErrorProvider {
  private _radios: boolean[] = [];
  private alert: Alert;

  get radios(): boolean[] {
    return this._radios;
  }

  constructor(private alertCtrl: AlertController) {
  }

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

  public handleMissingPatient(patient: Patient, event?) {
    if (!this.hasPatient(patient, event)) {
      this.showPopup();
    }
  }

  public showPopup(): void {
    if (!this.alert) {
      this.alert = this.alertCtrl.create({
        title: 'Hinweis',
        message: 'Bitte zuerst einen Patienten hinzufügen.',
        buttons: ['OK']
      });
    }

    this.alert.onDidDismiss(() => {
      this.alert = null;
    });

    this.alert.present();
  }
}
