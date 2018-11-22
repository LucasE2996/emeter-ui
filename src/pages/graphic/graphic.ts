import { Component } from '@angular/core';
import { IonicPage, NavController, NavParams } from 'ionic-angular';

@Component({
  selector: 'page-graphic',
  templateUrl: 'graphic.html',
})
export class GraphicPage {

  constructor(public navCtrl: NavController, public navParams: NavParams) {
  }

  ionViewDidLoad() {
    console.log('ionViewDidLoad GraphicPage');
  }

}
