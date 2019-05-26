import {Component} from '@angular/core';
import {PopoverController, ViewController} from 'ionic-angular';

@Component({
  selector: 'page-more-patient-detail',
  templateUrl: 'more-patient-detail.html',
})
/**
 * Popover with sort functions (alphabetically asc/desc, date).
 */
export class MorePatientDetailPage {

  constructor(private popoverCtrl: PopoverController, private viewCtrl: ViewController) {
  }

  private closePopover(): void {
    this.viewCtrl.dismiss();
  }
}
