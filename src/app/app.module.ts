import { BrowserModule } from '@angular/platform-browser';
import { ErrorHandler, NgModule } from '@angular/core';
import { IonicApp, IonicErrorHandler, IonicModule } from 'ionic-angular';
import { SplashScreen } from '@ionic-native/splash-screen';
import { StatusBar } from '@ionic-native/status-bar';
import { HttpClientModule } from '@angular/common/http'; 

import { MyApp } from './app.component';
import { LoginPage } from '../pages/login/login';
import { CreditPage } from '../pages/credit/credit';
import { RegisterProvider } from '../providers/register/register';
import { AlertsProvider } from '../providers/alerts/alerts';
import { ValidateDateProvider } from '../providers/validate-date/validate-date';

@NgModule({
  declarations: [
    MyApp,
    LoginPage,
    CreditPage
  ],
  imports: [
    BrowserModule,
    HttpClientModule,
    IonicModule.forRoot(MyApp)
  ],
  bootstrap: [IonicApp],
  entryComponents: [
    MyApp,
    LoginPage,
    CreditPage
  ],
  providers: [
    StatusBar,
    SplashScreen,
    { provide: ErrorHandler, useClass: IonicErrorHandler },
    RegisterProvider,
    AlertsProvider,
    ValidateDateProvider
  ]
})
export class AppModule { }
