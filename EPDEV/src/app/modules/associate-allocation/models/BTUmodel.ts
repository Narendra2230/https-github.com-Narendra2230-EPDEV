export class BTUModel {
  name: string = "";
  totalResource: number = 0;
  allocatedPercent: any;
  totalAllocated: number = 0;
  totalNoAllocated: number = 0;
  fta: number = 0;
  ftaAllocated: number = 0;
  ftaNoAllocated: number = 0;
  contract: number = 0;
  contractAllocated: number = 0;
  contractNoAllocated: number = 0;
}
export class GoverningDTO{
  unitName:string='';
  allocated:number=0;
  billingFTAs:number=0;
  billingFTEs:number=0;
  ippocFTAs:number=0;
  ippocFTEs:number=0;
  notBillable:number=0;
  nonbillingFTEs:number=0;
  fullBenchHC:number=0;
  fullBenchFTEs:number=0;
  partBenchHeadcount:number=0;
  partBenchFTE:number=0;
  enablingTeamHC:number=0;
  enablingTeamFTE:number=0;
  elaFTE:number=0;
  elaHC:number=0;
  mlHC:number=0;
  ml:number=0;
  btuFTAUtilization:number=0;
  contractor:number=0;
  billingContractorsHC:number=0;
  billingContractorsFTE:number=0;
  nonBillingContractorsHC:number=0;
  nonBillingContractorsFTE:number=0;
  contractorNA:number=0;

}
