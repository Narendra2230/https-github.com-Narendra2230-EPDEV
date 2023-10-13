import { Component, OnInit, ViewChild } from "@angular/core";
import { ActivatedRoute } from "@angular/router";
import { DataService } from "src/app/services/data.service";
import { ProfileService } from "src/app/services/profile/profile.service";
import { AlertMessageService } from "./../../../../services/alert-message.service";
import { SessionServiceService } from "src/app/services/session/session-service.service";
import { TimesheetService } from "src/app/services/time-sheet/timesheet.service";
import { ConfirmationService, MessageService } from "primeng/api";
import { HttpClient } from "@angular/common/http";
import { EncryptionService } from "src/app/services/encryption.service";
// import data from '../../../../../assets/json/validations.json'
import { FormBuilder, FormControl, Validators, FormArray } from '@angular/forms';
import { Certificate } from "crypto";

declare var $:any

@Component({
  selector: "app-profile-info",
  templateUrl: "./profile-info.component.html",
  styleUrls: ["./profile-info.component.css"],
})
export class ProfileInfoComponent implements OnInit {
  validationFields: any = {};
  errorMessages = {};
  currentTab = "PI";
  public personalInfo: any = {};
  public empAssociateInfo: any = {};
  public empEmergancyContactInfo: any = {};
  public empEducationInfo: any = {};
  public empCertificationInfo: any = [];
  public empPreviousOrganizations: any = {};
  empKYCInfo: any = {};
  empDependentInfo: any = [];
  empPresentAddressInfo: any = [];
  current_empID: any;
  metaData: any = [];
  isSubmitLoading: boolean;
  userType: any;
  public mydate = "12/09/2021";
  public editable = false;
  locations: any = [];
  subLocations: any = [];
  bu: any = [];
  subBU: any = [];
  subTracks: any = [];

  PracticeList = [];
  SubPracticeList = [];
  CompetencyList = [];

  selectedPracticeList = [];
  selectedSubPracticeList = [];
  selectedCompetencyList = [];

  public isLoading1 = false;
  public isLoading2 = false;
  public isLoading3 = false;
  public isLoading4 = false;
  public isLoading5 = false;
  public isLoading6 = false;
  public isLoading7 = false;
  public isLoading8 = false;
  public isLoading9 = false;
  public isLoading10 = false;
  public isLoading11 = false;
  public isLoading12 = false;
  public isLoading13 = false;
  public isLoading14 = false;
  public isLoading15 = false;
  public isLoading16 = false;

  public preLoader1 = false;
  public preLoader2 = false;
  public preLoader3 = false;
  public preLoader4 = false;
  public preLoader5 = false;
  public preLoader6 = false;
  public preLoader7 = false;
  public preLoader8 = false;
  public preLoader9 = false;
  public preLoader10 = false;

  isUSEmp: boolean = false;
  privileges: any = [];
  isUSEmployee: boolean = false;

  skillForm:any;
  functionalForm:any;
  successMessage;
  errorMessage;
  functionalValues;
  functionalSuccessMessage;
  functionalErrorMessage;
  empId;
  empName;
  filePath = null;
  fileName;

  constructor(
    private _http: HttpClient,
    private _alert: AlertMessageService,
    private _service: TimesheetService,
    private dataService: DataService,
    private profileService: ProfileService,
    private session: SessionServiceService,
    private active_route: ActivatedRoute,
    private confirmationService: ConfirmationService,
    private _msg: MessageService,
    private encryptionService: EncryptionService,
    private fb: FormBuilder
  ) {
    if (this.session.getUserLocation() != "India") {
      this.isUSEmp = true;
    }
    this.userType = this.active_route.snapshot.params["userType"];
    this.current_empID = this.encryptionService.deCryptEmpID(
      this.active_route.snapshot.params["empID"]
    );

    this.getValidationFile();
    this.getPrivilegeFile();
  }

  getPrivilegeFile() {
    this._http.get("assets/json/privileges.json").subscribe((res) => {
      this.privileges = res;
    });
  }
  getValidationFile() {
    this._http.get("assets/json/validations.json").subscribe((res) => {
      this.validationFields = res;
    });
  }

  mulitselectChange(type, a, b, c) {
    console.log(type, a, b, c);
    if (type == "PracticeList") {
      this.getSubPractices();
    }
    if (type == "SubPracticeList") {
      this.getCompetency();
    }
    if (type == "BTU") {
      this.getPractices(a.target.value);
    }
  }
  getPractices(v) {
    const payload = {
      id: v,
      GroupName: "Practice",
    };
    this.profileService.GetDependencyDropDownValues(payload).subscribe(
      (res: any) => {
        if (res) {
          this.PracticeList = res;
          this.SubPracticeList = [];
          this.CompetencyList = [];

          this.selectedPracticeList = [];
          this.selectedSubPracticeList = [];
          this.selectedCompetencyList = [];
        }
      },
      (err) => {}
    );
  }
  getSubPractices() {
    const payload = {
      id: this.selectedPracticeList.map((s) => s.id).join(","),
      GroupName: "SubPractice",
    };
    this.profileService.GetDependencyDropDownValues(payload).subscribe(
      (res: any) => {
        if (res) {
          this.SubPracticeList = res || [];
          this.CompetencyList = [];

          this.selectedSubPracticeList = [];
          this.selectedCompetencyList = [];
        }
      },
      (err) => {}
    );
  }

  getCompetency() {
    const payload = {
      id: this.selectedSubPracticeList.map((s) => s.id).join(","),
      GroupName: "Competency",
    };
    this.profileService.GetDependencyDropDownValues(payload).subscribe(
      (res: any) => {
        if (res) {
          this.CompetencyList = res || [];
          this.selectedCompetencyList = [];
        }
      },
      (err) => {}
    );
  }

