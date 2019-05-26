import {Component} from '@angular/core';
import {PopoverController, ViewController} from 'ionic-angular';

@Component({
  selector: 'page-more-patient-ambulatory',
  templateUrl: 'more-patient-ambulatory.html',
})
/**
 * Popover with sort functions (family name, given name, case id).
 */
export class MorePatientAmbulatoryPage {

  constructor(private popoverCtrl: PopoverController, private viewCtrl: ViewController) {
  }

  private closePopover(): void {
    this.viewCtrl.dismiss();
  }
}
