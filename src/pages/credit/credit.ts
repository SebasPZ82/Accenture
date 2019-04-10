import { Component } from '@angular/core';
import { NavController, NavParams } from 'ionic-angular';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { AlertsProvider } from '../../providers/providers'
import { ValidateDateProvider } from '../../providers/providers'

@Component({
  selector: 'page-credit',
  templateUrl: 'credit.html',
})
export class CreditPage {

  validForm: FormGroup;
  minOldMonts: number = 18;
  day: any;
  dataUser: any;
  nit: any;

  constructor(public navCtrl: NavController, public formBuilder: FormBuilder, public navParams: NavParams, public alertsProvider: AlertsProvider, public validateDateProvider: ValidateDateProvider) {
    this.dataUser = this.navParams.get('userData')
    console.log(this.dataUser)
    this.validForm = this.formBuilder.group({
      name: ['', Validators.required],
      nit: ['', Validators.required],
      salary: ['', Validators.compose([Validators.maxLength(8), Validators.pattern('^[0-9]*$'), Validators.required])],
      date: ['', Validators.required]
    });
    this.validForm.controls.nit.valueChanges.subscribe(val => {
      if (val.length == 1 && this.validForm.value.nit.length != 2) {
        this.validForm.controls.nit.setValue(val + '-', { emitEvent: false })
      }
    });
  }


  credit() {
    this.day = this.validateDateProvider.validateYears(this.validForm.controls.date.value)
    console.log(this.day)
    if (this.day.today) {
      if (this.minOldMonts > this.day.months) {
        this.alertsProvider.toastController("Lo sentimos, tienes que contar con minimo año y medio en tu empresa");
        return
      }
    }

    if (this.validForm.controls.salary.value > 800000) {
      if (this.validForm.controls.salary.value < 1000000) {
        this.alertsProvider.alertController("Felicitaciones", "Su credito fue aprobado por 5.000.000");
      } else {
        if (this.validForm.controls.salary.value < 4000000) {
          this.alertsProvider.alertController("Felicitaciones", "Su credito fue aprobado por 20.000.000");
        } else
          this.alertsProvider.alertController("Felicitaciones", "Su credito fue aprobado por 50.000.000");
      }
    } else {
      this.alertsProvider.alertController("Lo sentimos", "Su salario es menor a 800.000, su credito no puede ser aprobado");
    }

  }
}
