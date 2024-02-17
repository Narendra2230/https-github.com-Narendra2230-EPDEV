import { formatDate } from '@angular/common';
import { Component, ElementRef, OnInit, ViewChild } from '@angular/core';
import { FormBuilder, FormControl, Validators } from '@angular/forms';
import { MatPaginator, MatSort, MatTableDataSource } from '@angular/material';
import { ActivatedRoute, Router } from '@angular/router';
import { ColDef } from 'ag-grid-community';
import { request } from 'https';
import { EncryptionService } from 'src/app/services/encryption.service';
import { ResourceRequestService } from 'src/app/services/resource-request/resource-request.service';
import { SessionServiceService } from 'src/app/services/session/session-service.service';
import { DateRenderer } from '../user-profile/date-renderer';

declare var $:any

@Component({
  selector: 'app-new-request',
  templateUrl: './new-request.component.html',
  styleUrls: ['./new-request.component.css','../../styles.css']
})
export class NewRequestComponent implements OnInit {

  constructor(private fb: FormBuilder, private router: Router, private resourceService : ResourceRequestService,
    private route:ActivatedRoute,private encryptionService: EncryptionService,
    private elementRef:ElementRef,private _session: SessionServiceService) { }

  requestForm:any;
  Id;
  rrId;
  userData;
  edit = false;
  isTagMember;
  isRmgMember;
  successMessage;
  errorMessage;
  isZohoIdMandatory;
  isSOWMandatory;
  loader = false;
  dropDownData :any = {};
  data = new MatTableDataSource();
  isLoading = true;
  loading = true;
  displayedColumnDefs = [
    {
      field: "approvalStatus",
      filter: "agTextColumnFilter",
      filterParams: { suppressAndOrCondition: true },
      headerName: "Approval Status",
      cellRenderer: params => params.value == null ? "N/A" : params.value,
      sortable: true
    },
    {
      field: "assignedTo",
      filter: "agTextColumnFilter",
      filterParams: { suppressAndOrCondition: true },
      headerName: "Assigned To",
      cellRenderer: params => params.value == null ? "N/A" : params.value,
      sortable: true
    },
    {
      field: "assignedGroup",
      filter: "agTextColumnFilter",
      filterParams: { suppressAndOrCondition: true },
      headerName: "Assigned Group",
      cellRenderer: params => params.value == null ? "N/A" : params.value,
      sortable: true
    },
    {
      field: "resourcePriority",
      filter: "agTextColumnFilter",
      filterParams: { suppressAndOrCondition: true },
      headerName: "Resource Priority",
      cellRenderer: params => params.value == null ? "N/A" : params.value,
      sortable: true
    },
    {
      field: "createdDate",
      filter: "agTextColumnFilter",
      filterParams: { suppressAndOrCondition: true },
      headerName: "Created Date",
      cellRenderer: params => params.value == null ? "N/A" : params.value,
      sortable: true
    },
    {
      field: "updateDate",
      filter: "agTextColumnFilter",
      filterParams: { suppressAndOrCondition: true },
      headerName: "Updated Date",
      cellRenderer: params => params.value == null ? "N/A" : params.value,
      sortable: true
    },
    {
      field: "updatedBy",
      filter: "agTextColumnFilter",
      filterParams: { suppressAndOrCondition: true },
      headerName: "Updated By",
      cellRenderer: params => params.value == null ? "N/A" : params.value,
      sortable: true
    },
    {
      field: "aging",
      filter: "agTextColumnFilter",
      filterParams: { suppressAndOrCondition: true },
      headerName: "Aging",
      cellRenderer: params => params.value == null ? "N/A" : params.value,
      sortable: true
    }

  ];
  reason=null;
  btu=null;
  isWithdrawn = false;
  displayedRowData = [];
  frameworkComponents = {
    dateRenderer: DateRenderer
  };
  @ViewChild(MatPaginator, { static: true }) paginator: MatPaginator;
  @ViewChild(MatSort, { static: true }) sort: MatSort;
  gridApi;
  defaultColDef : ColDef = {
    sortable:true,filter:true
  }
  rowData;
  practice = [];
  subPractice = [];
  SOW = [];
  formFields=[
    'RequestedBy','VerifiedBy','AuthorizedBy','Entitty','Role','Designation',
    'EmpType','Reason','NumberOfOpenings','YearsOfExp','Utilization','PositionName',
    'BTU','Practice','SubPractice','Competency','CSU','Customer','SOW',
    'ReportingManager','ZohoId','SOWStage','zohoContractPeriod','zohoClosingDate','L1PanelInterviewer1',
    'L1PanelInterviewer2','L2PanelInterviewer1','L2PanelInterviewer2',
    'L3PanelInterviewer1','L3PanelInterviewer2','CTCType','CurrencyType',
    'BudgetedCTC','BudgetVariable','Incentive','Location','SubLocation',
    'PrimarySkill','SecondarySkill','ExpectedDOJ','JobDescription','CrtBy',
    'UpdatedBy','ApprovalStatus','AssignedTo','AssignedGroup','ApprovalGroup',
    'RequestStatus','ResourcePriority','L4PanelInterviewer1','L4PanelInterviewer2',
    'ResourceManagerId'
  ]

