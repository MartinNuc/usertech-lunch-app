import { Pipe, PipeTransform } from '@angular/core';

@Pipe({name: 'countVotes'})
export class CountVotes implements PipeTransform {
  transform(input: any): number {
    return Object.keys(input).length;
  }
}