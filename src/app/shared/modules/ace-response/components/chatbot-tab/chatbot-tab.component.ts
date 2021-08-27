import { ChangeDetectionStrategy, Component, Input } from '@angular/core';
import { TabUtil } from '../../utils/tab.util';
import { ControlContainer } from "@angular/forms";

@Component({
  selector: 'app-chatbot-tab',
  templateUrl: './chatbot-tab.component.html',
  styleUrls: ['./chatbot-tab.component.scss', '../../tab.scss'],
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class ChatbotTabComponent extends TabUtil {
  @Input() controlName: string = '';
  @Input() isAutoFocused: boolean = false;
  @Input() isReadonly: boolean = false;
  @Input() isDefaultResponse: boolean = true;
  @Input() isSelectMode: boolean = false;

  constructor(public controlContainer: ControlContainer) {
    super();
  }
}
