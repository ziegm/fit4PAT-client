import {Component} from '@angular/core';
import {PopoverController} from 'ionic-angular';

@Component({
  selector: 'page-more-patient-detail',
  templateUrl: 'more-patient-detail.html',
})
export class MorePatientDetailPage {

  constructor(private popoverCtrl: PopoverController) {
  }
}
