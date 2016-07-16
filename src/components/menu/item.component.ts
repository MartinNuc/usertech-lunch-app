import {Component, Input} from '@angular/core';
import {FirebaseListObservable, AngularFire} from "angularfire2/angularfire2";
import {Dish} from '../../interfaces/Dish.interface.ts'

@Component({
  selector: 'menu-item',
  styles: [ require('./menu.component.scss')],
  template: `
    <div>{{dish.name}}  for {{dish.price}}</div>
  `
})

export class MenuItem {
  @Input() dish: Dish;
}
