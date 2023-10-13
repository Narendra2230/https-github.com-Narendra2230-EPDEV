import { Injectable } from '@angular/core';

@Injectable({
  providedIn: 'root'
})
export class EncryptionService {

  constructor() { }
  public enCryptEmpID = (id) => {
    const enc = window.btoa(`${this.makeid(5)}^${id}^${this.makeid(5)}`);
    return enc;
  };
  public deCryptEmpID = (str) => {
    const dec = window.atob(str);
    const data = dec.split("^");
    return data[1];
  };
  private makeid(length) {
    var result = '';
    var characters = 'ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz0123456789';
    var charactersLength = characters.length;
    for (var i = 0; i < length; i++) {
      result += characters.charAt(Math.floor(Math.random() * charactersLength));
    }
    return result;
  }
}