  checkPreviligies(field) {
    // try{
    let type = "USER";
    if (this.userType == "manager" || this.userType == "finance")
      type = "MANAGER";
    if (this.userType == "hr") type = "HR";
    const pr = this.privileges.find((p) => p.field == field);

    if (pr) {
      const { pemissions = [] } = pr;
      const pemission = pemissions.find((p) => p.role == type);
      if (pemission) {
        const { actions = [] } = pemission;
        return actions.includes("EDIT");
      }
    }
    // }catch(ex){}
    return true;
  }
  doValidations(type, data) {
    const errorMessages = {};
    const profileFields = this.validationFields[type];
    let isError = false;
    profileFields.forEach((e) => {
      const validations = e["validations"];
      validations.forEach((v) => {
        if (v == "required") {
          if (typeof data[e.key] == "string") {
            data[e.key] = (data[e.key] || "").trim();
          }
          if (
            data[e.key] == "" ||
            data[e.key] == undefined ||
            data[e.key] == null
          ) {
            if (data[e.key] !== 0 && data[e.key] !== "0") {
              isError = true;
              errorMessages[e.key] = `${[e.key]} validation error`;
            }
          }
        }
      });
    });
    this.errorMessages = errorMessages;
    console.log(errorMessages, isError);
    return isError;
  }
  hasError(field) {
    return this.errorMessages[field];
  }

  confirm(type, data) {
    this.confirmationService.confirm({
      message: "Do you want to delete this record?",
      accept: () => {
        if (type == "ORG") {
          // this.isLoading14 = true;
          data.isLoading = true;
          const payload = {
            Id: data.id,
            emp_Id: this.current_empID,
          };
          this.profileService
            .DeleteEmpPreviousOrganizations(payload)
            .subscribe((res) => {
              // this.isLoading14 = false;
              data.isLoading = false;
              this.getEmpPreviousOrganizations();
            });
        }
        if (type == "CRT") {
          // this.isLoading10 = true;
          data.isLoading = true;
          const payload = {
            Id: data.id,
            emp_Id: this.current_empID,
          };
          this.profileService
            .DeleteEmpCertificationInfo(payload)
            .subscribe((res) => {
              // this.isLoading10 = false;
              data.isLoading = false;
              this.getEmpCertificationInfo();
            });
        }
      },
    });
  }

  getRout() {
    const url = "/profile-landing";
    if (this.userType) {
      return `${url}/${this.userType}/${this.encryptionService.enCryptEmpID(
        this.current_empID
      )}`;
    }
    return `${url}/${this.encryptionService.enCryptEmpID(this.current_empID)}`;
  }
  addCert() {
    this.empCertificationInfo.unshift({
      id: null,
      emp_Id: this.current_empID,
      institutionName: "",
      certificateCode: null,
      certificateName: "",
      grade: "",
      version: null,
      certifiedOn: "",
      valid_Upto: "",
      isActive: false,
    });
  }

  addEmployer() {
    this.empPreviousOrganizations.unshift({
      id: null,
      emp_Id: this.current_empID,
      organization_Name: "",
      designation: "",
      from_Date: "",
      to_Date: "",
      reference_Name: null,
      reference_Contact: null,
      created_By: null,
      created_On: null,
      updated_By: null,
      updated_On: null,
      is_Active: false,
    });
  }

  ngOnInit() {
    this.empId = this.encryptionService.deCryptEmpID(this.active_route.snapshot.paramMap.get('empID'))
    this.init();
    this.skillForm = this.fb.group({
      skills: this.fb.array([this.addProductFormGroup()])
    });
    this.functionalForm = this.fb.group({
      skills: this.fb.array([this.addProductfunctionalFormGroup()])
    });
    let to = this.active_route.snapshot.queryParams["to"];
    if (to) this.currentTab = to;
    this.profileService.GetFunctionalDropDownValues().subscribe(
      (response:any)=>{
        this.functionalValues=response
      },
      (errorResponse)=>{
        console.log(errorResponse)
      }
    )
    let data = {
      "EmpId" : this.empId
    }

    this.profileService.GetFunctionalSkill(data).subscribe(
      (response:any)=>{
        if(response.length>0){
          (<FormArray>this.functionalForm.get("skills")).removeAt(0);
          const formArray = new FormArray([]);
          for(let i of response){
            formArray.push(this.fb.group({
              functionalSkill: i.functionalSkill,
              skillVersion: i.skillVersion,
              skillLevel : i.skillLevel,
              skillExperience:i.skillExperience,
              category:{value:i.category,disabled:true},
              empSkillId:i.empSkillId,
              empId : i.empId,
              employee:i.employee,
              functionalSkillId : i.functionalSkillId,
              status:i.status
            }));
          }
          this.functionalForm.setControl('skills', formArray);
        }
      },
      (errorResponse)=>{
        console.log(errorResponse)
      }
    )
    this.GetLocation();
    
    this.profileService.GetEmployeeSkills(data).subscribe(
      (response:any)=>{
        if(response.length>0){
          (<FormArray>this.skillForm.get("skills")).removeAt(0);
          const formArray = new FormArray([]);
          for(let i of response){
            formArray.push(this.fb.group({
              skillSet: i.skillSet,
              skillVersion: i.skillVersion,
              skillLevel : i.skillLevel,
              skillExperience:i.skillExperience,
              id:i.id,
              empId : i.empId,
              employeeName:i.employeeName,
              secondarySkillSet : i.secondarySkillSet,
              status:i.status
            }));
          }
          this.skillForm.setControl('skills', formArray);
        }
      },
      (errorResponse)=>{
        console.log(errorResponse)
      }
    )
    $(document).ready(()=> {
      $('.select2').select2({ width: '100%' });
      });
      $('.select2').on('select2:select',(e:any)=>{
        let ele = <HTMLInputElement>e.delegateTarget
        var formName = ele.attributes.getNamedItem('formControlName').value;
        console.log(formName)
        this.functionalForm.controls[formName].setValue(e.params.data.id);
        this.functionalForm.get(formName).clearValidators();
        this.functionalForm.get(formName).updateValueAndValidity();
      })
  }

