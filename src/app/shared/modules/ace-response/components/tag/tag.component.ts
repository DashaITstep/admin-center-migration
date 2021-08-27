import { ChangeDetectionStrategy, Component, Input } from '@angular/core';
import { TagModel } from "../../../../utils/tag.model";

@Component({
  selector: 'app-tag',
  template: `<span appTagColor [color]="tag.Color" class="tag">{{ tag.Tag }}</span>`,
  styleUrls: ['./tag.component.scss'],
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class TagComponent  {
  @Input() tag: TagModel = new TagModel();
}
