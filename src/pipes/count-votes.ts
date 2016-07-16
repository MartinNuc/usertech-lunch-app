import { Pipe, PipeTransform } from '@angular/core';
import {Utility} from '../utility';

@Pipe({ name: 'countVotes' })
export class CountVotes implements PipeTransform {
    transform(input: any, dates: any): number {
        if (!input || !dates) return 0;
        let fireRestVotes = {};
        let positiveVotes = 0;
        
        Object.keys(dates).forEach(key => {
            let date = dates[key];
            let dateKey = Utility.getTodayString();
            let fireRest = dates[dateKey];
            if(fireRest && fireRest[input.id]){
                fireRestVotes = fireRest[input.id];
            } else {
                return 0;
            }
        });
        Object.keys(fireRestVotes).forEach(voter => {
            if (fireRestVotes[voter] === true) {
                positiveVotes++;
            }
        });
        return positiveVotes;
    }
}