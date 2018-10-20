import { Component, OnInit } from '@angular/core';
import { IonicPage, NavController, NavParams } from 'ionic-angular';
import { MonitorDetailsModel } from '../../app/models/monitor-details.model';

@IonicPage()
@Component({
  selector: 'page-details',
  templateUrl: 'details.html',
})
export class DetailsPage implements OnInit {

  public monitorFromServer: MonitorDetailsModel;

  constructor(
    public navCtrl: NavController,
    public navParams: NavParams
  ) { }

  ngOnInit(): void {
    this.bootsTrap();
  }

  ionViewDidLoad() {
  }
 
  /**
   * Initializes screen with needed data.
   */
  private bootsTrap(): void {
    // TODO get this data with service.
    this.monitorFromServer = {
      name: 'Teste01',
      maxPower: 300,
      powerAvarage: 150,
      value: 200
    } as MonitorDetailsModel

  }

  // Test purposes
  public animate(): void {
    if (this.monitorFromServer.value === 250) {
      this.monitorFromServer.value = 100;
    } else {
      this.monitorFromServer.value = 250;
    }
  }
}
