import {Component} from '@angular/core';
import {NavController, NavParams} from 'ionic-angular';

@Component({
  selector: 'page-search-popover',
  templateUrl: 'search-popover.html',
})
export class SearchPopoverPage {

  private _search;

  set search(value) {
    this._search = value;
  }

  constructor(public navCtrl: NavController, public navParams: NavParams) {
  }
}
