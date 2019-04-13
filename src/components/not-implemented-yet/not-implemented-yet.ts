import {Component, Input} from '@angular/core';
import {AlertController} from "ionic-angular";

@Component({
  selector: 'not-implemented-yet',
  templateUrl: 'not-implemented-yet.html'
})
export class NotImplementedYetComponent {

  @Input() private label: string = "";
  @Input() private icon: string = "";

  constructor(private alertCtrl: AlertController) {
  }

  private presentAlert(): void {
    let alert = this.alertCtrl.create({
      title: 'Prototyp',
      subTitle: 'Diese Funktion wurde leider noch nicht umgesetzt.',
      buttons: ['OK']
    });
    alert.present();
  }
}
