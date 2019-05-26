import Reference = fhir.Reference;

/**
 * Implementing the fhir type definition Reference for usage as class in this project.
 */
export class Fit4PATReference implements Reference {
  reference: string;

  constructor(id: string) {
    this.reference = id;
  }
}
