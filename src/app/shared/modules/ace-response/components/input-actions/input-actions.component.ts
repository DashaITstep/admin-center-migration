import { Component, ChangeDetectionStrategy, EventEmitter, Output, Input } from '@angular/core';

@Component({
  selector: 'app-input-actions',
  templateUrl: './input-actions.component.html',
  styleUrls: ['./input-actions.component.scss'],
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class InputActionsComponent {
  @Output() addPromptVariation: EventEmitter<void> = new EventEmitter<void>();
  @Output() binClicked: EventEmitter<void> = new EventEmitter<void>();
  @Output() audioPreviewClicked: EventEmitter<void> = new EventEmitter<void>();
  @Input() isCogShown: boolean = false;
  @Input() isBinShown: boolean = false;
  @Input() isAudioShown: boolean = true;
  @Input() isAudioLoading: boolean = false;
  @Input() isAudioDisabled: boolean = false;
  dropdownOpened: boolean = false;

  toggleDropdown(event: Event): void {
    event.stopImmediatePropagation();
    this.dropdownOpened = !this.dropdownOpened;
  }

  closeDropdown(): void {
    this.dropdownOpened = false;
  }
}
