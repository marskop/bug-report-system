import { Pipe, PipeTransform } from '@angular/core';

@Pipe({
  name: 'priorities'
})
export class PrioritiesPipe implements PipeTransform {

  transform(value: number, args?: any): any {
   if (value === 1) {
     return 'Minor'
   }
   if (value === 2) {
    return 'Major'
  }
  if (value === 3) {
    return 'Critical'
  }
  }

}
