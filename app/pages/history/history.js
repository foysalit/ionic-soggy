import {Page, Storage, SqlStorage, NavController, Alert} from 'ionic/ionic';
import {Home} from '../home/home';


@Page({
  templateUrl: 'build/pages/history/history.html'
})
export class History {
  constructor(nav: NavController) {
  	this.nav = nav;
    this.data = [];

    try {
    	this.storage = new Storage(SqlStorage);
      this.storage.query('select * from history').then((results) => {
        let rows = results.res.rows;
        for (var i = 0; i < rows.length; i++) {
          let entry = rows.item(i);
          entry.time = new Date(entry.time);
          this.data.push(entry);
        };
      });
    } catch (err) {
      console.log(err);
    }
  }
}
