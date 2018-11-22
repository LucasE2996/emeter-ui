import { Component, OnInit } from '@angular/core';
import { NavController, ActionSheetController } from 'ionic-angular';
import { MonitorListItem } from '../../app/models/monitor-list-item.model';
import { DetailsPage } from '../details/details';
import { MonitorService } from '../../app/services/monitor.service';
import { MonitorDetailsModel } from '../../app/models/monitor-details.model';
import { UserModel } from '../../app/models/user.model';
import { LoaderService } from '../../app/common/loader.service';
import { EfficiencyPage } from '../efficiency/efficiency';
import { GraphicPage } from '../graphic/graphic';


@Component({
  selector: 'page-meter-list',
  templateUrl: 'meter-list.html'
})
export class MeterListPage {

  public items: Array<MonitorListItem>;

  constructor(
    public navCtrl: NavController,
    public readonly loadingService: LoaderService,
    public readonly monitorService: MonitorService,
    public actionSheetCtrl: ActionSheetController
  ) { }

  public ionViewDidEnter() {
    this.loadingService.showLoader();
    localStorage.removeItem('monitorID');
    const customer: UserModel = JSON.parse(localStorage.getItem('currentUser'));
    this.monitorService.getAllMonitors(customer.id)
      .subscribe((monitors: Array<MonitorDetailsModel>) => {
        monitors ?
        this.items = this.monitorService.mapMonitorDetailtoList(monitors) :
        this.items = []
      }).add(() => this.loadingService.dismissLoading());
  }

  /**
   * Perform the screen navigation to the item details page.
   * 
   * @param item the item selected items list.
   */
  public itemSelected(item: MonitorListItem): void {
    localStorage.setItem('monitorID', item.id)
    this.presentActionSheet();
  }

  private presentActionSheet(): void {
    const actionSheet = this.actionSheetCtrl.create({
      buttons: [
        {
          text: 'Details',
          icon: 'md-document',
          handler: () => {
            this.navCtrl.push(DetailsPage);
          }
        },{
          text: 'Efficiency',
          icon: 'ios-speedometer',
          handler: () => {
            this.navCtrl.push(EfficiencyPage);
          }
        },{
          text: 'Graphic',
          icon: 'md-analytics',
          handler: () => {
            this.navCtrl.push(GraphicPage);
          }
        },{
          text: 'Exit',
          role: 'cancel',
          icon: 'ios-close-circle',
          handler: () => {
            console.log('exit');
          }
        }
      ]
    });
    actionSheet.present();
  }
}
