import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';

@Injectable()
export class ValidateDateProvider {

  totalDates: any = {}

  constructor(public http: HttpClient) {
  }

  validateDate(day: any) {
    var date = Date.now() - Date.parse(day)
    var age = new Date(date);
    return Math.abs(age.getUTCFullYear() - 1970)
  }

  validateMonts(day: any) {
    var date = Date.now() - Date.parse(day)
    var age = new Date(date);
    return Math.abs(age.getMonth())
  }

  validateYears(day: any) {
    var date = Date.parse(day)
    var age = new Date(date);
    var today = new Date();
    var months;
    months = (today.getFullYear() - age.getFullYear()) * 12;
    months -= age.getMonth() + 1;
    months += today.getMonth();
    return {
      months: months <= 0 ? 0 : months,
      today: today
    }
  }

}
