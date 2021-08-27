import { AfterContentChecked, ChangeDetectionStrategy, Component, ElementRef, Input, ViewChild } from '@angular/core';
import { TabUtil } from '../../utils/tab.util';
import { ControlContainer, FormArray } from '@angular/forms';
import { IResponseOption } from "../../../../utils/response-option.model";
import { TChatMessageType } from "../../../../utils/chat-message.type";

@Component({
  selector: 'app-text-tab',
  templateUrl: './text-tab.component.html',
  styleUrls: ['./text-tab.component.scss', '../../tab.scss'],
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class TextTabComponent extends TabUtil implements AfterContentChecked {

  @Input() isDefaultResponse: boolean = true;
  @Input() responseOptions: IResponseOption[] = [];
  @Input() isAutoFocused: boolean = false;
  @Input() isSelectMode: boolean = false;
  @ViewChild('textAreaElement') textArea!: ElementRef;

  public formArray: FormArray;

  constructor(public controlContainer: ControlContainer) {
    super();
    this.formArray = this.controlContainer.control?.get('SMS')?.get('ResponseValue') as FormArray;
  }
  ngAfterContentChecked(): void {
    if (!this.isAutoFocused || this.isSelectMode) {
      return;
    }
    this.isAutoFocused = false;
    setTimeout(() => this.textArea.nativeElement.focus(), 0);
  }

  textChangeOn(type: TChatMessageType, index: number): void {
    const control = this.formArray.at(index);

    if (control.value === '') {
      control.setValue(null);
    }
  }
}
