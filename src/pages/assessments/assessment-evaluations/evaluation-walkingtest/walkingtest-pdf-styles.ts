import {Style} from "pdfmake/build/pdfmake";

/**
 * The style definition of the Walkingtest report as required by makePDF.
 */
export class WalkingtestPdfStyles implements Style {
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