  ngOnInit() {
    this.Id = this._session.getUserID()
    this.rrId = this.encryptionService.deCryptEmpID(this.route.snapshot.paramMap.get('id'))
    let data = {
      "id": this.rrId
    }

    let userTypePayload = {
      "EmpId": this.Id
    }
    this.requestForm = this.fb.group({
      RequestedBy:['',[Validators.required]],
      VerifiedBy : ['',[Validators.required]],
      AuthorizedBy:['',[Validators.required]],
      Entitty : ['',[Validators.required]],
      Role:['',[Validators.required]],
      Designation : ['',[Validators.required]],
      EmpType:['',[Validators.required]],
      Reason : ['',[Validators.required]],
      NumberOfOpenings :['',[Validators.required]],
      YearsOfExp : ['',[Validators.required]],
      Utilization:['',[Validators.required]],
      PositionName : ['',[Validators.required]],
      BTU : ['',[Validators.required]],
      Practice:[''],
      SubPractice : [''],
      Competency:['',[Validators.required]],
      CSU : ['',[Validators.required]],
      Customer:[''],
      SOW : [''],
      ReportingManager:['',[Validators.required]],
      ZohoId : [''],
      SOWStage :[{value:'',disabled:true}],
      zohoContractPeriod :[{value:'',disabled:true}],
      zohoClosingDate :[{value:'',disabled:true}],
      L1PanelInterviewer1 : ['',[Validators.required]],
      L1PanelInterviewer2:['',[Validators.required]],
      L2PanelInterviewer1 : ['',[Validators.required]],
      L2PanelInterviewer2 : ['',[Validators.required]],
      L3PanelInterviewer1:[''],
      L3PanelInterviewer2 : [''],
      CTCType:['',[Validators.required]],
      CurrencyType : ['',[Validators.required]],
      BudgetedCTC:['',[Validators.required]],
      BudgetVariable : ['',[Validators.required]],
      Incentive:[''],
      Location : ['',[Validators.required]],
      SubLocation:['',[Validators.required]],
      PrimarySkill : ['',[Validators.required]],
      SecondarySkill:['',[Validators.required]],
      ExpectedDOJ : ['',[Validators.required]],
      JobDescription:['',[Validators.required]],
      CrtBy : [''],
      UpdatedBy:[''],
      ApprovalStatus : [''],
      AssignedTo:[''],
      AssignedGroup : [''],
      ApprovalGroup:[''],
      RequestStatus : [''],
      ResourcePriority:[''],
      L4PanelInterviewer1 : [''],
      L4PanelInterviewer2:[''],
      ResourceManagerId:[''],
      TagHeadId:[''],
      TagRecruiterId:[''],
      TagStatus:['']
    })
    this.resourceService.GetUserType(userTypePayload).subscribe(
      (response:any)=>{
        if(response.userGroups.includes(54) && this.edit){
          this.isRmgMember = true;
          this.isTagMember = false;
          this.requestForm.get('ResourceManagerId').setValidators([Validators.required]);
          this.requestForm.get('ResourceManagerId').updateValueAndValidity();
          this.requestForm.get('ApprovalStatus').setValidators([Validators.required]);
          this.requestForm.get('ApprovalStatus').updateValueAndValidity();
          this.requestForm.controls['TagHeadId'].setValue(null);
          this.requestForm.controls['TagRecruiterId'].setValue(null);
          this.requestForm.controls['TagStatus'].setValue(null);
        }
        else if(response.userGroups.includes(56) && this.edit){
          this.isRmgMember = false;
          this.isTagMember = true;
          this.requestForm.get('TagHeadId').setValidators([Validators.required]);
          this.requestForm.get('TagHeadId').updateValueAndValidity();
          this.requestForm.get('TagRecruiterId').setValidators([Validators.required]);
          this.requestForm.get('TagRecruiterId').updateValueAndValidity();
          this.requestForm.get('TagStatus').setValidators([Validators.required]);
          this.requestForm.get('TagStatus').updateValueAndValidity();
          for(let i in this.formFields){
            this.requestForm.controls[this.formFields[i]].disable();
          }
        }
      },
      (errorResponse)=>{
        console.log(errorResponse)
      }
    )
    .add(()=>{
      $(document).ready(function() {
        $('.select2').select2({ width: '100%' });
        });
        $('.select2').on('select2:select',(e:any)=>{
          let ele = <HTMLInputElement>e.delegateTarget
          var formName = ele.attributes.getNamedItem('formControlName').value;
          this.requestForm.controls[formName].setValue(e.params.data.id);
          this.requestForm.get(formName).clearValidators();
          this.requestForm.get(formName).updateValueAndValidity();
          if(formName == 'Reason'){
            this.changeStatus(e.params.data.id)
          }
          else if(formName == 'BTU'){
            this.changeZohoRequiredStatus(e.params.data.id)
            this.practice = [];
            this.requestForm.controls['Practice'].setValue('');
            this.subPractice = [];
            for(let i in this.dropDownData.Practices){
              if(this.dropDownData.Practices[i].child == e.params.data.id){
                  this.practice.push(this.dropDownData.Practices[i])
              }
            }
          }
          else if(formName == 'Practice'){
            this.subPractice = [];
            this.requestForm.controls['SubPractice'].setValue('');
            for(let i in this.dropDownData.SubPractice){
              if(this.dropDownData.SubPractice[i].child == e.params.data.id){
                  this.subPractice.push(this.dropDownData.SubPractice[i])
              }
            }
          }
          else if(formName == 'Customer'){
          this.SOW = []
          for(let i in this.dropDownData.SOW){
            if(this.dropDownData.SOW[i].child == e.params.data.id){
              this.SOW.push(this.dropDownData.SOW[i])
          }
          }
          }
          else if(formName == 'ZohoId'){
            this.populateZohoReason(e.params.data.id)
          }
        })
    })
    if(data.id){
      this.edit = true;
      this.requestForm.controls['UpdatedBy'].setValue(this.Id);
      this.getSingleRecord(data)
    }
    else{
      this.requestForm.controls['CrtBy'].setValue(this.Id);
      this.getDropDownData()
    }
    

  }

