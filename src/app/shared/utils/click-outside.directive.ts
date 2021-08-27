import { Directive, ElementRef, Output, HostListener, EventEmitter } from '@angular/core';

@Directive({
  // tslint:disable-next-line:directive-selector
  selector: '[clickOutside]',
})
export class ClickOutsideDirective {
  @Output() clickOutside: EventEmitter<void> = new EventEmitter<void>();

  constructor(private readonly ref: ElementRef) {}

  @HostListener('document:click', ['$event.target']) onClick(targetElement: ElementRef) {
    const clickedInside = this.ref.nativeElement.contains(targetElement);
    if (!clickedInside) {
      this.clickOutside.emit();
    }
  }
}
