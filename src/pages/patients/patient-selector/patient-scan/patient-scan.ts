import { Component } from '@angular/core';
import { IonicPage, NavController, NavParams } from 'ionic-angular';
import {QRScanner, QRScannerStatus} from "@ionic-native/qr-scanner/ngx";

/**
 * Generated class for the PatientScanPage page.
 *
 * See https://ionicframework.com/docs/components/#navigation for more info on
 * Ionic pages and navigation.
 */

@IonicPage()
@Component({
  selector: 'page-patient-scan',
  templateUrl: 'patient-scan.html',
})
export class PatientScanPage {

  constructor(public navCtrl: NavController, public navParams: NavParams) {

  }

  /*
  scan() {
    let scanSub = this.qrScanner.scan().subscribe((text: string) => {
      console.log(text);
      this.qrScanner.hide();
      scanSub.unsubscribe();
    });
  }
  */

  ionViewDidLoad() {
    console.log('ionViewDidLoad PatientScanPage');
  }

}
