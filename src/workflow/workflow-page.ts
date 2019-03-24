import {NavParams} from "ionic-angular";
import {WorkflowSelector} from "./workflow-selector";

export class WorkflowPage {
  protected workflowSelector:WorkflowSelector;

  constructor(navParams:NavParams) {
    this.workflowSelector = navParams.data;
  }
}
