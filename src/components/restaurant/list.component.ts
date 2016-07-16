import {Component} from '@angular/core';
import {FirebaseListObservable, AngularFire} from "angularfire2/angularfire2";
import {Menu} from '../../model/Menu.interface.ts'
import {RestaurantItem} from './item.component.ts'

@Component({
  selector: 'restaurant-list',
  styles: [ require('./restaurant.component.scss')],
  directives: [RestaurantItem],
  template: `
    <h1> restaurant-list </h1>
    <h4> {{restaurants.length}} Restaurants are available Today </h4>
    <restaurant-item
      *ngFor="let restaurant of restaurants"
      [restaurant] = "restaurant"
    >
    </restaurant-item>
  `
})

export class RestaurantList {
  restaurants: Array<any>;
  constructor() {
    this.restaurants = [
      {
        name: "test",
        id: 1262,
        location: "araadfakfjkj",
        category: "thai",
        distance: 0.05932
      },{
        name: "4th categories",
        id: 2172,
        location: "hgoe ajasdf adfasdf",
        category: "viet",
        distance: 0.05932
      },{
        name: "fancy place",
        id: 12,
        location: "araadfakfjkj",
        category: "czech",
        distance: 0.05932
      }
    ]
  }
}
