import {
  AfterViewInit, ChangeDetectionStrategy,
  Component,
  ElementRef,
  EventEmitter,
  forwardRef,
  Output,
  Renderer2,
  ViewChild,
} from '@angular/core';
import { ControlValueAccessor, NG_VALUE_ACCESSOR } from '@angular/forms';
// @ts-ignore
import _ from 'lodash';
import { getHighlightedString } from "../../pipes/variable-highlighting.pipe";

export const CUSTOM_VALUE_ACCESSOR: any = {
  provide: NG_VALUE_ACCESSOR,
  // tslint:disable-next-line:no-use-before-declare
  useExisting: forwardRef(() => HighlightInputComponent),
  multi: true,
};

@Component({
  selector: 'app-highlight-input',
  template: `<p
    class="highlight-input"
    #input
    [attr.contenteditable]="!disabled"
    [class.highlight-input--disabled]="disabled"
    (focus)="onTouch(); focused.emit()"
    (blur)="blur()"
    (input)="change($event)"
  ></p>`,
  styleUrls: ['./highlight-input.component.scss'],
  providers: [CUSTOM_VALUE_ACCESSOR],
  changeDetection: ChangeDetectionStrategy.OnPush
})
export class HighlightInputComponent implements ControlValueAccessor, AfterViewInit {
  @Output() focused: EventEmitter<void> = new EventEmitter<void>();
  @ViewChild('input', { static: true, read: ElementRef }) input!: ElementRef<HTMLParagraphElement>;

  disabled: boolean = false;
  onChange!: (v: string | null) => {};
  onTouch!: () => {};

  constructor(private readonly renderer: Renderer2) {}

  ngAfterViewInit(): void {
    this.input.nativeElement.oncopy = (e) => this.onCopy(e);
  }

  onCopy(e: ClipboardEvent): void {
    e.preventDefault();
    e.clipboardData?.setData('text/plain', window.getSelection()?.toString() || '');
  }

  registerOnChange(fn: any): void {
    this.onChange = fn;
  }

  registerOnTouched(fn: any): void {
    this.onTouch = fn;
  }

  writeValue(value: any): void {
    const strWithVariable = getHighlightedString(value);
    this.renderer.setProperty(this.input.nativeElement, 'innerHTML', _.escape(strWithVariable));
  }

  change($event: Event): void {
    this.onChange(($event.target as HTMLParagraphElement).textContent);
  }

  blur(): void {
    this.writeValue(this.input.nativeElement.textContent);
  }

  setDisabledState(isDisabled: boolean): void {
    this.disabled = isDisabled;
  }
}
