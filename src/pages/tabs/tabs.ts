import {Component} from '@angular/core';

import {PatientPage} from '../patient/patient';
import {AssessmentPage} from '../assessment/assessment';

@Component({
  templateUrl: 'tabs.html'
})
export class TabsPage {

  tab1Root = AssessmentPage;
  tab2Root = PatientPage;

  constructor() {

  }
}
