import {Component} from '@angular/core';
import {FirebaseObjectObservable,  AngularFire} from "angularfire2/angularfire2";
import {CountVotes} from '../../pipes/count-votes';
import {Stringify} from '../../pipes/stringify';
import {ToArray} from '../../pipes/to-array';
import {DailyMenuProvider} from '../../models/DailyMenuProvider';
import {DailyMenuQuery} from '../../interfaces/DailyMenuQuery';
import {RestaurantList} from '../restaurant/list.component.ts'

@Component({
    selector: 'home-component',
    styles: [require('./home.component.scss')],
    directives: [RestaurantList],
    pipes: [CountVotes, Stringify, ToArray],
    providers: [DailyMenuProvider],
    template: `
        <h1>Restaurants</h1>
        <input [(ngModel)]="name" type="text"/>
        <restaurant-list> </restaurant-list>
    `
})
export class Home {
    votes: FirebaseObjectObservable<any[]>;
    name: string;
    dates: any;
    dailyMenus: any;

    constructor(private af: AngularFire, dailyMenuProvider:DailyMenuProvider) {
        this.votes = af.database.object('/votes');
        this.votes.subscribe((res) => {
            this.dates = res;
        });


        this.dailyMenus = dailyMenuProvider.load(<DailyMenuQuery>{
            lat: 14.431943199999978,
            long: 50.0906104
        });


    }

    /**
     * @description Performs a vote for or against a restaurant
     * @param {Object} restaurant object to determine which restaurant is voted for/against
     */
    restaurantVote(restaurant){
        let isVotePresent = restaurant.value[this.name];
        let today = new Date();
        let dateKey = today.getFullYear() + '-' + today.getMonth() + '-' + today.getDate();;

        if(this.name === undefined) return;
        if(this.dates[dateKey][restaurant.$key] === undefined){
            this.dates[dateKey][restaurant.$key] = {};
        }

        if(isVotePresent){
            // vote present, vote against it
            this.dates[dateKey][restaurant.$key][this.name] = !this.dates[dateKey][restaurant.$key][this.name];
        } else {
            // vote not present, add it as positive
            this.dates[dateKey][restaurant.$key][this.name] = true;
        }
        delete this.dates.$key;
        this.votes.update(this.dates);

    }
}

//
// <div *ngFor="let date of votes | async | toArray">
//     <div *ngFor="let restaurant of date.value | toArray">
//         <strong>{{restaurant.$key}}:</strong> ({{restaurant.value | countVotes}} votes)
//         <button (click)="restaurantVote(restaurant, date)">Vote for this restaurant</button>
//         <div *ngFor="let vote of restaurant.value | toArray">
//             {{vote.$key}}: {{vote.value}}
//         </div>
//     </div>
// </div>
//
// <div *ngFor="let dailyMenu of dailyMenus | async">
//     {{dailyMenu.name}}
// </div>
