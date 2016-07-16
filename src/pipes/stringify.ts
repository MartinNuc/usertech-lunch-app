import { Pipe, PipeTransform } from '@angular/core';

@Pipe({name: 'stringify'})
export class Stringify implements PipeTransform {
  transform(input: any): string {
    return JSON.stringify(input);
  }
}