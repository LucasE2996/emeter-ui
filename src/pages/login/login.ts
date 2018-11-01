import { Component, OnDestroy } from '@angular/core';
import { NavController, NavParams } from 'ionic-angular';
import { TabsPage } from '../tabs/tabs';
import { AlertController } from 'ionic-angular';
import { UserModel } from '../../app/models/user.model';
import { Storage } from '@ionic/storage';
import { AuthenticationService } from '../../app/authentication/authentication.service';

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
    private readonly authService: AuthenticationService,
    private readonly alertCtrl: AlertController,
    private storage: Storage
  ) { }

  ionViewDidLoad() {
    console.log('ionViewDidLoad LoginPage');
  }

  public login(): void {
    this.authService.login(this.username, this.password).subscribe((user: UserModel) =>
    {
        // login successful if there's a user in the response
        if (user) {
            // store user details and basic auth credentials in local storage 
            // to keep user logged in between page refreshes
            this.storage.set('currentUser', JSON.stringify(user));
        this.navCtrl.push(TabsPage);

        }
    },
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
