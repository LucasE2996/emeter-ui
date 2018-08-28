import { Component, OnInit } from '@angular/core';
import { IonicPage, NavController, NavParams } from 'ionic-angular';
import { DetailsModel } from '../../app/models/monitor-details.model';

@IonicPage()
@Component({
  selector: 'page-details',
  templateUrl: 'details.html',
})
export class DetailsPage implements OnInit{

  public monitorFromServer: DetailsModel;

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
    } as DetailsModel
  }

}
