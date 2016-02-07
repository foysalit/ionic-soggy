import {Page, Storage, LocalStorage, NavController} from 'ionic/ionic';
import {Home} from '../home/home';


@Page({
  templateUrl: 'build/pages/settings/settings.html'
})
export class Settings {
  constructor(nav: NavController) {
  	this.nav = nav;
  	this.config = {
  		receipt: '',
  		language: ''
  	};

  	this.storage = new Storage(LocalStorage);

  	this.storage.get('config').then((config) => {
      if (!config)
        return;
      
  		let config = JSON.parse(config);
  		this.config = config;
  	});
  }

  save() {
  	this.storage.set('config', JSON.stringify(this.config)).then(() => {
  		this.nav.push(Home);
  	});
  }
}