  changeStatus(data){
    if(this.btu == "SSU"){
    if(data == '1'){
      this.isZohoIdMandatory = false;
      this.isSOWMandatory = false;
      this.requestForm.get('ZohoId').clearValidators();
      this.requestForm.get('ZohoId').updateValueAndValidity();
      this.requestForm.get('SOW').clearValidators();
      this.requestForm.get('SOW').updateValueAndValidity();
      this.requestForm.get('Customer').clearValidators();
      this.requestForm.get('Customer').updateValueAndValidity();
      this.reason = 'new'
    }
    else if(data == '2'){
      this.isZohoIdMandatory = false;
      this.isSOWMandatory = true;
      this.requestForm.get('ZohoId').clearValidators();
      this.requestForm.get('ZohoId').updateValueAndValidity();
      this.requestForm.get('SOW').setValidators([Validators.required]);
      this.requestForm.get('SOW').updateValueAndValidity();
      this.requestForm.get('Customer').setValidators([Validators.required]);
      this.requestForm.get('Customer').updateValueAndValidity();
      this.reason = null
    }
  }
  else{
    if(data == '1'){
      this.isZohoIdMandatory = true;
      this.isSOWMandatory = false;
      this.requestForm.get('ZohoId').setValidators([Validators.required]);
      this.requestForm.get('ZohoId').updateValueAndValidity();
      this.requestForm.get('SOW').clearValidators();
      this.requestForm.get('SOW').updateValueAndValidity();
      this.requestForm.get('Customer').clearValidators();
      this.requestForm.get('Customer').updateValueAndValidity();
      this.reason = 'new'
    }
    else if(data == '2'){
      this.isZohoIdMandatory = false;
      this.isSOWMandatory = true;
      this.requestForm.get('ZohoId').clearValidators();
      this.requestForm.get('ZohoId').updateValueAndValidity();
      this.requestForm.get('SOW').setValidators([Validators.required]);
      this.requestForm.get('SOW').updateValueAndValidity();
      this.requestForm.get('Customer').setValidators([Validators.required]);
      this.requestForm.get('Customer').updateValueAndValidity();
      this.reason = null
    }
  }
  }

