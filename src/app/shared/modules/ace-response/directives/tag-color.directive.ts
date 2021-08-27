import { Directive, ElementRef, Input, OnInit, Renderer2 } from '@angular/core';

@Directive({
  selector: '[appTagColor]',
})
export class TagColorDirective implements OnInit {
  @Input() color: string = '#000';

  constructor(
    private readonly el: ElementRef,
    private readonly renderer: Renderer2
  ) {}

  public ngOnInit(): void {
    this.renderer.setStyle(this.el.nativeElement, 'border', `1px solid ${this.color}`);
    this.renderer.setStyle(this.el.nativeElement, 'color', this.color);
  }
}
