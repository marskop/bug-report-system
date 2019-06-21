import { Pipe, PipeTransform } from '@angular/core';

@Pipe({
  name: 'comments'
})
export class CommentsPipe implements PipeTransform {

  transform(array: Array<any>, args: string): Array<any> {

    return array.filter(item => (item.hasOwnProperty('description') && item.description != '') || (item.hasOwnProperty('reporter') && item.reporter != ''));
  }
}
