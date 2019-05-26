import {Injectable} from '@angular/core';

/**
 * Simulated assessment search. Assessments are hard coded and filtered by a search string.
 */
@Injectable()
export class AssessmentSearchProvider {
  private assessments = [
    "Timed Walking Test (10-Meter-Gehtest)",
    "de Morton Mobility Index (DEMMI)",
    "Dynamic Gait Index (DGI)"
  ];

  /**
   * Filter the list of assessments by search string.
   * @param search    The search string.
   */
  public result(search: string): string[] {
    return this.assessments.filter(assessment => {
      return assessment.toLowerCase().includes(search.toLowerCase());
    });
  }
}
