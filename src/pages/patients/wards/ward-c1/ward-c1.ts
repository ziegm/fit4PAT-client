import { Component } from '@angular/core';
import { IonicPage, NavController, NavParams } from 'ionic-angular';
import {WorkflowPage} from "../../../../workflow/workflow-page";


@IonicPage()
@Component({
  selector: 'page-ward-c1',
  templateUrl: 'ward-c1.html',
})

export class WardC1Page extends WorkflowPage {

  ward:string = "C1";

  constructor(private navCtrl: NavController, navParams: NavParams) {
    super(navParams);
  }

  ionViewDidLoad() {
    console.log('ionViewDidLoad WardC1Page');
  }

}
