export interface Dossier {
    selectedWorkingOrder: any;
    dosId: string;
    dosDossierNumber: string;
    dosStatusLongName: string;
    dosIntakeDate: Date;
    dosIncidentDate: Date;
    dosCreatedDate: Date;
    dosIncidentCountryId: string;
    workingOrder: WorkingOrder[];
  }
  
  export interface WorkingOrder {
   
    woWorkingOrderNumber: string;
    workingorderCosts: WorkingorderCosts[];
  }
  
  export interface WorkingorderCosts {
    idworkingOrder: string;
    netAmount: number;
    taxAmount: number;
    grossAmount: number;
    quantity : number;
    taxRate : number;
    unitPrice : number;
    discount: string;

    services: Services;
  }
  
  export interface Services {
    serviceID: string;
    serviceCode: string;
    serviceShortName: string;
    serviceLongName: string;
  }