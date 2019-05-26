import {Component} from '@angular/core';
import {PopoverController, ViewController} from 'ionic-angular';

@Component({
  selector: 'page-more-patient-stationary',
  templateUrl: 'more-patient-stationary.html',
})
/**
 * Popover with sort function (family name, given name, case id, room id).
 */
export class MorePatientStationaryPage {

  constructor(private popoverCtrl: PopoverController, private viewCtrl: ViewController) {
  }

  private closePopover(): void {
    this.viewCtrl.dismiss();
  }

}
