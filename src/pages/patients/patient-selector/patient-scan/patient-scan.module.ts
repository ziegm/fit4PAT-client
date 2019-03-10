import { NgModule } from '@angular/core';
import { IonicPageModule } from 'ionic-angular';
import { PatientScanPage } from './patient-scan';

@NgModule({
  declarations: [
    PatientScanPage,
  ],
  imports: [
    IonicPageModule.forChild(PatientScanPage),
  ],
})
export class PatientScanPageModule {}
