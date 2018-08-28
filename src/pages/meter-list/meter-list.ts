import { Component, OnInit } from '@angular/core';
import { NavController } from 'ionic-angular';
import { MonitorListItem } from '../../app/models/monitor-list-item.model';
import { DetailsPage } from '../details/details';

@Component({
  selector: 'page-meter-list',
  templateUrl: 'meter-list.html'
})
export class MeterListPage implements OnInit {

  items: Array<MonitorListItem>;

  constructor(
    public navCtrl: NavController
  ) { }

  ngOnInit() {
    // TODO: retriver this items from server.s
    this.items = [];
    this.items.push(this.buildMonitorItem());
  }

  public itemSelected(item: MonitorListItem): void {
    this.navCtrl.push(DetailsPage);
  }

  // for test porouses
  private buildMonitorItem(): MonitorListItem {
    return {
      name: 'Teste01'
    } as MonitorListItem;
  }

}
