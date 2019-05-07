import {Injectable} from '@angular/core';
import {File} from "@ionic-native/file";
import {FileOpener} from "@ionic-native/file-opener";
import {Platform} from "ionic-angular";
import pdfMake, {TCreatedPdf, TDocumentDefinitions} from 'pdfmake/build/pdfmake';
import pdfFonts from 'pdfmake/build/vfs_fonts';

pdfMake.vfs = pdfFonts.pdfMake.vfs;

@Injectable()
export class PdfPrinterProvider {

  private pdf: TCreatedPdf;

  constructor(private plt: Platform, private file: File, private fileOpener: FileOpener) {
  }

  public createPdf(definition: TDocumentDefinitions): void {
    this.pdf = pdfMake.createPdf(definition);
  }

  public downloadPdf(fileName: string): void {
    if (this.plt.is('cordova')) {
      this.pdf.getBuffer((buffer) => {
        var blob = new Blob([buffer], { type: 'application/pdf' });

        // Save the PDF to the data Directory of our App
        this.file.writeFile(this.file.dataDirectory, fileName, blob, { replace: true }).then(fileEntry => {
          // Open the PDf with the correct OS tools
          this.fileOpener.open(this.file.dataDirectory + fileName, 'application/pdf');
        })
      });
    } else {
      // On a browser simply use download!
      this.pdf.download();
    }
  }
}
