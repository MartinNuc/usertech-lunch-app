import {Component} from '@angular/core';
import {FirebaseListObservable, AngularFire} from "angularfire2/angularfire2";
import {CountVotes} from '../../pipes/count-votes';
import {Stringify} from '../../pipes/stringify';
import {ToArray} from '../../pipes/to-array';

@Component({
    selector: 'home-component',
    styles: [ require('./home.component.scss')],
    pipes: [CountVotes, Stringify, ToArray],
    template: `
        <h1>This is our home</h1>
        <div *ngFor="let vote of votes | async">
            <div *ngFor="let restaurant of vote | toArray">
                {{restaurant | stringify}}
            </div>
        </div>
    `
})
export class Home {
    votes: FirebaseListObservable<any[]>;

    constructor(af: AngularFire) {
        this.votes = af.database.list('/votes');
        this.votes.subscribe((args) => {
            
        });
    }
}