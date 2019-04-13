import {Component} from '@angular/core';
import {PopoverController} from 'ionic-angular';

@Component({
  selector: 'page-more-patient-ips',
  templateUrl: 'more-patient-ips.html',
})
export class MorePatientIpsPage {

  constructor(private popoverCtrl: PopoverController) {
  }
}
