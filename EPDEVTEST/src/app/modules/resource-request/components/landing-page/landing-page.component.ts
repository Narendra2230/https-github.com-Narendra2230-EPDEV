import { Component, OnInit, ViewChild } from '@angular/core';
import { MatPaginator, MatSort, MatTableDataSource } from '@angular/material';
import { Router } from '@angular/router';
import { CellClickedEvent, ColDef } from 'ag-grid-community';
import { DataService } from 'src/app/services/data.service';
import { ResourceRequestService } from 'src/app/services/resource-request/resource-request.service';
import { SessionServiceService } from 'src/app/services/session/session-service.service';
import { ActionRenderer } from './action-renderer';

@Component({
  selector: 'app-landing-page',
  templateUrl: './landing-page.component.html',
  styleUrls: ['./landing-page.component.css','../../styles.css']
})
export class LandingPageComponent implements OnInit {

  constructor(private resourceService:ResourceRequestService,
    private router:Router,private dataService: DataService,private _session: SessionServiceService) { }
  displayData:any;
  data = new MatTableDataSource();
  loading = true;
  displayedColumnDefs = [
    {
      field: "rrid",
      filter: "agTextColumnFilter",
      filterParams: { suppressAndOrCondition: true },
      headerName: "RRID",
      cellRenderer: "rrid",
      sortable: true,
      width: 100,
    },
    {
      field: "requestedBy",
      filter: "agTextColumnFilter",
      filterParams: { suppressAndOrCondition: true },
      headerName: "Requested By",
      cellRenderer: "requestedBy",
      sortable: true,
      width: 200,
    },
    {
      field: "positionName",
      filter: "agTextColumnFilter",
      filterParams: { suppressAndOrCondition: true },
      headerName: "Position Name",
      cellRenderer: "positionName",
      sortable: true
      // width: 100,
    },
    {
      field: "designation",
      filter: "agTextColumnFilter",
      filterParams: { suppressAndOrCondition: true },
      headerName: "Designation",
      cellRenderer: "designation",
      sortable: true
      // width: 100,
    },
    {
      field: "empType",
      filter: "agTextColumnFilter",
      filterParams: { suppressAndOrCondition: true },
      headerName: "EmpType",
      cellRenderer: "empType",
      sortable: true,
      width: 150,
      cellStyle: { textAlign: "center" },
    },
    {
      field: "reason",
      filter: "agTextColumnFilter",
      filterParams: { suppressAndOrCondition: true },
      headerName: "Reason",
      cellRenderer: "reason",
      sortable: true,
      width: 150,
      cellStyle: { textAlign: "center" },
    },
    {
      field: "numberOfOpenings",
      filter: "agTextColumnFilter",
      filterParams: { suppressAndOrCondition: true },
      headerName: "NoOfRequests",
      cellRenderer: "numberOfOpenings",
      sortable: true,
      width: 150,
      cellStyle: { textAlign: "center" },
    },
    {
      field: "primarySkill",
      filter: "agTextColumnFilter",
      filterParams: { suppressAndOrCondition: true },
      headerName: "Primary Skill",
      cellRenderer: "primarySkill",
      sortable: true,
      width: 150,
      cellStyle: { textAlign: "center" },
    },
    {
      field: "yearsofExp",
      filter: "agTextColumnFilter",
      filterParams: { suppressAndOrCondition: true },
      headerName: "years Of Exp",
      cellRenderer: "yearsofExp",
      sortable: true,
      width: 150,
      cellStyle: { textAlign: "center" },
    },
    {
      field: "expectedDoj",
      filter: "agTextColumnFilter",
      filterParams: { suppressAndOrCondition: true },
      headerName: "Expected DOJ",
      cellRenderer: "expectedDoj",
      sortable: true,
      width: 150,
      cellStyle: { textAlign: "center" },
    },
    {
      field: "btu",
      filter: "agTextColumnFilter",
      filterParams: { suppressAndOrCondition: true },
      headerName: "BTU",
      cellRenderer: "btu",
      sortable: true,
      width: 100,
    },
    {
      field: "practice",
      filter: "agTextColumnFilter",
      filterParams: { suppressAndOrCondition: true },
      headerName: "Practice",
      cellRenderer: params => params.value == null ? "-" : params.value,
      sortable: true,
      width: 150,
    },
    {
      field: "requestStatus",
      filter: "agTextColumnFilter",
      filterParams: { suppressAndOrCondition: true },
      headerName: "Request Status",
      cellRenderer: "requestStatus",
      sortable: true,
      width: 150,
      cellStyle: { textAlign: "center" },
    },
    {
      field: "offeredCandidates",
      filter: "agTextColumnFilter",
      filterParams: { suppressAndOrCondition: true },
      headerName: "Offered Candidates",
      cellRenderer: "offeredCandidates",
      sortable: true,
      width: 180,
      cellStyle: { color: "#333", "font-weight": "bold", textAlign: "center" }
    },
    {
      field: "onboardedCandidates",
      filter: "agTextColumnFilter",
      filterParams: { suppressAndOrCondition: true },
      headerName: "Onboarded",
      cellRenderer: "onboardedCandidates",
      sortable: true,
      width: 150,
      cellStyle: { color: "#333", "font-weight": "bold", textAlign: "center" }
    },
    {
      field: "shouldShow",
      cellRenderer: "statusRenderer",
      cellRendererParams: { onStatusChange: this.changeStatus.bind(this) },
      filter: "agTextColumnFilter",
      sortable: true,
      filterParams: {
        suppressAndOrCondition: true,
        filterOptions: ["startsWith"],
      },
      headerName: "Action",
      cellStyle: { textAlign: "center" },
      width: 150
    },
    { field: 'requestID', headerName: 'requestID', hide: true },
    { field: 'verifiedID', headerName: 'verifiedID', hide: true },
    { field: 'verifiedBy', headerName: 'verifiedBy', hide: true },
    { field: 'authorizedId', headerName: 'authorizedId', hide: true },
    { field: 'authorizedBy', headerName: 'authorizedBy', hide: true },
    { field: 'entity', headerName: 'entity', hide: true },
    { field: 'personaRole', headerName: 'personaRole', hide: true },
    { field: 'utilization', headerName: 'utilization', hide: true },
    { field: 'secondarySkill', headerName: 'secondarySkill', hide: true },
    { field: 'subPractice', headerName: 'subPractice', hide: true },
    { field: 'competency', headerName: 'competency', hide: true },
    { field: 'csu', headerName: 'csu', hide: true },
    { field: 'customer', headerName: 'customer', hide: true },
    { field: 'sow', headerName: 'sow', hide: true },
    { field: 'sowStage', headerName: 'sowStage', hide: true },
    { field: 'zohoId', headerName: 'zohoId', hide: true },
    {
      field: 'zohoClosingDate',
      headerName: 'zohoClosingDate',
      hide: true
    },
    {
      field: 'zohoContractPeriod',
      headerName: 'zohoContractPeriod',
      hide: true
    },
    {
      field: 'reportingManager',
      headerName: 'reportingManager',
      hide: true
    },
    {
      field: 'l1PanelInterviewer1',
      headerName: 'l1PanelInterviewer1',
      hide: true
    },
    {
      field: 'l1PanelInterviewer2',
      headerName: 'l1PanelInterviewer2',
      hide: true
    },
    {
      field: 'l2PanelInterviewer1',
      headerName: 'l2PanelInterviewer1',
      hide: true
    },
    {
      field: 'l2PanelInterviewer2',
      headerName: 'l2PanelInterviewer2',
      hide: true
    },
    {
      field: 'l3PanelInterviewer1',
      headerName: 'l3PanelInterviewer1',
      hide: true
    },
    {
      field: 'p3PanelInterviewer2',
      headerName: 'L3PanelInterviewer2',
      hide: true
    },
    { field: 'salaryType', headerName: 'salaryType', hide: true },
    { field: 'currencyType', headerName: 'currencyType', hide: true },
    { field: 'budgetedCTC', headerName: 'budgetedCTC', hide: true },
    { field: 'budgetVariable', headerName: 'budgetVariable', hide: true },
    { field: 'incentive', headerName: 'incentive', hide: true },
    {
      field: 'expectedDojMonth',
      headerName: 'expectedDojMonth',
      hide: true
    },
    { field: 'location', headerName: 'location', hide: true },
    { field: 'subLocation', headerName: 'subLocation', hide: true },
    { field: 'createdDate', headerName: 'createdDate', hide: true },
    { field: 'createdBy', headerName: 'createdBy', hide: true },
    { field: 'updatedDate', headerName: 'updatedDate', hide: true },
    { field: 'updatedBy', headerName: 'updatedBy', hide: true },
    { field: 'assignedTo', headerName: 'assignedTo', hide: true },
    { field: 'assignedGroup', headerName: 'assignedGroup', hide: true },
    { field: 'approvalGroup', headerName: 'approvalGroup', hide: true },
    { field: 'status', headerName: 'status', hide: true },
    { field: 'jobDescription', headerName: 'jobDescription', hide: true }
  ];
  displayedRowData = [];
  dashboardColumnDefs = [
    {
      field: "btu",
      filter: "agTextColumnFilter",
      filterParams: { suppressAndOrCondition: true },
      headerName: "BTU",
      cellRenderer: params => params.value == null ? "N/A" : params.value,
      sortable: true,
      width:150
    },
    {
      field: "new",
      filter: "agTextColumnFilter",
      filterParams: { suppressAndOrCondition: true },
      headerName: "New",
      cellRenderer: params => params.value == null ? "N/A" : params.value,
      sortable: true,
      width:150
    },
    {
      field: "replacement",
      filter: "agTextColumnFilter",
      filterParams: { suppressAndOrCondition: true },
      headerName: "Replacement",
      cellRenderer: params => params.value == null ? "N/A" : params.value,
      sortable: true,
      width:150
    },
    {
      field: "Pending",
      filter: "agTextColumnFilter",
      filterParams: { suppressAndOrCondition: true },
      headerName: "Pending",
      cellRenderer: params => params.value == null ? "N/A" : params.value,
      sortable: true,
      width:150
    },
    {
      field: "withdrawn",
      filter: "agTextColumnFilter",
      filterParams: { suppressAndOrCondition: true },
      headerName: "Withdrawn",
      cellRenderer: params => params.value == null ? "N/A" : params.value,
      sortable: true,
      width:150
    },
    {
      field: "In Progress",
      filter: "agTextColumnFilter",
      filterParams: { suppressAndOrCondition: true },
      headerName: "In Progress",
      cellRenderer: params => params.value == null ? "N/A" : params.value,
      sortable: true,
      width:150
    },
    {
      field: "Authorized To Hire",
      filter: "agTextColumnFilter",
      filterParams: { suppressAndOrCondition: true },
      headerName: "ATH",
      cellRenderer: params => params.value == null ? "N/A" : params.value,
      sortable: true,
      width:150
    },
    {
      field: "Offer Released",
      filter: "agTextColumnFilter",
      filterParams: { suppressAndOrCondition: true },
      headerName: "Offer Released",
      cellRenderer: params => params.value == null ? "N/A" : params.value,
      sortable: true,
      width:150
    },
    {
      field: "offered",
      filter: "agTextColumnFilter",
      filterParams: { suppressAndOrCondition: true },
      headerName: "Offered",
      cellRenderer: params => params.value == null ? "N/A" : params.value,
      sortable: true,
      width:150
    },
    {
      field: "onboarded",
      filter: "agTextColumnFilter",
      filterParams: { suppressAndOrCondition: true },
      headerName: "Onboarded",
      cellRenderer: params => params.value == null ? "N/A" : params.value,
      sortable: true,
      width:190
    }
  ];
  dashboardRowData = [];
  frameworkComponents = {
    statusRenderer: ActionRenderer
  };
  @ViewChild(MatPaginator, { static: true }) paginator: MatPaginator;
  @ViewChild(MatSort, { static: true }) sort: MatSort;
  private gridApi;
  defaultColDef : ColDef = {
    sortable:true,filter:true
  }
  rowData;
  Id;
  pageSize = 10;
  dataLength:Number;

