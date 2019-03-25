import {Component} from '@angular/core';
import {IonicPage, NavController, NavParams} from 'ionic-angular';
import {WorkflowPage} from "../../../../workflow/workflow-page";


@IonicPage()
@Component({
  selector: 'page-ward-b2',
  templateUrl: 'ward-b2.html',
})

export class WardB2Page extends WorkflowPage {
  private readonly ward:string = "B2";

  constructor(private navCtrl: NavController, navParams: NavParams) {
    super(navParams);
  }

  ionViewDidLoad() {
    console.log('ionViewDidLoad WardB2Page');
  }

}
