import {Component, Input} from '@angular/core';
import {FirebaseListObservable, AngularFire} from "angularfire2/angularfire2";
import {Restaurant} from '../../model/Restaurant.interface.ts'
import {MenuList} from '../menu/list.component.ts'

@Component({
  selector: 'restaurant-item',
  styles: [ require('./restaurant.component.scss')],
  directives: [MenuList],
  template: `
    <h1>{{restaurant.name}} </h1>
    <div> {{restaurant.location}}</div>
    <a> {{restaurant.category}} </a>
    <menu-list [restaurantId]="restaurant.id"> </menu-list>
  `
})

export class RestaurantItem {
  @Input() restaurant: Restaurant;
}
