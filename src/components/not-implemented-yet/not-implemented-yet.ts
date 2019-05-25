import {Component, Input} from '@angular/core';
import {AlertController} from "ionic-angular";

@Component({
  selector: 'not-implemented-yet',
  templateUrl: 'not-implemented-yet.html'
})
/**
 * Component for displaying a popup, telling that a feature is not implemented yet.
 */
export class NotImplementedYetComponent {
  @Input() private label: string = "";
  @Input() private icon: string = "";

  constructor(private alertCtrl: AlertController) {
  }

  // Creates and shows the not implemented yet popup.
  private presentAlert(): void {
    let alert = this.alertCtrl.create({
      title: 'Prototyp',
      message: 'Diese Funktion wurde leider noch nicht umgesetzt.',
      buttons: ['OK']
    });
    alert.present();
  }
}
