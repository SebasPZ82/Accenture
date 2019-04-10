import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { ToastController, AlertController } from 'ionic-angular';


@Injectable()
export class AlertsProvider {

  constructor(public http: HttpClient, private toastCtrl: ToastController, private alertCtrl: AlertController) {
  }

  toastController(info: any) {
    let toast = this.toastCtrl.create({
      message: info,
      duration: 2000,
      position: 'bottom'
    });
    toast.present();
  }

  alertController(title: any, info: any) {
    let alert = this.alertCtrl.create({
      title: title,
      subTitle: info,
      buttons: ["Aceptar"]
    });
    alert.present();
  }

}
