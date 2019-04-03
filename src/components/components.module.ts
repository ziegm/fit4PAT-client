import {NgModule} from '@angular/core';
import {PatientListComponent} from './patient/patient-list/patient-list';
import {PatientSelectorComponent} from './patient/patient-selector/patient-selector';
import { NavbarComponent } from './navbar/navbar';

@NgModule({
	declarations: [PatientListComponent,
    PatientSelectorComponent,
    NavbarComponent],
	imports: [],
	exports: [PatientListComponent,
    PatientSelectorComponent,
    NavbarComponent]
})
export class ComponentsModule {}
