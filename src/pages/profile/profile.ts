import { Component, OnDestroy } from '@angular/core';
import { NavController, NavParams } from 'ionic-angular';
import { UserModel } from '../../app/models/user.model';
import { AuthenticationService } from '../../app/authentication/authentication.service';
import { LoginPage } from '../login/login';
import { TabsPage } from '../tabs/tabs';

@Component({
  selector: 'page-profile',
  templateUrl: 'profile.html',
})
export class ProfilePage {

  public user: UserModel = {} as UserModel;

  constructor(
    public navCtrl: NavController,
    public navParams: NavParams,
    public readonly authenticationService: AuthenticationService
    )
    { }

  ionViewDidEnter() {
    const userFromLocalStorage: UserModel = JSON.parse(localStorage.getItem('currentUser'));
    this.user = userFromLocalStorage;
  }

  public logout(): void {
    this.authenticationService.logout();
    this.navCtrl.parent.parent.setRoot(LoginPage);
  }

}
