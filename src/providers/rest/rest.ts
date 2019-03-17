import {HttpClient, HttpHeaders} from '@angular/common/http';
import {Injectable} from '@angular/core';
//import {TimedWalkingTestResponse} from "../../pages/assessment/timed-walking-test-response";
import Practitioner = fhir.Practitioner;
import Patient = fhir.Patient;

/**
 * The rest provider uses ionics/angulars http client for implementing the asynchronous REST requests to the hapi-fhir
 * server.
 */
@Injectable()
export class RestProvider {

  // This instance variable is used to configure the base url of the hapi-fhir server.
  apiUrl = 'http://fit4pat.i4mi.bfh.ch:8080/fit4PAT-server/baseDstu3';

  constructor(public http: HttpClient) {}

  /**
   * http.get() returns an Observable, which encapsulates the json response returned by the hapi-fhir server.
   * getPatients() then returns a Promise, holding this Observable.
   * For more information about asynchronous programming in JavaScript
   * see https://developer.mozilla.org/de/docs/Web/JavaScript/Reference/Global_Objects/Promise
   */
  getPatients(ward: string) {
    return new Promise(resolve => {
      this.http.get(this.apiUrl+'/Patient?identifier=' + ward).subscribe(data => {
        resolve(data);
      }, err => {
        console.log(err);
      });
    });
  }

  /**
   * Get a list of all practitioners
   */
  getPractitioners() {
    return new Promise(resolve => {
      this.http.get(this.apiUrl+'/Practitioner').subscribe(data => {
        resolve(data);
      }, err => {
        console.log(err);
      });
    });
  }

  /**
   * Get a list of questionnaire responses by patient.
   *
   * @param patient   The patient the responses are from.
   */
  getQuestionnaireResponses(patient: Patient) {
    return new Promise(resolve => {
      this.http.get(this.apiUrl+'/QuestionnaireResponse?source=' + patient.id).subscribe(data => {
        resolve(data);
      }, err => {
        console.log(err);
      });
    });
  }

  /**
   * Post a Timed Walking Test object to the hapi-fhir server.
   *
   * @param timedWalkingTestResponse    The TimedWalkingTestResponse object to transfer to the server
   */
  /*
  postTimedWalkingTestResponse(timedWalkingTestResponse: TimedWalkingTestResponse) {
    return new Promise((resolve, reject) => {
      this.http.post(this.apiUrl+'/QuestionnaireResponse', JSON.stringify(timedWalkingTestResponse),{
        headers: new HttpHeaders().set('Content-Type', 'application/fhir+json;charset=UTF-8')
      })
        .subscribe(res => {
          resolve(res);
        }, (err) => {
          reject(err);
        });
    });
  }*/

  /**
   * Post a practitioner object to the hapi-fhir server.
   *
   * @param practitioner      The practitioner object to transfer to the server
   */
  postPractitioner(practitioner: Practitioner) {
    return new Promise((resolve, reject) => {
      this.http.post(this.apiUrl+'/Practitioner', JSON.stringify(practitioner),{
        headers: new HttpHeaders().set('Content-Type', 'application/fhir+json;charset=UTF-8')
      })
        .subscribe(res => {
          resolve(res);
        }, (err) => {
          reject(err);
        });
    });
  }

  /**
   * Post a patient object to the hapi-fhir server.
   *
   * @param patient     The patient object to transfer to the server
   */
  postPatient(patient: Patient) {
    return new Promise((resolve, reject) => {
      this.http.post(this.apiUrl+'/Patient', JSON.stringify(patient),{
        headers: new HttpHeaders().set('Content-Type', 'application/fhir+json;charset=UTF-8')
      })
        .subscribe(res => {
          resolve(res);
        }, (err) => {
          reject(err);
        });
    });
  }
}
