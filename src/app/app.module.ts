import { NgModule, ErrorHandler } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';
import { IonicApp, IonicModule, IonicErrorHandler } from 'ionic-angular';
import { MyApp } from './app.component';
import { GaugeModule } from 'angular-gauge';
import { QRScanner, QRScannerStatus } from '@ionic-native/qr-scanner';
import { IonicStorageModule } from '@ionic/storage';

import { AddMeterPage } from '../pages/add-meter/add-meter';
import { MeterListPage } from '../pages/meter-list/meter-list';
import { TabsPage } from '../pages/tabs/tabs';

import { StatusBar } from '@ionic-native/status-bar';
import { SplashScreen } from '@ionic-native/splash-screen';
import { DetailsPage } from '../pages/details/details';
import { LoginPage } from '../pages/login/login';
import { AuthenticationService } from './services/login.service';
import { MonitorService } from './services/monitor.service';
import { UserService } from './services/user.service';
import { FormsModule } from '@angular/forms';
import { HttpClientModule } from '@angular/common/http';

@NgModule({
  declarations: [
    MyApp,
    AddMeterPage,
    MeterListPage,
    TabsPage,
    DetailsPage,
    LoginPage
  ],
  imports: [
    BrowserModule,
    IonicModule.forRoot(MyApp),
    GaugeModule.forRoot(),
    IonicStorageModule.forRoot(),
    FormsModule,
    HttpClientModule
  ],
  bootstrap: [IonicApp],
  entryComponents: [
    MyApp,
    AddMeterPage,
    MeterListPage,
    TabsPage,
    DetailsPage,
    LoginPage
  ],
  providers: [
    StatusBar,
    SplashScreen,
    {provide: ErrorHandler, useClass: IonicErrorHandler},
    QRScanner,
    AuthenticationService,
    MonitorService,
    UserService
  ]
})
export class AppModule {}
