export class TicketFormVM {
  productID: number = 0;
  reviewTypeId: number = 0;
  ticketPriority: string = "";
  summary: string = "";
  description: number = 0;
}
export class TicketDetailVM {
  productTicketId:string='';
    comments: string = "";
  createdDate: Date = new Date();
  description: string = "";
  editaccess: boolean = false;
  expGoLiveDate: string = "";
  modifiedDate: Date = new Date();
  prodDeployed: boolean = false;
  productID: number = 0;
  productName: string = "";
  productOwner: number = 0;
  productOwnerName: string = "";
  requestStatus: string = "";
  requesterId: number = 0;
  requesterName: string = "";
  reviewTypeId: number = 0;
  reviewTypeName: string = "";
  summary: string = "";
  ticketId: number = 0;
  ticketPriority: string = "";
  ticketStatus: string = "";
}

export class TicketPutVM {
  ticketId: number = 0;
  ticketStatus: string = "";
  ticketPriority: string = "";
  requestStatus: string = "";
  expGoLiveDate: string = "";
  comments: string = "";
  prodDeployed: boolean = false;
}
