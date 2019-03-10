import { NgModule } from '@angular/core';
import { IonicPageModule } from 'ionic-angular';
import { WardIpsPage } from './ward-ips';

@NgModule({
  declarations: [
    WardIpsPage,
  ],
  imports: [
    IonicPageModule.forChild(WardIpsPage),
  ],
})
export class WardIpsPageModule {}
