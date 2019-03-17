import { Component } from '@angular/core';
import { IonicPage, NavController, NavParams } from 'ionic-angular';


@IonicPage()
@Component({
  selector: 'page-ward-b2',
  templateUrl: 'ward-b2.html',
})

export class WardB2Page {

  ward:string = "B2";

  constructor(public navCtrl: NavController, public navParams: NavParams) {
  }

  ionViewDidLoad() {
    console.log('ionViewDidLoad WardB2Page');
  }

}
