export class BarcodeConverter {
  public static toCaseId(barcode: string): string {
    if (barcode.length === 8) {
      return barcode.substr(1);
    }
    return barcode.substr(15, 7);
  }
}
