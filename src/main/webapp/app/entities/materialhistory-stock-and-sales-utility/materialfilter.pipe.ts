import { Pipe, PipeTransform } from '@angular/core';
import {MaterialStockAndSalesUtility} from '../material-stock-and-sales-utility';

@Pipe({
    name: 'fullTextSearch',
    pure: false
  })
  export class FullTextSearchPipe implements PipeTransform {
    constructor() { }
    transform(value: MaterialStockAndSalesUtility[], searchText: string, field: string): any {
      /*  return searchfield ? value.reduce((prev, next) => {
          if (next[field].includes(searchfield)) { prev.push(next); }
          return prev;
        }, []) : value;*/
        // tslint:disable-next-line:curly
        if (!value) return [];
        // tslint:disable-next-line:curly
        if (!searchText) return value;
        searchText = searchText.toLowerCase();
    return value.filter( (it) => {
          return it.code.toLowerCase().includes(searchText) ||
          it.description.toLowerCase().includes(searchText) ;
         // it.lotIdentifierCode.toLowerCase().includes(searchText) ;
        });
      }
  }
