

import {Injectable} from '@angular/core';
import {DailyMenuQuery} from '../interfaces/DailyMenuQuery';
import {DailyMenu} from '../interfaces/DailyMenu';
import {Http} from '@angular/http';
import 'rxjs/add/operator/map';

//Output format
//[
//        {
//            name: "Mie frais",
//            menu: ["svíčková", "brambory"]
//        }
//]

const OPTIONS_DEFAULT = <DailyMenuQuery>{
    lat: 0,
    long: 0,
    distance: 0.2,
    max_price: 2,
    min_rating: 1
}

interface RestaurantArray {
    name: string,
    menu: Array<String>
}

@Injectable()
export class DailyMenuProvider{
    data:Array<DailyMenu>;
    restaurants:Array<RestaurantArray>;

    constructor(private http:Http) {

    }

    transformMenus(menus){
        let restaurants = [];
        for(let menu of menus){
            let restaurantFound = false;
            for(let restaurant of restaurants) {
                if(menu.restaurant_name == restaurant.name){
                    restaurantFound = true;
                    restaurant.menu.push(menu.name);
                }
            }
            if(!restaurantFound) {
                restaurants.push(<RestaurantArray>{
                    name: menu.restaurant_name,
                    menu: [menu.name]
                });
            }
        }
        return restaurants;
    }

    load(options: DailyMenuQuery) {
        options = Object.assign(OPTIONS_DEFAULT, options);
        this.restaurants = [];
        if (this.data) return Promise.resolve(this.data);
        return new Promise(resolve => {
            this.http.get(`http://api.letseat.eu/menu/?lat=${options.lat}&long=${options.long}&distance=${options.distance}&max_price=${options.max_price}&min_rating=${options.min_rating}`)
                .map(res => res.json()).subscribe(menus=> {
                this.restaurants = this.transformMenus(menus)
                console.log("TRANSFORMED DATA",this.restaurants);
                resolve(menus);
            });
        });
    }
}

