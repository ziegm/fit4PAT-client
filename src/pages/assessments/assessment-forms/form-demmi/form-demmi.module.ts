import { NgModule } from '@angular/core';
import { IonicPageModule } from 'ionic-angular';
import {FormDemmiPage} from "./form-demmi";

@NgModule({
  declarations: [
    FormDemmiPage,
  ],
  imports: [
    IonicPageModule.forChild(FormDemmiPage),
  ],
})
export class FormDemmiPageModule {}
