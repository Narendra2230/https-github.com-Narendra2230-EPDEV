import { Component, OnInit } from '@angular/core';
import { HomeService } from 'src/app/services/omgb/home.service';
import { SessionServiceService } from 'src/app/services/session/session-service.service';
import { dashCaseToCamelCase } from '@angular/compiler/src/util';
import {MatExpansionModule} from '@angular/material/expansion';

@Component({
  selector: 'app-executive',
  templateUrl: './executive.component.html',
  styleUrls: ['./executive.component.css']
})

export class ExecutiveComponent implements OnInit {
  private status;
  private GetExecutiveDetails;
  private subscription;
  private isLoading = false;
  private SaveAssociateExecutiveRating;
  constructor(private homeService: HomeService, private _session: SessionServiceService) { }

  ngOnInit() {
    this.isLoading = true;
    //alert(this.isLoading)
    this.subscription = this.homeService.getUIShouldUpadateEvent().subscribe(result => {
      let { type = null, data = {} } = result || {};
      if (type === "EXECUTIVE_DETAILS") {
        this.status  = result['data']
        //Getting ExecutiveDetails
        this.executiveDetaild(this.status);
      }
     
    })
  }
edit(i,ii){
  const {GetExecutiveDetails}=this;
  GetExecutiveDetails[i]['pMS_FInalEvaluationDetails'][ii]['isEdit']=!GetExecutiveDetails[i]['pMS_FInalEvaluationDetails'][ii]['isEdit'];
  this.GetExecutiveDetails=GetExecutiveDetails;
}

allSubmit(i){
  const {GetExecutiveDetails}=this;
  //console.log(GetExecutiveDetails[i]);

  // var p_load = {
  //   "ExecutiveId":"188",
  //   "QuarterId": 2,
  //   "pMS_FInalEvaluationDetails":
  //   [{ 
  //     "Id": 2943,
  //   "AssociateWeightageRating": "55.35",
  //   "ManagerWeightageRating": "55.35",
  //   "ApproverWeightageRating": "30",
  //   "EvaluationId": 14,
  //   "Comment":"",
  //   "FinalEvaluationListId": 1,
  //   "IsSave": null,
  //   "IsSubmit": true

  //   }]
  // }

  var p_load = GetExecutiveDetails[i];
  this.homeService.SaveAssociateExecutiveRating(p_load).subscribe(data=>{
    this.SaveAssociateExecutiveRating=data;
  //  console.log("ppp->",data);
  })

}
  ngOnDestroy() {
    this.subscription.unsubscribe();
  }

  executiveDetaild(status){
    var p_load = {
      "status":status,
      "isExecutive"  :"true",                                
      "QuarterId": this._session.getCurrentQuarterDetails()['id']
    }
   // console.log("==>",p_load);
    this.homeService.GetExecutiveDetails(p_load).subscribe(data=>{
      this.GetExecutiveDetails = data;
      this.isLoading = false;
    
    });

}

}

export class ExpansionOverviewExample {
  panelOpenState = false;
}
