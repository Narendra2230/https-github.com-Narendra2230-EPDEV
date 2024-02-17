
import { Directive, ElementRef, HostListener, Input } from '@angular/core';

@Directive({
  selector: '[OnlyNumber]'
})

export class NumericDirective{

    regexStr = '^[0-9]*$';
    constructor(private el: ElementRef) {  }
  
    @Input() OnlyNumber: boolean;
  
    @HostListener('keydown', ['$event']) onKeyDown(event) {
        
      let e = <KeyboardEvent> event;
      if (this.OnlyNumber) {
          if ([46, 8, 9, 27, 13].indexOf(e.keyCode) !== -1 ||
          ((e.keyCode >= 48 && e.keyCode <= 57) && !event.shiftKey) || 
          (e.keyCode >= 96 && e.keyCode <= 105) ) {
            // let it happen, don't do anything
            return;
          }
          e.preventDefault();
          return
        let ch = String.fromCharCode(e.keyCode);
        
        let regEx =  new RegExp(this.regexStr);  
        console.log(regEx.test(ch),ch,e.target['value'])  
        if(regEx.test(ch))
          return;
        else
           e.preventDefault();
        }
    }
  }