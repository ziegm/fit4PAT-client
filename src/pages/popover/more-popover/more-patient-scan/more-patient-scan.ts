import {Component} from '@angular/core';
import {PopoverController} from 'ionic-angular';

@Component({
  selector: 'page-more-patient-scan',
  templateUrl: 'more-patient-scan.html',
})
export class MorePatientScanPage {

  constructor(private popoverCtrl: PopoverController) {
  }
}