  addProductFormGroup() {
    return this.fb.group({
      skillSet:['',[Validators.required]],
      skillVersion:['',[Validators.required]],
      skillLevel:['',[Validators.required]],
      skillExperience:['',[Validators.required]],
      id:[0],
      empId : [this.empId],
      employeeName:[''],
      secondarySkillSet : [''],
      status:[true]
    });
  }

  addProductfunctionalFormGroup(){
    return this.fb.group({
      functionalSkill:['',[Validators.required]],
      skillVersion:[null],
      skillLevel:['',[Validators.required]],
      skillExperience:['',[Validators.required]],
      empSkillId:[0],
      category:[{value:'',disabled:true}],
      empId : [this.empId],
      employee:[''],
      functionalSkillId : [''],
      status:[true]
    });
  }

  addProductButtonClick(): void {
    (<FormArray>this.skillForm.get("skills")).push(
      this.addProductFormGroup()
    );
  }

  addFunctionalProductButtonClick(): void {
    (<FormArray>this.functionalForm.get("skills")).push(
      this.addProductfunctionalFormGroup()
    );
  }

  delete(index){
    if(this.skillForm.value.skills[index].id == 0){
      (<FormArray>this.skillForm.get("skills")).removeAt(index)
      if(this.skillForm.value.skills.length == 0){
        (<FormArray>this.skillForm.get("skills")).push(
          this.addProductFormGroup()
        );
      }
    }
    else{
      let formData = {
        "id" : this.skillForm.value.skills[index].id
      }
      this.profileService.DeleteEmployeeSkill(formData).subscribe(
        (response:any)=>{
          (<FormArray>this.skillForm.get("skills")).removeAt(index)
          if(this.skillForm.value.skills.length == 0){
            (<FormArray>this.skillForm.get("skills")).push(
              this.addProductFormGroup()
            );
          }
          this.successMessage = response
          this.errorMessage = null
        },
        (errorResponse)=>{
          console.log(errorResponse)
        }
      )
      setTimeout(()=>{
        this.successMessage = null;
        this.errorMessage = null;
      },2500)
    }
  }

  deleteFunctional(index){
    if(this.functionalForm.value.skills[index].empSkillId == 0){
      (<FormArray>this.functionalForm.get("skills")).removeAt(index)
      if(this.functionalForm.value.skills.length == 0){
        (<FormArray>this.functionalForm.get("skills")).push(
          this.addProductfunctionalFormGroup()
        );
      }
    }
    else{
      let formData = {
        "id" : this.functionalForm.value.skills[index].empSkillId
      }
      this.profileService.DeleteFunctionalSkill(formData).subscribe(
        (response:any)=>{
          (<FormArray>this.functionalForm.get("skills")).removeAt(index)
          if(this.functionalForm.value.skills.length == 0){
            (<FormArray>this.functionalForm.get("skills")).push(
              this.addProductfunctionalFormGroup()
            );
          }
          this.functionalSuccessMessage = response
          this.functionalErrorMessage = null
        },
        (errorResponse)=>{
          console.log(errorResponse)
        }
      )
      setTimeout(()=>{
        this.functionalSuccessMessage = null;
        this.functionalErrorMessage = null;
      },2500)
    }
  }

  setCategory(event,i){
    const index = this.functionalValues.map(e => e.skillSet).indexOf(event);
    console.log(this.functionalValues[index]);
    (<FormArray>this.functionalForm.get("skills")).at(i).get('category').setValue(this.functionalValues[index].category);
    (<FormArray>this.functionalForm.get("skills")).at(i).get('functionalSkillId').setValue(this.functionalValues[index].functionalId);
  }

  GetLocation() {
    const payload = {
      Emp_ID: this.current_empID,
    };
    this.profileService.GetLocation(payload).subscribe((res) => {
      this.isUSEmployee = res["location"] == "US";
    });
  }

  tabClick(type, e) {
    e.preventDefault();
    this.currentTab = type;
  }

  init() {
    this.getPersonalInfo();
    this.getEmpAssociateInfo();
    this.getEmpEmergancyContactInfo();
    this.getEmpEducationInfo();
    this.getEmpCertificationInfo();
    this.getEmpPreviousOrganizations();
    this.GetEmpKYCInfo();
    this.GetEmpDependentInfo();
    this.GetEmpPresentAddressInfo();
    this.GetDropDownValues();
  }

  GetDropDownValues() {
    const payload = {
      EmpId: this.current_empID,
    };
    this.profileService.GetDropDownValues(payload).subscribe((res) => {
      this.metaData = res;
      this.locations = this.getMetaValues("Location");
      this.bu = this.getMetaValues("BU");
      this.dropDownChange("Location", {
        target: { value: this.empAssociateInfo["location"] },
      });
      this.dropDownChange("BU", {
        target: { value: this.empAssociateInfo["businessUnitId"] },
      });
      this.dropDownChange("TRACKS", {
        target: { value: this.empAssociateInfo["departmentId"] },
      });
    });
  }

  dropDownChange(type, e) {
    const value = e.target.value;
    if (type == "Location") {
      const Location = this.getMetaValues("Location");
      this.subLocations =
        (Location.find((e) => e.name == value) || {}).child || [];
    }

    if (type == "BU") {
      const BU = this.getMetaValues("BU");
      this.subBU = (BU.find((e) => e.id == value) || {}).child || [];
    }
    console.log(type, this.subBU);
    if (type == "TRACKS") {
      this.subTracks =
        (this.subBU.find((e) => e.id == value) || {}).child || [];
    }
  }

