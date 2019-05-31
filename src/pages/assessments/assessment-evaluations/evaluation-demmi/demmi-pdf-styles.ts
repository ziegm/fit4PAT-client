import {Style} from "pdfmake/build/pdfmake";

/**
 * The style definition of the Demmi report as required by makePDF.
 */
export class DemmiPdfStyles implements Style {
  header = {
    fontSize: 18,
    bold: true,
  };
  subheader = {
    fontSize: 14,
    bold: true,
    margin: [0, 15, 0, 0]
  };
}
