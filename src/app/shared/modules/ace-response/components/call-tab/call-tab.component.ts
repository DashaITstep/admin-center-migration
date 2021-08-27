import { ChangeDetectionStrategy, Component, Input } from '@angular/core';
import { ControlContainer, FormArray } from '@angular/forms';
// import { VoicePreviewService } from '../../../../../../../../core/services/voice-preview.service';
import { TabUtil } from '../../utils/tab.util';
import { IResponseOption } from "../../../../utils/response-option.model";

@Component({
  selector: 'app-call-tab',
  templateUrl: './call-tab.component.html',
  styleUrls: ['./call-tab.component.scss', '../../tab.scss'],
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class CallTabComponent extends TabUtil {
  @Input() isDefaultResponse: boolean = true;
  @Input() responseOptions: IResponseOption[] = [];
  @Input() isSelectMode: boolean = false;

  public formArray: FormArray;
  constructor(public controlContainer: ControlContainer,
              // private readonly voicePreviewService: VoicePreviewService
  ) {
    super();
    this.formArray = this.controlContainer.control?.get('Voice')?.get('ResponseValue') as FormArray;
  }

  playVoiceByText(value: string): void {
    const trimmedText = value.trim();
    if (trimmedText) {
      // this.voicePreviewService.playVoicePreview(trimmedText);
    }
  }
}
