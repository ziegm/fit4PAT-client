import {Component} from '@angular/core';
import {PopoverController, ViewController} from 'ionic-angular';

@Component({
  selector: 'page-more-patient-scan',
  templateUrl: 'more-patient-scan.html',
})
export class MorePatientScanPage {

  constructor(private popoverCtrl: PopoverController, private viewCtrl: ViewController) {
  }

  private closePopover(){
    this.viewCtrl.dismiss();
  }

}