  getImageURI(str) {
    return str;
    //if (str === '') {
    //   return '';
    // }
    // const uid = this.session.getAssociateId();
    // const uname = this.session.getUserNameWithUnderScore();
    // return `http://epstaging.suneratech.com/Content/Timesheets/${uid}_${uname}/${str}`;
    //  return `https://ep.suneratech.com/Content/Timesheets/${uid}_${uname}/${str}`;
  }

  uploadAdhaar(data, $event, type,i) {
    console.log(i)
    console.log(type)
    const file = $event.target.files;
    const f = file[0];
    const ftype = f.type;
    const FileUploadPath = f.name;
    const Extension = FileUploadPath.substring(
      FileUploadPath.lastIndexOf(".") + 1
    ).toLowerCase();
    const AADHAR_TYPES = ["jpg", "png", "jpeg"];
    const CV_TYPES = ["docx", "doc", "pdf"];
    const PPIC_TYPES = ["jpg", "png", "jpeg"];
    const Certificate_Types = ["jpg", "png", "jpeg", "pdf"]
    if (type == "AADHAR") {
      if (!AADHAR_TYPES.includes(Extension)) {
        this._alert.error("File type should be JPG,JPEG,PNG only");
        return;
      }
    }
    if (type == "CV") {
      if (!CV_TYPES.includes(Extension)) {
        this._alert.error("File type should be docx,doc,pdf only");
        return;
      }
    }
    if (type == "PPIC") {
      if (!PPIC_TYPES.includes(Extension)) {
        this._alert.error("File type should be JPG,JPEG,PNG only");
        return;
      }
    }
    if (type == "Certificate") {
      if (!Certificate_Types.includes(Extension)) {
        this._alert.error("File type should be JPG,JPEG,PNG,PDF only");
        return;
      }
      this.empCertificationInfo[i].fileName = f.name;
    }
    this.uploadFile(file[0], data, type,i);
  }
  getfileName(v) {
    try {
      if (!v) return "No File";
      let vv = "";
      if (v.includes("\\")) {
        vv = v.split("\\");
      } else if (v.includes("/")) {
        vv = v.split("/");
      }
      if (vv.length == 0) return v;
      return vv[vv.length - 1];
    } catch (ex) {}
    return v;
  }

  uploadFile(file, data, type,index) {
    let param = "Default";
    if (type == "AADHAR") {
      param = "Aadhar";
    } else if (type == "CV") {
      param = "Resume";
    } else if (type == "PPIC") {
      param = "ProfilePic";
    }
    else if (type == "Certificate") {
      param = type;
    }
    this.isSubmitLoading = true;
    let formData = new FormData();
    console.log(file,this.empId)
    formData.append(param, file);
    formData.append("FileType", 'Certificate');
    formData.append("EmpId", this.empId);
    file.inProgress = true;
    this.profileService.GenFileUpload(formData).subscribe(
      (event: any) => {
        if(type == "Certificate"){
        this.empCertificationInfo[index].certificateFilePath = event
        }
        console.log(event)
        this._alert.succuss("Uploaded successfully.");
        this.isSubmitLoading = false;
        if (type == "AADHAR") {
          data["aadharFilePath"] = event;
          this.empKYCInfo = this.empKYCInfo;
          console.log(this.empKYCInfo);
        }
        if (type == "CV") {
          data["resumePath"] = event;
          this.personalInfo = this.personalInfo;
        }
        if (type == "PPIC") {
          data["profile_Picture"] = event;
          this.personalInfo = this.personalInfo;
        }
      },
      (error) => {
        this._alert.error("Error while Uploading.");
        this.isSubmitLoading = false;
      }
    );
  }

  getMetaValues(type) {
    try {
      const { metaData } = this;
      const data = metaData.find((e) => e.type == type);
      return data.values;
    } catch (e) {}
    return [];
  }

  changeData(date) {
    date.dateofWedding = date.dateofWedding
      ? this.dataService.dateFormatter(date.dateofWedding, "yyyy-MM-dd")
      : null;
    date.dateofBirth = date.dateofBirth
      ? this.dataService.dateFormatter(date.dateofBirth, "yyyy-MM-dd")
      : null;
    date.dateofJoining = date.dateofJoining
      ? this.dataService.dateFormatter(date.dateofJoining, "yyyy-MM-dd")
      : null;
    this.personalInfo = date;
  }

  getPersonalInfo() {
    const payload = {
      EmpId: this.current_empID,
    };
    this.isLoading1 = true;
    this.profileService.GetEmpPersonalInfo(payload).subscribe((res) => {
      // this.personalInfo = res;
      console.log(res)
      this.changeData(res);
      this.isLoading1 = false;
    });
  }

  empAssoInfo(empAInfo) {
    empAInfo.next_Appraisal_Date = empAInfo.next_Appraisal_Date
      ? this.dataService.dateFormatter(
          empAInfo.next_Appraisal_Date,
          "yyyy-MM-dd"
        )
      : null;
    // empAssociateInfo
    this.dropDownChange("Location", {
      target: { value: empAInfo["location"] },
    });
    this.dropDownChange("BU", {
      target: { value: empAInfo["businessUnitId"] },
    });
    this.dropDownChange("TRACKS", {
      target: { value: empAInfo["departmentId"] },
    });
    this.PracticeList = empAInfo["practice"];
    this.SubPracticeList = empAInfo["subPractice"];
    this.CompetencyList = empAInfo["competency"];

    this.selectedPracticeList = (empAInfo["practice"] || []).filter(
      (s) => s.isSelected
    );
    this.selectedSubPracticeList = (empAInfo["subPractice"] || []).filter(
      (s) => s.isSelected
    );
    this.selectedCompetencyList = (empAInfo["competency"] || []).filter(
      (s) => s.isSelected
    );

    // subPracticeId
    // practiceId
    // competencyId

    this.empAssociateInfo = empAInfo;
  }

