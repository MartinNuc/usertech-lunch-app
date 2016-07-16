import { Pipe, PipeTransform } from '@angular/core';

@Pipe({name: 'countVotes'})
export class CountVotes implements PipeTransform {
  transform(input: any): number {
      var positiveVotes = 0;
      Object.keys(input).forEach(voter => {
          if(input[voter] === true){
              positiveVotes++;
          }
      });
    return positiveVotes;
  }
}