import { Injectable } from '@angular/core';
import { BehaviorSubject } from 'rxjs';
// import { from } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class LoaderService {
  public status: BehaviorSubject<boolean> = new BehaviorSubject<boolean>(false);
  display(value: boolean) {
    console.log('LoaderService.display ' + value);
    this.status.next(value);
  }
}
