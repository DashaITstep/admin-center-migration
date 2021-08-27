import { Component, EventEmitter, Output, Input } from '@angular/core';

export interface ITargetedLink {
  src?: string;
  target: string;
}

@Component({
  selector: 'app-link-target-modal',
  templateUrl: './link-target-modal.component.html',
  styleUrls: ['./link-target-modal.component.scss', '../text-editor/text-editor.component.scss'],
})
export class LinkTargetModalComponent {
  @Input() prefix: string = '';
  @Output() submitted: EventEmitter<ITargetedLink> = new EventEmitter<ITargetedLink>();
  @Output() closed: EventEmitter<ITargetedLink> = new EventEmitter<ITargetedLink>();

  src: string = '';
  newTab: boolean = true;

  get placeholder() {
    return `${this.prefix} URL`;
  }

  submit() {
    this.submitted.emit({
      src: this.src,
      target: this.newTab ? '_blank' : '_self',
    });
  }
}
