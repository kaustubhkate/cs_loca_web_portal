import { OnlynumberFormatDirective } from './onlynumber-format.directive';
import { ElementRef } from '@angular/core';

el:ElementRef;
describe('OnlynumberFormatDirective', () => {
  it('should create an instance', () => {
    const directive = new OnlynumberFormatDirective(this.el);
    expect(directive).toBeTruthy();
  });
});