  getEmpAssociateInfo() {
    this.isLoading4 = true;
    const payload = {
      EmpId: this.current_empID,
    };
    this.profileService.GetEmpAssociateInfo(payload).subscribe((res) => {
      this.empAssoInfo(res);
      // this.empAssociateInfo = res;
      this.isLoading4 = false;
    });
  }
  getEmpEmergancyContactInfo() {
    this.isLoading5 = true;
    const payload = {
      EmpId: this.current_empID,
    };
    this.profileService.GetEmpEmergancyContactInfo(payload).subscribe((res) => {
      this.empEmergancyContactInfo = res || {};
      this.isLoading5 = false;
    });
  }

  getEmpEducationInfo() {
    this.isLoading8 = true;
    this.isLoading9 = true;
    const payload = {
      EmpId: this.current_empID,
    };
    this.profileService.GetEmpEducationInfo(payload).subscribe((res) => {
      this.empEducationInfo = res || {};
      this.isLoading8 = false;
      this.isLoading9 = false;
    });
  }

  empKYC(empdata) {
    if (!empdata) return;
    empdata.passportExpiryDate = empdata.passportExpiryDate
      ? this.dataService.dateFormatter(empdata.passportExpiryDate, "yyyy-MM-dd")
      : null;
    this.empKYCInfo = empdata;
  }
  GetEmpKYCInfo() {
    this.isLoading2 = true;
    const payload = {
      EmpId: this.current_empID,
    };
    this.profileService.GetEmpKYCInfo(payload).subscribe((res) => {
      this.empKYC(res);
      // this.empKYCInfo = res || {};
      // this.isLoading = false;
      this.isLoading2 = false;
    });
  }

  empDependentInfoData(edid) {
    if (!edid) return;
    edid.fatherDOB = edid.fatherDOB
      ? this.dataService.dateFormatter(edid.fatherDOB, "yyyy-MM-dd")
      : null;
    edid.motherDOB = edid.motherDOB
      ? this.dataService.dateFormatter(edid.motherDOB, "yyyy-MM-dd")
      : null;
    edid.spouceDOB = edid.spouceDOB
      ? this.dataService.dateFormatter(edid.spouceDOB, "yyyy-MM-dd")
      : null;
    edid.child1DOB = edid.child2DOB
      ? this.dataService.dateFormatter(edid.child1DOB, "yyyy-MM-dd")
      : null;
    edid.child2DOB = edid.child2DOB
      ? this.dataService.dateFormatter(edid.child2DOB, "yyyy-MM-dd")
      : null;

    this.empDependentInfo = edid;
  }
  GetEmpDependentInfo() {
    this.isLoading3 = true;
    const payload = {
      EmpId: this.current_empID,
    };
    this.profileService.GetEmpDependentInfo(payload).subscribe((res) => {
      // this.empDependentInfo = res || {};
      this.empDependentInfoData(res);
      this.isLoading3 = false;
    });
  }

  GetEmpPresentAddressInfo() {
    this.isLoading6 = true;
    this.isLoading7 = true;
    const payload = {
      EmpId: this.current_empID,
    };
    this.profileService.GetEmpPresentAddressInfo(payload).subscribe((res) => {
      this.empPresentAddressInfo = res || {};
      this.isLoading6 = false;
      this.isLoading7 = false;
    });
  }

  empCertiInfo(empCInfo) {
    for (var i = 0; i < empCInfo.length; i++) {
      empCInfo[i].certifiedOn = empCInfo[i].certifiedOn
        ? this.dataService.dateFormatter(empCInfo[i].certifiedOn, "yyyy-MM-dd")
        : null;
      empCInfo[i].valid_Upto = empCInfo[i].valid_Upto
        ? this.dataService.dateFormatter(empCInfo[i].valid_Upto, "yyyy-MM-dd")
        : null;
        if(empCInfo[i].certificateFilePath){
        empCInfo[i].fileName = empCInfo[i].certificateFilePath.split('\\')[empCInfo[i].certificateFilePath.split('\\').length-1];
        }
      }
    this.empCertificationInfo = empCInfo;
  }

  getEmpCertificationInfo() {
    this.isLoading10 = true;
    const payload = {
      EmpId: this.current_empID,
    };
    this.profileService.GetEmpCertificationInfo(payload).subscribe((res) => {
      // this.empCertificationInfo = res || [];
      this.isLoading10 = false;
      this.empCertiInfo(res);
    });
  }

  empPreviousOrg(empPO) {
    for (var i = 0; i < empPO.length; i++) {
      empPO[i].from_Date = empPO[i].from_Date
        ? this.dataService.dateFormatter(empPO[i].from_Date, "yyyy-MM-dd")
        : null;
      empPO[i].to_Date = empPO[i].to_Date
        ? this.dataService.dateFormatter(empPO[i].to_Date, "yyyy-MM-dd")
        : null;
    }
    this.empPreviousOrganizations = empPO;
  }