  show(val:number){
    let max;
    if(this.edit && this.isRmgMember){
      max = 7
    }
    else if(this.edit && this.isTagMember){
      max = 8
    }
    else max = 5
    for(let i=0; i<max; i++){
      if(i == val){
        document.getElementById(i.toString())!.hidden = false
        document.getElementsByClassName(i.toString())[0].classList.add('active')
      }
      else{
        document.getElementById(i.toString())!.hidden = true
        document.getElementsByClassName(i.toString())[0].classList.remove('active')
      }
    }
  }

  submit(){
    let data  = this.requestForm.getRawValue();
    console.log(data)
    if(this.requestForm.valid){
      document.getElementById('submit').setAttribute('disabled','true')
      this.loader = true
      if(!this.edit){
        delete data.ResourceManagerId;
        delete data.TagHeadId;
        delete data.TagRecruiterId;
        delete data.TagStatus;
        this.resourceService.SubmitNewRecord(data).subscribe(
          (response)=>{
            this.requestForm.reset();
            this.successMessage = "successfully submitted form"
            this.loader = false
            this.errorMessage = null
            setTimeout(()=>{
              this.successMessage = null;
              this.errorMessage = null;
              this.show(0);
              document.getElementById('submit').removeAttribute('disabled')
              this.router.navigateByUrl('/landingPage')
            },5000)
          },
          (errorResponse)=>{
            console.log(errorResponse)
            this.successMessage = null
            this.errorMessage = "Unable to submit form"
            this.loader = false
            setTimeout(()=>{
              this.successMessage = null;
              this.errorMessage = null;
              document.getElementById('submit').removeAttribute('disabled')
            },5000)
          }
        )
        }
        else{
          data.Id = this.rrId
          this.resourceService.UpdateRecord(data).subscribe(
            (response)=>{
              this.successMessage = "successfully updated form"
              this.errorMessage = null
              this.loader = false
              let historydata = {
                "id": this.rrId
              }
              this.getSingleRecord(historydata)
              setTimeout(()=>{
                this.successMessage = null;
                this.errorMessage = null;
                document.getElementById('submit').removeAttribute('disabled')
              },5000)
            },
            (errorResponse)=>{
              console.log(errorResponse)
              this.successMessage = null
              this.errorMessage = "Unable to update form"
              this.loader = false
              setTimeout(()=>{
                this.successMessage = null;
                this.errorMessage = null;
                document.getElementById('submit').removeAttribute('disabled')
              },5000)
            }
          )
        }
    }
    else{
      let invalid:any;
      const controls = this.requestForm.controls;
      for (const name in controls) {
        if (controls[name].invalid) {
            invalid = name
            break
        }
      }
      this.errorMessage = invalid + " field is missing"
      setTimeout(()=>{
        this.errorMessage = null;
      },5000)
    }
  }

