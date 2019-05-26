/**
 * Helper for time conversions in the assessment pages.
 */
export class AssessmentHelper {
  /**
   * Converts a dateTime string to DD.MM.YYYY.
   * @param dateTime    The dateTime as string.
   */
  public static actualDate(dateTime: string): string {
    return dateTime.substr(8, 2) + "." +
      dateTime.substr(5, 2) + "." +
      dateTime.substr(0, 4);
  }

  /**
   * Converts a dateTime as string into a JavaScript Date object.
   * @param dateTime    The dateTime as string.
   */
  public static dateTimeToDate(dateTime: string): Date {
    return new Date(dateTime);
  }
}
