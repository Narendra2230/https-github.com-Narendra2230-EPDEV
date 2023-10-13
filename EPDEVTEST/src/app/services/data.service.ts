import { Injectable, EventEmitter } from '@angular/core';
import { DatePipe } from '@angular/common';

@Injectable({
  providedIn: 'root'
})
export class DataService {
  private PerformanceEvaluation: object = {

  };
  private formChange: EventEmitter<number> = new EventEmitter();
  private PerformanceEvaluationEmpty = JSON.parse(JSON.stringify(this.PerformanceEvaluation));
  private updateUI: EventEmitter<Object> = new EventEmitter();
  constructor(private datePipe: DatePipe) { }
  UIShouldUpadate(payload) {
    let a = this.updateUI.emit(payload);
    return a;
  }

  getUIShouldUpadateEvent() {
    return this.updateUI;
  }

  public setPerformanceEvaluation(value: object): any {
    this.PerformanceEvaluation = value;
  }
  public getPerformanceEvaluation(): object {
    return this.PerformanceEvaluation;
  }
  public clearData() {
    this.PerformanceEvaluation = this.PerformanceEvaluationEmpty;
    this.formChange.emit();
  }
  public getFormChangeEmitter() {
    return this.formChange;
  }

  public dateFormatter(date: any, format: string) {
    return this.datePipe.transform(date, format)
  }

}
