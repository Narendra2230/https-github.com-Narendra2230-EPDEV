import { Component, OnInit ,Inject } from '@angular/core';
import { MatDialog, MatDialogRef ,MAT_DIALOG_DATA} from '@angular/material/dialog';
import { FormsModule } from '@angular/forms';
import { HomeService } from '../../../../services/omgb/home.service';
import { SessionServiceService } from 'src/app/services/session/session-service.service';
import { AlertMessageService } from 'src/app/services/alert-message.service';


@Component({
  selector: 'app-dialog-content',
  templateUrl: './dialog-content.component.html',
  styleUrls: ['./dialog-content.component.css']
})
export class DialogContentComponent implements OnInit {
private isChecked=false;
private isUserAccepted=false;
  constructor(
    private dialogRef: MatDialogRef<DialogContentComponent>,
    public dialog: MatDialog,
    public _homeservice:HomeService,
    public _session:SessionServiceService,
    public _alert:AlertMessageService,
    @Inject(MAT_DIALOG_DATA) public data: any) { 
       this.isChecked=data['isUserAccepted'];
       this.isUserAccepted=data['isUserAccepted'];
    }

  ngOnInit() {
  }

  closePopup(){
    if(this.isUserAccepted){
      this.dialogRef.close();
      return;
    }
    let CurrentQuater = this._session.getCurrentQuarterDetails();
    let assoid = this._session.getUserID();
    let payload = {
      QuarterId:CurrentQuater['id'],
      AssociateId:assoid
    } 

    if(this.isChecked ==true){
      this._homeservice.SaveUserAcceptance(payload).subscribe((res:any)=>{
        if(res===1){
            this._alert.succuss("Performance Assessment Terms Agreed successfully..!");
            this.isChecked=this.isChecked;
        }
        else if(res===2){
          this._alert.error("Sonthing went worng..!")
        }
      })
      this.dialogRef.close();
    }
    else{
      this._alert.error("Please Agree to Performance Assessment Terms");
    }
   }

   checkValue(event: any){
   this.isChecked=!this.isChecked;
    
 }

}
