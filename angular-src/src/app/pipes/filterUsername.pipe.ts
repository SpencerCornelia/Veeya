import { Pipe, PipeTransform } from '@angular/core';

@Pipe({
  name: 'filterUsername'
})

export class FilterUsernamePipe implements PipeTransform {
  transform(items: any[], searchText: string): any[] {
    if(!items) return [];

    if(!searchText) return items;

    searchText = searchText.toLowerCase();

    return items.filter((item) => {
      if (item.userName) {
        return item.userName.toLowerCase().includes(searchText);
      }
    });
   }
}