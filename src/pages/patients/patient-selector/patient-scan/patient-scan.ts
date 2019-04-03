import {Component} from '@angular/core';
import {IonicPage, NavController, NavParams} from 'ionic-angular';
import {BarcodeScanner} from "@ionic-native/barcode-scanner";
import {WorkflowPage} from "../../../../workflow/workflow-page";


@IonicPage()
@Component({
  selector: 'page-patient-scan',
  templateUrl: 'patient-scan.html',
})
export class PatientScanPage extends WorkflowPage {
  private barcode = "";
  private isSearchbarVisible = false;

  constructor(private navCtrl: NavController, navParams: NavParams, private barcodeScanner: BarcodeScanner) {
    super(navParams.data);
    this.barcodeScanner.scan().then(barcodeData => {
      this.barcode = barcodeData.text;
    }).catch(err => {
      console.log('Error', err);
    });
  }

  private onSearchbarVisibilityChange(isVisible: boolean): void {
    this.isSearchbarVisible = isVisible;
  }
}
