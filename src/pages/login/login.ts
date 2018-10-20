import { Component, OnDestroy } from '@angular/core';
import { NavController, NavParams } from 'ionic-angular';
import { TabsPage } from '../tabs/tabs';
import { AuthenticationService } from '../../app/services/login.service';
import { AlertController } from 'ionic-angular';

@Component({
  selector: 'page-login',
  templateUrl: 'login.html',
})
export class LoginPage implements OnDestroy {

  public username: string;
  public password: string;

  constructor(
    public navCtrl: NavController,
    public navParams: NavParams,
    private readonly loginService: AuthenticationService,
    private readonly alertCtrl: AlertController
  ) { }

  ionViewDidLoad() {
    console.log('ionViewDidLoad LoginPage');
  }

  public login(): void {
    this.loginService.login(this.username, this.password).subscribe(() => 
      this.navCtrl.push(TabsPage),
      (error: any) => {
        const alert = this.alertCtrl.create({
          title: 'Login Failed!',
          buttons: ['OK']
        });
        alert.setSubTitle(JSON.stringify(error));
        alert.present();
      }
    );
  }

  public ngOnDestroy(): void {
    this.navCtrl.popAll();
  }

  public validateForm(): boolean {
    return this.username != undefined && this.username != '' &&
      this.password != undefined && this.password != '';
  }

}
