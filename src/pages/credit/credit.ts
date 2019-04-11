import { Component } from '@angular/core';
import { NavController, NavParams, LoadingController } from 'ionic-angular';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { AlertsProvider } from '../../providers/providers'
import { ValidateDateProvider } from '../../providers/providers'

@Component({
  selector: 'page-credit',
  templateUrl: 'credit.html',
})
export class CreditPage {

  validForm: FormGroup;  //validaciones del form en el html
  minOldMonts: number = 18; //edad minima de los meses para trabajo en la plataforma
  day: any; //variable de validacion de dia
  dataUser: any; //variable que recibe los datos de registro de un usuario

  constructor(public navCtrl: NavController, public formBuilder: FormBuilder, public navParams: NavParams,
    public alertsProvider: AlertsProvider, public validateDateProvider: ValidateDateProvider, private loadingCtrl: LoadingController) {
    this.dataUser = this.navParams.get('userData') //Parametros que envia la pagina de registro
    this.validForm = this.formBuilder.group({ //Validacion de los campos en el formulario
      name: ['', Validators.required],
      nit: ['', Validators.compose([Validators.pattern('[0-9-]+'), Validators.required])],
      salary: ['', Validators.compose([Validators.maxLength(8), Validators.pattern('^[0-9]*$'), Validators.required])],
      date: ['', Validators.required]
    });
    this.validForm.controls.nit.valueChanges.subscribe(val => { //Metodo que inserta el "-" en el nit para que no tenga problemas de validacion
      if (val.length == 1 && this.validForm.value.nit.length != 2) {
        this.validForm.controls.nit.setValue(val + '-', { emitEvent: false })
      }
    });
  }


  credit() {
    if (!this.validForm.valid) { //valida si el usuario toco los inputs en el formulario
      for (let key of Object.keys(this.validForm.controls)) {
        this.validForm.controls[key].markAsTouched()
      }
      return
    }
    this.day = this.validateDateProvider.validateYears(this.validForm.controls.date.value) //Servicio que valida los meses de trabajo del usuario
    if (this.day.today) {
      if (this.minOldMonts > this.day.months) {
        this.alertsProvider.toastController("Lo sentimos, tienes que contar con minimo año y medio en tu empresa");
        return
      }
    }
    let loading = this.loadingCtrl.create({ //Creacion de loading para las salida de datos
      spinner: 'hide',
      content: `<img src="assets/imgs/loading.gif" />`
    });
    loading.present();
    if (this.validForm.controls.salary.value > 800000) { //Valida que el usuario tenga un salario mayor a 800.000
      if (this.validForm.controls.salary.value < 1000000) {  //Valida que el usuario tenga un salario menor a 1.000.000
        loading.dismiss();
        this.alertsProvider.alertController("Felicitaciones", "Su credito fue aprobado por 5.000.000");
      } else {
        if (this.validForm.controls.salary.value < 4000000) {  //Valida que el usuario tenga un salario entre 1.000.000 a 4.000.000
          loading.dismiss();
          this.alertsProvider.alertController("Felicitaciones", "Su credito fue aprobado por 20.000.000");
        } else {//Si su salario es mayor a 4.000.000 obtiene el mayor credito
          loading.dismiss();
          this.alertsProvider.alertController("Felicitaciones", "Su credito fue aprobado por 50.000.000");
        }
      }
    } else { //Si el usuario no cuenta con un credito mayor a 800.000 no se asigna el credito
      loading.dismiss();
      this.alertsProvider.alertController("Lo sentimos", "Su salario es menor a 800.000, su credito no puede ser aprobado");
    }

  }
}
