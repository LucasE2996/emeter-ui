import { NgModule, ErrorHandler } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';
import { IonicApp, IonicModule, IonicErrorHandler } from 'ionic-angular';
import { MyApp } from './app.component';
import { GaugeModule } from 'angular-gauge';

import { AddMeterPage } from '../pages/add-meter/add-meter';
import { MeterListPage } from '../pages/meter-list/meter-list';
import { TabsPage } from '../pages/tabs/tabs';

import { StatusBar } from '@ionic-native/status-bar';
import { SplashScreen } from '@ionic-native/splash-screen';
import { DetailsPage } from '../pages/details/details';

@NgModule({
  declarations: [
    MyApp,
    AddMeterPage,
    MeterListPage,
<<<<<<< HEAD
    TabsPage
=======
    TabsPage,
    DetailsPage
>>>>>>> :file name fix
  ],
  imports: [
    BrowserModule,
    IonicModule.forRoot(MyApp),
    GaugeModule.forRoot()
  ],
  bootstrap: [IonicApp],
  entryComponents: [
    MyApp,
    AddMeterPage,
    MeterListPage,
<<<<<<< HEAD
    TabsPage
=======
    TabsPage,
    DetailsPage
>>>>>>> :file name fix
  ],
  providers: [
    StatusBar,
    SplashScreen,
    {provide: ErrorHandler, useClass: IonicErrorHandler}
  ]
})
export class AppModule {}
