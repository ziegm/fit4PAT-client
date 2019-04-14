export class AssessmentHelper {
  public static actualDate(dateTime: string): string {
    return dateTime.substr(8, 2) + "." +
      dateTime.substr(5, 2) + "." +
      dateTime.substr(0, 4);
  }

  public static dateTimeToDate(dateTime: string): Date {
    return new Date(dateTime);
  }
}
