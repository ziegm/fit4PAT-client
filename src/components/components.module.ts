import {NgModule} from '@angular/core';
import {PatientListComponent} from './patient/patient-list/patient-list';
import {PatientSelectorComponent} from './patient/patient-selector/patient-selector';
import { NavbarComponent } from './navbar/navbar';
import { NotImplementedYetComponent } from './not-implemented-yet/not-implemented-yet';

@NgModule({
	declarations: [PatientListComponent,
    PatientSelectorComponent,
    NavbarComponent,
    NotImplementedYetComponent],
	imports: [],
	exports: [PatientListComponent,
    PatientSelectorComponent,
    NavbarComponent,
    NotImplementedYetComponent]
})
export class ComponentsModule {}
