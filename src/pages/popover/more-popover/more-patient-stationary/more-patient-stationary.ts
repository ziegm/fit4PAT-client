import {Component} from '@angular/core';
import {PopoverController} from 'ionic-angular';

@Component({
  selector: 'page-more-patient-stationary',
  templateUrl: 'more-patient-stationary.html',
})
export class MorePatientStationaryPage {

  constructor(private popoverCtrl: PopoverController) {
  }
}
