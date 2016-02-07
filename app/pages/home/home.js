import {Page, Storage, LocalStorage} from 'ionic/ionic';
import {Http, URLSearchParams} from 'angular2/http';


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

			let url = "http://soggiorno.herokuapp.com/";
	        
	        let params: URLSearchParams = new URLSearchParams();
		    params.set('receipt', config.receipt);
		    params.set('language', config.language);
			
			this.http.get(url, {
	            search: params
	        }).subscribe(
	        	(res) => this.processResponse(res.json()),
	        	(error) => this.processError(error)
	        );
		});
	}

	processResponse(res) {
		if (!res.error) {
			this.status = this.statuses().FETCHED;
			this.result = res.data;
		} else {
			this.status = this.statuses().ERROR;
			this.result = res.error;
		}
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
}