  onGridReady(event:any){
    this.gridApi = event.api;
  }

  changeZohoRequiredStatus(data){
    if(data == 6 && this.reason == 'new'){
      this.requestForm.get('ZohoId').clearValidators();
      this.requestForm.get('ZohoId').updateValueAndValidity();
      this.isZohoIdMandatory = false;
      this.btu = 'SSU'
    }
    else if(this.reason == 'new' && data != 6){
      this.requestForm.get('ZohoId').setValidators([Validators.required]);
      this.requestForm.get('ZohoId').updateValueAndValidity();
      this.isZohoIdMandatory = true;
      this.btu = null;
    }
    else if(this.reason == !'new'){
      this.requestForm.get('ZohoId').clearValidators();
      this.requestForm.get('ZohoId').updateValueAndValidity();
      this.isZohoIdMandatory = false;
      this.btu = null;
    }
  }

  getSingleRecord(data){
    this.resourceService.GetSingleRecord(data).subscribe(
      (response:any)=>{
        this.userData = response;
        console.log(this.userData)
        this.data = new MatTableDataSource(response);
        this.displayedRowData = response.resourceRequestHistories;
        this.data.paginator = this.paginator;
        this.data.sort = this.sort;
        this.loading = false;
        this.requestForm.controls['RequestedBy'].setValue(this.userData.requestedById);
        this.requestForm.controls['VerifiedBy'].setValue(this.userData.verifiedById);
        this.requestForm.controls['AuthorizedBy'].setValue(this.userData.authorizedById);
        this.requestForm.controls['Entitty'].setValue(this.userData.entittyId);
        this.requestForm.controls['Role'].setValue(this.userData.roleId);
        this.requestForm.controls['Designation'].setValue(this.userData.designationId);
        this.requestForm.controls['EmpType'].setValue(this.userData.empTypeId);
        this.requestForm.controls['Reason'].setValue(this.userData.reasonId);
        this.requestForm.controls['NumberOfOpenings'].setValue(this.userData.numberOfOpenings);
        this.requestForm.controls['YearsOfExp'].setValue(this.userData.yearsOfExp);
        this.requestForm.controls['Utilization'].setValue(this.userData.utilizationId);
        this.requestForm.controls['PositionName'].setValue(this.userData.positionName);
        this.requestForm.controls['BTU'].setValue(this.userData.btuId);
        this.requestForm.controls['Practice'].setValue(this.userData.practiceId);
        this.requestForm.controls['SubPractice'].setValue(this.userData.subPracticeId);
        this.requestForm.controls['Competency'].setValue(this.userData.competency);
        this.requestForm.controls['CSU'].setValue(this.userData.csuId);
        this.requestForm.controls['Customer'].setValue(this.userData.customerId);
        this.requestForm.controls['SOW'].setValue(this.userData.sowId);
        this.requestForm.controls['ReportingManager'].setValue(this.userData.reportingManagerId);
        this.requestForm.controls['ZohoId'].setValue(this.userData.zohoId);
        this.requestForm.controls['zohoContractPeriod'].setValue(this.userData.zohoContractPeriod);
        this.requestForm.controls['zohoClosingDate'].setValue(formatDate(this.userData.zohoClosingDate,'yyyy-MM-dd','en'));
        this.requestForm.controls['SOWStage'].setValue(this.userData.sowStage);
        this.requestForm.controls['L1PanelInterviewer1'].setValue(this.userData.l1PanelInterviewer1Id);
        this.requestForm.controls['L1PanelInterviewer2'].setValue(this.userData.l1PanelInterviewer2Id);
        this.requestForm.controls['L2PanelInterviewer1'].setValue(this.userData.l2PanelInterviewer1Id);
        this.requestForm.controls['L2PanelInterviewer2'].setValue(this.userData.l2PanelInterviewer2Id);
        this.requestForm.controls['L3PanelInterviewer1'].setValue(this.userData.l3PanelInterviewer1Id);
        this.requestForm.controls['L3PanelInterviewer2'].setValue(this.userData.l3PanelInterviewer2Id);
        this.requestForm.controls['CTCType'].setValue(this.userData.ctcTypeId);
        this.requestForm.controls['CurrencyType'].setValue(this.userData.currencyType);
        this.requestForm.controls['BudgetedCTC'].setValue(this.userData.budgetedCTC);
        this.requestForm.controls['BudgetVariable'].setValue(this.userData.budgetVariable);
        this.requestForm.controls['Incentive'].setValue(this.userData.incentive);
        this.requestForm.controls['Location'].setValue(this.userData.location);
        this.requestForm.controls['SubLocation'].setValue(this.userData.subLocation);
        this.requestForm.controls['PrimarySkill'].setValue(this.userData.primarySkill);
        this.requestForm.controls['SecondarySkill'].setValue(this.userData.secondarySkill);
        this.requestForm.controls['ExpectedDOJ'].setValue(formatDate(this.userData.expectedDOJ,'yyyy-MM-dd','en'));
        this.requestForm.controls['JobDescription'].setValue(this.userData.jobDescription);
        this.requestForm.controls['CrtBy'].setValue(this.userData.crtById);
        this.requestForm.controls['ResourcePriority'].setValue(this.userData.resourcePriorityId);
        this.requestForm.controls['ApprovalStatus'].setValue(this.userData.approvalStatusId);
        this.requestForm.controls['ResourceManagerId'].setValue(this.userData.resourceManagerId);
        this.requestForm.controls['TagHeadId'].setValue(this.userData.tagHeadId);
        this.requestForm.controls['TagRecruiterId'].setValue(this.userData.tagRecruiterId);
        this.requestForm.controls['TagStatus'].setValue(this.userData.tagStatusId);
        let length = this.userData.resourceRequestHistories.length
        if(this.userData.resourceRequestHistories[length-1].approvalStatus == 'withdrawn'){
          this.isWithdrawn = true
          for(let i in this.formFields){
            this.requestForm.controls[this.formFields[i]].disable();
          }
        }
      },
      (errorResponse)=>{
        console.log(errorResponse)
      }
    ).add(()=>{
      this.getDropDownData()
    })
  }

