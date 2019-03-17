import { Component } from '@angular/core';
import { IonicPage, NavController, NavParams } from 'ionic-angular';


@IonicPage()
@Component({
  selector: 'page-ward-a2',
  templateUrl: 'ward-a2.html',
})
export class WardA2Page {

  ward:string = "A2";

  constructor(public navCtrl: NavController, public navParams: NavParams) {
  }

  ionViewDidLoad() {
    console.log('ionViewDidLoad WardA2Page');
  }

}
