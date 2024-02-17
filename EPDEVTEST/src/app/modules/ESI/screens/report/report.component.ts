import { Component, OnInit, AfterViewInit, ViewChild, HostListener } from '@angular/core';
import { LeaveService } from 'src/app/services/leave/leave.service';
import { SessionServiceService } from 'src/app/services/session/session-service.service';
import { AlertMessageService } from 'src/app/services/alert-message.service';
import { DataService } from 'src/app/services/data.service';
import { MatTableDataSource, MatPaginator, MatSort } from '@angular/material';
import { ConfirmationService } from 'primeng/api';
import { EsiService } from 'src/app/services/esi/esi.service';
import { MessageService } from 'primeng/api';


@Component({
  selector: 'app-report',
  templateUrl: './report.component.html',
  styleUrls: ['./report.component.css']
})
export class ReportComponent implements OnInit, AfterViewInit {
  displayedColumns: string[] = ['action', 'typeOfEngagement','COA','UniqCode','Template', 'empId', 'firstName', 'lastName', 'csu', 'subcsu','btu', 'subbtu', 'clientName', 'sowName', 'po', 'startDate', 'endDate', 'postingperiod','duration', 'invoiceEntity','timeHours','sellRate','sellRateUnits','sellCurrency','billableHoursPerDay','netTerms','invoicingFrequency','modeOfInvoiceDelivery','employeeType','location','worklocation','Endclientname','invoicetype','TotalAmount','Description','memo','InvoiceDate','InvoiceNumber','Salesrep','DeliveryManager','PrintAll'];

  showDropDown = false;
  list: any = [];
  checkedlist: any = [];
  isLoading = false;
  data = new MatTableDataSource();
  esiData: any =[];
  resultsLength = 0;
  @ViewChild(MatPaginator, { static: true }) paginator: MatPaginator;
  @ViewChild(MatSort, { static: true }) sort: MatSort;

  filter = {
    status: [],
    all: false,
    withdraw: false,
    inprogress: false,
    approved: false,
    rejected: false,
    toDate: "",
    fromDate: "",
    type: []
  }

  leaveTyps = [];
  onLeaves = [];
  constructor(
    private _service: EsiService,
    private _session: SessionServiceService,
    private dataService: DataService,
    private _cservic: ConfirmationService,
    private _alert: AlertMessageService,
    private messageService: MessageService) { }

  ngOnInit() {
    this.getESIData();
  }

  @HostListener('document:click', ['$event'])
  clickout(event) {
    //  if(this.showDropDown){
    //    this.showDropDown = false;
    //  }
  }

  ngAfterViewInit() {
    // If the user changes the sort order, reset back to the first page.
    //this.sort.sortChange.subscribe(() => this.paginator.pageIndex = 0);
    //this.paginator.page.subscribe((event) => console.log(event))

  }

  checkImage(avatar){
    if(avatar!= null && avatar!=undefined && avatar != "null" && avatar!="" )
      return avatar;
    return "assets/images/leave/default_avatar.svg";
  }

  reset() {
   
  }

  checkCount(e, i) {
    let index = this.esiData.findIndex(u=> u.id == e['id']);
    console.log(index)
    this.esiData[index]['isChecked'] = !this.esiData[index]['isChecked'];
    this.esiData = this.esiData;
  }

  checkAll(event) {
    this.esiData.forEach(element => {
      element['isChecked'] = event.target.checked;
    });
    this.resultsLength = this.esiData.length;
    this.data = new MatTableDataSource(this.esiData);
    this.data.paginator = this.paginator;
    this.data.sort = this.sort;
  }

