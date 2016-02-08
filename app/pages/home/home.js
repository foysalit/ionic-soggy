import {Page, Storage, LocalStorage, SqlStorage} from 'ionic/ionic';
import {Http, URLSearchParams} from 'angular2/http';


@Page({
	templateUrl: 'build/pages/home/home.html'
})

export class Home {
	constructor(http: Http) {
		this.status = this.statuses().NOT_FETCHED;
		this.storage = new Storage(LocalStorage);
		this.http = http;
		this.config = {};
		this.storage.get('config').then((config) => {
			this.config = JSON.parse(config);
		});
	}

	getStatus() {
		this.status = this.statuses().FETCHING;

		 
		let url = "http://soggiorno.herokuapp.com/";
        
        let params: URLSearchParams = new URLSearchParams();
	    params.set('receipt', this.config.receipt);
	    params.set('language', this.config.language);
		
		this.http.get(url, {
            search: params
        }).subscribe(
        	(res) => this.processResponse(res.json()),
        	(error) => this.processError(error)
        );
	}

	processResponse(res) {
		if (!res.error) {
			this.status = this.statuses().FETCHED;
			this.result = res.data;
		} else {
			this.status = this.statuses().ERROR;
			this.result = res.error;
		}

		if (this.config.history)
			this.archiveInHistory(this.result, this.config.receipt);

		return true;
	}

	processError(error) {
		console.log('Error!', error);
	}

	statuses() {
		return {
			NOT_FETCHED: 0,
			FETCHING: 1,
			FETCHED: 2,
			ERROR: 3
		};
	}

	archiveInHistory(result, receipt) {
		let historyStorage = new Storage(SqlStorage);
		let query = 'insert into history(result, receipt, time) values("'+ result +'", "'+ receipt +'", "'+ Date().toString() +'")';
		historyStorage.query(query).catch((err) => {
			console.log('error archiving history', err);
		});
	}
}
