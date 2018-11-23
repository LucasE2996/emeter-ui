import { Component } from '@angular/core';
import { NavController, NavParams } from 'ionic-angular';
import { MonitorService } from '../../app/services/monitor.service';
import { LoaderService } from '../../app/common/loader.service';
import { MonitorDetailsModel } from '../../app/models/monitor-details.model';
import { UserModel } from '../../app/models/user.model';
import { Observable } from 'rxjs';

@Component({
  selector: 'page-graphic',
  templateUrl: 'graphic.html',
  entryComponents: []
})
export class GraphicPage {

    public monitorFromServer: MonitorDetailsModel;
    private user: UserModel;
    private monitorId: string;

    barChartOptions: any = [{
    scales: {
        yAxes: [
        {
            display: true,
            ticks: {
                fontSize: 10,
                colors: '#fff'
            }
        }
        ]
    }
    }];
    barChartLabels = [];
    barChartType:string = 'line';
    barChartLegend:boolean = true;
    barCharData:any;
    wattsValues: Array<number> = [0];
    voltageValues: Array<number> = [0];
    currentValues: Array<number> = [0];
    barChartColors:Array<any> = [
    {
        backgroundColor: 'rgb(61, 121, 219, 0.2)',
        borderColor: '#3F51B5',
        pointBackgroundColor: '#3F51B5',
        pointBorderColor: '#3F51B5',
        pointHoverBackgroundColor: '#3F51B5',
        pointHoverBorderColor: '#3F51B5',
        labels: '#3F51B5'
    },
    {
        backgroundColor: 'rgb(209, 206, 58, 0.2)',
        borderColor: '#d1ce3a',
        pointBackgroundColor: '#d1ce3a',
        pointBorderColor: '#d1ce3a',
        pointHoverBackgroundColor: '#d1ce3a',
        pointHoverBorderColor: '#d1ce3a',
        labels: '#d1ce3a'
    },
    {
        backgroundColor: 'rgb(87, 186, 107, 0.2)',
        borderColor: '#57ba6b',
        pointBackgroundColor: '#57ba6b',
        pointBorderColor: '#57ba6b',
        pointHoverBackgroundColor: '#57ba6b',
        pointHoverBorderColor: '#57ba6b',
        labels: '#57ba6b'
    }]
    
    doughnutChartLabels:string[];
    doughnutChartData:number[];
    doughnutChartType:string = 'doughnut';

  constructor(
        public navCtrl: NavController,
        public navParams: NavParams,
        public readonly monitorService: MonitorService,
        public readonly loaginService: LoaderService
    )
    { }

    ngOnInit() {
        this.loaginService.showLoader();
        this.user = JSON.parse(localStorage.getItem('currentUser'));
        this.monitorId = localStorage.getItem('monitorID');
        this.monitorService.getMonitorDetail(this.user.id, this.monitorId)
        .subscribe((monitor: MonitorDetailsModel) =>
            monitor ?
            this.monitorFromServer = monitor :
            this.monitorFromServer = {} as MonitorDetailsModel
        ).add(() => {
            this.roundNumbers();
            this.calcBar();
        })
        .add(() => this.loaginService.dismissLoading());
    }

  ionViewDidLoad() {
    // Observable.interval(10000).takeWhile(() => true).subscribe(() => this.update());
  }

  public update(): void {
    this.monitorService.getMonitorDetail(this.user.id, this.monitorId)
      .subscribe((monitor: MonitorDetailsModel) =>
        monitor ?
        this.monitorFromServer = monitor :
        this.monitorFromServer = {} as MonitorDetailsModel
      ).add(() => {
          this.roundNumbers();
          // this.calcBar();
        });
    }
  
  private calcBar(): void {
        this.wattsValues.push(this.monitorFromServer.watt.watts);
        this.voltageValues.push(this.monitorFromServer.watt.voltage);
        this.currentValues.push(this.monitorFromServer.watt.current);

        this.barChartLabels = ['', '', '', '', '', '', '', '', '', '']; 

        this.barCharData = [
            {   
                data: this.currentValues, label: 'Corrente'
            },{
                data: this.voltageValues, label: 'Tensão'
            },{
                data: this.wattsValues, label: 'Potência'
            }
        ];
  }
  
  /* calcDoughnut(){
    this.doughnutChartLabels = ['Download Sales', 'In-Store Sales', 'Mail-Order Sales'];
    this.doughnutChartData = [350, 450, 100];
  }; */

  private roundNumbers(): void {
    this.monitorFromServer.report.dayAverage = Math.round(this.monitorFromServer.report.dayAverage * 100) / 100;
    this.monitorFromServer.report.weekAverage = Math.round(this.monitorFromServer.report.weekAverage * 100) / 100;
    this.monitorFromServer.report.monthAverage = Math.round(this.monitorFromServer.report.monthAverage * 100) / 100;
  }

}