  getEmpPreviousOrganizations() {
    const payload = {
      EmpId: this.current_empID,
    };
    this.isLoading11 = true;

    this.profileService
      .GetEmpPreviousOrganizations(payload)
      .subscribe((res) => {
        // this.empPreviousOrganizations = res;
        this.empPreviousOrg(res);
        this.isLoading11 = false;
      });
  }
  getNameParam(type, v) {
    if (type == "SUBLOCATION")
      return (
        ((this.subLocations || []).find((e) => e.id == v) || {}).name || ""
      );
    if (type == "SUBBU")
      return ((this.subBU || []).find((e) => e.id == v) || {}).name || "";
    if (type == "Designations")
      return (
        ((this.getMetaValues(type) || []).find((e) => e.name == v) || {})
          .name || ""
      );
    if (type == "Track")
      return ((this.subTracks || []).find((e) => e.id == v) || {}).name || "";
    return (
      ((this.getMetaValues(type) || []).find((e) => e.id == v) || {}).name || ""
    );
  }
  PutEmpAssociateInfo() {
    const personalInfo = this.empAssociateInfo;
    // console.log(this.empAssociateInfo)

    // console.log(this.selectedCompetencyList, this.selectedSubPracticeList, this.selectedCompetencyList, "--------------")
    const payload = {
      id: this.empAssociateInfo["id"],
      associateId: this.empAssociateInfo["associateId"],
      businessUnitId: this.empAssociateInfo["businessUnitId"],
      buname: this.getNameParam("BU", personalInfo["businessUnitId"]),
      departmentId: this.empAssociateInfo["departmentId"],
      sbuname: this.getNameParam("SUBBU", personalInfo["departmentId"]),
      track: this.empAssociateInfo["track"],
      trackname: this.getNameParam("Track", personalInfo["track"]),
      designation_Id: this.empAssociateInfo["designation_Id"],
      designatioN_NAME: this.getNameParam(
        "Designations",
        personalInfo["designation_Id"]
      ),
      employmentTypeID: this.empAssociateInfo["employmentTypeID"],
      employmenT_TYPE: this.getNameParam(
        "EmploymentType",
        personalInfo["employmentTypeID"]
      ),
      location: this.empAssociateInfo["location"],
      locatioN_NAME: this.empAssociateInfo["location"],
      subLocation: this.empAssociateInfo["subLocation"],
      report_Manager_Id: this.empAssociateInfo["report_Manager_Id"],
      reporT_MANAGER_NAME: this.getNameParam(
        "Manager",
        personalInfo["report_Manager_Id"]
      ),
      band: this.empAssociateInfo["band"],
      banD_NAME: this.getNameParam("Band", personalInfo["band"]),
      buddyId: this.empAssociateInfo["buddyId"],
      btuId: this.empAssociateInfo["btuId"],
      probitionStatus: this.empAssociateInfo["probitionStatus"],
      buddyName: this.getNameParam("Buddy", personalInfo["buddyId"]),
      next_Appraisal_Date: this.empAssociateInfo["next_Appraisal_Date"],
      company_Id: this.empAssociateInfo["company_Id"],
      companY_NAME: this.getNameParam("Company", personalInfo["company_Id"]),
      experience: this.empAssociateInfo["experience"],
      employeeGroup: this.empAssociateInfo["role_Id"],
      emP_GROUP_NAME: this.getNameParam(
        "EmployeeGroups",
        personalInfo["employeeGroup"]
      ),
      role_Id: this.empAssociateInfo["role_Id"],
      rolE_NAME: this.getNameParam("EPAccessRole", personalInfo["role_Id"]),
      profile_Picture: this.empAssociateInfo["profile_Picture"],
      ssn: this.empAssociateInfo["ssn"],
      paPersona: this.empAssociateInfo["performanceAssessmentTypeId"],
      performanceAssessmentType:
        this.empAssociateInfo["performanceAssessmentTypeId"],
      performanceAssessmentTypeId:
        this.empAssociateInfo["performanceAssessmentTypeId"],
      practicE_LEAD: this.getNameParam(
        this.empAssociateInfo["Practise"],
        this.empAssociateInfo["practiceLeadId"]
      ),
      practiceLeadId: this.empAssociateInfo["practiceLeadId"],
      LCAAssociateId: this.empAssociateInfo["lcaAssociateId"],
      PracticeId: this.selectedPracticeList.map((s) => s.id).join(","),
      SubPracticeId: this.selectedSubPracticeList.map((s) => s.id).join(","),
      CompetencyId: this.selectedCompetencyList.map((s) => s.id).join(","),
    };

    const payload1 = this.empAssociateInfo;
    payload1["PracticeId"] = this.selectedPracticeList
      .map((s) => s.id)
      .join(",");
    payload1["SubPracticeId"] = this.selectedSubPracticeList
      .map((s) => s.id)
      .join(",");
    payload1["CompetencyId"] = this.selectedCompetencyList
      .map((s) => s.id)
      .join(",");
    this.isLoading4 = true;
    this.profileService.PutEmpAssociateInfo(payload1).subscribe(
      (res) => {
        this.getEmpAssociateInfo();
        this._alert.succuss(res);
        this.isLoading4 = false;
      },
      (err) => {
        this._alert.error(err);
        this.isLoading4 = false;
      }
    );
  }
  preOrgSubmit(c) {
    //  if (this.doValidations('Employeement', this.empPreviousOrganizations)) {
    //    this._alert.error("Please complete Manditory Previous Organizations details..!");
    //    return;
    //  }
    c.isLoading = true;
    const payload = this.empPreviousOrganizations;
    this.profileService
      .PostOrPutEmpPreviousOrganizations(payload)
      .subscribe((res) => {
        this.getEmpPreviousOrganizations();
        this._alert.succuss(res);
        c.isLoading = false;
      });
  }

  //DONE
  crtSubmit(c) {
    // if (this.doValidations('Certificate', this.empCertificationInfo)) {
    //   this._alert.error("Please complete Manditory Certification Info details..!");
    //   return;
    // }
    c.isLoading = true;
    let payload = this.empCertificationInfo;
    this.profileService.PostOrPutEmpCertificationInfo(payload).subscribe(
      (res) => {
        this.getEmpCertificationInfo();
        this._alert.succuss(res);
        // this.isLoading10 = false;
        c.isLoading = false;
      },
      (err) => {
        this._alert.error("Oops..!");
        // this.isLoading10 = false;
        c.isLoading = false;
      }
    );
  }

