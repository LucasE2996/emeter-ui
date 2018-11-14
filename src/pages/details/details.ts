import { Component, OnInit } from '@angular/core';
import { IonicPage, NavController, NavParams} from 'ionic-angular';
import { MonitorDetailsModel } from '../../app/models/monitor-details.model';
import { MonitorService } from '../../app/services/monitor.service';
import { UserModel } from '../../app/models/user.model';
import { LoaderService } from '../../app/common/loader.service';

@IonicPage()
@Component({
  selector: 'page-details',
  templateUrl: 'details.html',
})
export class DetailsPage implements OnInit {

  public monitorFromServer: MonitorDetailsModel;
  private user: UserModel;
  private monitorId: string;

  constructor(
    public navCtrl: NavController,
    public navParams: NavParams,
    public readonly monitorService: MonitorService,
    public readonly loaginService: LoaderService
  ) { }

  ngOnInit(): void {
    this.loaginService.showLoader();
    this.user = JSON.parse(localStorage.getItem('currentUser'));
    this.monitorId = localStorage.getItem('monitorID');
    this.monitorService.getMonitorDetail(this.user.id, this.monitorId)
      .subscribe((monitor: MonitorDetailsModel) =>
        monitor ?
        this.monitorFromServer = monitor :
        this.monitorFromServer = {} as MonitorDetailsModel
      ).add(() => this.roundNumbers())
      .add(() => this.loaginService.dismissLoading());
  }

  // Test purposes
  public update(): void {
    this.loaginService.showLoader();
    this.monitorService.getMonitorDetail(this.user.id, this.monitorId)
      .subscribe((monitor: MonitorDetailsModel) =>
        monitor ?
        this.monitorFromServer = monitor :
        this.monitorFromServer = {} as MonitorDetailsModel
      ).add(() => this.roundNumbers())
      .add(() => this.loaginService.dismissLoading());
  }

  private roundNumbers(): void {
    this.monitorFromServer.report.dayAverage = Math.round(this.monitorFromServer.report.dayAverage * 100) / 100;
    this.monitorFromServer.report.weekAverage = Math.round(this.monitorFromServer.report.weekAverage * 100) / 100;
    this.monitorFromServer.report.monthAverage = Math.round(this.monitorFromServer.report.monthAverage * 100) / 100;
  }
}
