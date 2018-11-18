import { Component } from '@angular/core';
import { NavController, AlertController } from 'ionic-angular';
import { QRScanner, QRScannerStatus } from '@ionic-native/qr-scanner';
import { MonitorService } from '../../app/services/monitor.service';
import { MeterListPage } from '../meter-list/meter-list';
import { LoaderService } from '../../app/common/loader.service';

@Component({
  selector: 'page-add-meter',
  templateUrl: 'add-meter.html'
})
export class AddMeterPage {

  constructor(
    public navCtrl: NavController,
    public qrScanner: QRScanner,
    public readonly loadingService: LoaderService,
    public readonly monitorService: MonitorService,
    private readonly alertCtrl: AlertController
    ) {
      
    }

    /* public initializeQRCode(): void {
      // Optionally request the permission early
      this.qrScanner.prepare()
        .then((status: QRScannerStatus) => {
          if (status.authorized) {
            // camera permission was granted


            // start scanning
            let scanSub = this.qrScanner.scan().subscribe((text: string) => {
              console.log('Scanned something', text);

              this.qrScanner.hide(); // hide camera preview
              scanSub.unsubscribe(); // stop scanning
            });

          } else if (status.denied) {
            // camera permission was permanently denied
            // you must use QRScanner.openSettings() method to guide the user to the settings page
            // then they can grant the permission from there
          } else {
            // permission was denied, but not permanently. You can ask for permission again at a later time.
          }
        })
        .catch((e: any) => console.log('Error is', e));
    } */

    public initializeQRCode(): void {
      this.loadingService.showLoader();
      this.monitorService.createNewMonitor()
        .subscribe(() => {
          const alert = this.alertCtrl.create({
            title: 'SUCCESS',
            buttons: ['OK']
          });
          alert.setSubTitle('New Monitor created !!!');
          alert.present();
        })
        .add(() => () => this.loadingService.dismissLoading());
    }
    

}
