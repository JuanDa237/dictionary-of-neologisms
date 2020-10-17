import { Pipe, PipeTransform } from '@angular/core';

@Pipe({
  name: 'filter'
})
export class FilterPipe implements PipeTransform {

  transform(value: any, args: string): Array<any> {
    
    if(args.length < 3) return value;

    const resultPost: Array<any> = new Array<any>(0);

    for(const obj of value) {

      if(typeof obj.word != 'undefined') {
        if(obj.word.toLowerCase().indexOf(args.toLowerCase()) > -1) {
          resultPost.push(obj);
        }
      }
    }

    return resultPost;
  }

}