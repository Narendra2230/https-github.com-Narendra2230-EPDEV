import { Injectable } from '@angular/core';
import { MatSnackBar } from '@angular/material/snack-bar';
// import { ToastrService } from 'ngx-toastr';

@Injectable({
  providedIn: 'root'
})
export class AlertMessageService {

  constructor(private _snackBar: MatSnackBar) { }//, private _toaster:ToastrService

  public succuss(message) {
    this._snackBar.open(message, null, {
      panelClass: "success-color",
      duration: 3000,
      verticalPosition: 'top'
    });

  }
  public warning(message) {
    this._snackBar.open(message, null, {
      panelClass: "warning-color",
      duration: 3000,
      verticalPosition: 'top'
    });
  }
  public error(message) {
    this._snackBar.open(message, null, {
      panelClass: "error-color",
      duration: 3000,
      verticalPosition: 'top'
    });
  }
  public info(message) {
    this._snackBar.open(message, null, {
      panelClass: "info-color",
      duration: 3000,
      verticalPosition: 'top'
    });
  }
  // showSuccessToast(msg:string) {
  //   this._toaster.success('Success',msg);
  // }
  // showErrorToast(msg:string) {
  //   this._toaster.error('Error',msg);
  // }
  // showWarnToast(msg:string) {
  //   this._toaster.warning('Warning',msg);
  // }
}
