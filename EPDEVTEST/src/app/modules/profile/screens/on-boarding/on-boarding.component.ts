import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { ConfirmationService, MessageService } from 'primeng/api';
import { AlertMessageService } from 'src/app/services/alert-message.service';
import { DataService } from 'src/app/services/data.service';
import { EncryptionService } from 'src/app/services/encryption.service';
import { ProfileService } from 'src/app/services/profile/profile.service';
import { SessionServiceService } from 'src/app/services/session/session-service.service';
import { TimesheetService } from 'src/app/services/time-sheet/timesheet.service';

@Component({
  selector: 'app-on-boarding',
  templateUrl: './on-boarding.component.html',
  styleUrls: ['./on-boarding.component.css']
})
export class OnBoardingComponent implements OnInit {
  current_empID: any;
  employeeTravelDetails: any = [];
  userType: any;
  boardingDocs: any;
  uploadeDocs: any;
  isSubmitLoading: boolean;
  selectedFileObj: any;
  isLoading: boolean;
  isLoading1: boolean;

  constructor(private _service: TimesheetService,
    private dataService: DataService,
    private profileService: ProfileService,
    private session: SessionServiceService,
    private active_route: ActivatedRoute,
    private confirmationService: ConfirmationService,
    private _alert: AlertMessageService, private _msg: MessageService,
    private encryptionService: EncryptionService) {

    this.userType = this.active_route.snapshot.params['userType'];
    this.current_empID =  this.encryptionService.deCryptEmpID(this.active_route.snapshot.params['empID']);
  }

  confirm(data) {
    this.confirmationService.confirm({
      message: 'Are you sure that you want to Delete this document?',
      accept: () => {
        this.DelOnboardUploadedDoc(data);
      }
    });
  }

  ngOnInit() {
    this.GetOnBoardingDocs();
    this.GetOnBoardingEmpUploadedDocs();
  }

  uploadDocument(fileUri, fileName, fileExtension) {
    const selectedFileObj = this.selectedFileObj;
    console.log(this.selectedFileObj)
    const payload = [
      {
        "fileName": fileName,
        "filePath": fileUri,
        "fileExtension": fileExtension,
        "emp_Id": this.current_empID,
        "documentType": null,
        "documentId": selectedFileObj.documentId,
        "fileContentLength": null,
        "policyTypeId": selectedFileObj.policyTypeId
      }
    ]
    this.isLoading = true;
    this.profileService.PostOnBoardingDocs(payload).subscribe(res => {
      this.isLoading = false;
      this.GetOnBoardingEmpUploadedDocs();
    })
  }
  DelOnboardUploadedDoc(data) {
    const selectedFileObj = this.selectedFileObj;
    console.log(this.selectedFileObj)
    const payload = 
      {
        "emp_Id": this.current_empID,
        "empUploadedId": data.empUploadedId
      }
    
    this.isLoading1 = true;
    this.profileService.DelOnboardUploadedDoc(payload).subscribe(res => {
      this.isLoading1 = false;
      this._alert.succuss(res);
      this.GetOnBoardingEmpUploadedDocs();
    })
  }

  uploadDocs(doc, $event) {
    console.log(doc, $event);
    this.selectedFileObj = doc;
    const file = $event.target.files;
    this.uploadFile(file[0]);
  }

  getImageURI(str) {
    if (str === '') {
      return '';
    }
    const uid = this.session.getAssociateId();
    const uname = this.session.getUserNameWithUnderScore();
   // return `http://epstaging.suneratech.com/Content/Timesheets/${uid}_${uname}/${str}`;
      return `https://ep.suneratech.com/Content/Timesheets/${uid}_${uname}/${str}`;

  }

  uploadFile(file) {
    this.isLoading = true;
    const formData = new FormData();
    formData.append('Default', file);
    formData.append('fileType', 'Default');
    formData.append('EmpId', this.session.getUserID().toString());
    file.inProgress = true;
    this.profileService.GenFileUpload(formData).subscribe((event: any) => {
      // if (typeof (event) === 'object') {
      console.log(this.getImageURI(event));
      // }
      const fileName = ''; const fileExtension = '';
      this.uploadDocument(event, file.name, file.type);
      this.isLoading = false;
    }, error => {
      this._alert.error("Error while Uploading.");
      // this.uploadDocument("http://localhost:4200/#/on-boarding/2593", "chandra.png", ".png");
      this.isLoading = false;
    });

  }

  getRout() {
    const url = '/profile-landing';
    if (this.userType) {
      return `${url}/${this.userType}/${this.encryptionService.enCryptEmpID(this.current_empID)}`;
    }
    return `${url}/${this.encryptionService.enCryptEmpID(this.current_empID)}`;
  }

  GetOnBoardingDocs() {
    this.isLoading = true;
    const payload = {
      EmpId: this.current_empID,
    };
    this.profileService.GetOnBoardingDocs(payload).subscribe(res => {
      this.boardingDocs = res;
      this.isLoading = false;
    })
  }

  GetOnBoardingEmpUploadedDocs() {
    this.isLoading1 = true;
    const payload = {
      EmpId: this.current_empID,
    };
    this.profileService.GetOnBoardingEmpUploadedDocs(payload).subscribe(res => {
      this.uploadeDocs = res;
      this.isLoading1 = false;
    })
  }
}