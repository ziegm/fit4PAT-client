import {Component} from '@angular/core';
import {IonicPage, NavController, NavParams} from 'ionic-angular';
import {WorkflowPage} from "../../../../workflow/workflow-page";


@IonicPage()
@Component({
  selector: 'page-ward-b3',
  templateUrl: 'ward-b3.html',
})

export class WardB3Page extends WorkflowPage {
  private readonly ward:string = "B3";

  constructor(private navCtrl: NavController, navParams: NavParams) {
    super(navParams.data);
  }

  ionViewDidLoad() {
    console.log('ionViewDidLoad WardB3Page');
  }

}
