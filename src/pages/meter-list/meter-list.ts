import { Component, OnInit } from '@angular/core';
import { NavController } from 'ionic-angular';
import { MonitorListItem } from '../../app/models/monitor-list-item.model';
import { DetailsPage } from '../details/details';
import { LoadingController } from 'ionic-angular';
import { MonitorService } from '../../app/services/monitor.service';
import { MonitorDetailsModel } from '../../app/models/monitor-details.model';
import { UserModel } from '../../app/models/user.model';


@Component({
  selector: 'page-meter-list',
  templateUrl: 'meter-list.html'
})
export class MeterListPage implements OnInit {

  public items: Array<MonitorListItem>;

  private loader = this.loadingCtrl.create({
    content: "Please wait...",
    duration: 3000
  });

  constructor(
    public navCtrl: NavController,
    public loadingCtrl: LoadingController,
    public readonly monitorService: MonitorService
  ) { }

  ngOnInit() {
    this.loader.present();
    localStorage.removeItem('monitorID');
    const customer: UserModel = JSON.parse(localStorage.getItem('currentUser'));
    this.monitorService.getAllMonitors(customer.id)
      .subscribe((monitors: Array<MonitorDetailsModel>) => {
        monitors ?
        this.items = this.monitorService.mapMonitorDetailtoList(monitors) :
        this.items = []
      });
  }

  /**
   * Perform the screen navigation to the item details page.
   * 
   * @param item the item selected items list.
   */
  public itemSelected(item: MonitorListItem): void {
    localStorage.setItem('monitorID', item.id)
    this.navCtrl.push(DetailsPage);
  }
}
