import { Component, OnInit } from '@angular/core';
import { NavController } from 'ionic-angular';
import { MonitorListItem } from '../../app/models/monitor-list-item.model';
import { DetailsPage } from '../details/details';
import { LoadingController } from 'ionic-angular';


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
    public loadingCtrl: LoadingController
  ) { }

  ngOnInit() {
    this.loader.present();
    // TODO: retriver this items from server.s
    this.items = [];
    this.items.push(this.buildMonitorItem('Teste 01'));
    this.items.push(this.buildMonitorItem('Teste 02'));
    this.items.push(this.buildMonitorItem('Teste 03'));
    this.items.push(this.buildMonitorItem('Teste 04'));
  }

  /**
   * Perform the screen navigation to the item details page.
   * 
   * @param item the item selected items list.
   */
  public itemSelected(item: MonitorListItem): void {
    this.navCtrl.push(DetailsPage);
  }

  // for test porouses
  private buildMonitorItem(name: string): MonitorListItem {
    return {
      name
    } as MonitorListItem;
  }

}
