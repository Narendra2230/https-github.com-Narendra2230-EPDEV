export class SowShiftRoster{
  projectId:number=0;
  lstShiftDetails:lstShiftDetails[]=[];
}
export class lstShiftDetails{
  shiftID:number=0;
  shiftName:string='';
  assigned:boolean=null;
}
