import QuestionnaireResponse = fhir.QuestionnaireResponse;
import dateTime = fhir.dateTime;
import Patient = fhir.Patient;
import code = fhir.code;
import id = fhir.id;
import {Fit4PATReference} from "./fit4pat-reference";
import {AssessmentResponseItem} from "./assessment-response-item";

/**
 * Implementing the fhir type defnitition QuestionnaireResponse for usage as class in this project.
 */
export abstract class AssessmentResponse implements QuestionnaireResponse {
  id: id;
  resourceType: code = "QuestionnaireResponse";
  author: fhir.Reference;
  identifier: fhir.Identifier;
  authored: dateTime = this.actualDateTime();
  source: fhir.Reference;
  status: fhir.code = "completed";
  item: AssessmentResponseItem[] = [];
  protected answerCount: number;

  constructor(answerCount: number) {
    this.answerCount = answerCount;
    this.setAssessmentType();
    this.createResponseItems();
    this.defaultAnswers();
  }

  protected abstract setAssessmentType();

  protected createResponseItems(): void {
    for (let i = 0; i < this.answerCount; i++) {
      this.item[i] = new AssessmentResponseItem("item" + (i + 1))
    }
  };

  protected defaultAnswers(): void {};

  /**
   * Add the patients id as a reference.
   *
   * @param patient     A selected patient
   */
  addPatient(patient: Patient): void {
    this.source = new Fit4PATReference("Patient/" + patient.id);
  }

  /**
   * Generate the actual date in the format YYYY-MM-DDThh:mm:ss.sss+zz:zz that is required by the hapi-fhir REST API.
   */
  private actualDateTime(): string {
    let date = new Date();
    return date.getFullYear() + "-" + this.zeroPadded(date.getMonth() + 1)
      + "-" + this.zeroPadded(date.getDate()) + "T"
      + this.zeroPadded(date.getHours()) + ":" + this.zeroPadded(date.getMinutes()) + ":" + this.zeroPadded(date.getSeconds()) + "." + date.getMilliseconds() + "+02:00";
  }

  /**
   * Pad part of the date (day, month) with a leading zero, if it has only one digit.
   *
   * @param datePart  The day or month that should be padded.
   */
  private zeroPadded(datePart: number): string {
    if (datePart < 10) {
      return "0" + datePart;
    }
    return String(datePart);
  }

  /**
   * Add an answer to the assessment response or change the existing one.
   *
   * @param index   The index of the answer on the assessment response
   * @param event   The event that delivers the answer of a question.
   * @param radio   True if the underlying control delivers numeric values.
   */
  public addOrChangeAnswer(index: number, event: any, numeric: boolean = false) {
    if (numeric) {
      this.item[index].addAnswer(+event);
    } else {
      this.item[index].addAnswer(event);
    }
  }
}
