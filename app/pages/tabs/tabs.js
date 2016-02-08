import {Page} from 'ionic/ionic';
import {Home} from '../home/home';
import {Settings} from '../settings/settings';
import {History} from '../history/history';


@Page({
  templateUrl: 'build/pages/tabs/tabs.html'
})
export class TabsPage {
  constructor() {
    // this tells the tabs component which Pages
    // should be each tab's root Page
    this.tab1Root = Home;
    this.tab2Root = Settings;
    this.tab3Root = History;
  }
}
