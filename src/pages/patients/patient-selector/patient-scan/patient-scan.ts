import {Component} from '@angular/core';
import {IonicPage, NavController, NavParams} from 'ionic-angular';
import {BarcodeScanner} from "@ionic-native/barcode-scanner";
import {WorkflowPage} from "../../../../workflow/workflow-page";

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
export class PatientScanPage extends WorkflowPage {

  private barcode = "";

  constructor(private navCtrl: NavController, navParams: NavParams, private barcodeScanner: BarcodeScanner) {
    super(navParams.data);
    this.barcodeScanner.scan().then(barcodeData => {
      this.barcode = barcodeData.text;
    }).catch(err => {
      console.log('Error', err);
    });
  }
}
