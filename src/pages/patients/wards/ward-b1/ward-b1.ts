import { Component } from '@angular/core';
import { IonicPage, NavController, NavParams } from 'ionic-angular';


@IonicPage()
@Component({
  selector: 'page-ward-b1',
  templateUrl: 'ward-b1.html',
})
export class WardB1Page {

  ward:string = "B1";

  constructor(public navCtrl: NavController, public navParams: NavParams) {
  }

  ionViewDidLoad() {
    console.log('ionViewDidLoad WardB1Page');
  }

}
