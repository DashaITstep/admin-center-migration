import { Component, Input, OnInit } from '@angular/core';
import { IPhrase } from "../../../../utils/phrase.model";
import {AbstractControl, ControlContainer, FormBuilder, FormGroup} from "@angular/forms";
import { MESSAGE_TYPES_ARRAY } from "../../../../utils/message.type";
import { ICurrentResponse } from "../../../../utils/current-response.model";
import { TChatMessageType } from "../../../../utils/chat-message.type";
import { RESPONSE_TYPE_IDS } from "../../ace-response.config";

@Component({
  selector: 'app-ace-response-form',
  template: `<ng-content></ng-content>`,
})
export class AceResponseFormComponent implements OnInit {

  @Input() questions: IPhrase[] = [];

  constructor(private fb: FormBuilder,
              private controlContainer: ControlContainer) { }

  public ngOnInit(): void {
    this.patchQuestionsGroupByQuestion();
    console.log(this.controlContainer.control);
  }

  private patchQuestionsGroupByQuestion(): void {
    this.questions.forEach((question) => {
      const { PromptId } = question;
      const controlsGroup = this.fb.group({ PromptId });

      MESSAGE_TYPES_ARRAY.forEach((type) => {
        controlsGroup.addControl(type, this.getQuestionGroupByData(question, type));
      });

      const form = this.controlContainer.control;
      if (form instanceof FormGroup) {
        form.removeControl(String(PromptId));
        form.addControl(String(PromptId), controlsGroup);
      }
    });
  }

  private getQuestionGroupByData(question: IPhrase, type: TChatMessageType): FormGroup {
    const responseType = question[type].CurrentResponses[0] ?? ({} as ICurrentResponse);

    return this.fb.group({
      ResponseId: responseType.ResponseId,
      ResponseValue: this.configureResponseValueByType(responseType, question, type),
      ResponseTypeId: RESPONSE_TYPE_IDS[type],
      AttachedImages: question[type].AttachedImages,
    });
  }

  private configureResponseValueByType(
    responseType: ICurrentResponse,
    question: IPhrase,
    type: TChatMessageType
  ): AbstractControl {
    if (type === 'WebChat') {
      return this.fb.control({
        value:
          Array.isArray(responseType.ResponseValue) && responseType.ResponseValue.length
            ? responseType.ResponseValue[0]
            : '',
        disabled: !question.UserDefinable,
      });
    }

    return this.fb.array(
      Array.isArray(responseType.ResponseValue)
        ? (responseType.ResponseValue.length ? responseType.ResponseValue : ['']).map((value) => ({
          value,
          disabled: !question.UserDefinable,
        }))
        : ['']
    );
  }
}
