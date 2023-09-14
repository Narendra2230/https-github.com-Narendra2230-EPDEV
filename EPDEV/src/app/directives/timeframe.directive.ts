import { Directive, Input, HostListener, ElementRef, Output, EventEmitter } from '@angular/core';
import { parse } from 'querystring';

@Directive({
  selector: '[appTimeframe]'
})
export class TimeframeDirective {

  regexStr = '^[0-9]*$';
  @Output() updateModel = new EventEmitter();
  @Input() sheetData = [];
  @Input() sheet = {};
  constructor(private el: ElementRef) { }

  @HostListener('keyup', ['$event'])
  onKeyUp(event) {
    let e = <KeyboardEvent>event;
    if (e.keyCode === 13) {
      this.setValue(e);
    }
    if ([46, 8, 9, 27, 13].indexOf(e.keyCode) !== -1 ||
      ((e.keyCode >= 48 && e.keyCode <= 57) && !event.shiftKey) ||
      (e.keyCode >= 96 && e.keyCode <= 105)) {
      if (event.target.value > 25 && e.keyCode !== 8 && e.keyCode !== 9) {
        e.preventDefault();
      }
      let pvalue = parseInt(e.target['value']);
      if (!isNaN(pvalue) && pvalue < 23) { }
      else {
        if (isNaN(pvalue) && e.target['value'] !== '') {
          this.updateModel.emit({ value: '', status: false });
        }
      }
      if (e.target['value'].length === 2 && e.keyCode !== 8) {
        if (!isNaN(pvalue) && pvalue < 23) {
          e.target['value'] = e.target['value'] + ":"
        } else {
          this.updateModel.emit({ value: '', status: false })
        }
      }
      return;
    }
    e.preventDefault();
    return
  }

  @HostListener('keydown', ['$event'])
  onKeyDown(event) {
    let e = <KeyboardEvent>event;
    if (e.keyCode === 13) {
      this.setValue(e);
    }
    if ([46, 8, 9, 27, 13].indexOf(e.keyCode) !== -1 ||
      ((e.keyCode >= 48 && e.keyCode <= 57) && !event.shiftKey) ||
      (e.keyCode >= 96 && e.keyCode <= 105)) {
      if (event.target.value > 25 && e.keyCode !== 8 && e.keyCode !== 9
        && e.keyCode !== 37 && e.keyCode !== 39 && e.keyCode !== 46) {
        e.preventDefault();
      }
      return;
    }
    if (e.keyCode !== 37 && e.keyCode !== 39 && e.keyCode !== 46) {
      e.preventDefault();
    }
    return
  }

  @HostListener("blur", ['$event'])
  onBlur(e) {
    this.setValue(e);
  }
  parseV(v) {
    try {
      let n = parseInt(v)
      return isNaN(n) ? 0 : n;
    } catch (ex) { }
    return 0;
  }

  check24Hours() {
    const dateStr = this.sheet['dateStr'];
    let all = this.sheetData.filter(s => s.dateStr === dateStr);
    all = all.map(a => a.duration);
    let minituesCall = all.map(t => {
      try {
        const sp = t.split(":");
        let h = this.parseV(sp[0]);
        let m = this.parseV(sp[1]);
        console.log({ h, m })
        return { h, m }
      } catch (ex) {
        return { h: 0, m: 0 }
      }
    }).map(t => ((t.h) * 60 + t.m)).reduce((a, b) => a += b);
    if (minituesCall <= 1380) return true;
    else return false;
    let count = 0;
    all.forEach(a => {
      count = count + this.parseV(a);
    });
    if (count < 23) return true;
    else return false;
  }
  getMintus(v) {
    try {
      const pid = this.sheet['customerId'];
      if (v.includes(":")) {
        let mins = v.split(":")[1];
        let parseMins = this.parseV(mins)
        if (parseMins < 60 || ['298'].includes(`${pid}`)) {
          if ((`${parseMins}`).length === 1) {
            return `0${parseMins}`;
          }
          return parseMins;
        }
      }
    } catch (ex) { }
    return '00';
  }
  setValue(e) {
    const { value } = e.target;
    if (!value || value === '') return;
    let min = this.getMintus(value)
    let intVal = parseInt(value);
    // this.check24Hours();
    if (isNaN(intVal)) {
      e.target.value = '00:00'; //`${intVal}:${min}`
      return;
    }
    if (intVal < 10) e.target.value = `0${intVal}:${min}`;
    else if (intVal <= 23) e.target.value = `${intVal}:${min}`;
    else if (intVal > 23) e.target.value = '23:00';
    else e.target.value = `${intVal}:${min}`;
    if (this.check24Hours()) {
      this.updateModel.emit({ value: e.target.value, status: true })
    } else {
      e.target.value = '';
      this.updateModel.emit({ value: e.target.value, status: false });
    }
  }
}