  pushMbrData() {
    console.log("Inserting records");
    let selectedRecords = this.esiData.filter(element => element.isChecked == true);
    let selectedRecordsId = [];
    selectedRecords.forEach (record => {
      selectedRecordsId.push({"id":record.id,
      "emp_Id":record.emp_Id,
      "first_Name":record.first_Name,
      "last_Name": record.last_Name,
      "csu":record.csu,
      "btu":record.btu,
      "associateLocation":record.associateLocation,
      "clientName":record.clientName,
      "clientID":record.clientID,
      "sowName":record.sowName ,
      "sowid":record.sowid,
      "poNumber":record.poNumber,
      "sowEngagementType":record.sowEngagementType,
      "engagementID":record.engagementID,
      "startDate":record.startDate,
      "endDate":record.endDate,
      "months":record.months,
      "timeInvoiceEntity":record.timeInvoiceEntity,
      "timeHours":record.timeHours,
      "billingRate":record.billingRate,
      "billingUnit":record.billingUnit,
      "currency":record.currency,
      "invoiceamount":record.invoiceamount,
      "receivables_Account":record.receivables_Account,
      "description":record.description,
      "budgetHours":record.budgetHours,
      "frequencyType":record.frequencyType,
      "netTerms":record.netTerms,
      "modeofdelivery":record.modeofdelivery,
      "type":record.type,
      "location":record.location,
      "address":record.address,
      "endClient":record.endClient,
      "invoicestartdate":record.invoicestartdate,
      "invoiceenddate":record.invoiceenddate,
      "isActive":record.isActive,
      "refreshStatus":record.refreshStatus,
      "issinvoiced":record.issinvoiced,
      "invoiceNumber":record.invoiceNumber,
      "template":record.template,
      "uniqCode":record.uniqCode,
      "subBTU":record.subBTU,
      "posting_Period":record.posting_Period,
      "invoiceType":record.invoiceType,
      "btuid":record.btuid,
      "csuid":record.csuid,
      "sUbBTUID":record.sUbBTUID,
      "subCSU":record.subCSU,
      "subCSUID":record.subCSUID,
      "netsuitId":record.netsuitId,
      "invoiceDate":record.invoiceDate,
      "memo":record.memo,
      "invoiceCustomForm":record.invoiceCustomForm})
    });
    console.log(selectedRecordsId);
    if(selectedRecordsId.length > 0) {
      this.isLoading = true;
      this._service.PushESIdata(selectedRecordsId).subscribe((res: any) => {
        this.getESIData();
      }, err => {
        this.isLoading = false;
        this.messageService.add({ severity: 'error', summary: 'Error', detail: err.error.message });
        
      })
    }
    
  }

  deleteMbrDat() {
    console.log("Deleting records");
    let selectedRecords = this.esiData.filter(element => element.isChecked == true);
    let selectedRecordsId = [];
    selectedRecords.forEach (record => {
      selectedRecordsId.push({"ESIMasterId":record.id})
    });
    console.log(selectedRecordsId);
    if(selectedRecordsId.length > 0) {
      this.isLoading = true;
      this._service.DeActivateInvoice(selectedRecordsId).subscribe((res: any) => {
        this.getESIData();
      }, err => {
        this.isLoading = false;
        this.messageService.add({ severity: 'error', summary: 'Error', detail: err.error.message });
        
      })
    }
    
  }

  refreshData() {
    console.log("Deleting records");
    let selectedRecords = this.esiData.filter(element => element.isChecked == true);
    let selectedRecordsId = [];
    selectedRecords.forEach (record => {
      selectedRecordsId.push({"ESIMasterId":record.id})
    });
    console.log(selectedRecordsId);
    if(selectedRecordsId.length >0) {
      this.isLoading = true;
      this._service.RefreshInvoice(selectedRecordsId).subscribe((res: any) => {
        this.getESIData();
      }, err => {
        this.isLoading = false;
        this.messageService.add({ severity: 'error', summary: 'Error', detail: err.error.message });
        
      })
    }
    
  }
  

  getESIData() {
    console.log("Fetching esi Data");
    let payload = {
      "IsInitialLoad":"true",
      "Invoicestartdate":null,
      "Invoiceenddate":null,
      "CustomerId":null
    };
    this._service.GetESIdata(payload).subscribe((res: any) => {
      this.esiData = res;
      this.isLoading = false;
      this.resultsLength = this.esiData.length;
      this.data = new MatTableDataSource(this.esiData);
      this.data.paginator = this.paginator;
      this.data.sort = this.sort;

    }, err => {
      this.isLoading = false;
      this.messageService.add({ severity: 'error', summary: 'Error', detail: err.error.message });
      
    })
  }

  formatDate(date){
    try{
      return this.dataService.dateFormatter(date, "MM/dd/yy") ;
    }catch(e){}
    return date;
  }

  

}
