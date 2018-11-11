import { Component, OnInit } from '@angular/core';
import { IonicPage, NavController, NavParams, LoadingController } from 'ionic-angular';
import { MonitorDetailsModel } from '../../app/models/monitor-details.model';
import { MonitorService } from '../../app/services/monitor.service';
import { UserModel } from '../../app/models/user.model';

@IonicPage()
@Component({
  selector: 'page-details',
  templateUrl: 'details.html',
})
export class DetailsPage implements OnInit {

  public monitorFromServer: MonitorDetailsModel;
  private user: UserModel;
  private monitorId: string;

  private loader = this.loadingCtrl.create({
    content: "Please wait...",
    duration: 2000
  });

  constructor(
    public navCtrl: NavController,
    public navParams: NavParams,
    public loadingCtrl: LoadingController,
    public readonly monitorService: MonitorService
  ) { }

  ngOnInit(): void {
    this.loader.present();
    this.user = JSON.parse(localStorage.getItem('currentUser'));
    this.monitorId = localStorage.getItem('monitorID');
    this.monitorService.getMonitorDetail(this.user.id, this.monitorId)
      .subscribe((monitor: MonitorDetailsModel) =>
        monitor ?
        this.monitorFromServer = monitor :
        this.monitorFromServer = {} as MonitorDetailsModel
      );
  }

  ionViewDidLoad() {
  }

  // Test purposes
  public update(): void {
    this.monitorService.getMonitorDetail(this.user.id, this.monitorId)
      .subscribe((monitor: MonitorDetailsModel) =>
        monitor ?
        this.monitorFromServer = monitor :
        this.monitorFromServer = {} as MonitorDetailsModel
      );
  }
}
