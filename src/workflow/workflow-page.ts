import {WorkflowParameters} from "./workflow-parameters";

/**
 * Definition of a workflow page, that contains a WorkflowParameters object with
 * information about the currently used workflow. This is used to control the navigation.
 */
export abstract class WorkflowPage {

  constructor(protected workflowParameters: WorkflowParameters) {
  }
}
