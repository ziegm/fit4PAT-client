import {Injectable} from '@angular/core';
import {File} from "@ionic-native/file";
import {FileOpener} from "@ionic-native/file-opener";
import {Platform} from "ionic-angular";
import pdfMake, {TCreatedPdf, TDocumentDefinitions} from 'pdfmake/build/pdfmake';
import pdfFonts from 'pdfmake/build/vfs_fonts';

pdfMake.vfs = pdfFonts.pdfMake.vfs;

/**
 * Creates a PDF based on the provided document definition, saves it to the file system of
 * the device, generates and opens a PDF link. If the app runs in a browser the link is opened there,
 * otherwise (on mobile devices) the appropriate OS tool is used.
 */
@Injectable()
export class PdfPrinterProvider {
  private pdf: TCreatedPdf;

  constructor(private plt: Platform, private file: File, private fileOpener: FileOpener) {
  }

  /**
   * Creates the PDF based on a document definition specified by the makePDF library.
   * @param definition    The document definition.
   */
  public createPdf(definition: TDocumentDefinitions): void {
    this.pdf = pdfMake.createPdf(definition);
  }

  /**
   * Saves and opens the PDF according to the used device.
   * @param fileName    The filename used to save the PDF.
   */
  public downloadPdf(fileName: string): void {
    if (this.plt.is('cordova')) {
      this.pdf.getBuffer((buffer) => {
        const blob = new Blob([buffer], { type: 'application/pdf' });

        // Saves the PDF to the data directory of the app.
        this.file.writeFile(this.file.dataDirectory, fileName, blob, { replace: true }).then(fileEntry => {
          // Opens the PDF with the correct OS tools.
          this.fileOpener.open(this.file.dataDirectory + fileName, 'application/pdf');
        })
      });
    } else {
      // On a browser simply use download!
      this.pdf.download();
    }
  }
}
