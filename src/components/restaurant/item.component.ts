import {Component, Input, Output, EventEmitter} from '@angular/core';
import {FirebaseObjectObservable, AngularFire} from "angularfire2/angularfire2";
import {Restaurant} from '../../interfaces/Restaurant.interface.ts';
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
    ({{restaurant | countVotes:dates}} votes)
    <button (click)="restaurantVote(restaurant)">Vote for this restaurant</button>
    <menu-list [dishes]="dishes | extractRestaurantMenu : restaurant.id "> </menu-list>
  `
})

export class RestaurantItem {
  @Input() restaurant: Restaurant;
  dishes: Array<any>;
  votes: FirebaseObjectObservable<any[]>;
  dates: any;
  name: string = 'someone';

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

   /**
     * @description Performs a vote for or against a restaurant
     * @param {Object} restaurant object to determine which restaurant is voted for/against
     */
    restaurantVote(restaurant){
        // let isVotePresent = restaurant.value[this.name];
        let isVotePresent = false;
        
        let today = new Date();
        let dateKey = today.getFullYear() + '-' + today.getMonth() + '-' + today.getDate();

        if(this.name === undefined) return;
        if(this.dates[dateKey][restaurant.id] === undefined){
            this.dates[dateKey][restaurant.id] = {};
        }

        Object.keys(this.dates).forEach(key => {
          if(!this.dates[key] || !this.dates[key][restaurant.id]) return;
          if(this.dates[key][restaurant.id][this.name]) isVotePresent = true;
        });

        if(isVotePresent){
            // vote present, vote against it
            this.dates[dateKey][restaurant.id][this.name] = !this.dates[dateKey][restaurant.id][this.name];
        } else {
            // vote not present, add it as positive
            this.dates[dateKey][restaurant.id][this.name] = true;
        }
        delete this.dates.$key;
        this.votes.update(this.dates);

    }
}
