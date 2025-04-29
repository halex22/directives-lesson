import { Directive, ElementRef, inject, Input } from '@angular/core';


@Directive({
  selector: '[appSuperBtn]'
})
export class SuperBtnDirective {

  el = inject(ElementRef)

  @Input({alias: 'appSuperBtn'}) set backgroundColor(value: string) {
    this.el.nativeElement.style.backgroundColor = value
  }

  ngOnInit() {
    this.el.nativeElement.style.color = 'white'
    this.el.nativeElement.style.fontSize = '2rem'
  }

}
