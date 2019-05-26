import {Injectable} from '@angular/core';
import {Alert, AlertController} from "ionic-angular";

/**
 * Provides an injectable popup with the information that data is not saved, if the user continues to the
 * next page and the possibility to return to the current page.
 */
@Injectable()
export class LoseDataIfContinueProvider {
  private alert: Alert;

  constructor(private alertCtrl: AlertController) {
  }

  /**
   * Creates and displays the popup.
   * @param navToNextPage   Closure that handles the navigation to the next page.
   */
  public showPopup(navToNextPage: () => void): void {
    // Opens this popup only, if it does not already exist.
    if (!this.alert) {
      this.alert = this.alertCtrl.create({
        title: 'Hinweis',
        message: 'Beim Wechsel zur nächsten Seite gehen nicht gespeicherte Informationen verloren (bitte zuerst AUSWERTEN & SPEICHERN).',
        buttons: [{
            text: 'Zur nächsten Seite',
            handler: () => {
            navToNextPage();
          }
        }, 'Zurück']
      });
    }

    // Deletes the popup, if the user presses the next-page or back button.
    this.alert.onDidDismiss(() => {
      this.alert = null;
    });

    this.alert.present();
  }
}
