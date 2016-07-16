import {Component, Input} from '@angular/core';
import {Menu} from '../../model/Menu.interface.ts'
import {MenuItem} from './item.component.ts'

@Component({
  selector: 'menu-list',
  styles: [ require('./menu.component.scss')],
  directives: [MenuItem],
  template: `
    <h1> Daily Menu from {{menu?.startTime}} to {{menu?.endTime}}</h1>
    <menu-item *ngFor="let dish of dishes"
      [dish]="dish">
    </menu-item>
  `
})

export class MenuList {
  @Input() restaurantId : number;
  menu: Menu;
  dishes: Array<any>;
  constructor(){
    this.dishes = [
      {"name": "Pol\u00e9vka dle denn\u00ed nab\u00eddky",
        "description": "",
        "label": "test",
        "price": 145
      },{
        "name":"Pol\u00e9vka dle denn\u00ed nab\u00eddky",
        "description": "",
        "label": "test",
        "price": 123
      },{
        "name":"Pol\u00e9vka dle denn\u00ed nab\u00eddky",
        "description":"",
        "label": "test",
        "price": 234
      }
    ];
  }
}
