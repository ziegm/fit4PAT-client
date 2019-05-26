import {Component} from '@angular/core';
import {PopoverController, ViewController} from 'ionic-angular';

@Component({
  selector: 'page-more-patient-ips',
  templateUrl: 'more-patient-ips.html',
})
/**
 * Popover with sort function (family name, given name, case id, bed id).
 */
export class MorePatientIpsPage {

  constructor(private popoverCtrl: PopoverController, private viewCtrl: ViewController) {
  }

  private closePopover(): void {
    this.viewCtrl.dismiss();
  }
}
