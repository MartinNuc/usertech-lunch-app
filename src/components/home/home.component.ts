import {Component} from '@angular/core';
import {FirebaseListObservable, AngularFire} from "angularfire2/angularfire2";
import {CountVotes} from '../../pipes/count-votes';
import {Stringify} from '../../pipes/stringify';
import {ToArray} from '../../pipes/to-array';
import {DailyMenuProvider} from '../../models/DailyMenuProvider';
import {DailyMenuQuery} from '../../interfaces/DailyMenuQuery';

@Component({
    selector: 'home-component',
    styles: [require('./home.component.scss')],
    pipes: [CountVotes, Stringify, ToArray],
    providers: [DailyMenuProvider],
    template: `
        <h1>This is our home</h1>
        <div *ngFor="let vote of votes | async">
            <div *ngFor="let restaurant of vote | toArray">
                {{restaurant | stringify}}
            </div>
        </div>

        <div *ngFor="let dailyMenu of dailyMenus | async">
            {{dailyMenu.name}}
        </div>
    `
})
export class Home {
    votes:FirebaseListObservable<any[]>;
    dailyMenus: any;
    constructor(af:AngularFire, dailyMenuProvider:DailyMenuProvider) {
        this.votes = af.database.list('/votes');
        this.votes.subscribe((args) => {

        });


        this.dailyMenus = dailyMenuProvider.load(<DailyMenuQuery>{
            lat: 14.431943199999978,
            long: 50.0906104
        });


    }
}