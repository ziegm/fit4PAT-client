/**
 * Converter for data strings from the barcode scanner.
 */
export class BarcodeConverter {
  /**
   * Converts a code string to a case id.
   * @param code   The string from the barcode scanner.
   */
  public static toCaseId(code: string): string {
    // Length 8 corresponds to the bar code on the patients wristband.
    if (code.length === 8) {
      return code.substr(1);
    }
    // If the length is not 8, it is assumed, that it is a data matrix code from the patients wristband.
    return code.substr(15, 7);
  }
}