  ngOnInit() {
    let data = {
      "EmpId":this._session.getUserID()
    }
    this.resourceService.GetLandingPageData(data).subscribe(
      (res:any)=>{
        console.log(res)
        this.dataLength = res.length
        this.dashboardRowData = this.getDashboardData(res)
          this.data = new MatTableDataSource(res);
          this.displayedRowData = res;
          this.data.paginator = this.paginator;
          this.data.sort = this.sort;
          this.loading = false;
          this.resourceService.GetUserType(data).subscribe(
            (response:any)=>{
              if(response.userGroups.includes(54) || response.userGroups.includes(56)){
                for(let i in this.displayedRowData){
                    this.displayedRowData[i].shouldShow = true;
                }
              }
              else{
                for(let i in this.displayedRowData){
                  this.displayedRowData[i].shouldShow = false;
              }
              }
            },
            (errorResponse)=>{
              console.log(errorResponse)
            }
          )
      },
      (errorResponse)=>{
        console.log(errorResponse)
      }
    )
  }

  onGridReady(event:any){
    this.gridApi = event.api;
  }

  changeStatus(data) {
    console.log(data)
  }

  exportDataAsExcel(){
    var params = {
      columnKeys: [
        'rrid','requestID','requestedBy',
        'verifiedID','verifiedBy','authorizedId',
        'authorizedBy','entity','positionName',
        'PersonaRole','Designation','empType',
        'reason','utilization','numberOfOpenings',
        'primarySkill','secondarySkill','yearsofExp',
        'btu','practice','subPractice','competency','csu',
        'customer','sow','sowStage','zohoId','zohoContractPeriod','zohoClosingDate',
        'reportingManager','l1PanelInterviewer1','l1PanelInterviewer2','l2PanelInterviewer1',
        'l2PanelInterviewer2','l3PanelInterviewer1','p3PanelInterviewer2',
        'salaryType','currencyType','budgetedCTC','budgetVariable','incentive',
        'expectedDoj','expectedDojMonth','location',
        'subLocation','createdDate','createdBy',
        'updatedDate','updatedBy','requestStatus',
        'assignedTo','assignedGroup','approvalGroup',
        'status','jobDescription','offeredCandidates','onboardedCandidates'
      ]
  };
    this.gridApi.exportDataAsCsv(params);
  }

