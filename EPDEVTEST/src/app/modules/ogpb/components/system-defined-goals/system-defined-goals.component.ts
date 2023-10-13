import { Component, OnInit, OnChanges, Input, Output, EventEmitter } from '@angular/core';
import { MatDialog, MatDialogRef } from '@angular/material';
import { HomeService } from './../../../../services/omgb/home.service';
import { AlertMessageService } from 'src/app/services/alert-message.service';



@Component({
  selector: 'app-system-defined-goals',
  templateUrl: './system-defined-goals.component.html',
  styleUrls: ['./system-defined-goals.component.css']
})
export class SystemDefinedGoalsComponent implements OnInit, OnChanges {
  private subscription;
  private goals = [];
  private d_Status=false;
  private isEdit=false;
  @Input() KPIData: any = {};
  @Output() checkEnablButtn = new EventEmitter();
  constructor(private dialog: MatDialog, private _homeServices:HomeService,  private _alert: AlertMessageService) { }

  ngOnInit() {
    this.subscription=this._homeServices.getUIShouldUpadateEvent().subscribe(data => {
      if (data['type'] === 'ADDGOALS') {
        if(this.goals.length===5){
          this._alert.error("Maximum Assigned Goals Only 5");
          return;
        }

        //console.log("ID",data['golsSet']);

        if(this.goals.some(g=>g.kpiId===data['golsSet']['kpiId'])){
          this._alert.error("Duplicate Assigned Goals are not Allowed");
          return;
        }

        this.goals.push(data['golsSet']);
        let s=this.goals.length!==0;
        this.checkEnablButtn.emit(s+"");
        //console.log(">>>",golsSetdata);
      }
    })
  }
  ngOnChanges() {
    this.goals = this.KPIData['pmsAssigns']
  }

  systmDefiendPopup() {
    this.openDialog();
  }
 
 
  openDialog() {
    const dialogRef = this.dialog.open(SystemDefinedGoalsPopup, { disableClose: true });
    dialogRef.afterClosed().subscribe(result => {
    });
  }

  doEdit(i,isSave){
    const {goals} = this;
    let selectedItme = this.goals.find(g=>g.isEdit==true);
    
    if(selectedItme){
      var isChick = Object.keys(selectedItme).filter(k=>selectedItme[k]==="");
      if(isChick.length!=0 && this.d_Status){
        k=>selectedItme[k]==="";
        alert("Fill the Data Proparlly");
        return; 
      }
    }
    if(isSave){
      if(!this.d_Status){
        goals.forEach(g=>g.isEdit=false);
        this.goals=goals;
        return;
      }else{
        this._alert.error("Enter Valid Number");
      }
    }
    goals.forEach(g=>g.isEdit=false);
    goals[i]['isEdit']=true;
    this.goals=goals;
  }
 
  // save(){
  //   if(this.valiate()){
  //     this._alert.succuss("all were good");
  //   }else{
  //     this._alert.error("All target percentage should be 100%");
  //   }
  // }

   checkValue($event,units){
    if(units==="Percentage"){
      // alert('p');
        if ($event.target.value.replace(/[^.]/g, "").length >= 2){
          this._alert.error("special characters are not allowed");
          $event.target.value="";
          this.d_Status=true;
          return this.d_Status;
        }else if ($event.target.value.replace(/[^>]/g, "").length >= 1){
          $event.target.value = " ";
          this._alert.error("Please Enter Minimum Value");
          this.d_Status=true;
          return this.d_Status;
        }
        else if($event.target.value>100 ){
          this._alert.error("The Value should Not be greater than 100");
          $event.target.value="";
          this.d_Status=true;
          return this.d_Status;
        } else if($event.target.value<=0){
          this._alert.error("Please Enter Minimum Value");
          $event.target.value="";
          this.d_Status=true;
          return this.d_Status;
        }
        else{
          this.d_Status=false;
          return this.d_Status;
        }

    }else if(units==="Number"){
      // alert('n')
        if ($event.target.value.replace(/[^.]/g, "").length >= 2){
          this._alert.error("special characters are not allowed");
          $event.target.value="";
          this.d_Status=true;
          return this.d_Status;
        } else if ($event.target.value.replace(/[^>]/g, "").length >= 1){
          $event.target.value = " ";
          this._alert.error("Please Enter Minimum Value");
          this.d_Status=true;
          return this.d_Status;
        }
        else if($event.target.value>5){
          this._alert.error("The Value should Not be greater than 5");
          $event.target.value="";
          this.d_Status=true;
          return this.d_Status;
        }else if($event.target.value<=0){
          this._alert.error("Please Enter Minimum Value"); 
          $event.target.value="";
          this.d_Status=true;
          return this.d_Status;
        }else{
          this.d_Status=false;
          return this.d_Status;
        }
    }

    // if($event.target.value>100){
    //   this._alert.error("The Value should Not be greater than 100");
    //   $event.target.value = " ";
    // }
  }

  checkValue_Weitage($event){
    if($event.target.value>100){
      this._alert.error("The Value should Not be greater than 100");
      $event.target.value = " ";
      this.d_Status=true;
      return this.d_Status;
    }else if ($event.target.value.replace(/[^.]/g, "").length >= 1){
      $event.target.value = " ";
      this._alert.error("Please Enter Minimum Value");
      this.d_Status=true;
      return this.d_Status;
    }else if ($event.target.value.replace(/[^>]/g, "").length >= 1){
      $event.target.value = " ";
      this._alert.error("Please Enter Minimum Value");
      this.d_Status=true;
      return this.d_Status;
    }
    else if($event.target.value<=0){
      this._alert.error("Please Enter Minimum Value");
      $event.target.value = " "; 
      this.d_Status=true;
      return this.d_Status;
    }else{
      this.d_Status=false;
      return this.d_Status;
    }
  }

  deleteRow($event,i){
    this.goals.splice(i,1);
    this.goals=this.goals;
  }

}

@Component({
  selector: 'app-system-defined-popup',
  templateUrl: './systm-defiend-popup.html',
  styleUrls: ['./system-defined-goals.component.css']
})

export class SystemDefinedGoalsPopup implements OnInit {

  constructor(private dialogRef: MatDialogRef<SystemDefinedGoalsPopup>) {

  }


  ngOnInit() {

  }

  closeCommentpopup() {
    this.dialogRef.close();
  }

}