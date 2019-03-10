import { NgModule } from '@angular/core';
import { IonicPageModule } from 'ionic-angular';
import { PatientAmbulatoryPage } from './patient-ambulatory';

@NgModule({
  declarations: [
    PatientAmbulatoryPage,
  ],
  imports: [
    IonicPageModule.forChild(PatientAmbulatoryPage),
  ],
})
export class PatientAmbulatoryPageModule {}
