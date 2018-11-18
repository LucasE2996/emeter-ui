import { Component } from '@angular/core';

import { AddMeterPage } from '../add-meter/add-meter';
import { MeterListPage } from '../meter-list/meter-list';
import { ProfilePage } from '../profile/profile';

@Component({
  templateUrl: 'tabs.html',
  styles: ['styles.scss']
})
export class TabsPage {

  tab1Root = MeterListPage;
  tab2Root = AddMeterPage;
  tab3Root = ProfilePage

  constructor() {

  }
}
