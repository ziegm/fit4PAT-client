import {Content, Margins, Style, TDocumentDefinitions, TDocumentHeaderFooterFunction} from "pdfmake/build/pdfmake";
import moment from "moment";
import {PatientHelper} from "../../../../components/patient/patient-helper";
import Chart from "chart.js";
import {WalkingtestPdfStyles} from "./walkingtest-pdf-styles";
import Patient = fhir.Patient;

export class WalkingtestPdfDefnition implements TDocumentDefinitions {
  content: Content = [];
  footer: TDocumentHeaderFooterFunction;
  header: TDocumentHeaderFooterFunction;
  info = {};
  pageMargins: Margins;
  styles: Style;

  constructor(patient: Patient, chart: Chart) {
    this.pageMargins = [56.71, 56.71, 56.71, 56.71];
    this.styles = new WalkingtestPdfStyles();
    this.addContent(patient, chart);
  }

  private addContent(patient: Patient, chart: Chart): void {
    this.content.push({text: "Timed Walking Test (10-Meter-Gehtest)", style: 'header'});
    this.content.push({text: PatientHelper.viewPatientName(patient), style: 'subheader'});
    this.content.push({text: PatientHelper.viewPatientInfos(patient)});
    this.content.push({image: chart.toBase64Image(), width: 481.89, margin: [0, 20]});
    this.content.push({text: "Physiotherapeut: David Scherzinger" });
    this.content.push({text: "PDF erstellt am: " + moment(new Date()).format("DD.MM.YYYY") });

  }
}