  //Done
  eduSubmit1() {
    if (this.doValidations("academic", this.empEducationInfo)) {
      this._alert.error(
        "Please complete Manditory Academic Persenatge details..!"
      );
      return;
    }
    const payload = {
      empId: this.current_empID,
      ...this.empEducationInfo,
      userId: null,
    };
    this.isLoading9 = true;
    if (!payload["educationInfoId"]) {
      payload["educationInfoId"] = null;
      this.profileService.PostEmpEducationInfo(payload).subscribe(
        (res) => {
          this._alert.succuss(res);
          this.isLoading9 = false;
        },
        (err) => {
          this._alert.error(err);
          this.isLoading9 = false;
        }
      );
    } else {
      this.profileService.PutEmpEducationInfo(payload).subscribe(
        (res) => {
          this._alert.succuss(res);
          this.isLoading9 = false;
        },
        (err) => {
          this._alert.error(err);
          this.isLoading9 = false;
        }
      );
    }
    // this.profileService.PutEmpEducationInfo(payload).subscribe(res => {
    //   this._alert.succuss(res);
    //   this.isLoading9 = false;
    // }, err => {
    //   this._alert.error(err);
    //   this.isLoading9 = false;
    // });
  }
  //Done
  eduSubmit() {
    if (this.doValidations("qualification", this.empEducationInfo)) {
      this._alert.error(
        "Please complete Manditory Highest Qualification fields..!"
      );
      return;
    }
    this.isLoading8 = true;
    const payload = {
      ...this.empEducationInfo,
      empId: this.current_empID,
      userId: null,
    };
    console.log(payload);
    if (!payload["educationInfoId"]) {
      payload["educationInfoId"] = null;
      this.profileService.PostEmpEducationInfo(payload).subscribe(
        (res) => {
          this._alert.succuss(res);
          this.isLoading8 = false;
        },
        (err) => {
          this._alert.error(err);
          this.isLoading8 = false;
        }
      );
    } else {
      this.profileService.PutEmpEducationInfo(payload).subscribe(
        (res) => {
          this._alert.succuss(res);
          this.isLoading8 = false;
        },
        (err) => {
          this._alert.error(err);
          this.isLoading8 = false;
        }
      );
    }
  }

  //Done
  contactSubmit2() {
    if (this.doValidations("Permanentaddress", this.empPresentAddressInfo)) {
      this._alert.error(
        "Please complete Manditory Permanent Address fields..!"
      );
      return;
    }
    this.isLoading7 = true;
    const payload = {
      ...this.empPresentAddressInfo,
      empId: this.current_empID,
      userId: null,
      myProperty: null,
    };
    // empAddressId
    if (payload["empAddressId"]) {
      this.profileService.PostEmpAddressDetailsInfo(payload).subscribe(
        (res) => {
          this._alert.succuss(res);
          this.isLoading7 = false;
        },
        (err) => {
          this._alert.error(err);
          this.isLoading7 = false;
        }
      );
    } else {
      payload["empAddressId"] = null;
      this.profileService.PostEmpAddressDetailsInfo(payload).subscribe(
        (res) => {
          this._alert.succuss(res);
          this.isLoading7 = false;
        },
        (err) => {
          this._alert.error(err);
          this.isLoading7 = false;
        }
      );
    }
    console.log(payload);
  }

  //Done
  contactSubmit1() {
    if (this.doValidations("Presentaddress", this.empPresentAddressInfo)) {
      this._alert.error("Please complete Manditory Present Address fields..!");
      return;
    }

    this.isLoading6 = true;
    const payload = {
      ...this.empPresentAddressInfo,
      empId: this.current_empID,
      userId: null,
      myProperty: null,
    };
    console.log(payload);
    if (payload["empAddressId"]) {
      this.profileService.PostEmpAddressDetailsInfo(payload).subscribe(
        (res) => {
          this._alert.succuss(res);
          this.isLoading6 = false;
        },
        (err) => {
          this._alert.error(err);
          this.isLoading6 = false;
        }
      );
    } else {
      payload["empAddressId"] = null;
      this.profileService.PostEmpAddressDetailsInfo(payload).subscribe(
        (res) => {
          this._alert.succuss(res);
          this.isLoading6 = false;
        },
        (err) => {
          this._alert.error(err);
          this.isLoading6 = false;
        }
      );
    }
    // this.profileService.PutEmpAddressDetailsInfo(payload).subscribe(res => {
    //   this._alert.succuss(res);
    //   this.isLoading6 = false;
    // }, err => {
    //   this._alert.error("Oops..!");
    //   this.isLoading6 = false;

    // })
  }

  //DONE
  contactSubmit() {
    if (this.doValidations("Emergency", this.empEmergancyContactInfo)) {
      this._alert.error(
        "Please complete Manditory Emergency Contact fields..!"
      );
      return;
    }
    this.isLoading5 = true;
    const payload = {
      ...this.empEmergancyContactInfo,
      empId: this.current_empID,
      userId: null,
    };
    console.log(payload);
    if (payload["employeeEmergContactId"]) {
      this.profileService.PutEmergancyContactInfo(payload).subscribe(
        (res) => {
          this._alert.succuss(res);
          this.isLoading5 = false;
        },
        (err) => {
          this._alert.error("Oops..!");
          this.isLoading5 = false;
        }
      );
    } else {
      payload["employeeEmergContactId"] = null;
      this.profileService.PostEmergancyContactInfo(payload).subscribe(
        (res) => {
          this._alert.succuss(res);
          this.isLoading5 = false;
        },
        (err) => {
          this._alert.error("Oops..!");
          this.isLoading5 = false;
        }
      );
    }
  }

