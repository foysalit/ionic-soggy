import {Page, Storage, LocalStorage} from 'ionic/ionic';
import {Http} from 'angular2/http';


@Page({
	templateUrl: 'build/pages/home/home.html'
})

export class Home {
	constructor(http: Http) {
		this.status = this.statuses().NOT_FETCHED;
		this.storage = new Storage(LocalStorage);
		this.http = http;
	}

	getStatus() {
		this.status = this.statuses().FETCHING;

		this.storage.get('config').then((config) => {
			let config = JSON.parse(config);

			let url = "http://questure.poliziadistato.it/stranieri/?mime=1&lang="+ config.language +"&pratica="+ config.receipt;
			this.http.get(url).subscribe((res:Response) => this.processResponse(res));

			this.status = this.statuses().FETCHED;
			this.result = 'Processing';
		});
	}

	processResponse(res) {
		console.log(res);
	}

	statuses() {
		return {
			NOT_FETCHED: 0,
			FETCHING: 1,
			FETCHED: 2,
			ERROR: 3
		};
	}
}
