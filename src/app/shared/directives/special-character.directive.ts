import { Directive, Input, ElementRef, HostListener } from '@angular/core';

@Directive({
  selector: '[appSpecialCharacter]'
})
export class SpecialCharacterDirective {

  regexStr = '^[a-zA-Z0-9\-_ ]*$';
  @Input() isAlphaNumeric: boolean;

  constructor(private el: ElementRef) { }


  @HostListener('keypress', ['$event']) onKeyPress(event) {
    return new RegExp(this.regexStr).test(event.key);
  }

  @HostListener('paste', ['$event']) blockPaste(event: KeyboardEvent) {
    this.validateFields(event);
  }

  validateFields(event) {
    setTimeout(() => {
      this.el.nativeElement.value = this.el.nativeElement.value.replace(/[^A-Za-z ]/g, '').replace(/\s/g, '');
      event.preventDefault();
    }, 100)
  }

}
