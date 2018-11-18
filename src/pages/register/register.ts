import { Component, OnDestroy } from '@angular/core';
import { NavController, NavParams, AlertController } from 'ionic-angular';
import { LoginPage } from '../login/login';
import { RegisterInfoModel, UserModel } from '../../app/models/user.model';
import { UserService } from '../../app/services/user.service';
import { TabsPage } from '../tabs/tabs';
import { Storage } from '@ionic/storage';

@Component({
  selector: 'page-register',
  templateUrl: 'register.html',
})
export class RegisterPage {

  private registerInfoModel: RegisterInfoModel = {} as RegisterInfoModel;

  constructor(
    public navCtrl: NavController,
    public navParams: NavParams,
    public userService: UserService,
    private storage: Storage,
    private readonly alertCtrl: AlertController,
    )
  { }

  ionViewDidLoad() {
    console.log('ionViewDidLoad RegisterPage');
  }

  public register(): void {
    this.userService.createNewUser(this.registerInfoModel).subscribe((user: UserModel) =>
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

  public exit(): void {
    this.navCtrl.push(LoginPage);
  }

  public validateForm(): boolean {
    return this.registerInfoModel.username != undefined && this.registerInfoModel.username != '' &&
      this.registerInfoModel.password != undefined && this.registerInfoModel.password != '' &&
      this.registerInfoModel.email != undefined && this.registerInfoModel.email != '';
  }

}