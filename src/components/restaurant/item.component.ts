import {Component, Input} from '@angular/core';
import {FirebaseObjectObservable, AngularFire} from "angularfire2/angularfire2";
import {Restaurant} from '../../model/Restaurant.interface.ts';
import {MenuList} from '../menu/list.component.ts';
import {ExtractRestaurantMenu} from '../../pipes/restaurantMenu.ts';
import {ToArray} from '../../pipes/to-array.ts';
import {CountVotes} from '../../pipes/count-votes.ts';

@Component({
  selector: 'restaurant-item',
  styles: [ require('./restaurant.component.scss')],
  directives: [MenuList],
  pipes: [ExtractRestaurantMenu, ToArray, CountVotes],
  template: `
    <h1> restaurant-item </h1>
    <h4>{{restaurant.name}} </h4>
    <div> {{restaurant.location}}</div>
    <div> {{restaurant.category}} </div>
    <strong>{{restaurant.$key}}:</strong> ({{restaurant.value | countVotes}} votes)
    <button (click)="restaurantVote(restaurant)">Vote for this restaurant</button>
    <div *ngFor="let vote of restaurant.value | toArray">
        {{vote.$key}}: {{vote.value}}
    </div>
    <menu-list [dishes]="dishes | extractRestaurantMenu : restaurant.id "> </menu-list>
  `
})

export class RestaurantItem {
  @Input() restaurant: Restaurant;
  dishes: Array<any>;
  votes: FirebaseObjectObservable<any[]>;
  dates: any;

  constructor(private af: AngularFire){
    this.votes = af.database.object('/votes');
    this.votes.subscribe((res) => {
        this.dates = res;
    });
    this.dishes = [
      {
      "distance":"0.13808051082295206",
      "restaurant_name":"Restaurace K The Two Brothers",
      "rating":92,
      "id_restaurant":2172,
      "lat":50.0912692,
      "long":"14.43358390000003",
      "name":"Butter naan",
      "description":"Indick\u00fd chl\u00e9b pot\u0159en\u00fd m\u00e1slem.",
      "ammount":null,
      "price":50,
      "image_url":"https:\/\/www.restu.cz\/ir\/restaurant\/0db\/0db0d6d486eb69ed829b762f83e618f5.jpg"
   },
   {
      "distance":"0.13808051082295206",
      "restaurant_name":"Restaurace K The Two Brothers",
      "rating":92,
      "id_restaurant":2172,
      "lat":50.0912692,
      "long":"14.43358390000003",
      "name":"Plain Roti",
      "description":"Celozrnn\u00fd chl\u00e9b pe\u010den\u00fd v peci Tandoor.",
      "ammount":null,
      "price":40,
      "image_url":"https:\/\/www.restu.cz\/ir\/restaurant\/0db\/0db0d6d486eb69ed829b762f83e618f5.jpg"
   },
   {
      "distance":"0.1452246946411884",
      "restaurant_name":"Bistro Tobruk",
      "rating":83,
      "id_restaurant":1262,
      "lat":"50.09184385046584",
      "long":"14.432612404264432",
      "name":"Croissant",
      "description":"s dom\u00e1c\u00ed marmel\u00e1dou a m\u00e1slem",
      "ammount":null,
      "price":49,
      "image_url":"https:\/\/www.restu.cz\/ir\/restaurant\/283\/283537b3fd8e356d9ff13cd10dd39b1a.jpg"
   }
    ]
  }
}
