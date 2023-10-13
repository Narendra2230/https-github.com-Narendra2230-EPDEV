import { Directive, Input, HostListener, ElementRef, Output, EventEmitter } from '@angular/core';
import { parse } from 'querystring';

@Directive({
    selector: '[OnlyText]'
})
export class OnlyText {

    regexStr = '^[0-9]*$';
    oldVal = '';

    constructor(private elRef: ElementRef) { }

    @HostListener('keyup', ['$event'])
    onKeyUp(event) {
        let e = <KeyboardEvent>event;

    }

    @HostListener('keypress', ['$event'])
    onKkeypress(event) {
        let e = <KeyboardEvent>event;
        this.oldVal = e.target['value'];
        return true;
    }

    @HostListener('keydown', ['$event'])
    onKeyDown(event) {
        let e = <KeyboardEvent>event;
        let oldValue = e.target['value'];
        const v = e.target['value'] + e.key;
        var filter = /^[a-zA-Z ]*$/;
        if (!filter.test(v)) {
            e.preventDefault();
            return false;
        }
        return true;
    }


    //

    // @HostListener("blur", ['$event'])
    // onBlur(e) {
    // }
}
