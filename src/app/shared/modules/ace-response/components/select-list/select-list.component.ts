import {
  ChangeDetectionStrategy,
  Component,
  ElementRef,
  EventEmitter,
  forwardRef,
  Input,
  Output,
  ViewChild,
} from '@angular/core';
import { ControlValueAccessor, NG_VALUE_ACCESSOR } from '@angular/forms';

export const CUSTOM_VALUE_ACCESSOR: any = {
  provide: NG_VALUE_ACCESSOR,
  // tslint:disable-next-line:no-use-before-declare
  useExisting: forwardRef(() => SelectListComponent),
  multi: true,
};

@Component({
  selector: 'app-select-list',
  templateUrl: './select-list.component.html',
  styleUrls: ['./select-list.component.scss'],
  providers: [CUSTOM_VALUE_ACCESSOR],
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class SelectListComponent implements ControlValueAccessor {
  @Input() width: number = 200;
  @Input() options: IOption[] = [];
  @Input() optionsLabel: keyof IOption= 'label';
  @Input() disabled: boolean = false;
  @Input() highlightSelected: boolean = true;
  @ViewChild('wrapper') wrapper!: ElementRef<HTMLDivElement>;
  @Output() selected: EventEmitter<IOption> = new EventEmitter<IOption>();
  isListShown: boolean = false;
  isLeftOrientation: boolean = false;
  scrollPadding: number = 15;
  value: any;
  onChange: (option: any) => void = () => {};
  onTouched: () => void = () => {};

  closeList(): void {
    this.isListShown = false;
  }

  openList(): void {
    this.isListShown = true;
  }

  onTriggerClick(e: Event): void {
    e.stopPropagation();
    this.onTouched();
    if (this.disabled || !this.options?.length) {
      return;
    }
    this.setOrientation();
    this.isListShown = !this.isListShown;
  }

  onItemClick(item: IOption): void {
    if (item.disabled) {
      return;
    }
    this.selected.emit(item);
    this.onChange(item.value);
    this.writeValue(item.value);
    this.closeList();
  }

  registerOnChange(fn: (option: any) => void): void {
    this.onChange = fn;
  }

  registerOnTouched(fn: () => void): void {
    this.onTouched = fn;
  }

  writeValue(value: any): void {
    this.value = value;
  }

  private setOrientation(): void {
    const { left } = this.wrapper.nativeElement.getBoundingClientRect();
    const windowPadding = 40;
    this.isLeftOrientation = window.innerWidth - windowPadding - (left + this.width) < 0;
  }
}

export interface IOption {
  label: string;
  value: number;
  disabled?: boolean;
  styleClass?: string;
  icon?: string;
  title?: string;
}
