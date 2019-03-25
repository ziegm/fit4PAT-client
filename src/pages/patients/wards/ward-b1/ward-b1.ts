import {Component} from '@angular/core';
import {IonicPage, NavController, NavParams} from 'ionic-angular';
import {WorkflowPage} from "../../../../workflow/workflow-page";


@IonicPage()
@Component({
  selector: 'page-ward-b1',
  templateUrl: 'ward-b1.html',
})
export class WardB1Page extends WorkflowPage {
  private readonly ward:string = "B1";

  constructor(private navCtrl: NavController, navParams: NavParams) {
    super(navParams.data);
  }

  ionViewDidLoad() {
    console.log('ionViewDidLoad WardB1Page');
  }

}
