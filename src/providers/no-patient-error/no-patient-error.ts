import {Injectable} from '@angular/core';
import {AlertController} from "ionic-angular";
import Patient = fhir.Patient;

@Injectable()
export class NoPatientErrorProvider {
  private _radios: boolean[] = [];

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

    this.showPopup();
    return false;
  }

  private showPopup(): void {
    this.alertCtrl.create({
      title: 'Hinweis',
      message: 'Bitte zuerst einen Patienten hinzufügen.',
      buttons: ['OK']
    }).present();
  }
}
