import { NgModule } from '@angular/core';
import { IonicPageModule } from 'ionic-angular';
import { WardOverviewPage } from './ward-overview';

@NgModule({
  declarations: [
    WardOverviewPage,
  ],
  imports: [
    IonicPageModule.forChild(WardOverviewPage),
  ],
})
export class WardOverviewPageModule {}
