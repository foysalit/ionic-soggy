import {Page, Storage, SqlStorage, NavController, Alert} from 'ionic/ionic';
import {Home} from '../home/home';


@Page({
  templateUrl: 'build/pages/history/history.html'
})
export class History {
  constructor(nav: NavController) {
  	this.nav = nav;

    this.setStorage();

    this.getArchive();
  }

  setStorage() {
    try {
      if (!this.storage)
        this.storage = new Storage(SqlStorage);
    } catch (err) {
      console.log(err);
    }
  }

  sortArchiveByLatest(prev, next) {
    return ((prev.id > next.id) ? -1 : ((prev.id < next.id) ? 1 : 0))
  }

  getArchive() {

    this.data = [];
    this.total = 0;

    this.storage.query('select COUNT(*) as total from history').then((result) => {
      if (result.res.rows.length > 0)
        this.total = result.res.rows[0].total;
    });

    var data = [];
    this.storage.query('select * from history').then((results) => {
      let rows = results.res.rows;
      for (var i = 0; i < rows.length; i++) {
        let entry = rows.item(i);
        entry.time = new Date(entry.time);
        data.push(entry);
      };
      this.data = data.sort(this.sortArchiveByLatest);
    });
  }

  wipeArchive() {
    this.storage.query('delete from history').then((result) => {
      this.data = [];
      this.total = 0;
      console.log(result);
    });
  }
}