  populateZohoReason(data){
  for(let i in this.dropDownData.ZohoStage){
    if(this.dropDownData.ZohoStage[i].id == data){
      this.requestForm.controls['SOWStage'].setValue(this.dropDownData.ZohoStage[i].name);
    }
  }
  for(let i in this.dropDownData.ZohoClosing){
    if(this.dropDownData.ZohoClosing[i].id == data){
      this.requestForm.controls['zohoClosingDate'].setValue(this.dropDownData.ZohoClosing[i].name);
    }
  }
  for(let i in this.dropDownData.ZohoContractPeriod){
    if(this.dropDownData.ZohoContractPeriod[i].id == data){
      this.requestForm.controls['zohoContractPeriod'].setValue(this.dropDownData.ZohoContractPeriod[i].name);
    }
  }
  }

  getDropDownData(){
    this.resourceService.GetDropDownValues().subscribe(
      (response)=>{
        for(let i=0;i<response.length;i++){
          this.dropDownData[response[i].type] = response[i].values
          this.isLoading = false
        }
        if(this.edit){
          for(let i in this.dropDownData.Practices){
            if(this.dropDownData.Practices[i].child==this.userData.btuId){
              this.practice.push(this.dropDownData.Practices[i])
            }
          }
          for(let i in this.dropDownData.SubPractice){
            if(this.dropDownData.SubPractice[i].child==this.userData.practiceId){
              this.subPractice.push(this.dropDownData.SubPractice[i])
            }
          }
          for(let i in this.dropDownData.SOW){
            if(this.dropDownData.SOW[i].child==this.userData.customerId){
              this.SOW.push(this.dropDownData.SOW[i])
            }
          }
        }
      },
      (errorResponse)=>{
        console.log(errorResponse)
      }
    )
  }
}
