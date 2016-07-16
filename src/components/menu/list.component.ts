import {Component, Input} from '@angular/core';
import {Menu} from '../../model/Menu.interface.ts'
import {MenuItem} from './item.component.ts'

@Component({
  selector: 'menu-list',
  styles: [ require('./menu.component.scss')],
  directives: [MenuItem],
  template: `
    <menu-item *ngFor="let dish of dishes"
      [dish]="dish">
    </menu-item>
  `
})

export class MenuList {
  @Input() restaurantId : number;
  @Input() dishes: Array<any>;
  constructor(){}
}
