import {Injectable} from '@angular/core';
import {DailyMenuQuery} from '../interfaces/DailyMenuQuery';
import {DailyMenu} from '../interfaces/DailyMenu';
import {Http} from '@angular/http';
import 'rxjs/add/operator/map';

const OPTIONS_DEFAULT = <DailyMenuQuery>{
    lat: 0,
    long: 0,
    distance: 0.2,
    max_price: 2,
    min_rating: 1
}

@Injectable()
export class DailyMenuProvider {
    data:Array<DailyMenu>;

    constructor(private http:Http) {

    }

    load(options: DailyMenuQuery) {
        options = Object.assign(OPTIONS_DEFAULT, options);

        if (this.data) return Promise.resolve(this.data);
        return new Promise(resolve => {
            this.http.get(`http://api.letseat.eu/menu/?lat=${options.lat}&long=${options.long}&distance=${options.distance}&max_price=${options.max_price}&min_rating=${options.min_rating}`)
                .map(res => res.json()).subscribe(data => {
                this.data = data;
                resolve(this.data);
            });
        });
    }
}

