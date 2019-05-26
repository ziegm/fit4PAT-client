import {Component} from '@angular/core';
import {PopoverController, ViewController} from 'ionic-angular';

@Component({
  selector: 'page-more-a-z',
  templateUrl: 'more-a-z.html',
})
/**
 * The popover for sorting a list (e.g. patients, assessments) alphabetically ascending or descending.
 */
export class MoreAZPage {

  constructor(private popoverCtrl: PopoverController, private viewCtrl: ViewController) {
  }

  private closePopover(): void {
    this.viewCtrl.dismiss();
  }
}
