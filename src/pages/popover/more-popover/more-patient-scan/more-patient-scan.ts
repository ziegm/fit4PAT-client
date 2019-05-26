import {Component} from '@angular/core';
import {PopoverController, ViewController} from 'ionic-angular';

@Component({
  selector: 'page-more-patient-scan',
  templateUrl: 'more-patient-scan.html',
})
/**
 * Popover for starting the patient scan.
 */
export class MorePatientScanPage {

  constructor(private popoverCtrl: PopoverController, private viewCtrl: ViewController) {
  }

  private closePopover(): void {
    this.viewCtrl.dismiss();
  }
}