  //DONE
  dependentSubmit() {
    if (this.doValidations("dependent", this.empDependentInfo)) {
      this._alert.error(
        "Please complete Manditory Dependent Details fields..!"
      );
      return;
    }
    this.isLoading3 = true;
    console.log(this.getEmpAssociateInfo);
    const payload = {
      ...this.empDependentInfo,
      empId: this.current_empID,
      userName: null,
      userId: null,
    };
    if (!payload["dependentId"]) {
      payload["dependentId"] = null;
      this.profileService.PostEmpDependentInfo(payload).subscribe(
        (res) => {
          this._alert.succuss(res);
          this.isLoading3 = false;
        },
        (err) => {
          this._alert.error("Oops..!");
        }
      );
    } else {
      this.profileService.PutEmpDependentInfo(payload).subscribe(
        (res) => {
          this._alert.succuss(res);
          this.isLoading3 = false;
        },
        (err) => {
          this._alert.error("Oops..!");
          this.isLoading3 = false;
        }
      );
    }
  }
  //DONE
  kycSubmit() {
    if (this.doValidations("government", this.empKYCInfo)) {
      this._alert.error("Please complete Manditory Government ID fields..!");
      return;
    }
    this.isLoading2 = true;
    const payload = {
      ...this.empKYCInfo,
      empId: this.current_empID,
    };
    if (!payload["employeeKYCId"]) {
      payload["employeeKYCId"] = null;
      this.profileService.PostEmpKYCInfo(payload).subscribe(
        (res) => {
          this._alert.succuss(res);
          this.isLoading2 = false;
        },
        (err) => {
          this._alert.error("Oops..!");
          this.isLoading2 = false;
        }
      );
      return;
    }
    console.log(payload);
    this.profileService.PutEmpKYCInfo(payload).subscribe(
      (res) => {
        this._alert.succuss(res);
        this.isLoading2 = false;
      },
      (err) => {
        this._alert.error("Oops..!");
      }
    );
  }
  // DONE
  profileSubmit() {
    if (this.doValidations("personalInfo", this.personalInfo)) {
      this._alert.error("Please complete Manditory Personal Info fields..!");
      return;
    }
    this.isLoading1 = true;
    const payload = {
      empId: this.current_empID,
      ...this.personalInfo,
    };
    this.profileService.PutEmpPersonalInfo(payload).subscribe(
      (res) => {
        this.getPersonalInfo();
        this._alert.succuss(res);
        this.isLoading1 = false;
      },
      (err) => {
        this._alert.error("Oops..!");
        this.isLoading1 = false;
      }
    );
  }

  SaveSkills() {
    console.log(this.skillForm.value.skills)
    this.profileService.UpdateEmployeeSkills(this.skillForm.value.skills).subscribe(
      (response:any)=>{
        this.successMessage = response
        this.errorMessage = null
        let data = {
          "EmpId" : this.empId
        }
        this.profileService.GetEmployeeSkills(data).subscribe(
          (response:any)=>{
            if(response.length>0){
              (<FormArray>this.skillForm.get("skills")).removeAt(0);
              const formArray = new FormArray([]);
              for(let i of response){
                formArray.push(this.fb.group({
                  skillSet: i.skillSet,
                  skillVersion: i.skillVersion,
                  skillLevel : i.skillLevel,
                  skillExperience:i.skillExperience,
                  id:i.id,
                  empId : i.empId,
                  employeeName:i.employeeName,
                  secondarySkillSet : i.secondarySkillSet,
                  status:i.status
                }));
              }
              this.skillForm.setControl('skills', formArray);
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

    setTimeout(()=>{
      this.successMessage = null;
      this.errorMessage = null;
    },2500)
  }

  SaveFunctionalSkills(){
    console.log(this.functionalForm.getRawValue())
    this.profileService.UpdateFunctionalSkill(this.functionalForm.getRawValue().skills).subscribe(
      (response:any)=>{
        let data = {
          "EmpId" : this.empId
        }
        this.profileService.GetFunctionalSkill(data).subscribe(
          (response:any)=>{
            if(response.length>0){
              (<FormArray>this.functionalForm.get("skills")).removeAt(0);
              const formArray = new FormArray([]);
              for(let i of response){
                formArray.push(this.fb.group({
                  functionalSkill: i.functionalSkill,
                  skillVersion: i.skillVersion,
                  skillLevel : i.skillLevel,
                  skillExperience:i.skillExperience,
                  category:{value:i.category,disabled:true},
                  empSkillId:i.empSkillId,
                  empId : i.empId,
                  employee:i.employee,
                  functionalSkillId : i.functionalSkillId,
                  status:i.status
                }));
              }
              this.functionalForm.setControl('skills', formArray);
            }
          },
          (errorResponse)=>{
            console.log(errorResponse)
          }
        )
        this.functionalSuccessMessage = response
        this.functionalErrorMessage = null
      },
      (errorResponse)=>{
        console.log(errorResponse)
      }
    )

    setTimeout(()=>{
      this.functionalSuccessMessage = null;
      this.functionalErrorMessage = null;
    },2500)
  }

  updateResume(){
      var resumeData={
      EmpId:this.personalInfo.empId,
      ResumePath:this.personalInfo.resumePath
    }
    console.log(resumeData)
    this.profileService.updateResume(resumeData).subscribe(
      (res) => {
        this._alert.succuss(res);
        this.isLoading4 = false;
      },
      (err) => {
        this._alert.error(err);
        this.isLoading4 = false;
      }
    );
  }

}
