import { ChangeDetectionStrategy, Component, EventEmitter, Input, Output } from '@angular/core';
import { IResponseOption } from "../../../../utils/response-option.model";

@Component({
  selector: 'app-response-options',
  templateUrl: './response-options.component.html',
  styleUrls: ['./response-options.component.scss'],
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class ResponseOptionsComponent {
  @Input() options: IResponseOption[] = [];
  // tslint:disable-next-line:no-output-native
  @Output() select: EventEmitter<string | string[]> = new EventEmitter<string | string[]>();
}
