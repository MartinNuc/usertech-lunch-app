import {Component} from '@angular/core';
import {FirebaseListObservable, FirebaseObjectObservable,  AngularFire} from "angularfire2/angularfire2";
import {CountVotes} from '../../pipes/count-votes';
import {Stringify} from '../../pipes/stringify';
import {ToArray} from '../../pipes/to-array';

@Component({
    selector: 'home-component',
    styles: [ require('./home.component.scss')],
    pipes: [CountVotes, Stringify, ToArray],
    template: `
        <h1>Restaurants</h1>
        <input [(ngModel)]="name" type="text"/>
        <div *ngFor="let date of votes | async | toArray">
            <div *ngFor="let restaurant of date.value | toArray">
                <strong>{{restaurant.$key}}:</strong> ({{restaurant.value | countVotes}} votes)
                <button (click)="restaurantVote(restaurant, date)">Vote for this restaurant</button>
                <div *ngFor="let vote of restaurant.value | toArray">
                    {{vote.$key}}: {{vote.value}}
                </div>
            </div>
        </div>
    `
})
export class Home {
    votes: FirebaseObjectObservable<any[]>;
    name: string;
    dates: any;

    constructor(private af: AngularFire) {
        this.votes = af.database.object('/votes');
        this.votes.subscribe((res) => {
            this.dates = res;
        });
    }

    /**
     * @description Performs a vote for or against a restaurant
     * @param {Object} restaurant object to determine which restaurant is voted for/against
     * @param {Object} a date object to determine key of changed object
     */
    restaurantVote(restaurant, date){
        let isVotePresent = restaurant.value[this.name];
        let dateKey = date.$key;  

        if(this.name === undefined) return;

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