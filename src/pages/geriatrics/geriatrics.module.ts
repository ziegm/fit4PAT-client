import { NgModule } from '@angular/core';
import { IonicPageModule } from 'ionic-angular';
import { GeriatricsPage } from './geriatrics';

@NgModule({
  declarations: [
    GeriatricsPage,
  ],
  imports: [
    IonicPageModule.forChild(GeriatricsPage),
  ],
})
export class NoTabPageModule {}
