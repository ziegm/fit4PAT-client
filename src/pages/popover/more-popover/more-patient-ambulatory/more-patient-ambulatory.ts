import {Component} from '@angular/core';
import {PopoverController, ViewController} from 'ionic-angular';

@Component({
  selector: 'page-more-patient-ambulatory',
  templateUrl: 'more-patient-ambulatory.html',
})
export class MorePatientAmbulatoryPage {

  constructor(private popoverCtrl: PopoverController, private viewCtrl: ViewController) {
  }

  private closePopover(){
    this.viewCtrl.dismiss();
  }

}
