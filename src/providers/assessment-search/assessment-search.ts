import {HttpClient} from '@angular/common/http';
import {Injectable} from '@angular/core';

@Injectable()
export class AssessmentSearchProvider {

  private assessments = [
    "Timed Walking Test (10-Meter-Gehtest)",
    "de Morton Mobility Index (DEMMI)",
    "Dynamic Gait Index (DGI)"
  ];

  constructor(public http: HttpClient) {
    console.log('Hello AssessmentSearchProvider Provider');
  }

  public result(search: string): string[] {
    return this.assessments.filter(assessment => {
      return assessment.toLowerCase().includes(search.toLowerCase());
    });
  }
}
