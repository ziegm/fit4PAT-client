import { NgModule } from '@angular/core';
import { IonicPageModule } from 'ionic-angular';
import { NeurologyPage } from './neurology';

@NgModule({
  declarations: [
    NeurologyPage,
  ],
  imports: [
    IonicPageModule.forChild(NeurologyPage),
  ],
})
export class NeurologyPageModule {}
