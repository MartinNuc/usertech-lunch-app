import { Pipe, PipeTransform } from '@angular/core';

@Pipe({name: 'toArray'})
export class ToArray implements PipeTransform {
  transform(input: any): any {
    let array = [];
    if(!input) return array;
    Object.keys(input).forEach(key => {
        if(key === '$key') return;
        array.push({
            $key: key,
            value: input[key]
        });
    });
    return array;
  }
}