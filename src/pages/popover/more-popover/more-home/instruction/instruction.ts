import {Component} from '@angular/core';
import {NavController, NavParams} from 'ionic-angular';

@Component({
  selector: 'page-instruction',
  templateUrl: 'instruction.html',
})
/**
 * The instruction page.
 */
export class InstructionPage {

  constructor(public navCtrl: NavController, public navParams: NavParams) {
  }
}
