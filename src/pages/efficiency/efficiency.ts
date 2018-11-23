import { Component, OnInit } from '@angular/core';
import { NavController, NavParams } from 'ionic-angular';
import { MonitorService } from '../../app/services/monitor.service';
import { LoaderService } from '../../app/common/loader.service';
import { UserModel } from '../../app/models/user.model';
import { MonitorDetailsModel } from '../../app/models/monitor-details.model';
import { Observable } from 'rxjs';

@Component({
  selector: 'page-efficiency',
  templateUrl: 'efficiency.html',
})
export class EfficiencyPage implements OnInit {

  public monitorFromServer: MonitorDetailsModel;
  public status: string;
  public percentageValueLabel: (value: number) => string;
  public wattsLabel: (value: number) => string;
  public percentageValue: number;

  private user: UserModel;
  private monitorId: string;

  constructor(
    public navCtrl: NavController,
    public navParams: NavParams,
    public readonly monitorService: MonitorService,
    public readonly loaginService: LoaderService
    ) 
    { 
      this.wattsLabel = ((value: number) => `${Math.round(value)} w`);
      this.percentageValueLabel = ((value: number) => `${Math.round(value)} %`);
    }

  public ngOnInit(): void {
    this.loaginService.showLoader();
    this.user = JSON.parse(localStorage.getItem('currentUser'));
    this.monitorId = localStorage.getItem('monitorID');
    this.monitorService.getMonitorDetail(this.user.id, this.monitorId)
      .subscribe((monitor: MonitorDetailsModel) =>
      { 
        monitor ?
        this.monitorFromServer = monitor :
        this.monitorFromServer = {} as MonitorDetailsModel;
        this.setPercentageValue(monitor.diversion);
        this.updateStatus();
      }
      ).add(() => {
        this.roundNumbers();
      })
      .add(() => this.loaginService.dismissLoading());
  }

  public ionViewDidEnter(): void {
    Observable.interval(10000).takeWhile(() => true).subscribe(() => {
      this.update();
      this.updateStatus();
    });
  }

  public update(): void {
    const maxValue = this.monitorFromServer.watt.maxValue;
    this.monitorService.getMonitorDetail(this.user.id, this.monitorId)
      .subscribe((monitor: MonitorDetailsModel) =>
      {
        monitor ?
        this.monitorFromServer = monitor :
        this.monitorFromServer = {} as MonitorDetailsModel;
        this.setPercentageValue(monitor.diversion);
      }
      ).add(() => {
        this.roundNumbers();
        this.updateStatus();
        if (maxValue < this.monitorFromServer.watt.watts) {
          this.navCtrl.setRoot(this.navCtrl.getActive().component);
        }
      });
  }

  private roundNumbers(): void {
    this.monitorFromServer.report.dayAverage = Math.round(this.monitorFromServer.report.dayAverage * 100) / 100;
    this.monitorFromServer.report.weekAverage = Math.round(this.monitorFromServer.report.weekAverage * 100) / 100;
    this.monitorFromServer.report.monthAverage = Math.round(this.monitorFromServer.report.monthAverage * 100) / 100;
    this.monitorFromServer.watt.watts = Math.round(this.monitorFromServer.watt.watts * 100) / 100;
  }

  private updateStatus(): void {
    if (this.isConforme()) {
      this.status = 'CONFORME';
    } else {
      this.status = 'DESCONFORME';
    }
    this.changeWattColor();
    this.changeDiversionColor();
  }

  changeWattColor() {
    return (() => {
      if (!this.isConforme()) {
        return 'red';
      } else {
        return 'green';
      }
    });
  }

  changeDiversionColor() {
    return (() => this.status === 'CONFORME' ? 'green' : 'red');
  }

  private isConforme(): boolean {
    return -10 <= this.monitorFromServer.diversion && this.monitorFromServer.diversion <= 5
  }

  private setPercentageValue(value: number): void {
    if(value < 0) {
      this.percentageValue = value * -1;
    } else {
      this.percentageValue = value;
    }
  }
}
