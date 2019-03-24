import { Component } from '@angular/core';
import { IonicPage, NavController, NavParams } from 'ionic-angular';
import {WorkflowPage} from "../../../../workflow/workflow-page";


@IonicPage()
@Component({
  selector: 'page-ward-ips',
  templateUrl: 'ward-ips.html',
})

export class WardIpsPage extends WorkflowPage {

  ward:string = "IPS";

  constructor(private navCtrl: NavController, navParams: NavParams) {
    super(navParams);
  }

  ionViewDidLoad() {
    console.log('ionViewDidLoad WardIpsPage');
  }

}
