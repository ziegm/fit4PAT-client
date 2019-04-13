import {Component} from '@angular/core';
import {PopoverController} from 'ionic-angular';

@Component({
  selector: 'page-more-nav-to-patient-detail',
  templateUrl: 'more-nav-to-patient-detail.html',
})
export class MoreNavToPatientDetailPage {

  constructor(private popoverCtrl: PopoverController) {
  }
}
