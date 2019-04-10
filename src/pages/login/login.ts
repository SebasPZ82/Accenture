import { Component } from '@angular/core';
import { NavController } from 'ionic-angular';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { RegisterProvider } from '../../providers/providers'
import { AlertsProvider } from '../../providers/providers'
import { ValidateDateProvider } from '../../providers/providers'
import { CreditPage } from '../credit/credit';

@Component({
  selector: 'page-login',
  templateUrl: 'login.html'
})
export class LoginPage {

  validForm: FormGroup; //validaciones del form en el html
  minOldYear: number = 18; //edad minima de cumpleaños en la plataforma
  day: any; //variable de validacion de dia

  constructor(public navCtrl: NavController, public formBuilder: FormBuilder, public registerProvider: RegisterProvider, public alertsProvider: AlertsProvider, public validateDateProvider: ValidateDateProvider) {

    this.validForm = this.formBuilder.group({ //Validacion de los campos en el formulario
      firstname: ['', Validators.required],
      lastname: ['', Validators.required],
      identification: ['', Validators.compose([Validators.minLength(8), Validators.maxLength(12), Validators.pattern('^[0-9]*$'), Validators.required])],
      birthdate: ['', Validators.required]
    });

  }

  registerUserAccenture() { //Servicio que rectifica que los campos sean validos y los registra en firebase
    this.day = this.validateDateProvider.validateDate(this.validForm.controls.birthdate.value) //Servicio que valida el nacimiento del usuario
    if (this.minOldYear > this.day) {
      this.alertsProvider.toastController("No cuentas con la edad suficiente para solicitar un credito");
      return //Si tiene error retorna el toastController con una descricion del error
    }

    this.registerProvider.getUsers().subscribe(users => { //Servicio que trae los datos de usuario para verificar si el documento ya esta inscrito en la base de datos
      for (let user in users) {
        if (users[user].identification == this.validForm.controls.identification.value) {
          this.alertsProvider.toastController("El usuario ya se encuentra registrado");
          return //Si tiene error retorna el toastController con una descricion del error
        }
      }
      let registerData = { //Mapeo de campos para el envio de datos al formulario
        firstname: this.validForm.controls.firstname.value,
        lastname: this.validForm.controls.lastname.value,
        identification: this.validForm.controls.identification.value,
        birthdate: this.validForm.controls.birthdate.value
      }

      this.registerProvider.postRegister(registerData).subscribe(data => { //Servicio que envia los datos de usuario ya verificados para su ingreso en la base de datosF 
        this.alertsProvider.toastController("El usuario se ha registrado exitosamente");
        this.navCtrl.push(CreditPage, {
          userData: this.validForm.controls
        });
        //Si el servicio responde correctamente lo envia a la pagina de solicitud de credito
      }, error => {
        //Si tiene error retorna el toastController con una descricion del error
        this.alertsProvider.toastController("Ocurrio un error al registrar el usuario");
      })
    })
  }

}
