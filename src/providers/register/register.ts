import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';


@Injectable()
export class RegisterProvider {

  urlRegister: any = 'https://testbankapi.firebaseio.com/clients.json'

  constructor(public http: HttpClient) {
  }

  postRegister(registerData: any) {
    return this.http.post(this.urlRegister, registerData).pipe(result => {
      return result
    })
  }

  getUsers() {
    return this.http.get(this.urlRegister).pipe(result => {
      return result
    })
  }

}
