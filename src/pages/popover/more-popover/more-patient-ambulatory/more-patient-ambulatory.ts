import {Component} from '@angular/core';
import {PopoverController} from 'ionic-angular';

@Component({
  selector: 'page-more-patient-ambulatory',
  templateUrl: 'more-patient-ambulatory.html',
})
export class MorePatientAmbulatoryPage {

  constructor(private popoverCtrl: PopoverController) {
  }
}
