import {Pipe, PipeTransform} from '@angular/core';

@Pipe({name: 'extractRestaurantMenu'})

export class ExtractRestaurantMenu implements PipeTransform {
  transform(menuList: Array<any>, restaurantId: number ): any{
    return menuList.filter((menu, index) => {

      if(menu.id_restaurant === restaurantId){
        return true
      }
    })
  }
}
