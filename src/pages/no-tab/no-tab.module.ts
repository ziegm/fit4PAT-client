import { NgModule } from '@angular/core';
import { IonicPageModule } from 'ionic-angular';
import { NoTabPage } from './no-tab';

@NgModule({
  declarations: [
    NoTabPage,
  ],
  imports: [
    IonicPageModule.forChild(NoTabPage),
  ],
})
export class NoTabPageModule {}
