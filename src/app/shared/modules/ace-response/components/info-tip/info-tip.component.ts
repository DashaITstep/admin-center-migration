import { ChangeDetectionStrategy, Component, Input } from '@angular/core';

@Component({
  selector: 'app-info-tip',
  templateUrl: './info-tip.component.html',
  styleUrls: ['./info-tip.component.scss'],
  changeDetection: ChangeDetectionStrategy.OnPush
})
export class InfoTipComponent {
  @Input() locked: boolean = false;
  @Input() header: string = 'Info';
  @Input() description: string = '';
}