  changePageSize(){
    let d = (<HTMLInputElement>document.getElementById("pageSize")).value
    this.gridApi.paginationSetPageSize(Number(d))
  }

  onCellClicked(event:CellClickedEvent){
    console.log(event)
    this.displayData = event.data
  }

  getDashboardData(data){
    let btus : any = [
      {
          "btu": "DAM"
      },
      {
          "btu": "DIA"
      },
      {
          "btu": "DTI"
      },
      {
          "btu": "EAM"
      },
      {
          "btu": "ICT"
      },
      {
          "btu": "SSU"
      },{
        "btu": "Corporate"
    }
  ]
  let datapopulate = ["Pending","withdrawn","Authorized To Hire","Offer Released","In Progress"]
  
  for(let i=0;i<data.length;i++){
      for(let j in btus){
          if(btus[j].btu == data[i].btu){
              if(data[i].reason == "New"){
              if(!btus[j].new){
                  btus[j].new = 1
              }
              else{
                  btus[j].new += 1
              }
              }
              if(data[i].reason == "Replacement"){
                if(!btus[j].replacement){
                    btus[j].replacement = 1
                }
                else{
                    btus[j].replacement += 1
                }
                }
              for(let z in datapopulate){
                  if(data[i].requestStatus == datapopulate[z]){
                      if(!btus[j][datapopulate[z]]){
                          btus[j][datapopulate[z]] = 1
                      }
                      else{
                          btus[j][datapopulate[z]] += 1
                      }
                      }
              }
              if(data[i].offeredCandidates){
                  if(!btus[j].offered){
                      btus[j].offered = data[i].offeredCandidates
                  }
                  else{
                      btus[j].offered += data[i].offeredCandidates
                  }
                  }
              if(data[i].onboardedCandidates){
                      if(!btus[j].onboarded){
                          btus[j].onboarded = data[i].onboardedCandidates
                      }
                      else{
                          btus[j].onboarded += data[i].onboardedCandidates
                      }
              }
              
          }
      }
  }
  return btus
  }

}
