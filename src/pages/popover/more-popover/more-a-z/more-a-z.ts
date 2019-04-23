import {Component} from '@angular/core';
import {PopoverController, ViewController} from 'ionic-angular';

@Component({
  selector: 'page-more-a-z',
  templateUrl: 'more-a-z.html',
})
export class MoreAZPage {

  constructor(private popoverCtrl: PopoverController, private viewCtrl: ViewController) {
  }

  private closePopover(){
    this.viewCtrl.dismiss();
  }

}
