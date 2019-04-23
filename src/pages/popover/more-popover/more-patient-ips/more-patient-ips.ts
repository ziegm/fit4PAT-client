import {Component} from '@angular/core';
import {PopoverController, ViewController} from 'ionic-angular';

@Component({
  selector: 'page-more-patient-ips',
  templateUrl: 'more-patient-ips.html',
})
export class MorePatientIpsPage {

  constructor(private popoverCtrl: PopoverController, private viewCtrl: ViewController) {
  }

  private closePopover(){
    this.viewCtrl.dismiss();
  }

}
