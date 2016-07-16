import { Pipe, PipeTransform } from '@angular/core';
import {Utility} from '../utility';

@Pipe({ name: 'getVoters' })
export class GetVoters implements PipeTransform {
    transform(restaurant: any, fireData: any = {}): Array<string> {
        if (!restaurant) return [];
        let voters = [];
        let todayString = Utility.getTodayString();
        Object.keys(fireData).forEach(date => {
           var fireRest = fireData[date][restaurant.id];
            if(fireRest){
                Object.keys(fireRest).forEach(voterName => {
                    if(fireRest[voterName] === true){
                        voters.push(voterName);
                    }
                });
            }
        });

        return voters;
    }
}