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
        if (user) {
          const alert = this.alertCtrl.create({
            title: 'Usuário criado com sucesso!',
            buttons: ['OK']
          });
          alert.setSubTitle(`Usuário ${user.username} criado com sucesso!`);
          alert.present();
          this.exit();
        }
    },
      (error: any) => {
        const alert = this.alertCtrl.create({
          title: 'Failed!',
          buttons: ['OK']
        });
        alert.setSubTitle(`Falha ao criar novo usuário\nError:\n${error}`);
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