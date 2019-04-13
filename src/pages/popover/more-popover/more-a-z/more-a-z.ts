import {Component} from '@angular/core';
import {PopoverController} from 'ionic-angular';

@Component({
  selector: 'page-more-a-z',
  templateUrl: 'more-a-z.html',
})
export class MoreAZPage {

  constructor(private popoverCtrl: PopoverController) {
  }
}
