import {Injectable} from '@angular/core';
import {Alert, AlertController} from "ionic-angular";


@Injectable()
export class LoseDataIfContinueProvider {

  private alert: Alert;

  constructor(private alertCtrl: AlertController) {
  }

  public showPopup(navToNextPage: () => void): void {
    if (!this.alert) {
      this.alert = this.alertCtrl.create({
        title: 'Hinweis',
        message: 'Beim Wechsel zur nächsten Seite gehen nicht gespeicherte Informationen verloren (bitte zuerst AUSWERTEN).',
        buttons: [{
            text: 'Zur nächsten Seite',
            handler: () => {
            navToNextPage();
          }
        }, 'Zurück']
      });
    }

    this.alert.onDidDismiss(() => {
      this.alert = null;
    });

    this.alert.present();
  }
}
