import {Page, Storage, LocalStorage, SqlStorage, NavController, Alert} from 'ionic/ionic';
import {Home} from '../home/home';


@Page({
  templateUrl: 'build/pages/settings/settings.html'
})
export class Settings {
  constructor(nav: NavController) {
  	this.nav = nav;
  	this.config = {
  		receipt: '',
  		language: '',
      history: false
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
    if (this.config.history) {
      try {
        let historyStorage = new Storage(SqlStorage);
        let query = "CREATE TABLE IF NOT EXISTS history (id INTEGER PRIMARY KEY ASC, result TEXT, receipt TEXT, time TEXT)";
        historyStorage.query(query).catch((err) => {
          console.log('error creating db', err);
        });
      } catch (err) {
          let alert = Alert.create({
            title: 'History Storage Error',
            subTitle: 'Error history storage is not supported by your device',
            buttons: ['Dismiss']
          });
          this.nav.present(alert);
          this.config.history = false;
      }
    }

  	this.storage.set('config', JSON.stringify(this.config)).then(() => {
  		// console.log(this.config);
      this.nav.push(Home);
  	});
  }
}
