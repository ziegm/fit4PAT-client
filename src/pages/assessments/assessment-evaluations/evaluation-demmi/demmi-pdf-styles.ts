import {Style} from "pdfmake/build/pdfmake";

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
