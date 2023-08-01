import { Injectable } from '@angular/core';

@Injectable({
  providedIn: 'root'
})
export class LocalstorageServiceService {

  constructor() { }
  storedossier( dossier: any) {
    localStorage.setItem('myDossierKey', JSON.stringify(dossier));
  }

  getdossier(){
    return localStorage.getItem('myDossierKey')
  }
}


