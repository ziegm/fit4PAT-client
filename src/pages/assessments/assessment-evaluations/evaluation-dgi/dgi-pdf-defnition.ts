import {Content, Margins, Style, TDocumentDefinitions, TDocumentHeaderFooterFunction} from "pdfmake/build/pdfmake";
import moment from "moment";
import {PatientHelper} from "../../../../components/patient/patient-helper";
import {DgiPdfStyles} from "./dgi-pdf-styles";
import Chart from "chart.js";
import Patient = fhir.Patient;

/**
 * The page definition of the Dgi report as required by makePDF.
 */
export class DgiPdfDefnition implements TDocumentDefinitions {
  content: Content = [];
  footer: TDocumentHeaderFooterFunction;
  header: TDocumentHeaderFooterFunction;
  info = {};
  pageMargins: Margins;
  styles: Style;

  constructor(patient: Patient, chart: Chart) {
    this.pageMargins = [56.71, 56.71, 56.71, 56.71];
    this.styles = new DgiPdfStyles();
    this.addContent(patient, chart);
  }

  /**
   * Adds the contents of the report to the PDF.
   * @param patient   The patient, the report is for.
   * @param chart     The chart with the evaluation graph.
   */
  private addContent(patient: Patient, chart: Chart): void {
    this.content.push({text: "Dynamic Gait Index (DGI)", style: 'header'});
    this.content.push({text: PatientHelper.viewPatientName(patient), style: 'subheader'});
    this.content.push({text: PatientHelper.viewPatientInfos(patient)});
    this.content.push({image: chart.toBase64Image(), width: 481.89, margin: [0, 20]});
    this.content.push({text: "Physiotherapeut: David Scherzinger" });
    this.content.push({text: "PDF erstellt am: " + moment(new Date()).format("DD.MM.YYYY") });
  }
}
